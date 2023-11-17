import joi from 'joi'

export const registerUserSchema = joi.object({
    full_name: joi.string(),
        email : joi.string().email(),
        phone_number: joi.string().min(10),
        password: joi.string(),
        confirm_password: joi.string()

})

export const manageProfileSchema = joi.object({
    current_password :joi.string(),
    new_password :joi.string(),

})



export const createEventSchema = joi.object({
    destination: joi.string().required(),
    start_date: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    event_name: joi.string().required(),

    duration: joi.number().integer().positive().required(),
    price: joi.number().precision(2).positive().required(),
    category_id: joi.string().required(),
  });