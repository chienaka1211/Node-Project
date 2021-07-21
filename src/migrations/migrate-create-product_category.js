
'use strict';


module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Product_Category', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            idProduct: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            idCategory: {
                allowNull: false,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Product_Category');
    }
};