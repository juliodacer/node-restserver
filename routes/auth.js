const { Router } = require("express");
const { check } = require("express-validator");

const { login, validateTokenUser } = require("../controllers/auth");
const { validateFields,  validateJWT } = require("../middlewares");

const router = Router();

router.post("/login", [
    check('email', 'El correro es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);

router.get('/',[
    validateJWT
], validateTokenUser );


module.exports = router;
