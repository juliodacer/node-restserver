const { Schema, model } = require("mongoose");

const GenderSchema = Schema({
    gender: {
        type: String,
        required: [true, "El perform es obligatorio"],
    },
});

module.exports = model("Gender",  GenderSchema);
