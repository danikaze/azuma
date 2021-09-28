type Dict = Record<string, number | string>;

/**
 * Return the provided object with all the keys flattened
 * as xxx.yyy for object fields
 * or xxx[n] for array elements
 */
export function flattenObject<T extends {} | T[]>(data: T): Dict {
  return Array.isArray(data)
    ? flattenArray(data, {}, '')
    : realFlattenObject(data, {}, '');
}

function realFlattenObject<T extends {}>(
  data: T,
  result: Dict,
  prefix: string
): Dict {
  return Object.entries(data).reduce((result, [key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string' || typeof value === 'number') {
      result[newKey] = value;
      return result;
    }

    if (Array.isArray(value)) {
      return flattenArray(value, result, newKey);
    }

    if (typeof value === 'object' && value) {
      return realFlattenObject(value, result, newKey);
    }

    return result;
  }, result);
}

function flattenArray<T>(data: T[], result: Dict, prefix: string): Dict {
  return data.reduce((result, value, index) => {
    const newKey = `${prefix}[${index}]`;

    if (typeof value === 'string' || typeof value === 'number') {
      result[newKey] = value;
      return result;
    }

    if (Array.isArray(value)) {
      return flattenArray(value, result, newKey);
    }

    if (typeof value === 'object') {
      return realFlattenObject(value, result, newKey);
    }

    return result;
  }, result);
}
