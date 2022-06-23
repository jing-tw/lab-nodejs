
function createBt(){
    let button = document.createElement('button');
    button.innerHTML = 'click me';
    button.addEventListener('click', function() {
        console.log('clicked');
        getBLEDevice();
    });

    var body = document.getElementsByTagName("body")[0];
    body.appendChild(button);
}

async function getBLEDevice(){
    //let uuidService = "80015abc-6e53-11e4-b116-123b93f75cba";
    let device:BluetoothDevice = await navigator.bluetooth.requestDevice({
        filters: [
            { namePrefix: 'XXX101' }
        ],
        optionalServices: ["80015abc-6e53-11e4-b116-123b93f75cba"]
    });

    document.write("device = " + device + "<br\>");
    if (typeof device === 'undefined' || typeof device.gatt === 'undefined'){
        document.write("typeof device === undefined || typeof device.gatt === undefined");
        return;
  }
  
    let server:BluetoothRemoteGATTServer = await device.gatt.connect();
    if (typeof server === 'undefined'){
        document.write("typeof server === undefined");
        return;
    }
    document.write("connected!" +  "<br\>");
    document.write("server = " + server + "<br\>");
 
    server.getPrimaryService('80015abc-6e53-11e4-b116-123b93f75cba').then((service) => {
        document.write("service = " + service + "<br\>");
        document.write("disconnect <br\>");
        server.disconnect();
    }).catch(error => {
        document.write("error  = " + error + "<br\>");
    });

    // let service:BluetoothRemoteGATTService = await server.getPrimaryService("80015abc-6e53-11e4-b116-123b93f75cba");
    // document.write("service = " + service + "<br\>");


    // let services:BluetoothRemoteGATTService[] = await server.getPrimaryServices();
    // services.forEach(service => {
    //     document.write("service = " + service + "<br\>");
    // });
    
    

    // let characteristic = await service.getCharacteristic(0xfffc);

    document.write("service 2 <br\>");
}

async function main(){
    if (!navigator.bluetooth) {
        document.write("Web Bluetooth is not supported.");
        return
    }
    document.write("Web Bluetooth is supported.");
    createBt();
}

main();
