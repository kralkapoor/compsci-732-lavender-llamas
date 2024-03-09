const axios = require('axios');

const data = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  password: 'password',
  location: 'New York',
  gender: 'Male'
};

axios.post('http://localhost:3006/registration/registerNewUser', data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
