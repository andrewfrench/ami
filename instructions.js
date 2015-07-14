// instructions.js

// A non-exhaustive list of instructions
var valid_instruction_list = ["ADD", "ADDI", "ADDIU", "AND", "ANDI", "BEQ", "BGEZ", "BGEZAL", "BGTZ", "BLEZ", "BLTZ", "BLTZAL", "BNE", "DIV", "DIVU", "J", "JAL", "JR", "LB", "LUI", "LW", "MFHI", "MFLO", "MULT", "MULTU", "NOOP", "OR", "ORI", "SB", "SLL", "SLLV", "SLT", "SLTI", "SLTIU", "SLTU", "SRA", "SRL", "SRLV", "SUB", "SUBU", "SW", "SYSCALL", "XOR", "XORI"];

var Instructions = {
  ADD: {
    desc: "Add (with overflow)",
    arguments: 3,
    operation: function(d, s, t) {
      d.value = s.value + t.value;
    }
  },

  ADDI: {
    desc: "Add immediate (with overflow)",
    arguments: 3,
    operation: function(t, s, i) {
      t.value = s.value + i;
    }
  },

  ADDIU: {
    desc: "Add immediate unsigned (no overflow)",
    arguments: 3,
    operation: function(t, s, i) {
      t.value = s.value + i;
    }
  },

  ADDU: {
    desc: "Add unsigned (no overflow)",
    arguments: 3,
    operation: function(d, s, t) {
      d.value = s.value + t.value;
    }
  },

  AND: {
    desc: "Bitwise logical and",
    arguments: 3,
    operation: function(d, s, t) {
      d.value = s.value & t.value;
    }
  },

  OR: {
    desc: "Bitwise logical or",
    arguments: 3,
    operation: function(d, s, t) {
      d.value = s.value | t.value;
    }
  },

  SLL: {
    desc: "Shift left logical",
    arguments: 3,
    operation: function(d, t, h) {
      d.value = t.value << h;
    }
  }

  // And more to come
};
