const { Router } = require("express");
const { check } = require("express-validator");
const {
    createPartner,
    getPartner,
    getPartners
} = require("../controllers/partner");
const { existsPartnerByID } = require("../helpers/db-validators");

const { validateJWT, validateFields, isAdminRole, isUserRole } = require("../middlewares");

const router = Router();

//Obtener todos los planes
router.get("/", getPartners);

//Obtener un plan por ID - publico
router.get(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsPartnerByID),
        validateFields,
    ],
    getPartner
);

//Crear plan - privado - cualquier persona con un token válido
router.post(
    "/",
    [
        validateJWT,
        isUserRole,
        // check("name", "El nombre es obligatorio").not().isEmpty(),
        validateFields,
    ],
    createPartner
);

//Actualizar - privado - cualquier con token válido

// router.put("/:id",[
//     validateJWT,
//     check('name', 'El nombre es obligatorio').not().isEmpty(),
//     check('id').custom(existsPlanByID),
//     validateFields
// ],
//  updatePlan);

//Borrar un plan - Admin
// router.delete("/:id", [
//     validateJWT,
//     isAdminRole,
//     check('id', 'No es un ID válido').isMongoId(),
//     validateFields,
//     check('id').custom(existsPlanByID),
//     validateFields
// ], deletePlan);

module.exports = router;
