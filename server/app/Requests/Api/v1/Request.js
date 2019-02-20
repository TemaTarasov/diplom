import { trim, isEmpty, isArray, isEmail, isObject } from '../../../../utils/helper';

const err = {
  'array': 'The :attribute must be an array.',
  'email': 'The :attribute must be a valid email address.',
  'max': {
    'number': 'The :attribute may not be greater than :max.',
    'string': 'The :attribute may not be greater than :max characters.',
    'array': 'The :attribute may not have more than :max items.'
  },
  'min': {
    'number': 'The :attribute must be at least :min.',
    'string': 'The :attribute must be at least :min characters.',
    'array': 'The :attribute must have at least :min items.'
  },
  'number': 'The :attribute must be a number.',
  'required': 'The :attribute field is required.',
  'object': 'The :attribute must be an object.',
};

function parseRule(rule) {
  return rule.split('|').reduce((acc, item) => {
    const [key, value] = item.split(':');

    if (key === 'required') {
      acc.required = true;

      return acc;
    }

    if (!isEmpty(value)) {
      const _value = Number(value);

      if (isNaN(_value)) {
        throw new TypeError('Wrong syntax for validation min or max! Please use next syntax min:NUMBER or max:NUMBER OR min:NUMBER:max:NUMBER')
      }

      acc[key] = _value;

      return acc;
    }

    if (['number', 'email', 'array', 'object'].includes(key)) {
      acc.type = key;

      return acc;
    }

    return acc;
  }, {
      type: 'string',
      required: false,
      min: null,
      max: null
    });
}

function validate(value, rule, acc, key) {
  const rules = parseRule(rule);

  if (rules.required) {
    if (isEmpty(trim(value))) {
      acc.validate = false;

      acc.errors[key] = acc.errors[key] || [];
      acc.errors[key].push(
        err.required.replace(':attribute', key)
      );
    }
  } else if (isEmpty(trim(value))) {
    return acc;
  }

  switch (rules.type) {
    case 'array':
      if (!isArray(value)) {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err[rules.type].replace(':attribute', key)
        );
      }
      break;
    case 'object':
      if (!isObject(value)) {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err[rules.type].replace(':attribute', key)
        );
      }
      break;
    case 'number':
      if (
        typeof value === 'number' &&
        !isNaN(value)
      ) {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err[rules.type].replace(':attribute', key)
        );
      }
      break;
    case 'email':
      if (!isEmail(trim(value, true))) {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err[rules.type].replace(':attribute', key)
        );
      }
      break;
    default:
      break;
  }

  if ((rules.max || rules.min) && ['number', 'array'].includes(rules.type)) {
    const _value = rules.type === 'number' ? value : value.length;

    if (rules.max) {
      if (_value < rules.max) {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err.max[rules.type].replace(':attribute', key).replace(':max', rules.max)
        );
      }
    }

    if (rules.min) {
      if (_value > rules.min) {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err.min[rules.type].replace(':attribute', key).replace(':min', rules.min)
        );
      }
    }
  }

  return acc;
}

export default rules => {
  return ({ body }, res, next) => {
    const result = Object.keys(rules).reduce((acc, key) => validate(body[key], rules[key], acc, key), {
      validate: true,
      errors: {}
    });

    if (result.validate) {
      return next();
    }

    return res.json({
      status: 422,
      errors: {
        ...result.errors
      }
    }).status(422);
  };
};
