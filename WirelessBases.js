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

      process = function (data) {
        function byteToBinaryString(buffer) {
          return buffer.toString(2).padStart(8, "0");
        };
        const bytes = [...data].map(byteToBinaryString).join(" ").split(" ");
        console.log(bytes);
        return this;
      };
    };
  }

  add(device) {
    this.bases.set(device.hid.getDeviceInfo().serialNumber, device );
  }
  getAll() {
    return this.bases;
  }
  getBySerialNumber(serialNumber) {
    return this.bases.get(serialNumber);
  }
}

module.exports = WirelessBases;
