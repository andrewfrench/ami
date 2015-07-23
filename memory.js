// memory.js

/*

TODO:

*/

var Memory = {
  address: 0x10010000,

  data: {},

  labels: {},

  ascii: {
    bytes: 1,
    add: function(ascii_values) {
      for(var i = 0; i < ascii_values.length; i++) {
        Memory.data[Memory.address] = ascii_values[i].charCodeAt();
        Memory.address++;
      }
    }
  },

  asciiz: {
    bytes: 1,
    add: function(ascii_values) {
      for(var i = 0; i < ascii_values.length; i++) {
        Memory.data[Memory.address] = ascii_values[i].charCodeAt();
        Memory.address++;
      }

      Memory.data[Memory.address] = 0;
      Memory.address++;
    }
  },

  byte: {
    bytes: 1,
    add: function(byte_values) {
      for(var i = 0; i < byte_values.length; i++) {
        Memory.data[Memory.address] = parseInt(byte_values[i]);
        Memory.address++;
      }
    }
  },

  halfword: {
    bytes: 2,
    add: function(halfword_values) {
      for(var i = 0; i < halfword_values.length; i++) {
        Memory.data[Memory.address] = (0xff00 & parseInt(halfword_values[i])) >> 8;
        Memory.address++;

        Memory.data[Memory.address] = 0x00ff & parseInt(halfword_values[i]);
        Memory.address++;
      }
    }
  },

  word: {
    bytes: 4,
    add: function(word_values) {
      for(var i = 0; i < word_values.length; i++) {
        Memory.data[Memory.address] = (0xff000000 & parseInt(word_values[i])) >> 24;
        Memory.address++;

        Memory.data[Memory.address] = (0x00ff0000 & parseInt(word_values[i])) >> 16;
        Memory.address++;

        Memory.data[Memory.address] = (0x0000ff00 & parseInt(word_values[i])) >> 8;
        Memory.address++;

        Memory.data[Memory.address] = 0x000000ff & parseInt(word_values[i]);
        Memory.address++;
      }
    }
  },

  space: {
    bytes: 1,
    add: function(spaces) {
      for(var i = 0; i < spaces; i++) {
        Memory.data[Memory.address] = 0;
        Memory.address++;
      }
    }
  },

  get_byte: function(address) {
    return Memory.data[address];
  },

  get_halfword: function(address) {
    return (Memory.data[address] << 8) + Memory.data[address + 1];
  },

  get_word: function(address) {
    return (Memory.data[address] << 24) + (Memory.data[address + 1] << 16) + (Memory.data[address + 2] << 8) + Memory.data[address + 3];
  },

  store_byte: function(value, address) {
    Memory.data[address] = value;
  },

  store_halfword: function(value, address) {
    Memory.data[address] = 0xff00 & value;
    Memory.data[address + 1] = 0x00ff & value;
  },

  store_word: function(value, address) {
    Memory.data[address] = 0xff000000 & value;
    Memory.data[address + 1] = 0x00ff0000 & value;
    Memory.data[address + 2] = 0x0000ff00 & value;
    Memory.data[address + 3] = 0x000000ff & value;
  },

  reinitialize: function() {
    Memory.data = {};
    Memory.labels = {};
    Memory.address = 0x10010000;
  }
};
