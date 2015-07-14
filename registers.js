// registers.js

// Registers are 32 bits wide (0x0000)

var register_array = [
  "$zero",
  "$at",
  "$v0",
  "$v1",
  "$a0",
  "$a1",
  "$a2",
  "$a3",
  "$t0",
  "$t1",
  "$t2",
  "$t3",
  "$t4",
  "$t5",
  "$t6",
  "$t7",
  "$s0",
  "$s1",
  "$s2",
  "$s3",
  "$s4",
  "$s5",
  "$s6",
  "$s7",
  "$t8",
  "$t9",
  "$k0",
  "$k1",
  "$gp",
  "$sp",
  "$fp",
  "$ra",
  "PC"
];

var Registers = {
  PC: {
      mutable: true,
      init: 0x00400000,
      value: 0x00400000
  },

  $zero: {
    mutable: false,
    init: 0,
    value: 0
  },

  $at: {
    mutable: false,
    init: 0,
    value: 0
  },

  $v0: {
    mutable: true,
    init: 0,
    value: 0
  },

  $v1: {
    mutable: true,
    init: 0,
    value: 0
  },

  $a0: {
    mutable: true,
    init: 0,
    value: 0
  },

  $a1: {
    mutable: true,
    init: 0,
    value: 0
  },

  $a2: {
    mutable: true,
    init: 0,
    value: 0
  },

  $a3: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t0: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t1: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t2: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t3: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t4: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t5: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t6: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t7: {
    mutable: true,
    init: 0,
    value: 0
  },

  $s0: {
    mutable: true,
    init: 0,
    value: 0
  },

  $s1: {
    mutable: true,
    init: 0,
    value: 0
  },

  $s2: {
    mutable: true,
    init: 0,
    value: 0
  },

  $s3: {
    mutable: true,
    init: 0,
    value: 0
  },

  $s4: {
    mutable: true,
    init: 0,
    value: 0
  },

  $s5: {
    mutable: true,
    init: 0,
    value: 0
  },

  $s6: {
    mutable: true,
    init: 0,
    value: 0
  },

  $s7: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t8: {
    mutable: true,
    init: 0,
    value: 0
  },

  $t9: {
    mutable: true,
    init: 0,
    value: 0
  },

  $k0: {
    mutable: false,
    init: 0,
    value: 0
  },

  $k1: {
    mutable: false,
    init: 0,
    value: 0
  },

  $gp: {
    mutable: true,
    init: 0,
    value: 0
  },

  $sp: {
    mutable: true,
    init: 0,
    value: 0
  },

  $fp: {
    mutable: true,
    init: 0,
    value: 0
  },

  $ra: {
    mutable: true,
    init: 0,
    value: 0
  },

  reinitialize: function() {
    for(var i = 0; i < register_array.length; i++) {
      this[register_array[i]].value = this[register_array[i]].init;
    }
  }
};
