export default {
  productId: {
    type: "string",
    sanitize: {
      trim: true
    }
  },
  productVariantId: {
    type: "string",
    sanitize: {
      trim: true
    }
  },
  userId: {
    type: "string",
    sanitize: {
      trim: true
    }
  },
  quantity: {
    type: "int"
  },
  code: {
    type: "string",
    sanitize: {
      trim: true,
      escape: true
    }
  },
  description: {
    type: "string",
    sanitize: {
      trim: true,
      escape: true
    }
  },
  picture: {
    type: "string",
    sanitize: {
      trim: true
    }
  },
  released: {
    type: "string",
    sanitize: {
      trim: true
    }
  }
};
