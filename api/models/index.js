const dbconfig = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD,{
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorAliases: false,

    pool:{
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movies = require("./movie.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model")(sequelize, Sequelize);
db.actors = require("./actor.model")(sequelize, Sequelize);

db.actors.belongsToMany(db.movies,{
    through: "movie_tag",
    as: "movies",
    foreignKey: "actorId",
})

db.movies.belongsToMany(db.actors,{
    through:"movie_tag",
    as: "actors",
    foreignKey: "movieId",
})

db.movies.hasMany(db.reviews, {as:'reviews'});
db.reviews.belongsTo(db.movies,{
    foreignKey: "movieId", as: "movie",
});

module.exports = db;