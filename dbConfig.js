const { Sequelize } = require('sequelize');
const db = new Sequelize("test_ims_invt", "test_imsUser", "9$@ZeUB0@070", {
    host: "207.180.216.86",
    dialect: "mysql",
});

module.exports = { db: db }