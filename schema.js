import Joi from 'joi';

const listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.object({
        url: Joi.string().required(),
        filename: Joi.string().required()
    }).required()
}).required();

// const reviewSchema = Joi.object({
//     rating: Joi.number().required().min(1).max(5),
//     comment: Joi.string().required()
// }).required();


const reviewSchema = Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
    })
    .prefs({ convert: true }) // string → number auto convert
    .unknown(true);

export { listingSchema, reviewSchema };