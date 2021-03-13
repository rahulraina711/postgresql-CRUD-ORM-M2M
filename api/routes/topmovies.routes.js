module.exports=app=>{
    const topM = require('../controller/topmovies.controller');
    const router = require("express").Router();
    
    // top movies
    router.get("/top", topM.top);

    app.use('/api/movies', router);
}