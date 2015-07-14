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
  }
}
