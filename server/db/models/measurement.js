const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Measurement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Measurement.init(
    {
      user_id: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      bust: DataTypes.INTEGER,
      waist: DataTypes.INTEGER,
      hips: DataTypes.INTEGER,
      sleeve: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Measurement',
    },
  );
  return Measurement;
};
