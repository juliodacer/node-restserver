const { response } = require("express");

const hasGender= (...genders ) => {
    return (req, res = response, next) => {

        if(!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el gender sin validar el token primero'
            })
        }

        if(!performs.includes(req.user.gender)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos géneros ${genders}`
            })
        }

        next();
    }
}
module.exports = { hasGender };
