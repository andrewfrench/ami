// instructions.js

// A non-exhaustive list of instructions
var valid_instruction_list = ["ADD", "ADDI", "ADDIU", "AND", "ANDI", "BEQ", "BGEZ", "BGEZAL", "BGTZ", "BLEZ", "BLTZ", "BLTZAL", "BNE", "DIV", "DIVU", "J", "JAL", "JR", "LB", "LUI", "LW", "MFHI", "MFLO", "MULT", "MULTU", "NOOP", "OR", "ORI", "SB", "SLL", "SLLV", "SLT", "SLTI", "SLTIU", "SLTU", "SRA", "SRL", "SRLV", "SUB", "SUBU", "SW", "SYSCALL", "XOR", "XORI"];

var Instructions = {
  ADD: {
    desc: "Add (with overflow)",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value + arguments[2].value;
    }
  },

  ADDI: {
    desc: "Add immediate (with overflow)",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value + arguments[2];
    }
  },

  ADDIU: {
    desc: "Add immediate unsigned (no overflow)",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value + arguments[2];
    }
  },

  ADDU: {
    desc: "Add unsigned (no overflow)",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value + arguments[2].value;
    }
  },

  AND: {
    desc: "Bitwise logical and",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value & arguments[2].value;
    }
  },

  OR: {
    desc: "Bitwise logical or",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value | arguments[2].value;
    }
  },

  SLL: {
    desc: "Shift left logical",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value << arguments[2];
    }
  }

  // And more to come
};
