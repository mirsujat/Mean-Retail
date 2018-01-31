var mongoose = require('mongoose');

module.exports = function (mongoose){
  var user = {
  profile: {
    username: {
      type: String,
      required: true,
      lowercase: true
    },
    email: { type: String, unique: true },
    picture: {
      type: String,
      required: true,
      match: /^http:\/\//i
    }
  },
  password: String,
  isActive: String,
  timeCreated: { type: Date, default: Date.now },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  search: [String],
  data: {
    oauth: { type: String, required: true },
    cart: [{
      product: {
        type: mongoose.Schema.Types.ObjectId
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }]
    }
   };
  
    var userSchema = new mongoose.Schema(user);
      
    userSchema.statics.encryptPassword = function(password, done) {
    var bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function(err, salt) {
        if(err) {
          return done(err);
        }

        bcrypt.hash(password, salt, function(err, hash) {
         done(err, hash);
        });
     });
    };

    userSchema.statics.validatePassword = function(password, hash, done) {
    var bcrypt = require('bcryptjs');
        bcrypt.compare(password, hash, function(err, res) {
          done(err, res);
        });
    };

    userSchema.index({ username: 1 }, { unique: true });
    userSchema.index({ email: 1 }, { unique: true });
    userSchema.index({ timeCreated: 1 });
    userSchema.index({ 'facebook.id': 1 });
    userSchema.index({ 'google.id': 1 });
    userSchema.index({ search: 1 });
    
    userSchema.set('toObject', { virtuals: true });
    userSchema.set('toJSON', { virtuals: true });

    return mongoose.model('User', userSchema, 'users');
};


