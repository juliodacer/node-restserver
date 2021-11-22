const { response, request } = require('express');

const usersGet = ( req = request, res = response) => {

    //const query = req.query;
    const { q, name = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        //query
        q,
        name,
        apikey,
        page,
        limit
    });
}

const usersPost = ( req = request, res = response) => {

    const body = req.body;

    res.json({
        msg: 'post API - usersPost',
        body
    });
}

const usersPut = ( req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usersPut',
        id
    });
}

const usersPatch = ( req, res = response) => {
    res.json({
        msg: 'patch API - usersPatch'
    });
}

const usersDelete = ( req, res = response) => {
    res.json({
        msg: 'delete API - usersDelete'
    });
}



module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}