import CustomError from './customError';

export const API_URL = 'http://localhost:5000';

export const logIn = async name => {
  const res = await fetch(`${API_URL}/api/players`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  });

  await checkError(res);
};

export const getPlayers = async () => {
  const res = await fetch(`${API_URL}/api/players`);

  await checkError(res);

  const { players } = await res.json();
  return players.map(({ name }) => name);
};

export const updatePlayerID = async (name, socketId) => {
  const res = await fetch(`${API_URL}/api/players`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      socketId,
    }),
  });

  await checkError(res);
};

export const deletePlayer = async name => {
  const res = await fetch(`${API_URL}/api/players`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  });

  await checkError(res);
};

const checkError = async res => {
  if (res && !res.ok) {
    const { message } = await res.json();
    throw new CustomError(message, res.status);
  }
};
