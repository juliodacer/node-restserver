const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    email: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
    },

    gender: {
        type: String,
        required: true,
        emun: ["MALE", "FEMALE"],
    },
    age: {
        type: Number,
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    birthDate: {
        type: Date,
    },
    cell: {
        type: String,
    },
    address: {
        type: String,
    },
    occupation: {
        type: String,
    },
    img: {
        type: String,
    },
    doc: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: true,
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    role: {
        type: String,
        required: true,
        emun: ["ADMIN_ROLE", "USER_ROLE", "MEDICAL_ROLE"],
        default: "USER_ROLE",
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, passwords, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = model("User", UserSchema);
