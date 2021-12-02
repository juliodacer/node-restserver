const { Schema, model } = require("mongoose");

const PlanSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "La descipción es obligatorio"],
    },
    objective: {
        type: String
    },
    startDate: {
        type: String,
        required: [true, "La fecha de inicio es obligatorio"],
    },
    finishDate: {
        type: String,
        required: [true, "La fecha de finalización es obligatorio"],
    },
    createAt: {
        type: String,
        required: true,
        default: '03/12/2021' 
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

PlanSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
};

module.exports = model("Plan", PlanSchema);
