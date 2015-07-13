// parser.js

var Parser = {
  parse: function(command_list) {
    for(var i = 0; i < command_list.length; i++) {
      command_elements = command_list[i].split(" ");

      if(valid_instruction_list.indexOf(command_elements[0]) < 0) {
        // Error case - command invalid
        console.log("Error: " + command_elements[0] + " is not a valid command.");
      } else {
        console.log(command_elements[0] + " is a valid command.");
      }
    }
  }
};
