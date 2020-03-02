import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'deliveries',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Recipient, { foreignKey: 'recipient_id' });
    this.belongsTo(models.DeliveryMan, { foreignKey: 'deliveryman_id' });
    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });

    this.hasMany(models.DeliveryProblem, { foreignKey: 'delivery_id' });
  }
}

export default Delivery;
