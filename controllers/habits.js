const { response } = require("express");
const { Habit } = require("../models");

//obtener planes - paginado - total - populate
const getHabits = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    const [total, habits] = await Promise.all([
        Habit.countDocuments(query),
        Habit.find(query)
            .populate("user", "name")
            .populate("plan", "name")
            .skip(Number(desde))
            .limit(Number(limite)),
    ]);

    res.json({
        total,
        habits,
    });
};

//obtener plan - populate {}
const getHabit = async (req, res = response) => {
    const { id } = req.params;
    const habit = await Habit.findById(id)
        .populate("user", "name")
        .populate("plan", "name");

    res.json(habit);
};

//crear plan
const createHabit = async (req, res = response) => {
    const { status, user, ...body } = req.body;

    const habitDB = await Habit.findOne({ name: body.name });

    if (habitDB) {
        return res.status(400).json({
            msg: `El hábito ${habitDB.name}, ya existe`,
        });
    }

    //generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
    };

    const habit = new Habit(data);

    //guardar DBS
    await habit.save();

    res.status(201).json(habit);
};

//Actualizar plann
const updateHabit = async (req, res = response) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const habit = await Habit.findByIdAndUpdate(id, data, { new: true });

    res.json(habit);
};

const deleteHabit = async (req, res = response) => {
    const { id } = req.params;

    const habitDeleted = await Habit.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    );

    res.json(habitDeleted);
};

module.exports = {
    createHabit,
    deleteHabit,
    getHabits,
    getHabit,
    updateHabit,
};
