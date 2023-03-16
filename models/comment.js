module.exports = (con, sequelize) => {
  return con.define(
    "comment",

    {
      id: {
        type: sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      details: sequelize.DataTypes.STRING(300),
    }
  );
};
