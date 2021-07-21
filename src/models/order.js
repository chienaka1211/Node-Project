'use strict';
const {Sequelize, DataTypes, Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Order extends Model {

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }

    Order.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        order_code: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'unpaid'
        },
        total_price: {
            type: DataTypes.DECIMAL(10, 2)
        },
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'Order'
    });


    return Order;
};