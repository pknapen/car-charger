import axios from 'axios';

let userInfo = {
  username: null,
  password: null
}

let createUser = {
    adding: (username, password) => {      
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:4000/users',
          user: {
            username: username,
            password: password
          }
        }).then(result => {
            userInfo = {
              username: username,
              password: password
            }
            resolve();
          })
          .catch(error => 
            {
              console.log(error);
              reject();
            }
          )
      });
    },
    getAxiosAuth: () => {
      return {
        user: userInfo
      }
    } 
}

export default createUser;