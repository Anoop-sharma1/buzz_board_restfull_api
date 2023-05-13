const Joi = require('joi');

const create = (req, res, next) => {

    const schema = Joi.object({
        order_id: Joi.number().required(),
        item_name: Joi.string().required(),
        cost: Joi.number().min(0).required(),
        order_date: Joi.date().required(),
        delivery_date: Joi.date().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message.replace(/"/g, ''),
            data: {}
        });
    }

    next();
};

const list = (req, res, next) => {

    const schema = Joi.object({
        date: Joi.date().required(),
    });

    const { error } = schema.validate(req.params);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message.replace(/"/g, ''),
            data: {}
        });
    }

    next();
};

const orderId = (req, res, next) => {

    const schema = Joi.object({
        order_id: Joi.number().required(),
    });

    const { error } = schema.validate(req.params);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message.replace(/"/g, ''),
            data: {}
        });
    }

    next();
};

const update = (req, res, next) => {

    const schema = Joi.object({
        order_id: Joi.number().required(),
        delivery_date: Joi.date().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            status: false,
            message: error.details[0].message.replace(/"/g, ''),
            data: {}
        });
    }

    next();
};

module.exports = {
    create,
    list,
    orderId,
    update
};