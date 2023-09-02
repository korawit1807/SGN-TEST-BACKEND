const { Sequelize } = require("sequelize");
const config = require('./config')

console.log(config)
const sequelize = new Sequelize(config.db_url)

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