module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define('movie',{
        title:{type: Sequelize.STRING},
        plot:{type: Sequelize.STRING},
        rating:{type: Sequelize.DECIMAL}
    });

    return Movie;
};
