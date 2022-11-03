class WirelessBases {
  constructor() {
    this.bases = new Map();
  }
  static get DanceBaseMINI() {
    return class DanceBaseMINI {
      hid;
      slots;
      address;
      constructor(hid, slots, address) {
        this.hid = hid;
        this.slots = slots;
        this.address = address;
      }
    };
  }
  add(device) {
    device.slots = {
      slot1: "slot1",
      slot2: "slot2",
      slot3: "slot3",
      slot4: "slot4",
    }
    return this.bases.set(`${device.address}`, device);
  }
  getAll() {
    return this.bases;
  }
  get(address) {
    return this.bases.get(address);
  }
  remove(address) {
    const controller = this.bases.get(address);
    try { controller.hid.close(); } catch (error) { };
    return this.bases.delete(address);
  }
  clear() {
    return this.bases.clear();
  }
}

module.exports = WirelessBases;
