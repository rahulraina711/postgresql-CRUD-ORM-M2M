const db = require('../models');
const Movie = db.movies;
const Actor = db.actors;
const Op = db.Sequelize.Op;

exports.create = (req, res)=>{
    if(!req.body.name) return res.status(400).json({message: "Content cannot be empty"});

    // create
    const actor = {
        name: req.body.name,
    }
    // save
    Actor.create(actor)
    .then(data=>res.status(200).json(data))
    .catch(err=>res.status(500).json({message: err.message || "Something went wrong"}));
}
exports.findAll = (req, res)=>{
    console.log("reached here")
    const name = req.query.name;
    let condition = name ? {name: {[Op.iLike]:`%${name}%`}}: null;
    console.log("and here as well")
    Actor.findAll({where:condition, include :['movies']}).then(data=>res.status(201).json(data)).catch(err=>res.status(501).json({message: err||"Error retrieving movie"}));
}
exports.findOne = (req, res)=>{
    const id = req.params.id;

    Actor.findByPk(id, {include :['movies']}).then(data=>res.status(201).json(data)).catch(err=>res.status(501).json({message: err.message||"Error retrieving movie"}));
}
exports.update = (req, res)=>{
    const id = req.params.id;

    Actor.update(req.body,{where:{id:id}})
    .then(num=>{
        if(num==1){
            res.status(201).json({message:"Updated successfully"})
        }
        else{
            res.status(400).json({message:`Cannot update @ id: ${id}`})
        }
    })
    .catch(err=>res.status(501).json({message:err.message || "error updating Actor with id: "+id}));
}
exports.delete = (req, res)=>{
    const id = req.params.id;

    Actor.destroy({
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
    .catch(err=>res.status(501).json({message:err.message || "error deleting Actor wit id: "+id}));
}

exports.addMovie = (req, res) => {
    const movieId = req.body.movieId;
    const actorId = req.body.actorId;
    return Actor.findByPk(actorId)
      .then((actor) => {
        if (!actor) {
          res.status(404).json({message:"Actor not found"})
        }
        return Movie.findByPk(movieId).then((movie) => {
          if (!movie) {
            res.status(404).json({message:"Movie not found"})
          }
  
          actor.addMovie(movie);
          res.status(201).json({message : `added Movie id=${movie.id} to Actor id=${actor.id}`})
          return actor;
        });
      })
      .catch((err) => {
        res.status(500).json({message:err.message || "Error. Couldnot add movie to actor"})
      });
  };