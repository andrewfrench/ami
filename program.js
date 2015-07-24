// program.js

/*

TODO:
- Add structure for memory elements

*/

var Program = {
  counter: 0x00400000,

  // Create object to contain instructions.
  instructions: {},

  // Create object to contain labels.
  labels: {},

  add_instruction: function(instruction) {
    this.instructions[this.counter] = instruction;
    this.counter += 4;
  },

  add_label: function(label) {
    this.labels[label] = this.counter;
  },

  execute: function() {
    this.counter = 0x00400000;

    this.execution_interval = setInterval(function() {
      if(Program.instructions[Program.counter] != undefined) {
        Instructions[Program.instructions[Program.counter].instruction].operation(Program.instructions[Program.counter].arguments);
        Program.counter += 4;
        Registers.PC.value = Program.counter;

        // Update HTML indicated values of each register & PC
        for(var i = 0; i < register_array.length; i++) {
          document.getElementById(register_array[i]).innerHTML = Numbers.to_hex_string(Registers[register_array[i]].value) + " (" + Registers[register_array[i]].value + ")";
        }
      } else {
        clearInterval(this.execution_interval);
      }
    }, 80);
  },

  reinitialize: function() {
    this.counter = 0x00400000;
    this.instructions = {};
  }
};
