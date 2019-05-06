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
	errorMessage: 'value must be an array',
	validate: value => Array.isArray(value)
};

/**
 * Ensures field value is a string
 */
export const isString = {
	errorMessage: 'value must be a string',
	validate: value => typeof value === 'string'
};

/**
 * Ensures field value is an object
 */
export const isObject = {
	errorMessage: 'value must be an object',
	validate: value => typeof value === 'object'
};

/**
 * Ensures field value is a boolean
 */
export const isBoolean = {
	errorMessage: 'value must be a boolean',
	validate: value => typeof value === 'boolean'
};

/**
 * Ensures field value is from provided array
 */
export const oneOf = array => ({
	errorMessage: `value must be one of [${array.join(', ').replace(/, ([^,]*)$/, ' or $1')}]`,
	validate: value => array.includes(value)
});

/**
 * @typedef Validator
 * @property {function} validate Should return true/false
 * @property {string} [errorMessage]
 */

/**
 * Returns validators that runs all passed functions
 * Functions must `return true/false`
 * If all are `true` we pass
 * If validator returns `false` error will added to stack
 * We return the first error as the error message
 * Requests should keep being sent until all erors are gone
 *
 * @param {Validator[]} validators 
 * @returns {Object}
 */
export const validationArray = validators => {
	let errors = [];

	return {
		custom: {
			errorMessage: () => errors.length >= 1 ? errors.join('\n') : 'value is invalid',
			options: (value, opts) => {
				errors = [];
				const results = validators.map((validator, index) => {
					logger.debug(`validating ${value} [${index + 1}/${validators.length}]`);
					const result = validator.validate(value, opts);
					// If validation failed set current Error
					if (result === false) {
						const errorMessage = validator.errorMessage || `${value} is invalid`;
						logger.debug(`setting error to ${errorMessage}`);
						errors.push(errorMessage);
					}
					return result;
				});
				return results.every(value => value === true);
			}
		}
	};
};