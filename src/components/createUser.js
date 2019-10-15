import axios from 'axios';

let userInfos = {
  username: null,
  password: null
}

let createUser = {
    adding: (username, password) => {      
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: 'http://localhost:4000/users',
          data: {
            username: username,
            password: password
          }
        }).then(result => {
            userInfos = {
              username: username,
              password: password
            }
            resolve();
          })
          .catch(error => 
            {
              console.log(error);
              console.log(username);
              console.log(password);
              reject();
            }
          )
      });
    },
    getAxiosAuth: () => {
      return {
        data: userInfos
      }
    } 
}

export default createUser;