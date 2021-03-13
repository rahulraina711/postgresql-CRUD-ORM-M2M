module.exports = app =>{
    const review = require("../controller/review.controller");

    const router = require("express").Router();

    // create a new review
    router.post("/", review.create_review);    

    // delete a review
    router.delete("/:id", review.delete_review);

    app.use('/api/review', router);
};