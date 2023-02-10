const mongoose = require('mongoose');
const { Schema } = mongoose;
/**
 * 이름, 나이, 결혼여부, 자기소개, 생성일
 */
const chattingSchema = new Schema({
  chat_id: {
    type: Number,     // 자료형
    required: true,   // 필수 여부
    unique: true,     // 고유 값
  },

  content: {
    type: Array,
    default: [],
  },
})

module.exports = mongoose.model('chatting', chattingSchema);
