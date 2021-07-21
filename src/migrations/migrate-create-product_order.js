'use strict';


module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Product_Order', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idOrder: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            idProduct: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            quantity: {

                type: Sequelize.INTEGER
            },
            salePrice: {
                type: Sequelize.DECIMAL(10, 2),
            },
            totalPrice: {
                type: Sequelize.DECIMAL(10, 2)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Product_Order');
    }
};