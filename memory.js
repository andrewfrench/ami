// memory.js

/*

TODO:
- Add getters and setters for labels
- Add getters and setters for data

*/

var Memory = {
  address: 0x10010000,

  // Create empty objects to attach data and labels to
  data: {},

  labels: {},

  ascii: {
    bytes: 1,
    add: function(string) {
      chars = string.split("");
      for(var i = 1; i < chars.length - 1; i++) {
        Memory.data[Memory.address] = chars[i].charCodeAt();
        Memory.address++;
      }
      Memory.update_html();
    }
  },

  asciiz: {
    bytes: 1,
    add: function(string) {
      chars = string.split("");
      for(var i = 1; i < chars.length - 1; i++) {
        Memory.data[Memory.address] = chars[i].charCodeAt();
        Memory.address++;
      }

      Memory.data[Memory.address] = 0;
      Memory.address++;

      Memory.update_html();
    }
  },

  byte: {
    bytes: 1,
    add: function(byte_values) {
      for(var i = 0; i < byte_values.length; i++) {
        Memory.data[Memory.address] = parseInt(byte_values[i]);
        Memory.address++;
      }
      Memory.update_html();
    }
  },

  halfword: {
    bytes: 2,
    add: function(halfword_values) {
      for(var i = 0; i < halfword_values.length; i++) {
        Memory.data[Memory.address] = (0xff00 & parseInt(halfword_values[i])) >>> 8;
        Memory.address++;

        Memory.data[Memory.address] = 0x00ff & parseInt(halfword_values[i]);
        Memory.address++;
      }
      Memory.update_html();
    }
  },

  word: {
    bytes: 4,
    add: function(word_values) {
      for(var i = 0; i < word_values.length; i++) {
        Memory.data[Memory.address] = (0xff000000 & parseInt(word_values[i])) >>> 24;
        Memory.address++;

        Memory.data[Memory.address] = (0x00ff0000 & parseInt(word_values[i])) >>> 16;
        Memory.address++;

        Memory.data[Memory.address] = (0x0000ff00 & parseInt(word_values[i])) >>> 8;
        Memory.address++;

        Memory.data[Memory.address] = 0x000000ff & parseInt(word_values[i]);
        Memory.address++;
      }
      Memory.update_html();
    }
  },

  space: {
    bytes: 1,
    add: function(spaces) {
      for(var i = 0; i < spaces; i++) {
        Memory.data[Memory.address] = 0;
        Memory.address++;
      }
      Memory.update_html();
    }
  },

  get_byte: function(address) {
    if(Memory.data[address] == undefined) {
      return 0;
    } else {
      return Memory.data[address];
    }
  },

  get_halfword: function(address) {
    var result = 0;
    for(var i = 0; i < 2; i++) {
      result = result << 8;
      result += Memory.get_byte(address + i);
    }
    return result;
  },

  get_word: function(address) {
    var result = 0;
    for(var i = 0; i < 4; i++) {
      result = result << 8;
      result += Memory.get_byte(address + i);
    }
    return result;
  },

  store_byte: function(value, address) {
    Memory.data[address] = 0xff & value;
    Memory.update_html();
  },

  store_halfword: function(value, address) {
    Memory.data[address] = 0xff00 & value;
    Memory.data[address + 1] = 0x00ff & value;
    Memory.update_html();
  },

  store_word: function(value, address) {
    Memory.data[address]     = (0xff000000 & value) >>> 24;
    Memory.data[address + 1] = (0x00ff0000 & value) >>> 16;
    Memory.data[address + 2] = (0x0000ff00 & value) >>> 8;
    Memory.data[address + 3] = 0x000000ff & value;
    Memory.update_html();
  },

  reinitialize: function() {
    Memory.data = {};
    Memory.labels = {};
    Memory.address = 0x10010000;
    Memory.update_html();
  },

  update_html: function() {
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
};
