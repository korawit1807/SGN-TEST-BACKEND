const { Sequelize } = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB)

const checkDBConnect =  async () => {
    try {
      await sequelize.authenticate();
      console.log("DB Connect Success");
    } catch (error) {
      console.error("DB Connect fails : ", error);
    }
};

module.exports = {
    sequelize,
    checkDBConnect
}