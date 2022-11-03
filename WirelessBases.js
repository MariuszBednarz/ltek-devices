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
  clear() {
    for (let address of this.bases.keys()) {
      const controller = this.bases.get(address);
    try { controller.hid.close(); } catch (error) { console.log("error - hid close") };
    }
    this.bases.clear();
    return;
  }
}

module.exports = WirelessBases;
