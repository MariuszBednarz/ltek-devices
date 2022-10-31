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
    const input_slots = new Uint8Array(64);
    input_slots[0] = 10;
    input_slots[1] = 201;
    input_slots[2] = 128;
    device.hid.write(input_slots);
    device.hid.read(function (err, data) {
      const savedData = data;
      device.slots = {
        slot1: savedData.toString("hex").slice(18, 30),
        slot2: savedData.toString("hex").slice(30, 42),
        slot3: savedData.toString("hex").slice(42, 54),
        slot4: savedData.toString("hex").slice(54, 66),
      }
    })

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
