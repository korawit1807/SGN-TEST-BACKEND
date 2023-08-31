module.exports = class covidGet {
    constructor() {
      // set constructor
    }

    async get(req, res) {
      return res.json({topic: req.originalUrl})
    }
  }