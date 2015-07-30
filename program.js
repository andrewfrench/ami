// program.js

/*

TODO:
- Add structure for memory elements
- Handle HTML updates when registers are changed, avoiding loops

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

  enter_loop: function() {
    this.counter = 0x00400000;

    this.execution_interval = setInterval(function() {
      Program.execute();
    }, 80);
  },

  execute: function() {
    if(Program.instructions[Program.counter] != undefined) {
      Instructions[Program.instructions[Program.counter].instruction].operation(Program.instructions[Program.counter].arguments);
      Program.counter += 4;
      Registers.PC.set_value(Program.counter);
    }
  },

  exit: function() {
    clearInterval(this.execution_interval);
  },

  pause: function() {
    clearInterval(this.execution_interval);
  },

  reinitialize: function() {
    this.counter = 0x00400000;
    this.instructions = {};
  },

  step: function() {
    // Stop execution interval if execution is underway
    clearInterval(this.execution_interval);

    this.execute();
  }
};
