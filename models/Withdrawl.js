module.exports = (sequelize, DataTypes) => {
    const withdraw = sequelize.define('Withdraw', {
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('credit', 'debit', 'system'),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }, 
    },{
      tableName: 'withdrawls',
      timestamps: true,
      underscored: true
    });

    withdraw.associate = (models) => {
        withdraw.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    };
  
    return withdraw;
  };
  