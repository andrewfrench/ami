// numbers.js

/*

TODO:
- Allow users to choose between HEX, BIN, DEC value representation

*/

var Numbers = {
  to_hex_string: function(dec_value) {
    // Converts decimal value to 32-bit hex value

    var hex_value = (dec_value >>> 0).toString(16);
    return "0x" + Array(9 - hex_value.length).join("0") + hex_value;
  }
}
