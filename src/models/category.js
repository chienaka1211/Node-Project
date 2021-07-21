'use strict';
const {Sequelize, DataTypes, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Category.hasMany(models.Product_Category);
        }
    }

    Category.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        categoryCode: DataTypes.STRING,
        name: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'Category'
    });
    return Category;
};