const express = require('express');
const morgan = require('morgan');

const app = express();

// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('dev'));

//Mod 19 Express Lesson 3 Assignments
//Assgn #1
app.get('/sum', (req,res) => {
  const a = req.query.a;
  const b = req.query.b;

  const c = Number(a) + Number(b);
  const message = `Sum of ${a} and ${b} is ${c}`
  
  res.send(message);
})

//Assgn #2
app.get('/cipher', (req,res) =>{
  const text = req.query.text; //Yusuf
  const shift = req.query.shift; // 1

  let message = '';

  for (let i=0; i< text.length; i++){
    const initialCode = text.charCodeAt(i) // 'Y' -> number
    // number + shift = cipherNumber
    const cipherNumber = initialCode + Number(shift)
    // String.fromCharCode(cipherNumber) = 'Z'
    const letter = String.fromCharCode(cipherNumber);

    // if (letter > 'Z'){
      
    // }
    message += letter;
  }

  res.send(message);
})

//Assgn #3
app.get('/lotto', (req, res) => {
  const number = req.query.number;

  let userNumbers = [];
  for (let i=0; i< number.length; i++){
    let userNumber = Number(number[i]);
    userNumbers.push(userNumber);
  }

  let randomNumbers = [];
  for (let i=0; i<6; i++){
    let randomNumber = Math.ceil(Math.random() * 20);
    randomNumbers.push(randomNumber);
  }

  let count = 0;
  for (let i=0; i<userNumbers.length; i++){
    if(randomNumbers.includes(userNumbers[i])){
      count++;
    }
  }

  res.json({ count, randomNumbers, userNumbers })
})

//This is the final request handler // Mod 19 Express Lesson 3 Exercises
app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.get('/burgers', (req, res) => {
  res.send('We have juicy burgers!')
})

app.get('/pizza/pepperoni', (req, res) => {
  res.send('Your pizza is on its way!')
})

app.get('/pizza/pineapple', (req, res) => {
  res.send('We do not serve that here. Never call again!')
})

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end();
})

app.get('/greetings', (req, res) =>{
  //1. Get values from the user
  const name = req.query.name;
  const race = req.query.race;

  //2. Validate the values
  if(!name){
    //2.a. Name was not provided
    return res.status(400).send('Please provide a name!');
  }

  if(!race){
    //2.b Race was not provided
    return res.status(400).send('Please provide a race!');
  }

  //3. Both name and race are valid, so do the processing
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom`;

  //4. Send the response
  res.send(greeting);
})

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
  Base URL: ${req.baseUrl}
  Host: ${req.hostname}
  Path: ${req.path}
  `;
  res.send(responseText);
})

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
})