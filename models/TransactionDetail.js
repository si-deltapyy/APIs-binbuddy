module.exports = (sequelize, DataTypes) => {
    const TransactionDetail = sequelize.define('TransactionDetail', {
      weight: DataTypes.DECIMAL,
      price_per_kg: DataTypes.DECIMAL,
      subtotal: DataTypes.DECIMAL
    }, {
      tableName: 'transaction_details',
      timestamps: true,
      underscored: true
    });
  
    TransactionDetail.associate = (models) => {
      TransactionDetail.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
      TransactionDetail.belongsTo(models.WasteItem, { foreignKey: 'waste_item_id' });
    };
  
    return TransactionDetail;
  };
  