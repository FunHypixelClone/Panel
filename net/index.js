const conf = require('../conf');
const net = require('net');
const ACTION = require('./action');

var server = net.createServer();    
server.on('connection', handleConnection);
server.listen(conf.net, function() {    
  console.log('TCP - Server listening - %j', server.address().port);  
});
function handleConnection(conn) {    
  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;  
  console.log('TCP - New client - %s', remoteAddress);
  conn.on('data', onConnData);  
  conn.once('close', onConnClose);  
  conn.on('error', onConnError);

    
    function onConnData(d) {  
        console.log('TCP - Data - %s: %j', remoteAddress, d);  

        d = String(d).substring(0, d.length - 2);
        console.log('s', d.length, d);

        if (String(d) == '.') {
            conn.end('\n\tBTTM\n\n');
            return;
        }

        var data = String(d).split(',');
        var Action = data[0];
        var Data = String(data[1]);

        if (Data) {
            Data = Data.split('|')
        } else {
            Data = [];
        }

        if (Action == ACTION.AUTH_REQ) {
            conn.write('1,OK');
        }
        if (Action == ACTION.AUTH_TEST) {
            var token = Data[0];
            conn.write('1,OK');
        }

        // conn.write(d);
    }
    function onConnClose() {  
        console.log('TCP - connection from %s closed', remoteAddress);  
    }
    function onConnError(err) {  
        console.log('TCP - Connection %s error: %s', remoteAddress, err.message);  
    }  
}