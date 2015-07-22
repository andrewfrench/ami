// instructions.js

// A non-exhaustive list of instructions
var valid_instruction_list = ["ADD", "ADDI", "ADDIU", "AND", "ANDI", "BEQ", "BGEZ", "BGEZAL", "BGTZ", "BLEZ", "BLTZ", "BLTZAL", "BNE", "DIV", "DIVU", "J", "JAL", "JR", "LB", "LUI", "LW", "MFHI", "MFLO", "MULT", "MULTU", "NOOP", "OR", "ORI", "SB", "SLL", "SLLV", "SLT", "SLTI", "SLTIU", "SLTU", "SRA", "SRL", "SRLV", "SUB", "SUBU", "SW", "SYSCALL", "XOR", "XORI"];

var Instructions = {
  ADD: {
    desc: "Add (with overflow)",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].value = 0xffffffff & (arguments[1].value + arguments[2].value);
    }
  },

  ADDI: {
    desc: "Add immediate value (with overflow)",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = 0xffffffff & (arguments[1].value + arguments[2]);
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

  BEQ: {
    desc: "Branches if two registers are equal",
    arguments: 3,
    argument_format: "rrl",
    operation: function(arguments) {
      if(arguments[0].value == arguments[1].value) {
        Program.counter = arguments[2] - 4;
      }
    }
  },

  BGEZ: {
    desc: "Branches if the value of the supplied register is greater than or equal to zero",
    arguments: 2,
    argument_format: "rl",
    operation: function(arguments) {
      if(arguments[0].value >= 0) {
        Program.counter = arguments[1] - 4;
      }
    }
  },

  BGEZAL: {
    desc: "Branches if the value of the supplied register is greater than or equal to zero and stores return address",
    arguments: 2,
    argument_format: "rl",
    operation: function(arguments) {
      if(arguments[0].value >= 0) {
        Registers.$ra.value = Program.counter;

        Program.counter = arguments[1] - 4;
      }
    }
  },

  BGTZ: {
    desc: "Branches if the value of the supplied register is greater than zero",
    arguments: 2,
    argument_format: "rl",
    operation: function(arguments) {
      if(arguments[0].value > 0) {
        Program.counter = arguments[1] - 4;
      }
    }
  },

  BLEZ: {
    desc: "Branches if the value of the supplied register is less than or equal to zero",
    arguments: 2,
    argument_format: "rl",
    operation: function(arguments) {
      if(arguments[0].value <= 0) {
        Program.counter = arguments[1] - 4;
      }
    }
  },

  BLTZ: {
    desc: "Branches if the value of the supplied register is less than zero",
    arguments: 2,
    argument_format: "rl",
    operation: function(arguments) {
      if(arguments[0].value < 0) {
        Program.counter = arguments[1] - 4;
      }
    }
  },

  BLTZAL: {
    desc: "Branches if the value of the supplied register is less than zero and stores the return address",
    arguments: 2,
    argument_format: "rl",
    operation: function(arguments) {
      if(arguments[0].value < 0) {
        Registers.$ra.value = Program.counter;

        Program.counter = arguments[1] - 4;
      }
    }
  },

  BNE: {
    desc: "Branch if the value of the supplied registers are not equal",
    arguments: 3,
    argument_format: "rrl",
    operation: function(arguments) {
      if(arguments[0].value != arguments[1].value) {
        Program.counter = arguments[2] - 4;
      }
    }
  },

  // DIV

  // DIVU

  J: {
    desc: "Jumps to an address indicated by a label",
    arguments: 1,
    argument_format: "l",
    operation: function(arguments) {
      Program.counter = arguments[0] - 4;
    }
  },

  JAL: {
    desc: "Jumps to an address indicated by a label and stores return address",
    arguments: 1,
    argument_format: "l",
    operation: function(arguments) {
      // PC is auto-incremented previously
      Registers.$ra.value = Program.counter;

      // Set new PC **after** using PC to store return address
      Program.counter = arguments[0] - 4;
    }
  },

  JR: {
    desc: "Jumps to an address stored in a register",
    arguments: 1,
    argument_format: "r",
    operation: function(arguments) {
      Program.counter = arguments[0].value - 4;
    }
  },

  // LB

  // LUI

  // LW

  // MFHI

  // MFLO

  // MULT

  // MULTU

  NOOP: {
    desc: "No operation",
    arguments: 0,
    argument_format: "",
    operation: function(arguments) {
      // A formality
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

  // SB

  SLL: {
    desc: "Logical shift left",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = 0xffffffff & (arguments[1].value << arguments[2]);
    }
  },

  SLLV: {
    desc: "Variable logical shift left",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].value = 0xffffffff & (arguments[1].value << arguments[2].value);
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

  SLTI: {
    desc: "Set on less than immediate value (signed)",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      if(arguments[1].value < arguments[2]) {
        arguments[0].value = 1;
      } else {
        arguments[0].value = 0;
      }
    }
  },

  // SLTIU

  // SLTU

  SRA: {
    desc: "Arithmetic shift right",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].value = arguments[1].value >> arguments[2];
    }
  },

  // SRL

  // SRLV

  SUB: {
    desc: "Subtract",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].value = 0xffffffff & (arguments[1].value - arguments[2].value);
    }
  },

  // SUBU

  // SW

  // SYSCALL

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
};
