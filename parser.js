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
  parse: function(program_text) {
    var data_element, text_element;

    // Split the data elements from the text elements
    if(program_text.indexOf(".data") < program_text.indexOf(".text")) {
      // Data is defined before program

      var regex = /.*\.data\s+(.*)\s+\.text.*/;
      data_element = program_text.split(".text")[0].replace(".data", "");
      text_element = program_text.split(".text")[1];
    } else {
      // Program is defined before data

      var regex = /.*\.text\s+(.*)\s+\.data.*/;
      text_element = program_text.split(".data")[0].replace(".text", "");
      data_element = program_text.split(".data")[1];
    }

    console.log(data_element, text_element);

    this.parse_data_element(data_element.split("\n"));
    this.parse_text_element(text_element.split("\n"));
  },

  parse_text_element(instruction_list) {
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

  parse_data_element(data_list) {
    for(var i = 0; i < data_list.length; i++) {
      // Check for a data type declaration
      var data_element = data_list[i];

      // Ignore empty lines
      if(!/\S/.test(data_element)) {
        continue;
      }

      var type, label, data;

      if(data_element.indexOf(".ascii") >= 0) {
        type = "ascii";
        label = data_element.split(".ascii")[0].trim().replace(":", "");
        data = data_element.split(".ascii")[1].trim();
      }

      if(data_element.indexOf(".asciiz") >= 0) {
        type = "asciiz";
        label = data_element.split(".asciiz")[0].trim().replace(":", "");
        data = data_element.split(".asciiz")[1].trim();
      }

      if(data_element.indexOf(".byte") >= 0) {
        type = "byte";
        label = data_element.split(".byte")[0].trim().replace(":", "");
        data = data_element.split(".byte")[1].trim().split(",");
      }

      if(data_element.indexOf(".halfword") >= 0) {
        type = "halfword";
        label = data_element.split(".halfword")[0].trim().replace(":", "");
        data = data_element.split(".halfword")[1].trim().split(",");
      }

      if(data_element.indexOf(".word") >= 0) {
        type = "word";
        label = data_element.split(".word")[0].trim().replace(":", "");
        data = data_element.split(".word")[1].trim().split(",");
      }

      console.log(label, type, data);

      switch(type) {
        case "ascii":
          break;

        case "asciiz":
          break;

        case "byte":
          Memory.labels[label] = Memory.location;
          Memory.byte.add(data);
          break;

        case "halfword":
          Memory.labels[label] = Memory.location;
          Memory.halfword.add(data);
          break;

        case "word":
          Memory.labels[label] = Memory.location;
          Memory.word.add(data);
          break;

        default:
          console.log("oh no");
      }
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
          if(parseInt(arguments[i]) > 0xffff) {
            console.log("Error: immediate value cannot be greater than 0xffff (65535).");
          } else {
            converted_array.push(parseInt(arguments[i]));
          }
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
