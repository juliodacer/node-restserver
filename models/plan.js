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
    img: {
        type: String
    },
    startDate: {
        type: Date,
        required: [true, "La fecha de inicio es obligatorio"],
    },
    finishDate: {
        type: Date,
        required: [true, "La fecha de finalización es obligatorio"],
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

PlanSchema.methods.toJSON = function () {
    const { __v, status, ...data } = this.toObject();
    return data;
};

module.exports = model("Plan", PlanSchema);
