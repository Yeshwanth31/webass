const notes = [
    {
      userId: 101,
      noteId: 111,
      noteContent: 'I love movies',
    },
    {
      userId: 201,
      noteId: 222,
      noteContent: 'I love playing',
    },
    {
      userId: 301,
      noteId: 333,
      noteContent: 'I love roaming',
    },
    {
      userId: 401,
      noteId: 444,
      noteContent: 'I love myself',
    },

  ];

  let getNote = () => notes;
  module.exports = { getNote };