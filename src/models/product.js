'use strict';
const {Sequelize, DataTypes, Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Product extends Model {

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }

    Product.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        productCode: DataTypes.STRING,
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 2),
        description: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'Product'
    });


    return Product;
};