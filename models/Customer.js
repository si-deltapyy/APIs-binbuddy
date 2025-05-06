module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.TEXT
    }, {
      tableName: 'customers',
      timestamps: true,
      underscored: true
    });
  
    Customer.associate = (models) => {
      Customer.belongsTo(models.BankSampah, { foreignKey: 'bank_sampah_id' });
      Customer.hasMany(models.Transaction, { foreignKey: 'customer_id' });
      Customer.hasMany(models.Withdraw, { foreignKey: 'customer_id' });
    };
  
    return Customer;
  };
  