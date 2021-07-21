'use strict';
import db from "./index";

const {Sequelize, DataTypes, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product_Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }

    Product_Category.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        product_id: {
            type: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        category_id: {

            type: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            references: {
                model: 'Category',
                key: 'id'
            }
        }
    }, {
        sequelize,
        underscored:true,
        timestamps: false,
        modelName: 'Product_Category',
        tableName: 'Product_Category',
    });


    return Product_Category;
};