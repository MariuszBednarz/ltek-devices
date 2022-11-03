const { broadcast } = require("./broadcast");

const byteToBinaryString = function (buffer) {
  return buffer.toString(2).padStart(8, "0");
};

const reverse = function (string) {
  return string.split("").reverse().join("");
};

const addDevices = async function (HID, wireless_bases, WirelessBases, wired_bases, WiredBases, arrayOfDevices) {
  const searchDevices = function () {
    arrayOfDevices.filteredAllWireless.forEach((device) => {
      if (arrayOfDevices.filteredAllWireless.length == 0) return;
      try {
        const danceBaseMINI = new HID.HID(device.path)
        const newDevice = new WirelessBases.DanceBaseMINI(danceBaseMINI, {}, device.path);
        wireless_bases.add(newDevice);
        danceBaseMINI.on("data", function (data) { process({ wireless_bases, wired_bases }, newDevice, data, 'wireless'); });
        danceBaseMINI.on("error", function (error) { });
      } catch (error) { }
    });
    arrayOfDevices.filteredAllWired.forEach((device) => {
      if (arrayOfDevices.filteredAllWired.length == 0) return;
      try {
        const dancePadPRO = new HID.HID(device.path)
        const newDevice = new WiredBases.DancePadPRO(dancePadPRO, 'DDR', device.path);
        wired_bases.add(newDevice);
        dancePadPRO.on("data", function (data) { process({ wireless_bases, wired_bases }, newDevice, data, 'wired'); });
        dancePadPRO.on("error", function (error) { });
      } catch (error) { }
    });
    return {
      devices: {
        wireless: wireless_bases.getAll(), wired: wired_bases.getAll()
      },
      keys: []
    };
  }
  return await broadcast(searchDevices())
}

const process = (bases, device, data, type) => {
  let bytes = [...data].map(byteToBinaryString).join(" ").split(" ")
  bytes.shift()
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = reverse(bytes[i]);
  }
  bytes = bytes.join("");
  const indices = [];
  const keys = [];
  const zeros = [];
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] === "1") indices.push(i + 1); else zeros.push(`${device.address}-${i + 1}`);
  }
  indices.forEach((key) => {
    if (key == '5') device.type = 'PIU';
    if (key == '11' || key == '12') device.type = 'DDR';
    if (type == 'wireless') {
      keys.push({
        "1": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "LEFT", number: `${device.address}-1` },
        "2": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "RIGHT", number: `${device.address}-2` },
        "3": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "UP", number: `${device.address}-3` },
        "4": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "DOWN", number: `${device.address}-4` },
        "5": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "START", number: `${device.address}-5` },
        "6": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "SELECT", number: `${device.address}-6` },

        "7": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "LEFT", number: `${device.address}-7` },
        "8": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "RIGHT", number: `${device.address}-8` },
        "9": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "UP", number: `${device.address}-9` },
        "10": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "DOWN", number: `${device.address}-10` },
        "11": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "START", number: `${device.address}-11` },
        "12": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "SELECT", number: `${device.address}-12` },

        "13": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "LEFT", number: `${device.address}-13` },
        "14": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "RIGHT", number: `${device.address}-14` },
        "15": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "UP", number: `${device.address}-15` },
        "16": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "DOWN", number: `${device.address}-16` },
        "17": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "START", number: `${device.address}-17` },
        "18": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "SELECT", number: `${device.address}-18` },

        "19": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "LEFT", number: `${device.address}-19` },
        "20": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "RIGHT", number: `${device.address}-20` },
        "21": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "UP", number: `${device.address}-21` },
        "22": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "DOWN", number: `${device.address}-22` },
        "23": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "START", number: `${device.address}-23` },
        "24": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "SELECT", number: `${device.address}-24` },
      }[key])
    }
    else if (device.type == 'PIU') {
      keys.push({
        "1": { controller: "wired - PIU", address: device.address, name: "LEFT TOP", number: `${device.address}-1` },
        "2": { controller: "wired - PIU", address: device.address, name: "RIGHT TOP", number: `${device.address}-2` },
        "3": { controller: "wired - PIU", address: device.address, name: "LEFT BOTTOM", number: `${device.address}-3` },
        "4": { controller: "wired - PIU", address: device.address, name: "RIGHT BOTTOM", number: `${device.address}-4` },
        "5": { controller: "wired - PIU", address: device.address, name: "MIDDLE", number: `${device.address}-5` },
      }[key])
    }
    else {
      keys.push({
        "1": { controller: "wired - DDR", address: device.address, name: "LEFT", number: `${device.address}-1` },
        "2": { controller: "wired - DDR", address: device.address, name: "RIGHT", number: `${device.address}-2` },
        "3": { controller: "wired - DDR", address: device.address, name: "UP", number: `${device.address}-3` },
        "4": { controller: "wired - DDR", address: device.address, name: "DOWN", number: `${device.address}-4` },
        "11": { controller: "wired - DDR", address: device.address, name: "START", number: `${device.address}-11` },
        "12": { controller: "wired - DDR", address: device.address, name: "SELECT", number: `${device.address}-12` },
      }[key])
    }
  });
  broadcast({
    devices: {
      wireless: bases.wireless_bases.getAll(), wired: bases.wired_bases.getAll()
    },
    keys: { down: keys, up: zeros },
  });
  return;
}

module.exports = {
  byteToBinaryString,
  reverse,
  addDevices,
};
