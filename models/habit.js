const { Schema, model } = require("mongoose");

const HabitSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    description: {
        type: String,
    },
    date: {
        type: String,
    },
    img: {
        type: String
    },
    //Para la eliminación
    status: {
        type: Boolean,
        default: true,
        required: true,
    },

    perform: {
        type: String,
        emun: ["COMPLETED", "PARTIALLY_COMPLETED", "INCOMPLETE"],
        required: true,
        default: "INCOMPLETE"
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: "Plan"
    },
});

HabitSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
};

module.exports = model("Habit", HabitSchema);
