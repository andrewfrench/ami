// main.js

// Parser.parse(Test.command_list);

document.getElementById("evaluate").onclick = function() {
  var code_lines = document.getElementById("main").value.split("\n");
  Parser.parse(code_lines);

  for(var i = 0; i < register_array.length; i++) {
    document.getElementById(register_array[i]).innerHTML = Registers[register_array[i]].value;
    console.log(register_array[i] + ": " + Registers[register_array[i]].value);
  }
}
