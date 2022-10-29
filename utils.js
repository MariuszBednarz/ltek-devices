const byteToBinaryString = function (buffer) {
  return buffer.toString(2).padStart(8, "0");
};

const reverse = function (string) {
  return string.split("").reverse().join("");
};

const addDevices = function (HID, wireless_bases, WirelessBases, wired_bases, WiredBases, arrayOfDevices) {
  setTimeout(function () {
    const searchDevices = function () {
      const devices = HID.devices();
      devices.forEach((device) => {
        try {
          if (device.vendorId == 1003 && device.productId == 32772) {
            const danceBaseMINI = new HID.HID(device.path)
            const address = arrayOfDevices.filteredAllWireless.shift();
            const newDevice = new WirelessBases.DanceBaseMINI(danceBaseMINI, {}, address);
            wireless_bases.add(newDevice);
            danceBaseMINI.on("data", function (data) { process(newDevice, data, 'wireless'); });
            danceBaseMINI.on("error", function (error) { console.log(error) });
          }
        } catch (error) {}
      });
      devices.forEach((device) => {
        try {
          if (device.vendorId == 1003 && device.productId == 32833 && (device.usagePage > 100 || device.usage > 100)) {
            const dancePadPRO = new HID.HID(device.path)
            const address = arrayOfDevices.filteredAllWired.shift()
            const newDevice = new WiredBases.DancePadPRO(dancePadPRO, 'DDR', address);
            wired_bases.add(newDevice);
            dancePadPRO.on("data", function (data) { process(newDevice, data, 'wired'); });
            dancePadPRO.on("error", function (error) { console.log(error) });
          }
        } catch (error) {}
      });

      return {
        devices: {
          wireless: wireless_bases.getAll(), wired: wired_bases.getAll()
        },
      };
    }
    const available = searchDevices();
    console.log(available)
  }, 1500)
}

const process = (device, data, type) => {
  let bytes = [...data].map(byteToBinaryString).join(" ").split(" ")
  bytes.shift()
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = reverse(bytes[i]);
  }
  bytes = bytes.join("");
  const indices = [];
  const response = [];
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i] === "1") indices.push(i + 1);
  }

  indices.forEach((key) => {
    if (key == '5') device.type = 'PIU';
    if (key == '11' || key == '12') device.type = 'DDR';
    if (type == 'wireless') {
      response.push({
        "1": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "LEFT" },
        "2": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "RIGHT" },
        "3": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "UP" },
        "4": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "DOWN" },
        "5": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "START" },
        "6": { controller: "wireless - 1", address: device.address, serial: device.slots.slot1, name: "SELECT" },

        "7": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "LEFT" },
        "8": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "RIGHT" },
        "9": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "UP" },
        "10": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "DOWN" },
        "11": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "START" },
        "12": { controller: "wireless - 2", address: device.address, serial: device.slots.slot2, name: "SELECT" },

        "13": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "LEFT" },
        "14": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "RIGHT" },
        "15": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "UP" },
        "16": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "DOWN" },
        "17": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "START" },
        "18": { controller: "wireless - 3", address: device.address, serial: device.slots.slot3, name: "SELECT" },

        "19": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "LEFT" },
        "20": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "RIGHT" },
        "21": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "UP" },
        "22": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "DOWN" },
        "23": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "START" },
        "24": { controller: "wireless - 4", address: device.address, serial: device.slots.slot4, name: "SELECT" },
      }[key])
    }
    else if (device.type == 'PIU') {
      response.push({
        "1": { controller: "wired - PIU", address: device.address, name: "LEFT TOP" },
        "2": { controller: "wired - PIU", address: device.address, name: "RIGHT TOP" },
        "3": { controller: "wired - PIU", address: device.address, name: "LEFT BOTTOM" },
        "4": { controller: "wired - PIU", address: device.address, name: "RIGHT BOTTOM" },
        "5": { controller: "wired - PIU", address: device.address, name: "MIDDLE" },
      }[key])
    }
    else {
      response.push({
        "1": { controller: "wired - DDR", address: device.address, name: "LEFT" },
        "2": { controller: "wired - DDR", address: device.address, name: "RIGHT" },
        "3": { controller: "wired - DDR", address: device.address, name: "UP" },
        "4": { controller: "wired - DDR", address: device.address, name: "DOWN" },
        "11": { controller: "wired - DDR", address: device.address, name: "START" },
        "12": { controller: "wired - DDR", address: device.address, name: "SELECT" },
      }[key])
    }
  });

  return console.log(response);
}

module.exports = {
  byteToBinaryString,
  reverse,
  addDevices,
};
