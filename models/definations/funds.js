 module.exports = (sequelize, DataTypes) => {
    const Fund = sequelize.define(
      "Fund",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }
    );
    return Fund;
};