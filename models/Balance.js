module.exports = (sequelize, DataTypes) => {
    const Balance = sequelize.define('Balance', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
    }, {
      tableName: 'balances',
      underscored: true
    });
  
    Balance.associate = (models) => {
      Balance.belongsTo(models.User, { foreignKey: 'user_id' });
    };
  
    return Balance;
  };
  