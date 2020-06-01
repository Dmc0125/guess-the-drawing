let drawer = 0;

const chooseDrawer = connections => {
  const drawerId = connections[drawer];
  console.log(drawer, drawerId);
  drawer++;

  if (drawer >= connections.length) {
    drawer = 0;
  }

  return drawerId;
};

const resetDrawer = () => {
  drawer = 0;
};

module.exports = {
  chooseDrawer,
  resetDrawer,
};
