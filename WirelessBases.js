class WirelessBases {
  constructor() {
    this.bases = new Map();
  }
  static get DanceBaseMINI() {
    return class DanceBaseMINI {
      hid;
      type;
      bus;
      constructor(hid, type, bus) {
        this.hid = hid;
        this.type = type;
        this.bus = bus;
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
        slot1: savedData.toString("hex").slice(20, 30),
        slot2: savedData.toString("hex").slice(20, 30),
        slot3: savedData.toString("hex").slice(44, 54),
        slot4: savedData.toString("hex").slice(56, 66),
      }
    })
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

module.exports = WirelessBases;
