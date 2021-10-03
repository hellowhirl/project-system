module.exports = (sequelize, DataTypes) => {
  const Employees = sequelize.define("Employees", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Employees.associate = (models) => {
    Employees.hasMany(models.Reviews, {
      type: DataTypes.STRING,
      foreignKey: "reviewerId",
    });

    Employees.hasMany(models.Reviews, {
      type: DataTypes.STRING,
      foreignKey: "revieweeId",
    });
  };

  return Employees;
};
