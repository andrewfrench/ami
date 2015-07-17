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
    console.log(this.instructions);
    var counter = 0x00400000;
    while(this.instructions[counter] != undefined) {
      Instructions[this.instructions[counter].instruction].operation(this.instructions[counter].arguments);
      counter += 4;
    }
  },

  reinitialize: function() {
    this.counter = 0x00400000;
    this.instructions = {};
  }
}
