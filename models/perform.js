const { Schema, model } = require("mongoose");

const PerformSchema = Schema({
    role: {
        type: String,
        required: [true, "El perform es obligatorio"],
    },
});

module.exports = model("Perform", PerformSchema);
