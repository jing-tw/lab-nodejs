var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(200, 200)
  , ctx = canvas.getContext('2d');

ctx.font = '30px Impact';
ctx.rotate(.1);
ctx.fillText("Awesome!", 50, 100);

var te = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + te.width, 102);
ctx.stroke();


var server,
        port=2012,
        http=require('http');
        server=http.createServer(function(req,res){
            res.writeHead(200,{'Content-type':'image/png'});
            
 //            res.writeHead(200,{'Content-type':'text/plain'});
             res.write('<img src="' + canvas.toDataURL() + '" />');    // show the image
             res.end(canvas);
 
         //   res.writeHead(200,{'Content-type':'image/png'});
         //   canvas.pngStream().pipe(res);
            console.log('guest visted');
        });

server.listen(port);
console.log('Server is running');

