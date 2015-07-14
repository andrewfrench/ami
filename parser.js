// parser.js

var Parser = {
  parse: function(instruction_list) {

    // Inspect each argument in order
    for(var i = 0; i < instruction_list.length; i++) {
      instruction_elements = instruction_list[i].split(" ");

      if(this.strip_commas_from_instruction(instruction_elements) &&
         this.check_instruction_validity(instruction_elements[0]) &&
         this.check_instruction_implementation(instruction_elements[0])) {
           console.log("all good");
         }

      // Check for correct number of arguments
      if(instruction_elements.length - 1 != Instructions[instruction_elements[0]].arguments) {
        console.log("Incorrect number of arguments.");
      } else {
        console.log("Correct number of arguments.");
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
    }
  },

  check_instruction_implementation: function(instruction) {
    // Check that instruction has been implemented before evaluating
    if(Instructions[instruction] == undefined) {
      console.log(instruction + " has not yet been implemented.");
    }
  }
};
