const validateFields  = require("../middlewares/validate-fields");
const validateJWT  = require("../middlewares/validate-jwt");
const validateRoles = require("../middlewares/validate-roles");
const validateUser = require("../middlewares/validate-user")

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateUser
}