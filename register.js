const User = require('./User')

const bcrypt = require('bcrypt')


const register = async (req, res, next) => {

    const { pin, name, email, currency } = req.body


    try {

        const findedEmail = await User.findOne({ email: email })

        if (findedEmail) {
            const error = new Error('this email is already exist')
            error.statusCode = 400
            throw error
        }

        const hashedPass = await bcrypt.hash(pin, 10)

        const newUser = new User({
            pin: hashedPass, email, name, currency,
        })

        const savedUser = await newUser.save()

        res.status(200).json({ message: 'account created successfully', status: true })


    } catch (error) {
        next(error)
    }


}

module.exports = register