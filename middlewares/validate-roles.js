const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero",
        });
    }

    const { role, name } = req.user;

    if (role !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${name} no es Administrador`,
        });
    }

    next();
};

const hasRole = (...roles ) => {
    return (req, res = response, next) => {

        if(!req.user) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if(!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }
}
module.exports = { isAdminRole, hasRole };
