"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users", // Refers to the 'users' table
          key: "id",
        },
        onDelete: "CASCADE", // If a user is deleted, their posts will also be deleted
        onUpdate: "CASCADE",
      },
      media: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      view: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      // tagId: {
      //   allowNull: true,
      //   type: Sequelize.UUID,
      //   references: {
      //     model: "tags", // Refers to the 'tags' table
      //     key: "id",
      //   },
      //   onDelete: "SET NULL", // If a tag is deleted, set the tagId to NULL
      //   onUpdate: "CASCADE",
      // },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true, // For paranoid (soft delete) support
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("posts");
  },
};
