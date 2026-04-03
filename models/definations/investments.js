module.exports = (sequelize, DataTypes) => {
   const Investments = sequelize.define(
     "Investments",
     {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      }
     }
   );
   return Investments;
 };