module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      type: DataTypes.ENUM('deposit', 'withdrawal'),
      total_amount: DataTypes.DECIMAL,
      transaction_date: DataTypes.DATE
    }, {
      tableName: 'transactions',
      timestamps: true,
      underscored: true
    });
  
    Transaction.associate = (models) => {
      Transaction.belongsTo(models.Customer, { foreignKey: 'customer_id' });
      Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
      Transaction.hasMany(models.TransactionDetail, { foreignKey: 'transaction_id' });
    };
  
    return Transaction;
  };
  