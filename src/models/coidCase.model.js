const {  DataTypes } = require('sequelize');
const { sequelize } = require('../connect')
const moment = require('moment')
const covidCase = sequelize.define('covid_case', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
            try {
                let date = this.getDataValue('date');
                date = new Date(date);
                date = moment(date).format("YYYY-MM-DD")
                return date ?? null
            } catch (error) {
                return null
            }
        }
    },
    value: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    color: {
        type: DataTypes.STRING
    }
}, {
    indexes: [
        {
            unique: false,
            fields: ['title','province', 'date']
        }
    ]
});

covidCase.sync({ alter: true });

module.exports = covidCase