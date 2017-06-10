import Joi from 'joi';

export default {
	signup: {
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
	},
};