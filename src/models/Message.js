const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  type: {
    type: String,
    enum: ['USER', 'SYSTEM'],
    required: true,
  },
  message: {
    type: Object,
    required: true,
  },

}, {
  timestamps: true,
  versionKey: false,
});

const Message = model('message', messageSchema, 'message');

module.exports = {
  Message,
};
