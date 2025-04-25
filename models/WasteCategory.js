module.exports = (sequelize, DataTypes) => {
    const WasteCategory = sequelize.define('WasteCategory', {
      name: DataTypes.STRING
    }, {
      tableName: 'waste_categories',
      timestamps: true,
      underscored: true
    });
  
    WasteCategory.associate = (models) => {
      WasteCategory.hasMany(models.WasteItem, { foreignKey: 'category_id' });
    };
  
    return WasteCategory;
  };
  