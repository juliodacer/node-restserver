const { Gender, Habit, Plan, Role, User, Perform, Partner } = require("../models");

//Validar Perform
const isValidPerform = async (perform = "") => {
    const existsPerform = await Perform.findOne({ perform });
    if (!existsPerform) {
        throw new Error(`El perform ${perform} no está registrado en la BD`);
    }
};

//Validar rol
const isValidRole = async (role = "") => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
};

const isValidGender = async (gender = "") => {
    const existsGender = await Gender.findOne({ gender });
    if (!existsGender) {
        throw new Error(`El género ${gender} no está registrado en la BD`);
    }
};

//Validar email
const existsEmail = async (email = "") => {
    const existsEmailUser = await User.findOne({ email });
    if (existsEmailUser) {
        throw new Error(`El correo ${email} ya está registrado en la BD`);
    }
};

//validar usuario
const existsUserByID = async (id) => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`El usuario no existe`);
    }
};

const existsPartnerByID = async (id) => {
    const existsPartner = await Partner.findById(id);
    if (!existsPartner) {
        throw new Error(`El partner no existe`);
    }
};

//Validar planes
const existsPlanByID = async (id) => {
    const existsPlan = await Plan.findById(id);
    if (!existsPlan) {
        throw new Error(`El ID no existe ${id}`);
    }
};

//Validar Habitos
const existsHabitByID = async (id) => {
    const existsHabit = await Habit.findById(id);
    if (!existsHabit) {
        throw new Error(`El ID no existe ${id}`);
    }
};

module.exports = {
    isValidRole,
    isValidPerform,
    existsEmail,
    existsUserByID,
    existsPartnerByID,
    existsPlanByID,
    existsHabitByID,
    isValidGender,
};
