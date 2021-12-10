const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer usuario correspondiente al uid
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: "Usuario no existe en la BD", //usuario con status false
            });
        }

        //verificar su el uid tiene status en true
        if (!user.status) {
            return res.status(404).json({
                msg: "Token no válido", //usuario con status false
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
};

module.exports = {
    validateJWT,
};
