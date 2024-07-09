const nanoid = (n) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < n; i++) {
    result += chars[Math.floor(Math.random() * 26)];
  }
  return result;
};

export const credentials = {
  username: 'workintech',
  password: 'wecandoit',
  role: 'admin',
  token: 'ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98',
};

let data;

const resetData = () => {
  data = [
    {
      id: nanoid(5),
      name: 'Rachel Green',
      age: 30,
      email: 'rachel@friends.com',
    },
    {
      id: nanoid(5),
      name: 'Joey Tribbiani',
      age: 34,
      email: 'joey@friends.com',
    },
    {
      id: nanoid(5),
      name: 'Chandler Bing',
      age: 32,
      email: 'chandler@friends.com',
    },
    {
      id: nanoid(5),
      name: 'Ross Geller',
      age: 32,
      email: 'ross@friends.com',
    },
    {
      id: nanoid(5),
      name: 'Monica Bing',
      age: 31,
      email: 'monica@friends.com',
    },
    {
      id: nanoid(5),
      name: 'Phoebe Buffay-Hannigan',
      age: 30,
      email: 'phoebe@friends.com',
    },
  ];
};

resetData();

export const getAll = () => {
  return data;
};

export const getById = (id) => {
  return data.find((d) => d.id === id);
};

export const create = (item) => {
  data.push({ id: nanoid(5), createdAt: Date(), ...item });
  return data;
};

export const login = (body) => {
  const { username, password, role, token } = credentials;

  if (username === body.username && password === body.password) {
    return {
      status: 200,
      message: 'success',
      data: {
        username,
        role,
        token,
      },
    };
  } else {
    return {
      status: 403,
      message: 'Incorrect username / password combination.',
    };
  }
};
