const { Router } = require("express");
const { check } = require("express-validator");
const {
    getUser,
    createUser,
    updateUser,
    patchUser,
    deleteUser,
} = require("../controllers/users");

const {
    isValidRole,
    existsEmail,
    existsUserByID,
} = require("../helpers/db-validators");

const {
    validateJWT,
    validateFields,
    isAdminRole,
    hasRole
} = require('../middlewares')

const router = Router();

router.get("/", getUser);

router.post(
    "/",
    [
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check(
            "password",
            "El password debe ser de más de 6 caracteres"
        ).isLength({ min: 6 }),
        check("email", "El correo no es válido").isEmail(),
        check("email").custom(existsEmail),
        check("role").custom(isValidRole), //check('role').custom( (role) => isValidRole(role) ),
        // check("role", "No es un rol válido").isIn(
        //     "ADMIN_ROLE",
        //     "USER_ROLE",
        //     "MEDICAL_ROLE"
        // ),
        validateFields,
    ],
    createUser
);

router.put(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsUserByID),
        check("role").custom(isValidRole),
        validateFields,
    ],
    updateUser
);

router.delete(
    "/:id",
    [
        validateJWT,
        //isAdminRole,
        hasRole('ADMIN_ROLE', 'USER_ROLE', 'MEDICAL_ROLE'),
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsUserByID),
        validateFields,
    ],
    deleteUser
);

router.patch("/", patchUser);


module.exports = router;
