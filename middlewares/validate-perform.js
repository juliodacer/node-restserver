const { response } = require("express");

const hasPerform = (...performs ) => {
    return (req, res = response, next) => {

        if(!req.habit) {
            return res.status(500).json({
                msg: 'Se quiere verificar el hábito sin validar el token primero'
            })
        }

        if(!performs.includes(req.habit.perform)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estas calificaciones ${roles}`
            })
        }

        next();
    }
}
module.exports = { hasPerform };
