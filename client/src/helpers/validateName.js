/* eslint-disable import/prefer-default-export */
export const isValid = playerName => {
  if (playerName.length < 2 || playerName.length > 50) {
    return false;
  }

  return true;
};
