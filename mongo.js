const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model("Person", contactSchema);

if (process.argv.length === 3) {
  Person.find({}).then((people) => {
    console.log("phonebook:");
    people.forEach((person) => {
      console.log(person.name, person.number);
    });
    process.exit(1);
  });
}

if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];
  const newPerson = { name, number };
  new Person(newPerson).save().then(() => {
    console.log(`added ${name} number ${number} to phonbook`);
    mongoose.connection.close();
    process.exit(1);
  });
}

// const person = new Note({
//   name: "Ola Bidmus",
//   number: +2344567867,
//   date: new Date(),
//   important: true,
// });

// person.save().then((result) => {
//   console.log("person saved!");
//   mongoose.connection.close();
// });
