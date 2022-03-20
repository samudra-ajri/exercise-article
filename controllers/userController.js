import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import { responseBody } from '../helpers/responseBodyHelpers.js'
import User from '../models/Users.js'
import generateToken from '../utils/generateToken.js'

// @desc    Register new user
// @route   POST /api/auth/register
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

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ where: { email } })
    
    if (user && (await bcrypt.compare(password, user.password))) {
        user.dataValues.token = generateToken(user.id)
        responseBody(res, user, 'Login Success')
    } else {
        res.status(401)
        throw new Error('Invalid credential')
    }
})

export { 
    authUser,
    registerUser
}