import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;
const uuid = require('uuid');

export default class form_payment extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    fopa_id: {
      defaultValue: uuid.v4,
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    fopa_user_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    fopa_cart_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'carts',
        key: 'cart_id'
      }
    },
    fopa_payment_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'payment_method',
        key: 'payment_id'
      }
    }
  }, {
    sequelize,
    tableName: 'form_payment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "fopa_id_pk",
        unique: true,
        fields: [
          { name: "fopa_id" },
        ]
      },
    ]
  });
  }
}
