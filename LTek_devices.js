const HID = require("node-hid");

const WirelessBases = require("./WirelessBases");
const WiredBases = require("./WiredBases");

const { addDevices } = require("./utils");

const wireless_bases = new WirelessBases();
const wired_bases = new WiredBases();

const { broadcast, clearKeys } = require("./broadcast");


let previous;

const tryhyhy = async function(){
  let allPluggedDevices = HID.devices().filter(d=>d.vendorId == 1003 && d.usagePage < 100 && d.usage < 100);

  const filteredAllWireless = allPluggedDevices
    .filter(device => device.productId === 32772)

  const filteredAllWired = allPluggedDevices
    .filter(device => device.productId === 32833 )
  await addDevices(HID, wireless_bases, WirelessBases, wired_bases, WiredBases, { filteredAllWireless, filteredAllWired });
  previous = JSON.stringify(allPluggedDevices);
  return previous;
}

tryhyhy()

const check = async function() {
  console.log("checking..")
  let allPluggedDevices = HID.devices().filter(d=>d.vendorId == 1003 && d.usagePage < 100 && d.usage < 100);
  console.log(allPluggedDevices)
  if (JSON.stringify(allPluggedDevices) != previous){
    setTimeout(() => {
        //clearKeys();
        wireless_bases.clear();
        wired_bases.clear();
    }, 3000);
    setTimeout(() => {
     tryhyhy()
  }, 3000);
   
  }
}
setInterval(check,5000);


//usbDetect.startMonitoring();
// const abc = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(allPluggedDevices = getDeviceList().filter(d=> d.deviceDescriptor.idVendor == 1003));
//   }, 3000);
// });
// usbDetect.on('add', async function (device) {
//   clearKeys();
//   wireless_bases.clear();
//   wired_bases.clear();
//   await abc.then(data => {
//     const filteredAllWireless = data
//       .filter(device => device.deviceDescriptor.idVendor === 1003 && device.deviceDescriptor.idProduct === 32772)
//       .map(d => d.deviceAddress);
//     const filteredAllWired = data
//       .filter(device => device.deviceDescriptor.idVendor === 1003 && device.deviceDescriptor.idProduct === 32833)
//       .map(d => d.deviceAddress);
//     addDevices(HID, wireless_bases, WirelessBases, wired_bases, WiredBases, { filteredAllWireless, filteredAllWired });

//     broadcast({
//       devices: {
//         wireless: wireless_bases.getAll(), wired: wired_bases.getAll()
//       },
//       keys: []
//     })
//   }
//   );
// });
// usbDetect.on('remove', async function () {
//   clearKeys();
//   wireless_bases.clear();
//   wired_bases.clear();
//   await abc.then(data => {
//     const filteredAllWireless = data
//       .filter(device => device.deviceDescriptor.idVendor === 1003 && device.deviceDescriptor.idProduct === 32772)
//       .map(d => d.deviceAddress);
//     const filteredAllWired = data
//       .filter(device => device.deviceDescriptor.idVendor === 1003 && device.deviceDescriptor.idProduct === 32833)
//       .map(d => d.deviceAddress);
//     addDevices(HID, wireless_bases, WirelessBases, wired_bases, WiredBases, { filteredAllWireless, filteredAllWired });

//     broadcast({
//       devices: {
//         wireless: wireless_bases.getAll(), wired: wired_bases.getAll()
//       },
//       keys: []
//     })
//   }
//   );
// });