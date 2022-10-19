const { byteToBinaryString, reverse } = require("./utils");

class WirelessBases {
  constructor() {
    this.bases = new Map();
  }
  static get DanceBaseMINI() {
    return class DanceBaseMINI {
      hid;
      constructor(hid) {
        this.hid = hid;
      }

      #keysEnum = {
        2_1: { controller: "1", name: "LEFT", number: 1, byte: "00000001" },
        2_2: { controller: "1", name: "RIGHT", number: 2, byte: "00000010" },
        2_3: { controller: "1", name: "UP", number: 3, byte: "00000100" },
        2_4: { controller: "1", name: "DOWN", number: 4, byte: "00001000" },
        2_5: { controller: "1", name: "START", number: 5, byte: "00010000" },
        2_6: { controller: "1", name: "SELECT", number: 6, byte: "00100000" },

        2_7: { controller: "2", name: "LEFT", number: 7, byte: "01000000" },
        2_8: { controller: "2", name: "RIGHT", number: 8, byte: "10000000" },
        3_1: { controller: "2", name: "UP", number: 9, byte: "00000001" },
        3_2: { controller: "2", name: "DOWN", number: 10, byte: "00000010" },
        3_3: { controller: "2", name: "START", number: 11, byte: "00000100" },
        3_4: { controller: "2", name: "SELECT", number: 12, byte: "00001000" },

        3_5: { controller: "3", name: "LEFT", number: 13, byte: "00010000" },
        3_6: { controller: "3", name: "RIGHT", number: 14, byte: "00100000" },
        3_7: { controller: "3", name: "UP", number: 15, byte: "01000000" },
        3_8: { controller: "3", name: "DOWN", number: 16, byte: "10000000" },
        4_1: { controller: "3", name: "START", number: 17, byte: "00000001" },
        4_2: { controller: "3", name: "SELECT", number: 18, byte: "00000010" },

        4_3: { controller: "4", name: "LEFT", number: 19, byte: "00000100" },
        4_4: { controller: "4", name: "RIGHT", number: 20, byte: "00001000" },
        4_5: { controller: "4", name: "UP", number: 21, byte: "00010000" },
        4_6: { controller: "4", name: "DOWN", number: 22, byte: "00100000" },
        4_7: { controller: "4", name: "START", number: 23, byte: "01000000" },
        4_8: { controller: "4", name: "SELECT", number: 24, byte: "10000000" },
      };

      process = function (data) {
        const bytes = [...data].map(byteToBinaryString).join(" ").split(" ");
        const reversed = reverse(bytes[1]);

        const indices = [];
        for (var i = 0; i < reversed.length; i++) {
          if (reversed[i] === "1") indices.push(i + 1);
        }

        console.log(indices);
        return this;
      };
    };
  }

  add(device) {
    this.bases.set(device.hid.getDeviceInfo().serialNumber, device);
  }
  getAll() {
    return this.bases;
  }
  getBySerialNumber(serialNumber) {
    return this.bases.get(serialNumber);
  }
}

module.exports = WirelessBases;
