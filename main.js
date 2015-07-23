// main.js

/*

TODO:
- Add structure to pause execution
- Add structure to execute a single instruction while paused

*/

document.getElementById("evaluate").onclick = function() {
  clearInterval(Program.execution_interval);
  Registers.reinitialize();
  Program.reinitialize();

  // var code_lines = document.getElementById("main").value.split("\n");
  Parser.parse(document.getElementById("main").value);

  Program.execute();
}

document.getElementById("stop").onclick = function() {
  clearInterval(Program.execution_interval);
}
