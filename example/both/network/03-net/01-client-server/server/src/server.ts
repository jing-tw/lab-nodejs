import net, {Server, AddressInfo} from 'net'
//import config  = require('../config/dev');
import config from '../config/dev'

let port:number = config.machine.port;

function createServerForFeedData(){
    const server:Server = net.createServer();
    server.on('connection',function(socket:any){
      console.log('a client connected.')
      var rport = socket.remotePort;
      var raddr = socket.remoteAddress;

      console.log('REMOTE Socket is listening at port' + rport);
      console.log('REMOTE Socket ip :' + raddr);
      console.log('Allocate queue');

      socket.on('data',function(data:any){
        console.log('data = ' + data);
      });
    });

    server.listen(port, () => {
        const address:AddressInfo = server.address() as AddressInfo;
        console.log('Server ready. (for accept audio stream). port = ' + address.port);
      });
  }

function main(){
    createServerForFeedData();
}

main();