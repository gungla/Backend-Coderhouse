const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  confirm_password: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  admin: {
    type: Boolean,
    trim: true,
    default: false,
  },
}, {
  timestamps: true,
  versionKey: false,
});

userSchema.pre('save', function (next) {
  const user = this;

  // solo hashear si la clave ha sido modificado o es nueva
  if (!user.isModified('password')) return next();

  // generar un salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (errSalt, salt) => {
    if (errSalt) return next(errSalt);

    // hashear la clave con el nuevo salt
    return bcrypt.hash(user.password, salt, (errHash, hash) => {
      if (errHash) return next(errHash);
      user.password = hash;
      user.confirm_password = hash;
      return next();
    });
  });
});

const User = model('user', userSchema, 'user');

module.exports = {
  User,
};
