const db = require("../models");
const Movie = db.movies;
const Op = db.Sequelize.Op;
const Review = db.reviews ;
const Actor = db.actors;


exports.create = (req, res)=>{
    if(!req.body.title) return res.status(400).json({message: "Content cannot be empty"});

    // create
    const movie = {
        title: req.body.title,
        plot: req.body.plot,
        rating:0
    }
    // save
    Movie.create(movie)
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(500).json({message: err.message || "Something went wrong"}));
}
exports.findAll = (req, res)=>{
    const title = req.query.title;
    let condition = title ? {title: {[Op.iLike]:`%${title}%`}}: null;

    Movie.findAll({where : condition, include : ['reviews','actors']})
    .then(data=>res.status(201).json(data))
    .catch(err=>res.status(501).json({message: err.message||"Error retrieving movies"}));
}
exports.findOne = (req, res)=>{
    const id = req.params.id;

    Movie.findByPk(id,{include:['reviews','actors']}).then(data=>res.status(201).json(data)).catch(err=>res.status(501).json({message: err.message||"Error retrieving movie"}));
}
exports.update = (req, res)=>{
    const id = req.params.id;

    Movie.update(req.body,{where:{id:id}})
    .then(num=>{
        if(num==1){
            res.status(201).json({message:"Updated successfully"})
        }
        else{
            res.status(400).json({message:`Cannot update @ id: ${id}`})
        }
    })
    .catch(err=>res.status(501).json({message:err.message || "error updating Movie with id: "+id}));
}
exports.delete = (req, res)=>{
    const id = req.params.id;

    Movie.destroy({
        where: {id:id}
    })
    .then(num=>{
        if(num==1){
            res.status(201).json({message:"Deleted successfully"})
        }
        else{
            res.status(400).json({message:`Cannot Delete @ id: ${id}`})
        }
    })
    .catch(err=>res.status(501).json({message:err.message || "error deleting Movie wit id: "+id}));
}
