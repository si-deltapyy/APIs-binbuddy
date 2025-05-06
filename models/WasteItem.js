module.exports = (sequelize, DataTypes) => {
    const WasteItem = sequelize.define('WasteItem', {
      name: DataTypes.STRING,
      unit: DataTypes.STRING
    }, {
      tableName: 'waste_items',
      timestamps: true,
      underscored: true
    });
  
    return WasteItem;
  };
  