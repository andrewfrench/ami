// registers.js

/*

TODO:
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

function Register(reg) {
  this.init = 0;
  this.value = 0;
  this.addressable = true;
  this.html_id = reg;
};

Register.prototype.set_value = function(value) {
  this.value = value;
  document.getElementById(this.html_id).innerHTML = Numbers.to_hex_string(this.value)  + " (" + this.value + ")";
};

var Registers = {
  $zero: new Register("$zero"),
  $at: new Register("$at"),
  $v0: new Register("$v0"),
  $v1: new Register("$v1"),
  $a0: new Register("$a0"),
  $a1: new Register("$a1"),
  $a2: new Register("$a2"),
  $a3: new Register("$a3"),
  $t0: new Register("$t0"),
  $t1: new Register("$t1"),
  $t2: new Register("$t2"),
  $t3: new Register("$t3"),
  $t4: new Register("$t4"),
  $t5: new Register("$t5"),
  $t6: new Register("$t6"),
  $t7: new Register("$t7"),
  $s0: new Register("$s0"),
  $s1: new Register("$s1"),
  $s2: new Register("$s2"),
  $s3: new Register("$s3"),
  $s4: new Register("$s4"),
  $s5: new Register("$s5"),
  $s6: new Register("$s6"),
  $s7: new Register("$s7"),
  $t8: new Register("$t8"),
  $t9: new Register("$t9"),
  $k0: new Register("$k0"),
  $k1: new Register("$k1"),
  $gp: new Register("$gp"),
  // $sp: {
  //   addressable: true,
  //   init: 0x7fffffff,
  //   value: 0x7ffffff
  // },
  $sp: new Register("$sp"),
  $fp: new Register("$fp"),
  $ra: new Register("$ra"),
  PC: new Register("PC"),
  // PC: {
  //     addressable: true,
  //     init: 0x00400000,
  //     value: 0x00400000
  // },
  HI: new Register("HI"),
  LO: new Register("LO"),

  reinitialize: function() {
    for(var i = 0; i < register_array.length; i++) {
      this[register_array[i]].value = this[register_array[i]].init;
    }
  }
};
