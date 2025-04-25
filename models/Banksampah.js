module.exports = (sequelize, DataTypes) => {
  const Banksampah = sequelize.define('BankSampah', {
    name: DataTypes.STRING,
    chief_name: DataTypes.STRING,
    address: DataTypes.TEXT,
    location_latitude: DataTypes.FLOAT,
    location_longitude: DataTypes.FLOAT,
    phone_number: DataTypes.STRING,
  }, {
    tableName: 'banksampah',
    timestamps: true,
    underscored: true
  });

  Banksampah.associate = (models) => {
    Banksampah.hasMany(models.Customer, { foreignKey: 'banksampah_id' });
    Banksampah.hasMany(models.User, { foreignKey: 'banksampah_id' });
  };

  return Banksampah;
};
