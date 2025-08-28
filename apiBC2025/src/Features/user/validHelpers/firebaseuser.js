export default {
  id: {
    type: 'string',
    sanitize: {
      trim: true,
      escape: true,
      lowercase: true
    }
  },
  email: {
    type: 'string',
    sanitize: {
      trim: true,
      escape: true,
      lowercase: true
    }
  },
  name: {
    type: 'string',
    optional: true,
    sanitize: {
      trim: true,
      escape: true,
      lowercase: true
    }
  },
  picture: {
    type: 'string',
    optional: true,
    sanitize: {
      trim: true,
      escape: true
    }
  }
}
