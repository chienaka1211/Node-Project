'use strict';
import db from "./index";

const {Sequelize, DataTypes, Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product_Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }

    Product_Order.init({
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
        order_id: {

            type: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            references: {
                model: 'Order',
                key: 'id'
            }
        },
        quantity: DataTypes.INTEGER,
        original_price: DataTypes.DECIMAL(10, 2),
        total_price: DataTypes.DECIMAL(10, 2),

    }, {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'Product_Order',
        tableName: 'Product_Order',
    });


    return Product_Order;
};