const User = require('./User')
const bcrypt = require('bcrypt')

const login = async (req, res, next) => {

    const { pin, email } = req.body


    try {


        const findedEmail = await User.findOne({ email: email })
        if (!findedEmail) {
            const error = new Error('no user found')
            error.statusCode = 400;
            throw error
        }
        const isPassMatch = await bcrypt.compare(pin, findedEmail.pin)


        if (!isPassMatch) {
            const error = new Error('invalid pin')
            error.statusCode = 400
            throw error
        }

        res.status(200).json({ message: 'login successfully', status: true })



    } catch (error) {
        next(error)
    }


}

module.exports = login