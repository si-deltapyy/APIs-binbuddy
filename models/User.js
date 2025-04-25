module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      },
      banksampah_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Banksampah',
          key: 'id',
        }
      },
    }, {
      tableName: 'users',
      timestamps: true,
      underscored: true
    });
      
    return User;
  };
  