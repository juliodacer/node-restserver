const { Router } = require("express");
const { check } = require("express-validator");
const {
    createHabit,
    getHabits,
    getHabit,
    updateHabit,
    deleteHabit,
} = require("../controllers/habits");
const { existsHabitByID, isValidPerform } = require("../helpers/db-validators");

const { validateJWT, validateFields, isAdminRole } = require("../middlewares");
const { hasPerform } = require("../middlewares/validate-perform");

const router = Router();

//Obtener todos los hábito
router.get("/", getHabits);

//Obtener un hábito por ID - publico
router.get(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existsHabitByID),
        validateFields,
    ],
    getHabit
);

//Crear hábito - privado - cualquier persona con un token válido
router.post(
    "/",
    [
        validateJWT,
        check("name", "El nombre es obligatorio").not().isEmpty(),
        // check("plan", "No es un ID válido").isMongoId(),
        // check("plan").custom(existsPlanByID),
        check("perform").custom(isValidPerform),
        validateFields,
    ],
    createHabit
);

//Actualizar - privado - cualquier con token válido
router.put(
    "/:id",
    [
        validateJWT,
        // check("plan", "No es un ID válido").isMongoId(),
        check("id").custom(existsHabitByID),
        validateFields,
    ],
    updateHabit
);

//Borrar un hábito - Admin
router.delete(
    "/:id",
    [
        validateJWT,
        isAdminRole,
        //hasPerform("COMPLETED", "PARTIALLY_COMPLETED", "INCOMPLETE"),
        validateFields,
        check("id", "No es un ID válido").isMongoId(),
        validateFields,
        check("id").custom(existsHabitByID),
        validateFields,
    ],
    deleteHabit
);

module.exports = router;
