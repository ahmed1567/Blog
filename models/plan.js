module.exports = (con, sequelize) => {
  return con.define(
    "plan",

    {
      id: {
        type: sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      type: sequelize.DataTypes.STRING(100),
    }
  );
};
