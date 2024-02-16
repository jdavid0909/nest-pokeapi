import * as Joi from 'joi'


export const JoiValidationSchema = Joi.object({

    PORT: Joi.required(),
    MONGODB:Joi.number().default(3005),
    DEFAULT_LIMIT:Joi.number().default(6)
    
})