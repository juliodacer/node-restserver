const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        //Verficar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - email",
            });
        }
        
        //Si el usuario está activo
        if (!user.status) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - status: false",
            });
        }

        //verificar la constraseña
        const validPassword = bcryptjs.compareSync( password, user.password);
        if (!validPassword){
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password",
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};

const validateTokenUser = async (req, res = response ) => {

    // Generar el JWT
    const token = await generateJWT( req.user._id );
    
    res.json({
        user: req.user,
        token: token,
    })

}

module.exports = {
    login,
    validateTokenUser
};
