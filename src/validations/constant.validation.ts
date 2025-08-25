import * as Joi from 'joi';
import DbConstantUtils from '../utils/dbConstant.utils';


export default class constValidation {
    public static replLanguage = Joi.string().valid(...DbConstantUtils.mongodb.repl.language).messages({
        'any.only': `{#key} must be one of ${DbConstantUtils.mongodb.repl.language.join(', ')}`,
        'any.required': '{#key} is required',
    });
}