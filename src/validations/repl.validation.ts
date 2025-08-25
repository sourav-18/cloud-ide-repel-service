const Joi = require('joi');
import constantValidation from './constant.validation';

export default class ReplValidation {
    public static replCreateBody = Joi.object({
        language:constantValidation.replLanguage.required(),
    })
}