// parser.js

var Parser = {
  parse: function(instruction_list) {

    // Inspect each argument in order
    for(var i = 0; i < instruction_list.length; i++) {
      var instruction_elements = instruction_list[i].split(" ");

      this.strip_commas_from_instruction(instruction_elements);

      if(!this.check_instruction_validity(instruction_elements[0])) {
        continue;
      }

      if(!this.check_instruction_implementation(instruction_elements[0])) {
        continue;
      }

      if(!this.check_instruction_arguments(instruction_elements)) {
        continue;
      }

      // Create array for instruction arguments
      var instruction_arguments = [];

      // Extract arguments from instruction
      for(var k = 1; k < instruction_elements.length; k++) {
        instruction_arguments.push(instruction_elements[k]);
      }

      // Convert arguments to registers
      var instruction_registers = this.convert_arguments_to_registers(instruction_elements[0], instruction_arguments);

      Instructions[instruction_elements[0]].operation(instruction_registers);
    }
  },

  strip_commas_from_instruction: function(instruction_elements) {
    // Remove commas from instruction
    for(var j = 0; j < instruction_elements.length; j++) {
      instruction_elements[j] = instruction_elements[j].replace(",", "");
    }
  },

  check_instruction_validity: function(instruction) {
    // Check that the instruction is valid and recognized
    if(valid_instruction_list.indexOf(instruction) < 0) {
      console.log(instruction + " is not a valid instruction.");
      return false;
    }
    return true;
  },

  check_instruction_implementation: function(instruction) {
    // Check that instruction has been implemented before evaluating
    if(Instructions[instruction] == undefined) {
      console.log(instruction + " has not yet been implemented.");
      return false;
    }
    return true;
  },

  check_instruction_arguments: function(instruction_elements) {
    // Check that the correct number of arguments have been supplied
    if(instruction_elements.length - 1 != Instructions[instruction_elements[0]].arguments) {
      console.log(instruction_elements[0] + ": incorrect number of arguments.");
      return false;
    }
    return true;
  },

  convert_arguments_to_registers: function(instruction, arguments) {
    var register_array = [];
    var format_array = Instructions[instruction].argument_format.split("");
    for(var i = 0; i < format_array.length; i++) {
      switch(format_array[i]) {
        case "r":
          register_array.push(Registers[arguments[i]]);
          break;

        default:
          console.log("Error: malformed argument format string.");
      }
    }
    return register_array;
  }
};