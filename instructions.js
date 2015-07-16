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
    desc: "Add immediate value (with overflow)",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value + arguments[2];
    }
  },

  ADDIU: {
    desc: "Add immediate unsigned value (no overflow)",
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

  ORI: {
    desc: "Bitwise logical or with immediate value",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value | arguments[2];
    }
  },

  SLL: {
    desc: "Shift left logical",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value << arguments[2];
    }
  },

  SLT: {
    desc: "Set on less than (signed)",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      if(arguments[1].value < arguments[2].value) {
        arguments[0].value = 1;
      } else {
        arguments[0].value = 0;
      }
    }
  },

  XOR: {
    desc: "Bitwise exclusive or",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value ^ arguments[2].value;
    }
  },

  XORI: {
    desc: "Bitwise exclusive or with immediate value",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value ^ arguments[2];
    }
  }

  // And more to come
};
