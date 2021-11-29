const { response } = require("express");
const { Plan } = require("../models");

//obtener planes - paginado - total - populate
const getPlans = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    const [total, plans] = await Promise.all([
        Plan.countDocuments(query),
        Plan.find(query)
            .populate("user", "name")
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({
        total,
        plans,
    });
};

//obtener plan - populate {}
const getPlan = async (req, res = response) => {
    const { id } = req.params;
    const plan = await Plan.findById(id).populate("user", "name");

    res.json(plan);
};

//crear plan
const createPlan = async (req, res = response) => {
    const name = req.body.name.toUpperCase();

    const planDB = await Plan.findOne({ name });

    if (planDB) {
        return res.status(400).json({
            msg: `El plan ${planDB.name}, ya existe`,
        });
    }

    //generar la data a guardar
    const data = {
        name,
        user: req.user._id,
    };

    const plan = new Plan(data);

    //guardar DBS
    await plan.save();

    res.status(201).json(data);
};

//Actualizar plann
const updatePlan = async (req, res = response) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const plan = await Plan.findByIdAndUpdate(id, data, { new: true });

    res.json(plan);
};

const deletePlan = async (req, res = response) => {
    const {id} = req. params;

    const planDeleted = await Plan.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json(planDeleted);
}

module.exports = {
    createPlan,
    deletePlan,
    getPlans,
    getPlan,
    updatePlan,
};


