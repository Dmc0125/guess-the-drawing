export const convertToPercentage = (canvasSize, coordinatesPixels) => {
  const { width, height } = canvasSize;
  const { x, y } = coordinatesPixels;

  const coordinatesPercentage = {
    ...coordinatesPixels,
    x: x / width,
    y: y / height,
  };

  return coordinatesPercentage;
};

export const convertToPixels = (canvasSize, coordinatesPercentage) => {
  const { width, height } = canvasSize;
  const { x, y } = coordinatesPercentage;

  const coordinatesPixels = {
    ...coordinatesPercentage,
    x: x * width,
    y: y * height,
  };

  return coordinatesPixels;
};
