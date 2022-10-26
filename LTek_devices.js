/* 
KOMENDA 202 - ŻĄDANIE PEŁNEJ TABLICZKI ZNAMIONOWEJ URZĄDZENIA W SLOCIE			
uint8_t  device_type; 
uint8_t  color_version;   
uint32_t serial_number;
uint8_t  firmware_version; 
uint8_t  reserved[1];  
<device_type>
0x00 - reserved (do not use)
0x01 - mata przewodowa 5+(2) button(HID:12BUTTON), USB_PAD_rev5.0 - HID_ID_PRODUCT: "L-TEK Dance Pad PRO", VID:0x03EB, PID:0x8041
0x02 - mata przewodowa 5+(2) button(HID:12BUTTON), USB_PAD_rev6.0 - HID_ID_PRODUCT: "L-TEK Dance Pad PRO", VID:0x03EB, PID:0x8041
0x10 - stacja bazowa Mini, USB_RF_base_mini_v1.0 - HID_ID_PRODUCT: "L-TEK Dance Base MINI", VID:0x03EB (dec 1003), PID:0x8004 (dec 32772)
0x20 - mata bezprzewodowa 5+(2) button, RF_24_game_controller_v2.x
0x80 - przewodowy kontroler świateł 7 wyjść (wersja testowa) USB_Lights7_rev1.0 - HID_ID_PRODUCT: "L-TEK Lights", VID:0x03EB, PID:0x800A
0x90 - bezprzewodowy kontroler świateł 6/7 output (wersja testowa)
<color_version>
1 - czarna mata (ExPRO)
2 - biała mata (ExPROWhite)
4 - metal black (ExPROMetalBlack)
5 - metal white (ExPROMetalWhite)
255 - jeśli niezdefiniowany
KOMENDA 201 - ŻĄDANIE STATUSU URZĄDZEŃ W SLOTACH
//0a 2d 11 80 10 0a 00 00 00 01 ff ff ff ff ff 02 ff ff ff ff ff 03 ff ff ff ff ff 04 ff ff ff ff ff 05 ff ff ff ff ff brak podlaczonych
//0a 2d 11 80 10 0a 00 00 00 81 20 15 00 00 00 02 ff ff ff ff ff 03 ff ff ff ff ff 04 ff ff ff ff ff 05 ff ff ff ff ff pierszy pad
//0a 2d 11 80 10 0a 00 00 00 81 20 15 00 00 00 82 20 1b 00 00 00 03 ff ff ff ff ff 04 ff ff ff ff ff 05 ff ff ff ff ff dwa pady
Pierwszy pad, numer serii ( 20 15 00 00 00 ) 
Drugi pad, numer serii (20 1b 00 00 00 ) 
*/

const WirelessBases = require("./WirelessBases");
const HID = require("node-hid");
const usbDetect = require('usb-detection');
const wireless_bases = new WirelessBases();
usbDetect.startMonitoring();

usbDetect.on('add', function (device) {
  setTimeout(function () {
    const searchDevices = function () {
      const danceBaseMINI = new HID.HID(1003, 32772)
      const newDevice = new WirelessBases.DanceBaseMINI(danceBaseMINI);
      wireless_bases.add(newDevice);

      return {
        devices: {
          wireless: wireless_bases.getAll(),
        },
      };
    }
    const available = searchDevices();
    console.log(available)

    for (const entry of available.devices.wireless.entries()) {
      const device = wireless_bases.getBySerialNumber(entry[0]);
      device.hid.on("data", function (data) {
        device.process(data);
      });
      device.hid.on("error", function (err) { console.log(err) });
    }
  }, 3000)
});
usbDetect.on('remove', function (device) {
  console.log(device)
  setTimeout(function () {
    wireless_bases.remove(device.serialNumber);
    console.log(wireless_bases.getAll());
  }, 3000)
})
