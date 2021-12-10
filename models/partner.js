const { Schema, model } = require("mongoose");

const PartnerSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
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

PartnerSchema.methods.toJSON = function () {
    const { __v, passwords, ...partner } = this.toObject();
    return partner;
};

module.exports = model("Partner", PartnerSchema);
