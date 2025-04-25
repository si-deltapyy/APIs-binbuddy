module.exports = (sequelize, DataTypes) => {
    const WasteItem = sequelize.define('WasteItem', {
      name: DataTypes.STRING,
      unit: DataTypes.STRING
    }, {
      tableName: 'waste_items',
      timestamps: true,
      underscored: true
    });
  
    WasteItem.associate = (models) => {
      WasteItem.belongsTo(models.WasteCategory, { foreignKey: 'category_id' });
      WasteItem.hasMany(models.WastePrice, { foreignKey: 'waste_item_id' });
    };
  
    return WasteItem;
  };
  