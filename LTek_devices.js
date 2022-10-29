const HID = require("node-hid");
const usbDetect = require('usb-detection');
const { getDeviceList } = require('usb');

const WirelessBases = require("./WirelessBases");
const WiredBases = require("./WiredBases");

const { addDevices } = require("./utils");

const wireless_bases = new WirelessBases();
const wired_bases = new WiredBases();

const devices = getDeviceList();

usbDetect.startMonitoring();

usbDetect.on('add', async function (device) {
  for (const d of devices) {
    if (device.vendorId == 1003 && device.deviceAddress == d.deviceAddress)
      addDevices(HID, wireless_bases, WirelessBases, wired_bases, WiredBases, { address: d.deviceAddress, bus: d.busNumber });
  }
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
