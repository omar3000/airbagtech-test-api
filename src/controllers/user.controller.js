const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const User = require( "../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt  = require( "jsonwebtoken");

const saltRounds = 10;
dotenv.config();

async function crear(req, res){
    try {
        const salt = await bcrypt.genSalt(saltRounds);

        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUserInfo = {
            id: uuidv4(),
            email: req.body.email,
            password: hashedPassword,
        }
        const user = await findByEmail(req.body.email)

        if (!user) {
            const userCreated = await User.create(newUserInfo)

            res.status(201).send({ message: 'Usuario creado exitosamente', userCreated })
            return
        }
        else{
            res.status(409).send({ message: 'Email duplicated' })
            return
        }

    
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    
    }
}

async function findByEmail(email){
    try{
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        return user
    }
    catch(error){
        return null
    }
} 

async function login(req, res) {
    try {

        const user = await findByEmail(req.body.email);

        if(!user){
            res.status(401).send({
                message: 'Auth failed email or password'
            });
            return;
        }

        const result = await bcrypt.compare(req.body.password, String(user?.password));

        if (!result){
            res.status(401).send({
                message: 'Auth failed email or password x'
            });
            return;
        }
        const token = jwt.sign(
            {
                email: user?.email,
                userId: user?.id,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "500h"
            },
        );

        res.status(200).send({ status: "Success", message: 'Auth successful for 500h', userId: user?.id, token: token });
    
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


module.exports = {crear, login};

