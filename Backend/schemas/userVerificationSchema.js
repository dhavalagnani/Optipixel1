const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const UserVerificationSchema = new Schema(
    {
        "uid" : String,
        "uString" : String,
        "createdAt" : Date,
        "expiresAt" : Date 
    }
)

module.exports = model("user-verifications", UserVerificationSchema);