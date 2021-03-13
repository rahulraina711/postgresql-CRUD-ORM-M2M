module.exports = app =>{
    const movies = require("../controller/movie.controller");

    const router = require("express").Router();

    // create a new tutorial
    router.post("/", movies.create);

    // Retrieve all tutorial
    router.get("/", movies.findAll);
    
    // retrieve by id
    router.get('/:id', movies.findOne);

    // update tutorial
    router.put('/:id', movies.update);

    // delete with id
    router.delete('/:id', movies.delete);

    

    app.use('/api', router);
};