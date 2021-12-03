const { Schema, model } = require("mongoose");

const PerformSchema = Schema({
    perform: {
        type: String,
        required: [true, "El perform es obligatorio"],
    },
});

module.exports = model("Perform", PerformSchema);
