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
  }
};
