// main.js

document.getElementById("evaluate").onclick = function() {
  clearInterval(Program.execution_interval);
  Registers.reinitialize();
  Program.reinitialize();

  var code_lines = document.getElementById("main").value.split("\n");
  Parser.parse(code_lines);

  Program.execute();
}

document.getElementById("stop").onclick = function() {
  clearInterval(Program.execution_interval);
}
