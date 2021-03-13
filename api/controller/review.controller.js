const db = require("../models");
const Review = db.reviews;
const Op = db.Sequelize.Op;
const Movie = db.movies;
const math = require('mathjs');

exports.create_review = (req, res)=>{
    if(!req.body) return res.status(400).json({message: "Content cannot be empty"});
    const movieId = req.body.movieId;
    const rating = req.body.rating;
    // create
    const review = {
        name: req.body.name,
        text: req.body.text,
        rating:req.body.rating,
        movieId:req.body.movieId
    }
    // save
    Review.create(review)
    .then(data=>{
        Movie.findByPk(movieId).then(movie=>{
            console.log("---------------", movie.rating,rating)
            let ratings = math.median(rating, movie.rating);
            console.log("hereeee", ratings)
            Movie.update({rating:ratings},{where:{id:movieId}}).then(x=>console.log(x)).catch(err=>console.log(err));
        });
        
        
        res.status(200).json(data)
    })
    .catch(err=>res.status(500).json({message: err.message || "Something went wrong"}));
}

exports.delete_review = (req, res)=>{
    const id = req.params.id;
    Review.destroy({where:{id:id}}).then(data=>res.status(201).json({message:"review removed"})).catch(err=>res.send(400).json({message:err.message||"an error occured"}))
}