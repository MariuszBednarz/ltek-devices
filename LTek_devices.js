const HID = require("node-hid");
const usbDetect = require('usb-detection');
const { getDeviceList } = require('usb');

const WirelessBases = require("./WirelessBases");
const WiredBases = require("./WiredBases");

const { addDevices } = require("./utils");

const wireless_bases = new WirelessBases();
const wired_bases = new WiredBases();

const allPluggedDevices = getDeviceList();
const filteredAllWireless = allPluggedDevices
  .filter(device => device.deviceDescriptor.idVendor === 1003 && device.deviceDescriptor.idProduct === 32772)
  .map(d => d.deviceAddress);
const filteredAllWired = allPluggedDevices
  .filter(device => device.deviceDescriptor.idVendor === 1003 && device.deviceDescriptor.idProduct === 32833)
  .map(d => d.deviceAddress);
usbDetect.startMonitoring();
addDevices(HID, wireless_bases, WirelessBases, wired_bases, WiredBases, { filteredAllWireless, filteredAllWired });

usbDetect.on('add', function (device) {
  const deviceArray = [device];
  const filteredAllWireless = deviceArray
    .filter(d => d.vendorId === 1003 && d.productId === 32772)
    .map(d => d.deviceAddress);
  const filteredAllWired = deviceArray
    .filter(d => d.vendorId === 1003 && d.productId === 32833)
    .map(d => d.deviceAddress);
  addDevices(HID, wireless_bases, WirelessBases, wired_bases, WiredBases, { filteredAllWireless, filteredAllWired });
});
usbDetect.on('remove', function (device) {
  const deviceArray = [device];
  const filteredAllWireless = deviceArray
    .filter(d => d.vendorId === 1003 && d.productId === 32772)
    .map(d => d.deviceAddress);
  const filteredAllWired = deviceArray
    .filter(d => d.vendorId === 1003 && d.productId === 32833)
    .map(d => d.deviceAddress);
  filteredAllWireless.forEach(address => wireless_bases.remove(`${address}`));
  filteredAllWired.forEach(address => wired_bases.remove(`${address}`));

  console.log({
    devices: {
      wireless: wireless_bases.getAll(), wired: wired_bases.getAll()
    },
  })
});