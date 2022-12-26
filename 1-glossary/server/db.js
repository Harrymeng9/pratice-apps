require("dotenv").config();
const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://localhost/glossary')
// 2. Set up any schema and models needed by the app
const glossarySchema = new mongoose.Schema({
  term: String,
  definition: String,
});

const Glossary = mongoose.model('Glossary', glossarySchema);
// 3. Export the models

var save = (body) => {
  const termDef = new Glossary({ term: body.term, definition: body.definition })
  return termDef.save();
};

var get = () => {
  return Glossary.find();
};

var checkExist = (termInput) => {
  return Glossary.count({ 'term': termInput });
};

var searchRecord = (termInput) => {

  // return Glossary.find();
  return Glossary.find({term: {$regex: termInput, $options: 'i'}});
};

var updateRecord = (termInput, definitionInput) => {
  return Glossary.findOneAndUpdate({ term: termInput }, { definition: definitionInput });
};

var deleteRecord = (termInput) => {
  return Glossary.deleteOne({ 'term': termInput })
};

module.exports.save = save;
module.exports.get = get;
module.exports.checkExist = checkExist;
module.exports.searchRecord = searchRecord;
module.exports.updateRecord = updateRecord;
module.exports.deleteRecord = deleteRecord;
// 4. Import the models into any modules that need them
