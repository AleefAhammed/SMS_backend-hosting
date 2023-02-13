import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {

    const { name, email, password } = req.body;
    // console.log({ name, email, password });

    try {

        const userExist = await User.findOne({ email })
        if (userExist) {

            res.status(404).json({ message: 'User already Registered' })
        } else {

            const encPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({ name, email, password: encPassword })
            const token = jwt.sign({ email: newUser.email, id: newUser._id }, 'test', { expiresIn:'1h' })
            res.status(200).json({ result: newUser, token })
        }
    } catch (error) {

        res.json(500).json("Something went wrong")
    }

}

export const login = async (req, res) => {

    const { email, password } = req.body;
    // console.log({ email, password });
    try {

        const userExist = await User.findOne({ email });
        if (!userExist) {

            res.status(404).json({ message: 'No user found' })
        }

        const compPassword = await bcrypt.compare(password, userExist.password)

        if (!compPassword) {

            res.status(404).json({ message: 'Entered password is incorrect' })
        }

        const token = jwt.sign({ email: userExist.email, id: userExist._id }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result: userExist, token })
    } catch (error) {

        res.status(500).json("Something went worng...")
    }
}