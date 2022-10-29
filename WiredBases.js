class WiredBases {
  constructor() {
    this.bases = new Map();
  }
  static get DancePadPRO() {
    return class DancePadPRO {
      hid;
      type;
      address;
      constructor(hid, type, address) {
        this.hid = hid;
        this.type = type;
        this.address = address;
      }
    };
  }
  add(device) {
    return this.bases.set(`${device.address}`, device);
  }
  getAll() {
    return this.bases;
  }
  get(address) {
    return this.bases.get(address);
  }
  remove(address) {
    return this.bases.delete(address);
  }
  clear() {
    return this.bases.clear();
  }
}

module.exports = WiredBases;
