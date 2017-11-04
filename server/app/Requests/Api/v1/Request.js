export default class {
  /**
   * @param  {string} email
   * @return {boolean}
   */
  email(email) {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regexp.test(email);
  }

  /**
   * @param  {string}  value
   * @param  {boolean} force
   * @return {string}
   */
  trim(value, force = false) {
    if (value) {
      const tmp = value.trim().split(' ').filter(x => x !== '');

      return force ? tmp.join('') : tmp.join(' ');
    }
  }

  /**
   * @param {object}   req
   * @param {object}   res
   * @param {function} next
   */
  validate(req, res, next) {
    const rules = this.rules,
      result = Object.keys(rules).reduce((acc, key) => {
        const rule = rules[key],
          force = rule.force || false;
        let bool,
          message;

        if (!rule.required) {
          if (
            typeof req.body[key] === 'undefined' ||
            req.body[key] === null
          ) {
            return acc;
          }
        }

        const value = this.trim(req.body[key], force);

        switch (rule.type) {
          case 'email':
            bool = this.email(value);
            message = `The ${key} must be a valid email address.`;
            break;
          case 'string':
          default:
            bool = req.body[key] && value !== '';
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

          acc.rules[key] = message;

          return acc;
        }

        return acc;
      }, {
          validate: true,
          rules: {}
        });

    if (result.validate) {
      return next();
    }

    return res.json({
      status: 422,
      rules: {
        ...result.rules
      }
    }).status(422);
  }

  get rules() {
    return {
      // TODO: add rules
    };
  }
}