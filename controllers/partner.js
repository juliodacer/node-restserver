const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Partner = require("../models/partner");
const User = require("../models/user");

//obtener plan - populate {}
const getPartner = async (req, res = response) => {
    const { id } = req.params;
    const partner = await Partner.findById(id).populate("user", "name");
    res.json(partner);
};

const getPartners = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    const [total, partners] = await Promise.all([
        Partner.countDocuments(query),
        Partner.find(query)
            .populate("user", "name")
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({
        total,
        partners,
    });
};

const createPartner = async (req, res = response) => {
    const { status, user, user_id, ...body } = req.body;

    const user1 = await User.findById(user_id);
        if (!user1) {
            throw new Error(`El ID no existe ${id}`);
        }

    const partnerDB = await Partner.findOne({ _id: req.user._id });

    // if (!partner1) {
    //     return res.status(400).json({
    //         msg: `El compañero no existe`,
    //     });
    // }

    if (partnerDB) {
        return res.status(400).json({
            msg: `El compañero ${partnerDB._id}, ya existe`,
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        user_id: user1,
        name: body.name,
        user: req.user._id,
    };

    const partner = new Partner(data);

    //guardar DBS
    await partner.save();

    res.status(201).json(data);
};

const updateUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, ...resto } = req.body;

    //Validar TODO contra base de datos
    if (password) {
        //encriptar la contraseña:
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
};

const patchUser = (req, res = response) => {
    res.json({
        msg: "patch API - usersPatch",
    });
};

const deleteUser = async (req, res = response) => {
    const { id } = req.params;

    //const uid = req.uid;

    //borrar fisicamente
    //const user = await User.findByIdAndDelete(id);

    //
    const user = await Partner.findByIdAndUpdate(id, { status: false });
    const authenticatedUser = req.user;

    res.json({
        user,
        authenticatedUser,
    });
};

module.exports = {
    getPartner,
    getPartners,
    createPartner,
    updateUser,
    patchUser,
    deleteUser,
};
