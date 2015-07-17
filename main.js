// main.js

// Parser.parse(Test.command_list);

document.getElementById("evaluate").onclick = function() {
  Registers.reinitialize();
  Program.reinitialize();

  var code_lines = document.getElementById("main").value.split("\n");
  Parser.parse(code_lines);

  Program.execute();


}
