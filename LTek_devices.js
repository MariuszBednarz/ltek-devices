const HID = require("node-hid");
const usbDetect = require('usb-detection');

const WirelessBases = require("./WirelessBases");
const WiredBases = require("./WiredBases");

const { addDevices } = require("./utils");

const wireless_bases = new WirelessBases();
const wired_bases = new WiredBases();


usbDetect.startMonitoring();
addDevices(HID, wireless_bases, WirelessBases, wired_bases, WiredBases);

usbDetect.on('add', async function () {
  addDevices(HID, wireless_bases, WirelessBases, wired_bases, WiredBases);
});

usbDetect.on('remove', function (device) {
  setTimeout(function () {
    if (device === undefined) return;
    wireless_bases.remove(device.serialNumber);
    wired_bases.remove(device.serialNumber);
    console.log(JSON.stringify(
      {
        devices: { wireless: wireless_bases.getAll(), wired: wired_bases.getAll() },
      }
    ));
  }, 3000)
})
