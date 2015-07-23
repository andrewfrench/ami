// memory.js

/*

TODO:

*/

var Memory = {
  location: 0x10010000,

  ascii: {
    bytes: 1,
    add: function(ascii_values) {
      for(var i = 0; i < ascii_values.length; i++) {
        Memory.data[Memory.location] = ascii_values[i].charCodeAt();
        Memory.location++;
      }
    }
  },

  asciiz: {
    bytes: 1,
    add: function(ascii_values) {
      for(var i = 0; i < ascii_values.length; i++) {
        Memory.data[Memory.location] = ascii_values[i].charCodeAt();
        Memory.location++;
      }

      Memory.data[Memory.location] = 0;
      Memory.location++;
    }
  },

  byte: {
    bytes: 1,
    add: function(byte_values) {
      for(var i = 0; i < byte_values.length; i++) {
        Memory.data[Memory.location] = byte_values[i];
        Memory.location++;
      }
    }
  },

  halfword: {
    bytes: 2,
    add: function(halfword_values) {
      for(var i = 0; i < halfword_values.length; i++) {
        Memory.data[Memory.location] = (0xff00 & halfword_values[i]) >> 8;
        Memory.location++;

        Memory.data[Memory.location] = 0x00ff & halfword_values[i];
        Memory.location++;
      }
    }
  },

  word: {
    bytes: 4,
    add: function(word_values) {
      for(var i = 0; i < word_values.length; i++) {
        Memory.data[Memory.location] = (0xff000000 & word_values[i]) >> 24;
        Memory.location++;

        Memory.data[Memory.location] = (0x00ff0000 & word_values[i]) >> 16;
        Memory.location++;

        Memory.data[Memory.location] = (0x0000ff00 & word_values[i]) >> 8;
        Memory.location++;

        Memory.data[Memory.location] = 0x000000ff & word_values[i];
        Memory.location++;
      }
    }
  },

  space: {
    bytes: 1,
    add: function(spaces) {
      for(var i = 0; i < spaces; i++) {
        Memory.data[Memory.location] = 0;
        Memory.location++;
      }
    }
  },

  data: {}
};
