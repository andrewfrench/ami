// instructions.js

/*

TODO:
- Create error checks for each instruction, to populate HTML error element
- Add instructions that deal with memory locations
- Change to a Instruction class structure
  - Update HTML register indicators when changed, avoiding loops

*/

var valid_instruction_list = ["ADD", "ADDI", "ADDIU", "AND", "ANDI", "BEQ", "BGEZ", "BGEZAL", "BGTZ", "BLEZ", "BLTZ", "BLTZAL", "BNE", "DIV", "DIVU", "J", "JAL", "JR", "LA", "LB", "LI", "LUI", "LW", "MFHI", "MFLO", "MOVE", "MULT", "MULTU", "NOOP", "OR", "ORI", "SB", "SLL", "SLLV", "SLT", "SLTI", "SLTIU", "SLTU", "SRA", "SRL", "SRLV", "SUB", "SUBU", "SW", "SYSCALL", "XOR", "XORI"];

var Instructions = {
  ADD: {
    desc: "Add (with overflow)",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].set_value(0xffffffff & (arguments[1].value + arguments[2].value));
    }
  },

  ADDI: {
    desc: "Add immediate value (with overflow)",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].set_value(0xffffffff & (arguments[1].value + arguments[2]));
    }
  },

  ADDIU: {
    desc: "Add immediate unsigned value, overflow is ignored",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value + arguments[2]);
    }
  },

  ADDU: {
    desc: "Add unsigned, overflow is ignored",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value + arguments[2].value);
    }
  },

  AND: {
    desc: "Bitwise logical and",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value & arguments[2].value);
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
        Registers.$ra.set_value(Program.counter);

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
        Registers.$ra.set_value(Program.counter);

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

  DIV: {
    desc: "Divides the first register by the second, storing the quotient in LO and the remainder in HI",
    arguments: 2,
    argument_format: "rr",
    operation: function(arguments) {
      Registers.LO.set_value(Math.floor(arguments[0].value / arguments[1].value));

      // Truly a beautiful language
      Registers.HI.set_value(((arguments[0].value % arguments[1].value) + arguments[1].value) % arguments[1].value);
    }
  },

  DIVU: {
    desc: "Divides the first register by the second, storing the quotient in LO and the remainder in HI, overflow is ignored",
    arguments: 2,
    argument_format: "rr",
    operation: function(arguments) {
      Registers.LO.set_value(Math.floor(arguments[0].value / arguments[1].value));
      Registers.HI.set_value(arguments[0].value % arguments[1].value);
    }
  },

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
      Registers.$ra.set_value(Program.counter);

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

  LA: {
    desc: "Loads the data address referred to by a label",
    arguments: 2,
    argument_format: "rk",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1]);
    }
  },

  LB: {
    desc: "Loads a byte into the specified register from the specified address",
    arguments: 2,
    argument_format: "rm",
    operation: function(arguments) {
      // arg[1] is offset, arg[2] is register
      arguments[0].set_value(Memory.get_byte(arguments[1] + arguments[2].value));
    }
  },

  LI: {
    desc: "Load the immediate value into the specified register",
    arguments: 2,
    argument_format: "ri",
    operation: function(arguments) {
      arguments[0].set_value(0xffffffff & arguments[1]);
    }
  },

  LUI: {
    desc: "Load the immediate value into the first two bytes of the register",
    arguments: 2,
    argument_format: "ri",
    operation: function(arguments) {
      arguments[0].set_value(0xffffffff & (arguments[1] << 16));
    }
  },

  LW: {
    desc: "Loads a word into the specified register from the specified address",
    arguments: 2,
    argument_format: "rm",
    operation: function(arguments) {
      arguments[0].set_value(Memory.get_word(arguments[1] + arguments[2].value));
    }
  },

  MFHI: {
    desc: "Moves the value of HI to the specified register",
    arguments: 1,
    argument_format: "r",
    operation: function(arguments) {
      arguments[0].set_value(Registers.HI.value);
    }
  },

  MFLO: {
    desc: "Moves the value of LO to the specified register",
    arguments: 1,
    argument_format: "r",
    operation: function(arguments) {
      arguments[0].set_value(Registers.LO.value);
    }
  },

  MOVE: {
    desc: "Moves the value of one register to another register",
    arguments: 2,
    argument_format: "rr",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value);
    }
  },

  MULT: {
    desc: "Multiplies the value of two registers",
    arguments: 2,
    argument_format: "rr",
    operation: function(arguments) {
      Registers.LO.set_value(0xffffffff & (arguments[0].value * arguments[1].value));
    }
  },

  MULTU: {
    desc: "Multiplies the value of two registers, overflow is ignored",
    arguments: 2,
    argument_format: "rr",
    operation: function(arguments) {
      Registers.LO.set_value(0xffffffff & (arguments[0].value * arguments[1].value));
    }
  },

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
      arguments[0].set_value(arguments[1].value | arguments[2].value);
    }
  },

  ORI: {
    desc: "Bitwise logical or with immediate value",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value | arguments[2]);
    }
  },

  SB: {
    desc: "Stores the least significant byte of the supplied register into the supplied memory address",
    arguments: 2,
    argument_format: "rm",
    operation: function(arguments) {
      // Store value at offset + address
      Memory.store_byte(arguments[0].value, arguments[1] + arguments[2].value);
    }
  },

  SLL: {
    desc: "Logical shift left",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].set_value(0xffffffff & (arguments[1].value << arguments[2]));
    }
  },

  SLLV: {
    desc: "Variable logical shift left",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].set_value(0xffffffff & (arguments[1].value << arguments[2].value));
    }
  },

  SLT: {
    desc: "Set on less than (signed)",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      if(arguments[1].value < arguments[2].value) {
        arguments[0].set_value(1);
      } else {
        arguments[0].set_value(0);
      }
    }
  },

  SLTI: {
    desc: "Set on less than immediate value (signed)",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      if(arguments[1].value < arguments[2]) {
        arguments[0].set_value(1);
      } else {
        arguments[0].set_value(0);
      }
    }
  },

  SLTIU: {
    desc: "Set on less than immediate value (unsigned)",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      if(arguments[1].value < arguments[2]) {
        arguments[0].set_value(1);
      } else {
        arguments[0].set_value(0);
      }
    }
  },

  SLTU: {
    desc: "Set on less than (unsigned)",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      if(arguments[1].value < arguments[2].value) {
        arguments[0].set_value(1);
      } else {
        arguments[0].set_value(0);
      }
    }
  },

  SRA: {
    desc: "Arithmetic shift right",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value >> arguments[2]);
    }
  },

  SRL: {
    desc: "Logical shift right (zeroes are shifted in)",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value >>> arguments[2]);
    }
  },

  SRLV: {
    desc: "Variable logical shift right (zeroes are shifted in)",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value >>> arguments[2].value);
    }
  },

  SUB: {
    desc: "Subtracts the value of two registers",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].set_value(0xffffffff & (arguments[1].value - arguments[2].value));
    }
  },

  SUBU: {
    desc: "Subtracts the value of two registers, ignoring overflow",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].set_value(0xffffffff & (arguments[1].value - arguments[2].value));
    }
  },

  SW: {
    desc: "Stores the value of the specified register to the specifed memory address",
    arguments: 2,
    argument_format: "rm",
    operation: function(arguments) {
      // offset, register
      Memory.store_word(arguments[0].value, arguments[1] + arguments[2].value);
    }
  },

  SYSCALL: {
    desc: "Generates a software interrupt",
    arguments: 0,
    argument_format: "",
    operation: function(arguments) {
      // Look up current value of $v0
      switch(Registers.$v0.value) {
        case 1:
          console.log("This system call is not yet implemented.");
          break;

        case 2:
          console.log("This system call is not yet implemented.");
          break;

        case 3:
          console.log("This system call is not yet implemented.");
          break;

        case 4:
          console.log("This system call is not yet implemented.");
          break;

        case 5:
          console.log("This system call is not yet implemented.");
          break;

        case 6:
          console.log("This system call is not yet implemented.");
          break;

        case 7:
          console.log("This system call is not yet implemented.");
          break;

        case 8:
          console.log("This system call is not yet implemented.");
          break;

        case 9:
          console.log("This system call is not yet implemented.");
          break;

        case 10:
          Program.exit();
          break;

        default:
          console.log("The value of $v0 in a system call must be between 1 and 10.");
      }
    }
  },

  XOR: {
    desc: "Bitwise exclusive or",
    arguments: 3,
    argument_format: "rrr",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value ^ arguments[2].value);
    }
  },

  XORI: {
    desc: "Bitwise exclusive or with immediate value",
    arguments: 3,
    argument_format: "rri",
    operation: function(arguments) {
      arguments[0].set_value(arguments[1].value ^ arguments[2]);
    }
  }
};
