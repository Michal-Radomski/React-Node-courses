const stateSchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    comments: {
      type: "array",
      items: [
        {
          type: "string",
        },
        {
          type: "string",
        },
      ],
    },
    auth: {
      type: "boolean",
    },
  },
  required: ["comments", "auth"],
};

export default stateSchema;
