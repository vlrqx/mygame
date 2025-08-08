'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate({Theme}) {
      this.belongsTo(Theme, { foreignKey: 'themeId' });
    }
  }
  Question.init({
    name: DataTypes.STRING,
    answer: DataTypes.STRING,
    points: DataTypes.INTEGER,
    themeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};