const Joi = require('joi');
const express = require('express');
const app =express();
app.use(express.json());

const genres = [
  {id: 1, name: 'Action'},
  {id: 2, name: 'Comedy'},
  {id: 3, name: 'Drama'},
  {id: 4, name: 'Horror'},
  {id: 5, name: 'Fantasy'},
];
app.get('/', (req,res) => {
  res.send('Hi There!!');
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req,res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send('The genre with the given ID was not found.');
  }
  return res.send(genre);
});

app.post('/api/genres', (req, res) => {
  const {error} = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message); 

  const genre = {
    id: genres.length + 1, 
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

const {error} = validateGenre(req.body); 
 if (error) return res.status(400).send(error.details[0].message);
 
 genre.name = req.body.name;
 res.send(genre)
});
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).required()
 };
 return Joi.validate(genre, schema);
};

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));