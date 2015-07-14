// main.js

// Parser.parse(Test.command_list);

document.getElementById("evaluate").onclick = function() {
  Registers.reinitialize();

  var code_lines = document.getElementById("main").value.split("\n");
  Parser.parse(code_lines);

  for(var i = 0; i < register_array.length; i++) {
    var hex_value = Registers[register_array[i]].value.toString(16);
    hex_value = "0x" + Array(9 - hex_value.length).join("0") + hex_value;
    document.getElementById(register_array[i]).innerHTML = hex_value;
  }
}
