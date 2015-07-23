// memory.js

/*

TODO:
- Create methods to add each data type
- Keep track of data locations

*/

var Memory = {
  location: 0x10010000,

  types: {
    ascii: {
      bytes: 1,
      add: function(ascii_values) {
        for(var i = 0; i < ascii_values.length; i++) {
          Memory.data[location] = ascii_values[i];
          location += this.bytes;
        }
      }
    },
    asciiz: {
      bytes: 1,
      add: function(ascii_values) {
        for(var i = 0; i < ascii_values.length; i++) {
          Memory.data[location] = ascii_values[i];
          location += this.bytes;
        }
      }
    },
    byte: {
      bytes: 1,
      add: function(byte_values) {
        for(var i = 0; i < byte_values.length; i++) {
          Memory.data[location] = byte_values[i];
          location += this.bytes;
        }
      }
    },
    halfword: {
      bytes: 2,
      add: function(halfword_values) {
        for(var i = 0; i < halfword_values.length; i++) {
          Memory.data[location] = halfword_values[i];
          location += this.bytes;
        }
      }
    },
    word: {
      bytes: 4,
      add: function(word_values) {
        for(var i = 0; i < word_values.length; i++) {
          Memory.data[location] = word_values[i];
          location += this.bytes;
        }
      }
    },
    space: {
      bytes: 1,
      add: function(spaces) {
        for(var i = 0; i < spaces; i++) {
          Memory.data[location] = 0;
          location += this.bytes;
        }
      }
    }
  },

  data: {}
};
