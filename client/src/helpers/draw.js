const drawLine = (ctx, {
  prevX,
  prevY,
  currX,
  currY,
  color,
}) => {
  if (color === undefined) {
    color = '#000';
  }

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
};

export default drawLine;
