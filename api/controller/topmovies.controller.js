const db = require("../models");
const Movie = db.movies;
const Op = db.Sequelize.Op;

exports.top = (req, res)=>{
    Movie.findAll({where : {rating: {[Op.gte]:6}}, include : ['reviews','actors']})
    .then(data=>res.status(201).json(data))
    .catch(err=>res.status(501).json({message: err.message||"Error retrieving movies"}));
}