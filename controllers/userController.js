import asyncHandler from 'express-async-handler'
import { responseBody } from '../helpers/responseBodyHelpers.js'
import User from '../models/Users.js'

// @desc    Register new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body

    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
        res.status(409)
        throw new Error('Email already exists')
    }

    const user = await User.create({
        name,
        phone,
        email,
        password
    })

    if (user) {
       responseBody(res, user, 'Register Success')
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export { 
    registerUser
}