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
  clear() {
    for (let address of this.bases.keys()) {
      const controller = this.bases.get(address);
    try { controller.hid.close(); } catch (error) { console.log("error - hid close") };
    }
    this.bases.clear();
    return;
  }
}

module.exports = WiredBases;
