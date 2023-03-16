module.exports = (con, sequelize) => {
  return con.define(
    "user",

    {
      id: {
        type: sequelize.DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: sequelize.DataTypes.STRING(35),
        allowNull: false,
      },
      email: {
        type: sequelize.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: sequelize.DataTypes.STRING(300),
        allowNull: false,
      },
      phone: sequelize.DataTypes.INTEGER(14),
      photo: sequelize.DataTypes.STRING(300),
    }
  );
};
