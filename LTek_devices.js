const HID = require("node-hid");

const WirelessBases = require("./WirelessBases");
const WiredBases = require("./WiredBases");

const { addDevices } = require("./utils");

const wireless_bases = new WirelessBases();
const wired_bases = new WiredBases();

const { broadcast } = require("./broadcast");

let previous;

const connect = async function () {
  let allPluggedDevices = HID.devices().filter(d => d.vendorId == 1003 && d.usagePage < 100 && d.usage < 100);
  const filteredAllWireless = allPluggedDevices
    .filter(device => device.productId === 32772)
  const filteredAllWired = allPluggedDevices
    .filter(device => device.productId === 32833)
  await addDevices(HID, wireless_bases, WirelessBases, wired_bases, WiredBases, { filteredAllWireless, filteredAllWired });
  previous = JSON.stringify(allPluggedDevices);
  return previous;
}

connect()

const lookaround = async function () {
  let allPluggedDevices = HID.devices().filter(d => d.vendorId == 1003 && d.usagePage < 100 && d.usage < 100);
  await broadcast({
    devices: {
      wireless: wireless_bases.getAll(), wired: wired_bases.getAll()
    },
    keys: []
  });
  if (JSON.stringify(allPluggedDevices) != previous) {
    setTimeout(() => {
      wireless_bases.clear();
      wired_bases.clear();
    }, 3000);
    setTimeout(() => {
      connect()
    }, 3000);
  }
}
setInterval(lookaround, 5000);