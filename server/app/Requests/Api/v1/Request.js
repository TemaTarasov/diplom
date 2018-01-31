export default rules => {
  const trim = (value, force = false) => {
    if (value) {
      const tmp = value.trim().split(' ').filter(x => x !== '');

      return force ? tmp.join('') : tmp.join(' ');
    }
  };

  const email = email => {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regexp.test(email);
  };

  return (req, res, next) => {
    const result = Object.keys(rules).reduce((acc, key) => {
      const rule = rules[key];
      const force = rule.force || false;

      let bool;
      let message;

      if (!rule.required) {
        if (
          typeof req.body[key] === 'undefined' ||
          req.body[key] === null
        ) {
          return acc;
        }
      }

      const value = req.body[key];

      switch (rule.type) {
        case 'email':
          bool = email(
            trim(value, force)
          );
          message = `The ${key} must be a valid email address.`;
          break;
        case 'array':
          bool = value && typeof value === 'object' && Array.isArray(value);
          message = `The ${key} must be an array.`;
          break;
        case 'object':
          bool = value && typeof value === 'object';
          message = `The ${key} must be an object.`;
          break;
        case 'number':
          bool = value && typeof value === 'number';
          message = `The ${key} must be an object.`;
          // TODO: validate number
          break;
        case 'string':
        default:
          bool = value && trim(value, force) !== '';
          message = `The ${key} field is required.`;

          if (rule.min && value && value.length <= rule.min) {
            bool = false;
            message = `The ${key} must be at least ${rule.min} characters.`;
          } else if (rule.max && value && value.length >= rule.max) {
            bool = false;
            message = `The ${key} may not be greater than ${rule.max} characters.`;
          }

          break;
      }

      if (!bool) {
        if (acc.validate) {
          acc.validate = Boolean(bool);
        }

        acc.errors[key] = message;

        return acc;
      }

      return acc;
    }, {
        validate: true,
        errors: {}
      });

    if (result.validate) {
      next();
    } else {
      res.json({
        status: 422,
        errors: {
          ...result.errors
        }
      }).status(422);
    }
  };
};
