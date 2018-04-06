import { trim } from '../../../../utils/string.utils';
import { email } from '../../../../validators';

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

const getType = value => {
  return value === 'number' ||
    value === 'email' ||
    value === 'array' ||
    value === 'object' ? value : 'string';
};

const parseRule = rule => {
  return rule.split('|').reduce((acc, item) => {
    const tmp = item.split(':');

    if (tmp.length === 1) {
      if (tmp[0] === 'required') {
        acc.required = true;
      }

      if (acc.type === 'string') {
        acc.type = getType(tmp[0]);
      }
    } else {
      for (let i = 0; i < tmp.length; i++) {
        const argument = tmp[i];

        if (acc.type === 'string') {
          acc.type = getType(argument);
        }

        if (
          argument === 'min' ||
          argument === 'max'
        ) {
          if (
            isNaN(Number(tmp[i + 1]))
          ) {
            throw new Error('Wrong syntax for validation min or max! Please use next syntax min:NUMBER or max:NUMBER OR min:NUMBER:max:NUMBER')
          }
          acc[argument] = Number(tmp[i + 1]);

          delete tmp[i + 1];
          i++;
        }
      }
    }

    return acc;
  }, {
      type: 'string',
      required: false,
      min: void 0,
      max: void 0
    });
};

const validate = (value, rule, acc, key) => {
  const result = parseRule(rule);

  if (!result.required) {
    if (
      value === null ||
      typeof value === 'undefined' ||
      trim(value) === ''
    ) {
      return acc;
    }
  } else {
    if (
      value === null ||
      typeof value === 'undefined' ||
      trim(value) === '' ||
      !Boolean(value.length)
    ) {
      acc.validate = false;
      acc.errors[key] = acc.errors[key] || [];
      acc.errors[key].push(
        err.required.replace(':attribute', key)
      );
    }
  }

  switch (true) {
    case result.type === 'array':
      if (!Array.isArray(value)) {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err[result.type].replace(':attribute', key)
        );
      }
      break;
    case result.type === 'object':
      if (typeof value !== 'object') {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err[result.type].replace(':attribute', key)
        );
      }
      break;
    case result.type === 'number':
      if (
        typeof value === 'number' &&
        !isNaN(value)
      ) {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err[result.type].replace(':attribute', key)
        );
      }
      break;
    case result.type === 'email':
      if (!email(
        trim(value)
      )) {
        acc.validate = false;
        acc.errors[key] = acc.errors[key] || [];
        acc.errors[key].push(
          err[result.type].replace(':attribute', key)
        );
      }
      break;
    default:
      break;
  }

  if (
    result.min &&
    typeof value !== 'undefined'
  ) {
    switch (true) {
      case result.type === 'number':
        if (value < result.min) {
          acc.validate = false;
          acc.errors[key] = acc.errors[key] || [];
          acc.errors[key].push(
            err.min[result.type].replace(':attribute', key).replace(':min', result.min)
          );
        }
        break;
      case result.type === 'array':
      default:
        if (value.length < result.min) {
          acc.validate = false;
          acc.errors[key] = acc.errors[key] || [];
          acc.errors[key].push(
            err.min[result.type].replace(':attribute', key).replace(':min', result.min)
          );
        }
        break;
    }
  }

  if (
    result.max &&
    typeof value !== 'undefined'
  ) {
    switch (true) {
      case result.type === 'number':
        if (value > result.max) {
          acc.validate = false;
          acc.errors[key] = acc.errors[key] || [];
          acc.errors[key].push(
            err.max[result.type].replace(':attribute', key).replace(':max', result.max)
          );
        }
        break;
      case result.type === 'array':
      default:
        if (value.length > result.max) {
          acc.validate = false;
          acc.errors[key] = acc.errors[key] || [];
          acc.errors[key].push(
            err.max[result.type].replace(':attribute', key).replace(':max', result.max)
          );
        }
        break;
    }
  }

  return acc;
};

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
