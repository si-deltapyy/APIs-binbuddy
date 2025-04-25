module.exports = (sequelize, DataTypes) => {
    const WastePrice = sequelize.define('WastePrice', {
      price_per_kg: DataTypes.DECIMAL,
      effective_date: DataTypes.DATEONLY
    }, {
      tableName: 'waste_prices',
      timestamps: true,
      underscored: true
    });
  
    WastePrice.associate = (models) => {
      WastePrice.belongsTo(models.WasteItem, { foreignKey: 'waste_item_id' });
    };
  
    return WastePrice;
  };
  