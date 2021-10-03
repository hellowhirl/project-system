module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define("Reviews", {
    comment_body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Employees",
        key: "id",
      },
    },
    revieweeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Employees",
        key: "id",
      },
    },
    completed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Reviews.associate = (models) => {
    Reviews.belongsTo(models.Employees, {
      as: "reviewer",
      type: DataTypes.STRING,
      foreignKey: "reviewerId",
    });

    Reviews.belongsTo(models.Employees, {
      as: "reviewee",
      type: DataTypes.STRING,
      foreignKey: "revieweeId",
    });
  };

  return Reviews;
};
