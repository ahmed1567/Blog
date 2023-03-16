module.exports = (con, sequelize) => {
  return con.define(
    "post",

    {
      id: {
        type: sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      describtion: sequelize.DataTypes.STRING(1234),
      details: sequelize.DataTypes.TEXT,
      category:sequelize.DataTypes.STRING(300),
      photo: sequelize.DataTypes.STRING(300),
      year: sequelize.DataTypes.INTEGER(50),
      month: sequelize.DataTypes.INTEGER(50),
    }
  );
};
