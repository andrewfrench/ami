// main.js

/*

TODO:


*/

document.getElementById("clear").onclick = function() {
  Program.exit();
  Registers.reinitialize();
  Program.reinitialize();
  Memory.reinitialize();
  // console.clear();
}

document.getElementById("evaluate").onclick = function() {
  Program.exit();
  Registers.reinitialize();
  Program.reinitialize();
  Memory.reinitialize();
  // console.clear();

  Parser.parse(document.getElementById("main").value);

  Program.enter_loop();
};

document.getElementById("stop").onclick = function() {
  Program.exit();
};

document.getElementById("step").onclick = function() {
  Program.step();
};

document.getElementById("pause").onclick = function() {
  Program.pause();
};
