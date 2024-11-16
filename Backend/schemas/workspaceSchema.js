const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const WorkspaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: Array,
    },
  },
  { unique: true, index: { fields: ["uid", "name"] } }
);

module.exports = model("workspaces", WorkspaceSchema);