module.exports = app =>{
    const actors = require("../controller/actor.controller");

    const router = require("express").Router();

    // create a new actor
    router.post("/", actors.create);

    // Retrieve all actor
    router.get("/all", actors.findAll);

    // retrieve by id
    router.get('/:id', actors.findOne);

    // update actor
    router.put('/:id', actors.update);

    // delete with id
    router.delete('/:id', actors.delete);

    // add movie to actor
    router.post('/am', actors.addMovie);

    app.use('/api/actor', router);
};