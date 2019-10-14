import axios from 'axios';

let userInfo = {
  username: null,
  password: null
}

let Auth = {
    authenticate: (username, password) => {      
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: 'http://localhost:4000/users/:id',
          auth: {
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
        auth: userInfo
      }
    } 
}

export default Auth;