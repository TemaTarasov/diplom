import mongoose from 'mongoose';

export function isObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value)
    ? value
    : mongoose.mongo.ObjectId('000000000000000000000000');
}

export function get(source, path, defaultValue) {
  if (path && source) {
    const parts = path.split('.');
    const length = parts.length;
    let result = source;

    for (let i = 0; i < length; i++) {
      const item = result[parts[i]];

      if (item === null || item === undefined) {
        return item || defaultValue;
      }

      result = item;
    }

    return result || defaultValue;
  }

  return defaultValue;
}

export function set(source, path, value) {
  if (source && path) {
    const parts = path.split('.');
    const length = parts.length - 1;
    var target = source;

    for (let i = 0; i < length; i++) {
      const part = parts[i];

      if (target[part] === undefined || target[part] === null) {
        target[part] = Number.isNaN(Number(parts[i + 1])) ? {} : [];
      }

      target = target[part];
    }

    target[parts[parts.length - 1]] = value;
  }

  return source;
}

export function isEmpty(value) {
  return value === null ||
    value === undefined ||
    value === '' ||
    (isArray(value) && !value.length) ||
    (isObject(value) && !Object.keys(value).length)
}

export function trim(value, force) {
  if (typeof value !== 'string') {
    return value;
  }

  return value
    ? value.trim().replace(/ +/gmi, !!force ? '' : ' ')
    : value;
}

export function parse(source) {
  let result;

  try {
    result = JSON.parse(source);
  } catch (err) {
    result = source;
  }

  return result;
}

export function stringify(source, size) {
  let cache = [];

  return JSON.stringify(source, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        return;
      }

      cache.push(value);
    }

    return value;
  }, size || 0);
}

export function isObject(object) {
  return object && !isArray(object) && typeof object === 'object'
}

export function isArray(array) {
  return array && typeof array === 'object' && Array.isArray(array);
}

export function assignDeep(target, ...sources) {
  if (!sources.length) {
    return target;
  }

  let source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (let key in source) {
      if (isObject(source[key])) {
        if (isEmpty(target[key])) {
          target[key] = {};
        }

        assignDeep(target[key], source[key]);
      } else if (isArray(source[key])) {
        if (isEmpty(target[key])) {
          target[key] = [];
        }

        assignDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  } else if (isArray(target) && isArray(source)) {
    const length = source.length;

    for (let i = 0; i < length; i++) {
      if (isObject(source[i])) {
        if (isEmpty(target[i])) {
          target[i] = {};
        }

        assignDeep(target[i], source[i]);
      } else {
        target[i] = source[i];
      }
    }
  }

  return assignDeep(target, ...sources);
}

export const decounce = (function () {
  let timeout;

  /**
   * @param {function} callback
   * @param {number}   time
   */
  return function (callback, time) {
    clearTimeout(timeout);

    timeout = setTimeout(callback, time || 300);
  }
})();

export function ellipsis(text, length) {
  if (isEmpty(text)) {
    return;
  }

  if (typeof text !== 'string') {
    return;
  }

  if (isEmpty(length)) {
    length = 128;
  }

  if (text.length > length - 3) {
    return text.slice(0, length - 3) + '...';
  }

  return text;
}

export function isEmail(value) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gmi.test(value);
}
