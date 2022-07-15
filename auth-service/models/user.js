const mongoose = require('mongoose')

const creatDate = new Date ();
const expDate = new Date ();
expDate.setDate(creatDate.getDate() + 30);
let subDays = 30;
let daysleft = expDate.getUTCDay() - creatDate.getUTCDay() + 29;

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expDate: {
    type: Date,
    default: expDate
  },
  daysleft: {
    type: String,
    default: daysleft
  },
})

module.exports = mongoose.model('user', UserSchema)