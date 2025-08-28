export default {
  userId: {
    type: "string",
    sanitize: {
      trim: true,
      lowercase: true
    }
  }
};
