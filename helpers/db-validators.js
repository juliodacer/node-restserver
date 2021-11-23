const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (role = "") => {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
    }
};

const existingEmail = async (email = "") => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`El correo ${email} ya está registrado en la BD`);
    }
    // if (existsEmail){
    //     return res.status(400).json({
    //         msg: 'Ese correo ya está registrado'
    //     });
    // }
};

const existsUserByID = async (id) => {
    const existsUser = await User.findById(id);
    if (!existsUser) {
        throw new Error(`El usuario no existe`);
    }
};

module.exports = {
    isValidRole,
    existingEmail,
    existsUserByID,
};
