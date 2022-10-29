class WiredBases {
  constructor() {
    this.bases = new Map();
  }
  static get DancePadPRO() {
    return class DancePadPRO {
      hid;
      type;
      constructor(hid, type) {
        this.hid = hid;
        this.type = type;
      }
    };
  }
  add(device) {
    return this.bases.set(device.hid.getDeviceInfo().serialNumber, device);
  }
  getAll() {
    return this.bases;
  }
  getBySerialNumber(serialNumber) {
    return this.bases.get(serialNumber);
  }
  remove(serialNumber) {
    return this.bases.delete(serialNumber);
  }
}

module.exports = WiredBases;
