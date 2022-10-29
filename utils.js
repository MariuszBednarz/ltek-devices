const byteToBinaryString = function (buffer) {
  return buffer.toString(2).padStart(8, "0");
};

const reverse = function (string) {
  return string.split("").reverse().join("");
};

const addDevices = function (HID, wireless_bases, WirelessBases, wired_bases, WiredBases) {
  setTimeout(function () {
    const searchDevices = function () {
      const devices = HID.devices();
      devices.forEach((device) => {
        try {
          if (device.vendorId == 1003 && device.productId == 32772) {
            const danceBaseMINI = new HID.HID(device.path)
            const newDevice = new WirelessBases.DanceBaseMINI(danceBaseMINI, {});
            wireless_bases.add(newDevice);
          }
        } catch (error) {
          console.log(error)
        }
      });
      devices.forEach((device) => {
        try {
          if (device.vendorId == 1003 && device.productId == 32833) {
            console.log(device)
            const dancePadPRO = new HID.HID(device.path)
            const newDevice = new WiredBases.DancePadPRO(dancePadPRO, 'DDR');
            wired_bases.add(newDevice);
          }
        } catch (error) {
          console.log(error)
        }
      });

      return {
        devices: {
          wireless: wireless_bases.getAll(), wired: wired_bases.getAll()
        },
      };
    }
    const available = searchDevices();
    console.log(available)

    for (const entry of available.devices.wireless.entries()) {
      const device = wireless_bases.getBySerialNumber(entry[0]);
      device.hid.on("data", function (data) {
        process(device, data, 'wireless');
      });
      device.hid.on("error", function (err) { console.log(err) });
    }
    for (const entry of available.devices.wired.entries()) {
      const device = wired_bases.getBySerialNumber(entry[0]);
      device.hid.on("data", function (data) {
        process(device, data, 'wired');
      });
      device.hid.on("error", function (err) { console.log(err) });
    }
  }, 3000)
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
        "1": { controller: "wireless - 1", serial: device.slots.slot1, name: "LEFT" },
        "2": { controller: "wireless - 1", serial: device.slots.slot1, name: "RIGHT" },
        "3": { controller: "wireless - 1", serial: device.slots.slot1, name: "UP" },
        "4": { controller: "wireless - 1", serial: device.slots.slot1, name: "DOWN" },
        "5": { controller: "wireless - 1", serial: device.slots.slot1, name: "START" },
        "6": { controller: "wireless - 1", serial: device.slots.slot1, name: "SELECT" },

        "7": { controller: "wireless - 2", serial: device.slots.slot2, name: "LEFT" },
        "8": { controller: "wireless - 2", serial: device.slots.slot2, name: "RIGHT" },
        "9": { controller: "wireless - 2", serial: device.slots.slot2, name: "UP" },
        "10": { controller: "wireless - 2", serial: device.slots.slot2, name: "DOWN" },
        "11": { controller: "wireless - 2", serial: device.slots.slot2, name: "START" },
        "12": { controller: "wireless - 2", serial: device.slots.slot2, name: "SELECT" },

        "13": { controller: "wireless - 3", serial: device.slots.slot3, name: "LEFT" },
        "14": { controller: "wireless - 3", serial: device.slots.slot3, name: "RIGHT" },
        "15": { controller: "wireless - 3", serial: device.slots.slot3, name: "UP" },
        "16": { controller: "wireless - 3", serial: device.slots.slot3, name: "DOWN" },
        "17": { controller: "wireless - 3", serial: device.slots.slot3, name: "START" },
        "18": { controller: "wireless - 3", serial: device.slots.slot3, name: "SELECT" },

        "19": { controller: "wireless - 4", serial: device.slots.slot4, name: "LEFT" },
        "20": { controller: "wireless - 4", serial: device.slots.slot4, name: "RIGHT" },
        "21": { controller: "wireless - 4", serial: device.slots.slot4, name: "UP" },
        "22": { controller: "wireless - 4", serial: device.slots.slot4, name: "DOWN" },
        "23": { controller: "wireless - 4", serial: device.slots.slot4, name: "START" },
        "24": { controller: "wireless - 4", serial: device.slots.slot4, name: "SELECT" },
      }[key])
    }
    else if (device.type == 'PIU') {
      response.push({
        "1": { controller: "wired - PIU", name: "LEFT TOP" },
        "2": { controller: "wired - PIU", name: "RIGHT TOP" },
        "3": { controller: "wired - PIU", name: "LEFT BOTTOM" },
        "4": { controller: "wired - PIU", name: "RIGHT BOTTOM" },
        "5": { controller: "wired - PIU", name: "MIDDLE" },
      }[key])
    }
    else {
      response.push({
        "1": { controller: "wired - DDR", name: "LEFT" },
        "2": { controller: "wired - DDR", name: "RIGHT" },
        "3": { controller: "wired - DDR", name: "UP" },
        "4": { controller: "wired - DDR", name: "DOWN" },
        "11": { controller: "wired - DDR", name: "START" },
        "12": { controller: "wired - DDR", name: "SELECT" },
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
