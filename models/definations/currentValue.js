module.exports = (sequelize, DataTypes) => {
   const CurrentValue = sequelize.define(
     "CurrentValue",
     {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      current_value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      }
    }
);
   return CurrentValue;
 }