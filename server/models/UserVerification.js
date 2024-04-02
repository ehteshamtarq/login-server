const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userVerificationSchema = new schema(
  {
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiredAt: Date
  },
  
);

const UserVerification = mongoose.model('UserVerification', userVerificationSchema);
module.exports = UserVerification;