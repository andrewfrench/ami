// program.js

// Contains the program object, relating the program counter
// to instructions as parsed by the Parser.

var Program = {
  counter: 0x00400000,

  // Create object within to attach objects.
  instructions: {},

  add_instruction: function(instruction) {
    this.instructions[this.counter] = instruction;
    this.counter += 4;
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
          document.getElementById(register_array[i]).innerHTML = Numbers.to_hex_string(Registers[register_array[i]].value);
        }
      } else {
        clearInterval(execution_interval);
      }
    }, 100);
  },

  reinitialize: function() {
    this.counter = 0x00400000;
    this.instructions = {};
  }
}
