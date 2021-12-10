const { response, request } = require("express");
const User = require("../models/user");

const validatePartner = async (req = request, res = response, next) => {
    try {
        const { uid } = req.body;

        //leer usuario correspondiente al uid
        const partner = await User.findById(uid);

        if (!partner) {
            return res.status(401).json({
                msg: "Usuario no existe en la BD", //usuario con status false
            });
        }

        //verificar su el uid tiene status en true
        if (!partner.status) {
            return res.status(404).json({
                msg: "Usuario no válido", //usuario con status false
            });
        }

        req.partner = partner;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Usuario no válido",
        });
    }
};

module.exports = {
    validatePartner,
};
