const userData = new Array(22);
const userDefault = [50, 400, 1, 0, 100, 0, 100, 0, 100, 50, 50,
  50, 50, 0, 15, 0, 0, 0, 0, -50, -50, 50];

node = document.querySelector(".display");

showScreen = function (idTag, param) {
  nodeList = document.querySelectorAll(idTag);
  for (i = 0; i < nodeList.length; i++) nodeList[i].style.display = param;
};

rndColor = function (redMin, redMax, greenMin, greenMax, blueMin, blueMax) {
  return (
    "rgb(" +
    (Math.round(Math.random() * (redMax - redMin) + redMin) + "%," +
      (Math.round(Math.random() * (greenMax - greenMin)) + greenMin) + "%," +
      (Math.round(Math.random() * (blueMax - blueMin)) + blueMin)) + "%)"
  );
};

borderRadius = function (topLeft, topRight, botRight, botLeft) {
  return (topLeft / 2 + "% " + topRight / 2 + "% " +
    botRight / 2 + "% " + botLeft / 2 + "% ");
};

dinamSize = function (step, boxQty, startSize) {
  return startSize - (startSize / boxQty) * (step - 1) + "px";
};

setFullScreen = function (fullScreenState, startSize) {
  if (fullScreenState === 1)
    if (document.body.clientWidth > document.body.clientHeight)
      startSize = document.body.clientHeight - 16;
    else startSize = document.body.clientWidth - 16;
  return startSize;
};

setData = function (idTag, data) {
  nodeList = document.querySelectorAll(idTag);
  for (i = 0; i < nodeList.length; i++) {
    nodeList[i].value = data[i];
  }
};

setRndData = function (idTag, data) {
  data[0] = Number.parseInt(Math.round(Math.random() * 500));
  data[1] = Number.parseInt(Math.round(Math.random() * 150 + 50));
  data[2] = 0;
  data[3] = 0;
  data[4] = 100;
  data[5] = 0;
  data[6] = 100;
  data[7] = 0;
  data[8] = 100;
  data[9] = Number.parseInt(Math.round(Math.random() * 100));
  data[10] = Number.parseInt(Math.round(Math.random() * 100));
  data[11] = Number.parseInt(Math.round(Math.random() * 100));
  data[12] = Number.parseInt(Math.round(Math.random() * 100));
  data[13] = 0;
  data[14] = 15;
  data[15] = 0;
  data[16] = 0;
  data[17] = Number.parseInt(Math.round(Math.random() * 180));
  data[18] = 0;
  data[19] = -50;
  data[20] = Number.parseInt(Math.round(Math.random() * 800 - 400));
  data[21] = Number.parseInt(Math.round(Math.random() * 800 - 400));
  setData(idTag, data);
};

startRnd = function (idTag, data) {
  window.location.reload();
  setRndData(idTag, data);
  btn_start.onclick();
};

getUserData = function (idTag, data) {
  nodeList = document.querySelectorAll(idTag);

  for (i = 0; i < nodeList.length; i++) {
    data[i] = Number.parseInt(nodeList[i].value);
    localStorage.setItem(i, data[i]);
  }
};

setStartSize = function (node, startSize) {
  node.style.width = node.style.height = startSize + "px";
};

setBorderRadius = function (node, topLeft, topRight, botRight, botLeft) {
  node.style.borderRadius = borderRadius(topLeft, topRight, botRight, botLeft);
};

setTransformRotateTranslate = function (node, Angle, ShifX, ShiftY) {
  node.style.transform =
    "rotate(" + Angle + "deg)" + "translate(" + ShifX + "%" + "," + ShiftY + "%)";
};

setBlackWhite = function (node, blackWhiteState) {
  node.style.filter = "grayscale(" + blackWhiteState + ")";
};

startBoxes = function (i, boxQty, startSize, Angle, ShifX, ShiftY) {
  while (i <= boxQty) {
    newDiv = document.createElement("div");
    node.appendChild(newDiv);
    newDiv.className = "main";
    newDiv.id = "box" + i;
    newDiv.style.width = newDiv.style.height = dinamSize(i, boxQty, startSize);
    newDiv.style.transform = setTransformRotateTranslate(newDiv, Angle * i, ShifX, ShiftY);
    i++;
  }
  return;
};

setRunTime = function (time) {
  return (runTime = new Date().getTime() + time * 1000);
};

circle = function (boxQty) {
  for (j = 1; j <= boxQty; j++) {
    document.querySelector("#box" + j).style.backgroundColor = rndColor(
      userData[3],
      userData[4],
      userData[5],
      userData[6],
      userData[7],
      userData[8]
    );
  }
  i++;
};

colorBoxes = function (boxQty, delay) {
  setTimeout(() => {
    if (new Date().getTime() < runTime) {
      circle(boxQty);
      colorBoxes(boxQty, delay);
    }
  }, delay);
};

showScreen(".modal", "block");

setData(".input_box", localStorage);

showScreen("#btn_restart", "none");


btn_start.onclick = function () {
  getUserData(".input_box", userData);

  showScreen("#btn_restart", "block");

  showScreen(".modal", "none");

  userData[1] = setFullScreen(userData[2], userData[1]);

  setStartSize(node, userData[1]);

  setBorderRadius(
    node,
    userData[9],
    userData[10],
    userData[11],
    userData[12]
  );

  setTransformRotateTranslate(
    node,
    userData[16],
    userData[18],
    userData[19]
  );

  setBlackWhite(node, userData[15]);

  startBoxes(
    1,
    userData[0],
    userData[1],
    userData[17],
    userData[20],
    userData[21]
  );

  setRunTime(userData[14]);

  colorBoxes(
    userData[0],
    userData[13],
    userData[3],
    userData[4],
    userData[5],
    userData[6],
    userData[7],
    userData[8]
  );
};