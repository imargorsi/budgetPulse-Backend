module.exports = (sequelize, DataTypes) => {
   const Investments = sequelize.define(
     "Investments",
     {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fundId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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