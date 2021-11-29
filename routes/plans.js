const { Router } = require("express");
const { check } = require("express-validator");
const {
    createPlan,
    getPlans,
    getPlan,
    updatePlan,
    deletePlan,
} = require("../controllers/plans");
const { existsPlanByID } = require("../helpers/db-validators");

const { validateJWT, validateFields, isAdminRole } = require("../middlewares");

const router = Router();

//Obtener todos los planes
router.get("/", getPlans);

//Obtener un plan por ID - publico
router.get(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsPlanByID),
        validateFields,
    ],
    getPlan
);

//Crear plan - privado - cualquier persona con un token válido
router.post(
    "/",
    [
        validateJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        validateFields,
    ],
    createPlan
);

//Actualizar - privado - cualquier con token válido
router.put("/:id",[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existsPlanByID),
    validateFields
],
 updatePlan);

//Borrar un plan - Admin
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    validateFields,
    check('id').custom(existsPlanByID),
    validateFields
], deletePlan);

module.exports = router;
