const users = [
    {
      userId: 101,
      userName: 'Joe',
      emailId: 'joe@gmail.com',
      password: 'joe@31',
    },
    {
      userId: 202,
        userName: 'kevin',
        emailId: 'kevin@gmail.com',
        password: 'kevin@31',
    },
    {
      userId: 303,
        userName: 'mike',
        emailId: 'mike@gmail.com',
        password: 'mike@31',
    },
    {
        userId: 401,
          userName: 'pat',
          emailId: 'pat@gmail.com',
          password: 'pat@31',
      },

  ];

  let getUsers = () => users;
  module.exports = { getUsers };
