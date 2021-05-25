const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      unique: true,
      required: true,
    },
    number: {
      type: String,
      minlength: 8,
      required: true,
    },
  },
  { timestamps: true }
);
contactSchema.plugin(uniqueValidator);

contactSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  },
});

module.exports = mongoose.model("Person", contactSchema);
