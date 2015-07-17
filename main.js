// main.js

// Parser.parse(Test.command_list);

document.getElementById("evaluate").onclick = function() {
  Registers.reinitialize();
  Program.reinitialize();

  var code_lines = document.getElementById("main").value.split("\n");
  Parser.parse(code_lines);

  Program.execute();

  // Update HTML indicated values of each register & PC
  for(var i = 0; i < register_array.length; i++) {
    document.getElementById(register_array[i]).innerHTML = Numbers.to_hex_string(Registers[register_array[i]].value);
  }
}
