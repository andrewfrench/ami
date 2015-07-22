// registers.js

/*

TODO:
- Add the other registers ($HI, $LO, etc.)
- Disallow user changes to non-addressable registers

*/

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
  "PC",
  "HI",
  "LO"
];

var Registers = {
  $zero: {
    addressable: false,
    init: 0,
    value: 0
  },

  $at: {
    addressable: false,
    init: 0,
    value: 0
  },

  $v0: {
    addressable: true,
    init: 0,
    value: 0
  },

  $v1: {
    addressable: true,
    init: 0,
    value: 0
  },

  $a0: {
    addressable: true,
    init: 0,
    value: 0
  },

  $a1: {
    addressable: true,
    init: 0,
    value: 0
  },

  $a2: {
    addressable: true,
    init: 0,
    value: 0
  },

  $a3: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t0: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t1: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t2: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t3: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t4: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t5: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t6: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t7: {
    addressable: true,
    init: 0,
    value: 0
  },

  $s0: {
    addressable: true,
    init: 0,
    value: 0
  },

  $s1: {
    addressable: true,
    init: 0,
    value: 0
  },

  $s2: {
    addressable: true,
    init: 0,
    value: 0
  },

  $s3: {
    addressable: true,
    init: 0,
    value: 0
  },

  $s4: {
    addressable: true,
    init: 0,
    value: 0
  },

  $s5: {
    addressable: true,
    init: 0,
    value: 0
  },

  $s6: {
    addressable: true,
    init: 0,
    value: 0
  },

  $s7: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t8: {
    addressable: true,
    init: 0,
    value: 0
  },

  $t9: {
    addressable: true,
    init: 0,
    value: 0
  },

  $k0: {
    addressable: false,
    init: 0,
    value: 0
  },

  $k1: {
    addressable: false,
    init: 0,
    value: 0
  },

  $gp: {
    addressable: true,
    init: 0,
    value: 0
  },

  $sp: {
    addressable: true,
    init: 0x7fffffff,
    value: 0x7ffffff
  },

  $fp: {
    addressable: true,
    init: 0,
    value: 0
  },

  $ra: {
    addressable: true,
    init: 0,
    value: 0
  },

  PC: {
      addressable: true,
      init: 0x00400000,
      value: 0x00400000
  },

  HI: {
    addressable: false,
    init: 0,
    value: 0
  },

  LO: {
    addressable: false,
    init: 0,
    value: 0
  },

  reinitialize: function() {
    for(var i = 0; i < register_array.length; i++) {
      this[register_array[i]].value = this[register_array[i]].init;
    }
  }
};
