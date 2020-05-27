import CustomError from './customError';

export const API_URL = 'http://localhost:5000';

export const logIn = async name => {
  const res = await fetch(`${API_URL}/players`, {
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
  const res = await fetch(`${API_URL}/players`);

  await checkError(res);

  const { players } = await res.json();
  return players.map(({ name }) => name);
};

export const deletePlayer = async name => {
  const res = await fetch(`${API_URL}/players`, {
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
