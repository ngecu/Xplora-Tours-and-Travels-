import joi from 'joi'

export const registerUserSchema = joi.object({
    full_name: joi.string(),
        email : joi.string().email(),
        phone_number: joi.string().min(10),
        password: joi.string()
})