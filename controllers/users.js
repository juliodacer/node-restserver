const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
    //const query = req.query;
    //const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    const query = { status: true };

    const { limite = 5, desde = 0 } = req.query;

    // const users = await User.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde)).
            limit(Number(limite)),
    ]);

    res.json({
        total,
        users,
        // resp
    });
};

const usersPost = async (req, res = response) => {
    // const body = req.body;
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //guardar en BD
    await user.save();

    res.json({
        msg: "post API - usersPost",
        user,
    });
};

const usersPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    //Validar TODO contra base de datos
    if (password) {
        //encriptar la contraseña:
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json(user);
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: "patch API - usersPatch",
    });
};

const usersDelete = async (req, res = response) => {
    const { id } = req.params;

    const uid = req.uid;

    //borrar fisicamente
    //const user = await User.findByIdAndDelete(id);

    //
    const user = await User.findByIdAndUpdate(id, {status: false})

    res.json({
        user,
        uid
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
};
