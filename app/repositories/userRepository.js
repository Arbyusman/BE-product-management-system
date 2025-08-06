const { User } = require('../models')

module.exports = {
    create(body) {
        return User.create(body)
    },

    findOne(condition) {
        return User.findOne({ where: condition })
    },

    findByEmail(email) {
        return User.findOne({
            where: {
                email: email,
            },

        });
    },

}