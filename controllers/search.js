const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Plan, Habit } = require("../models");

const allowedCollections = ["users", "plans", "habits", "roles"];

//BUSCAR USUARIO
const searchUsers = async (word = "", res = response) => {
    
    //Buscar usuario por ID
    const isMongoID = ObjectId.isValid(word); //True

    if (isMongoID) {
        const user = await User.findById(word);
        res.json({
            results: (user) ? [user] : []
        });
    }

    //expresión regular
    const regex = new RegExp(word, 'i');

    //Buscar usuario por nombre
    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{ status: true}]
    });

    //Cantidad encontrada
    const usersCount = await User.countDocuments({
        $or: [{name: regex}, {email: regex}],
        $and: [{ status: true}]
    });

    res.json({

        results:usersCount, users
    })
};

//BUCAR PLANES
const searchPlans = async (word = "", res = response) => {
    
    //Buscar plan por ID
    const isMongoID = ObjectId.isValid(word); //True

    if (isMongoID) {
        const plan = await Plan.findById(word);
        res.json({
            results: (plan) ? [plan] : []
        });
    }

    //expresión regular
    const regex = new RegExp(word, 'i');

    //Buscar plan por nombre
    const plans = await Plan.find({name: regex, status: true});

    //Cantidad encontrada
    const plansCount = await Plan.countDocuments({name: regex, status: true});

    res.json({
        results: plansCount, plans
    })
};
//BUSCAR HÁBITOS
const searchHabits = async (word = "", res = response) => {
    
    //Buscar hábito por ID
    const isMongoID = ObjectId.isValid(word); //True

    if (isMongoID) {
        const habit = await Habit.findById(word);
        res.json({
            results: (habit) ? [habit] : []
        });
    }

    //expresión regular
    const regex = new RegExp(word, 'i');

    //Buscar habito por nombre
    const habits = await Habit.find({name: regex, status: true});

    //Cantidad encontrada
    const habitsCount = await Habit.countDocuments({name: regex, status: true});

    res.json({
        results: habitsCount, habits
    })
};


const search = (req, res = response) => {
    const { collection, word } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${allowedCollections}`,
        });
    }

    switch (collection) {
        case "users":
            searchUsers(word, res);
            break;
        case "habits":
            searchHabits(word, res);
            break;
        case "plans":
            searchPlans(word, res);
            break;

        default:
            res.status(500).json({
                msg: "Se me olvidó hacer esta búsqueda",
            });
    }

    // res.json({
    //     collection,
    //     word,
    // });
};
module.exports = {
    search,
};
