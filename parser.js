// parser.js

/*

TODO:
- Parse registers numerically with help of argument_format and register name array
- High-level parsing of memory elements (Data storage starts at 0x10010000)
- Add warnings for recommended program elements
  - Not including main: at beginning of program
  - Not correctly exiting program
  - Immediate values larger than 16 bits
  - Etc.
- .global?
- Tabs allowing separation of subroutines (oy)

*/

var Parser = {
  parse: function(instruction_list) {

    // Inspect each argument in order
    for(var i = 0; i < instruction_list.length; i++) {

      // Remove commented out portions of lines
      var comment_delimited_chunks = instruction_list[i].split("#");

      // Only keep portions to the left of any comment delimiters.
      instruction_list[i] = comment_delimited_chunks[0];

      // Split labels from instructions that share a line
      var label_chunks = instruction_list[i].split(":");

      if(label_chunks.length > 1) {
        Program.add_label(label_chunks[0]);
        instruction_list[i] = label_chunks[1];
      }

      // Pad commas with at least one confirmed space
      instruction_list[i] = instruction_list[i].replace(/,/g, ", ");

      // Confirm that each line contains non-whitespace characters
      if(/\S/.test(instruction_list[i])) {
        var instruction_elements = instruction_list[i].match(/\S+/g);
      } else {
        continue;
      }

      // Remove commas from instruction, instruction delimited by whitespace.
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
      var converted_arguments = this.convert_arguments(instruction_elements[0], instruction_arguments);

      Program.add_instruction({
        instruction: instruction_elements[0],
        arguments: converted_arguments
      });
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

  convert_arguments: function(instruction, arguments) {
    /*
     * Converts register identifiers to register objects, parses
     * immediates, and parses labels for use by instructions.
     */

    var converted_array = [];
    var format_array = Instructions[instruction].argument_format.split("");
    for(var i = 0; i < format_array.length; i++) {
      switch(format_array[i]) {
        case "r":
          // Add the register object to the array
          converted_array.push(Registers[arguments[i]]);
          break;

        case "i":
          // Add the immediate value to the array without alteration
          converted_array.push(parseInt(arguments[i]));
          break;

        case "l":
          // Parse labels
          converted_array.push(parseInt(Program.labels[arguments[i]]));
          break;

        default:
          console.log("Error: malformed argument format string.");
      }
    }
    return converted_array;
  }
};
