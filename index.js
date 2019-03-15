export const isArray = {
	options: value => Array.isArray(value)
};

export const isString = {
	options: value => typeof value === 'string'
};

export const isObject = {
	options: value => typeof value === 'object'
};