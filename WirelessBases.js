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
        "1": { controller: "1", name: "LEFT", number: 1, byte: "00000001" },
        "2": { controller: "1", name: "RIGHT", number: 2, byte: "00000010" },
        "3": { controller: "1", name: "UP", number: 3, byte: "00000100" },
        "4": { controller: "1", name: "DOWN", number: 4, byte: "00001000" },
        "5": { controller: "1", name: "START", number: 5, byte: "00010000" },
        "6": { controller: "1", name: "SELECT", number: 6, byte: "00100000" },

        "7": { controller: "2", name: "LEFT", number: 7, byte: "01000000" },
        "8": { controller: "2", name: "RIGHT", number: 8, byte: "10000000" },
        "9": { controller: "2", name: "UP", number: 9, byte: "00000001" },
        "10": { controller: "2", name: "DOWN", number: 10, byte: "00000010" },
        "11": { controller: "2", name: "START", number: 11, byte: "00000100" },
        "12": { controller: "2", name: "SELECT", number: 12, byte: "00001000" },

        "13": { controller: "3", name: "LEFT", number: 13, byte: "00010000" },
        "14": { controller: "3", name: "RIGHT", number: 14, byte: "00100000" },
        "15": { controller: "3", name: "UP", number: 15, byte: "01000000" },
        "16": { controller: "3", name: "DOWN", number: 16, byte: "10000000" },
        "17": { controller: "3", name: "START", number: 17, byte: "00000001" },
        "18": { controller: "3", name: "SELECT", number: 18, byte: "00000010" },

        "19": { controller: "4", name: "LEFT", number: 19, byte: "00000100" },
        "20": { controller: "4", name: "RIGHT", number: 20, byte: "00001000" },
        "21": { controller: "4", name: "UP", number: 21, byte: "00010000" },
        "22": { controller: "4", name: "DOWN", number: 22, byte: "00100000" },
        "23": { controller: "4", name: "START", number: 23, byte: "01000000" },
        "24": { controller: "4", name: "SELECT", number: 24, byte: "10000000" },
      };

      process = function (data) {
        let bytes = [...data].map(byteToBinaryString).join(" ").split(" ")
        bytes.shift()
        for (var i = 0; i < bytes.length; i++) {
          bytes[i] = reverse(bytes[i]);
        }
        bytes = bytes.join("");

        const indices = [];
        const response = [];
        for (var i = 0; i < bytes.length; i++) {
          if (bytes[i] === "1") indices.push(i + 1);
        }
        indices.forEach((key) => {
          response.push(this.#keysEnum[key])
        });

        console.log(response)
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
