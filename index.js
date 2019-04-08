/**
 * Value should be found in the body (can be omiited)
 */
export const optionalInBody = {
	in: ['body'],
	optional: true
};

/**
 * Ensures field value is an array
 */
export const isArray = {
	custom: {
		options: value => Array.isArray(value)
	}
};

/**
 * Ensures field value is a string
 */
export const isString = {
	custom: {
		options: value => typeof value === 'string'
	}
};

/**
 * Ensures field value is an object
 */
export const isObject = {
	custom: {
		options: value => typeof value === 'object'
	}
};

/**
 * Ensures field value is a boolean
 */
export const isBoolean = {
	custom: {
		options: value => typeof value === 'boolean'
	}
};
