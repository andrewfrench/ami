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
      Registers.PC.value = Program.counter;

      // Update HTML indicated values of each register & PC
      // for(var i = 0; i < register_array.length; i++) {
      //   document.getElementById(register_array[i]).innerHTML = Numbers.to_hex_string(Registers[register_array[i]].value) + " (" + Registers[register_array[i]].value + ")";
      // }

      // Update HTML indicated values of memory elements
      var num_html_lines = document.getElementsByClassName("data").length;
      var address = 0x10010000;
      for(var i = 0; i < num_html_lines; i++) {
        var html_element = document.getElementsByClassName("data")[i];
        var inner_html = "";
        for(var j = 0; j < 16; j++) {
          var hex_string = Memory.get_byte(address).toString(16);
          inner_html += Array(3 - hex_string.length).join("0") + hex_string + " ";
          address++;
        }
        html_element.innerHTML = inner_html;
      }
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
