require("dotenv").config();
import express from "express";
import morgan from "morgan";
const app = express();
const Person = require("./models/person");
const mongoose = require("mongoose");
const { dbUrl } = require("./utils/config");

const cors = require("cors");

app.use(cors());

app.disable("x-powered-by");
app.use(express.json());

morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// let persons = [
//   { id: 1, name: "Arto Hellas", number: "040-123456" },
//   { id: 2, name: "Ada Lovelace", number: "39-56-334578" },
//   { id: 3, name: "Dan Abramov", number: "12-34-890763" },
//   { id: 4, name: "Mary Poppendicek", number: "23-67-123456" },
// ];

// // const generateId = (length=4) => Math.random().toString(36).substring(2,2+length)
// const generateId = () =>
//   persons.length ? Math.max(...persons.map((person) => person.id)) + 1 : 1;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/persons", (req, res) => {
  // res.json(persons);
  Person.find({})
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      res.send(`<p>Phonebook has info for ${count} people</p> 
    <h4>${new Date()}</h4>
    `);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Person.findById(id)
    .then((contact) => {
      if (contact) return res.send(contact);
      else return res.status(404).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res) => {
  let newContact = req.body;
  if (!newContact.name || !newContact.number)
    return res.status(400).send(`name / number not supplied`);
  new Person(newContact)
    .save()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(500).end();
    });
});

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  const personUpdate = req.body.number;
  Person.findByIdAndUpdate(id, { number: personUpdate }, { new: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", async (req, res) => {
  const { name, number } = req.body;
  if (!name || !number)
    return res.status(400).json({ error: "name/number must be supplied!" });
  // const personExist = persons.some(
  //   (person) => person.name.toLowerCase() === name.toLowerCase()
  // );
  const personExist = await Person.findOne({ name });
  if (personExist)
    return res.status(409).json({ error: "name must be unique" });
  console.log("i got here");

  let newPerson = new Person({
    // id: generateId(),
    name,
    number,
  });

  newPerson = await newPerson.save();
  return res.json(newPerson);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
