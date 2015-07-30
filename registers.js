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

function Register(reg, add, val, ini) {
  this.init = val || 0;
  this.value = val || 0;
  this.addressable = add || false;
  this.html_id = reg;
};

Register.prototype.set_value = function(value) {
  this.value = value;
  document.getElementById(this.html_id).innerHTML = Numbers.to_hex_string(this.value)  + " (" + this.value + ")";
};

var Registers = {
  $zero: new Register("$zero"),
  $at: new Register("$at", true),
  $v0: new Register("$v0", true),
  $v1: new Register("$v1", true),
  $a0: new Register("$a0", true),
  $a1: new Register("$a1", true),
  $a2: new Register("$a2", true),
  $a3: new Register("$a3", true),
  $t0: new Register("$t0", true),
  $t1: new Register("$t1", true),
  $t2: new Register("$t2", true),
  $t3: new Register("$t3", true),
  $t4: new Register("$t4", true),
  $t5: new Register("$t5", true),
  $t6: new Register("$t6", true),
  $t7: new Register("$t7", true),
  $s0: new Register("$s0", true),
  $s1: new Register("$s1", true),
  $s2: new Register("$s2", true),
  $s3: new Register("$s3", true),
  $s4: new Register("$s4", true),
  $s5: new Register("$s5", true),
  $s6: new Register("$s6", true),
  $s7: new Register("$s7", true),
  $t8: new Register("$t8", true),
  $t9: new Register("$t9", true),
  $k0: new Register("$k0", true),
  $k1: new Register("$k1", true),
  $gp: new Register("$gp", true),
  $sp: new Register("$sp", true, 0x7fffffff),
  $fp: new Register("$fp", true),
  $ra: new Register("$ra", true),
  PC: new Register("PC", false, 0x00400000),
  HI: new Register("HI", false),
  LO: new Register("LO", false),

  reinitialize: function() {
    for(var i = 0; i < register_array.length; i++) {
      this[register_array[i]].set_value(this[register_array[i]].init);
    }
  }
};
