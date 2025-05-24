

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Users = require("../model/userSchema");


// user Register logic

exports.registerUser = async (req, res) => {
    const { email, password, phoneNumber, userName } = req.body;

    if (!email || !password || !phoneNumber || !userName) {
        return res.status(400).json({
            message: "Please provide email, password, phone Number and Username"
        })
    }

    // checking if the user is already register or not
    const userFound = await Users.find({ userEmail: email })
    if (userFound.length > 0) {
        return res.status(400).json({
            message: "User is already registered with this email"
        })

    }

    try {
        const newUser = await Users.create({
            userName: userName,
            userPhoneNumber: phoneNumber,
            userEmail: email,
            userPassword: bcrypt.hashSync(password, 10),

        })

        res.status(201).json({
            message: "User registered successfully...",
            user: newUser
        })

    } catch (error) {
        res.status(400).json({
            message: "Something went wrong..."
        })
    }
}



// user Login logics 

exports.userLogin = async (req, res) => {

    const { email, password } = req.body;
    // checking if email or password is enterd or not
    if (!email || !password) {
        return res.status(400).json({
            message: "Please enter email or password"
        })
    }
    // checking if the email exist or not
    const userFound = await Users.find({ userEmail: email });

    if (userFound.length === 0) {
        return res.status(404).json({
            message: "This email is not registered."
        })
    }

    // checking if email or password is wrong

    const passwordIsMatched = bcrypt.compareSync(password, userFound[0].userPassword);
    if (passwordIsMatched) {

        // generate tokens
        const key = process.env.JWT_KEY;
        const token = jwt.sign({ id: userFound[0]._id }, key, {
            expiresIn: '30d',

        })


        res.status(201).json({
            message: "User login Successfully.",
            token
        })
    } else {
        res.status(401).json({
            message: "Invalid email or password"
        })
    }


}