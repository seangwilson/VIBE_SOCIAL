const mongoose = require("mongoose");

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://cartridgebros:X212DmkWM6D7Gvxa@vibesocialcluster.1opfnb7.mongodb.net/?retryWrites=true&w=majority")
        .then(() => {
            console.log("database connection successful");
        })
        .catch(() => {
            console.log("database connection error");
        })
    }
}

module.exports = new Database();