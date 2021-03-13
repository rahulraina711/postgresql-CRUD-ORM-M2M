module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define('review',{
        name:{type: Sequelize.STRING},
        text:{type: Sequelize.STRING},
        rating:{type: Sequelize.DECIMAL}
    });
    

    return Review;
};
