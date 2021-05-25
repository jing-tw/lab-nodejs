const noble = require('@abandonware/noble');
import {Characteristic, Peripheral, Service } from '@abandonware/noble';

let strTEST_DEVICE_BTMac:string = "24:71:89:ec:af:12";

function printBLEPeripheral(peripheral:Peripheral) {
    console.log('peripheral.id = ' + peripheral.id);
    console.log('peripheral.address = ' + peripheral.address);
    console.log('peripheral.addressType = ' + peripheral.addressType);
    console.log('peripheral.connectable = ' + peripheral.connectable);
    console.log('peripheral.advertisement.localName = ' + peripheral.advertisement.localName);
    console.log('peripheral.advertisement.txPowerLevel = ' + peripheral.advertisement.txPowerLevel);
    console.log('peripheral.advertisement.serviceUuids[0] = ' + peripheral.advertisement.serviceUuids[0]);
    //console.log('peripheral.advertisement.serviceSolicitationUuid = ' + peripheral.advertisement.serviceSolicitationUuid);
    console.log('peripheral.advertisement.manufacturerData = ' + peripheral.advertisement.manufacturerData);
    //console.log('peripheral.advertisement.serviceData.uuid = ' + peripheral.advertisement.serviceData.uuid);
    //console.log('peripheral.advertisement.serviceData.data = ' + peripheral.advertisement.serviceData.data);
    console.log('peripheral.rssi = ' + peripheral.rssi);
    //console.log('peripheral.mtu = ' + peripheral.mtu);
  }

noble.on('stateChange', async (state:any) => {
  if (state === 'poweredOn') {
    // await noble.startScanningAsync(['80015ABC-6E53-11E4-B116-123B93F75CBA'], true); // Not for customized ServiceUUID
    await noble.startScanningAsync([], false); //
  }
});

noble.on('discover', async (peripheral:Peripheral) => {
  printBLEPeripheral(peripheral);
  if(peripheral.address != strTEST_DEVICE_BTMac){
    return;
  }
  console.log('found. ');
  console.log('stop scanning. ');
  
  await noble.stopScanningAsync();
  console.log('scanning stopped. ');
  console.log('try to connect ... ');
  await peripheral.connectAsync();
  console.log('connectted');

  printBLEPeripheral(peripheral);


  peripheral.discoverServices(['80015ABC-6E53-11E4-B116-123B93F75CBA'], async (error, services) => {
    if (!error) {
      console.log('discoverAllServicesAndCharacteristics');
      console.log("[---") 
      console.log("Services: \n" + "["+services+"]")
      console.log("---]\n")
    } else{
        console.log("[error] " + error)
    }
    await peripheral.disconnectAsync();
  });

  // work
  // peripheral.discoverAllServicesAndCharacteristics( async (error, services, characteristics) => {
  //   if (!error) {
  //     console.log('discoverAllServicesAndCharacteristics');
  //     console.log("[---") 
  //     console.log("Services: \n" + "["+services+"]")
  //     console.log("Characteristics: \n" + "[" + characteristics + "]")
  //     console.log("---]\n")
  //   } else{
  //       console.log("[error] " + error)
  //   }
  //   await peripheral.disconnectAsync();
  // });

  

  
//   peripheral.connect( async (error) => {
//       if (error){
//         console.log('error on connect: error = ' + error);
//         return;
//       }
//     console.log('connectted. ');
//         printBLEPeripheral(peripheral);

//         peripheral.discoverAllServicesAndCharacteristics( async (error, services, characteristics) => {
//             if (!error) {
//                 console.log("[---") 
//                 console.log("Services: \n" + "["+services+"]")
//                 console.log("Characteristics: \n" + "[" + characteristics + "]")
//                 console.log("---]")
//             } else{
//                 console.log("[error] " + error)
//             }
//         });

        
//         await peripheral.disconnectAsync();
//         process.exit(0);
//     });
//     console.log('try to connect over ... ');
//   await peripheral.connectAsync();
//   const {characteristics} = await peripheral.discoverSomeServicesAndCharacteristicsAsync(['180f'], ['2a19']);
//   const batteryLevel = (await characteristics[0].readAsync())[0];

//   console.log(`${peripheral.address} (${peripheral.advertisement.localName}): ${batteryLevel}%`);

//   await peripheral.disconnectAsync();
//   process.exit(0);
});

console.log("Please make sure \n1. The Bluetooth device was powered on.\n2. The peripheral does not be connected.")
console.log("Scanning...");