module.exports = (sequelize, DataTypes) => {
    const Balance = sequelize.define('Balance', {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      }
    }, {
      tableName: 'balances',
      underscored: true
    });
  
    Balance.associate = (models) => {
      Balance.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    };
  
    return Balance;
  };
  