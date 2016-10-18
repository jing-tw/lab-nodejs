var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(200, 200)
  , ctx = canvas.getContext('2d');

//define the fill colour of the rectangle
ctx.fillStyle = "green";
ctx.strokeStyle = "green";
ctx.fillRect(1,10,100,30); // left, top, width, height
ctx.stroke();


var server,
        port=2012,
        http=require('http');
        server=http.createServer(function(req,res){
            res.writeHead(200,{'Content-type':'image/png'});
            // res.write('<img src="' + canvas.toDataURL() + '" />');    // show the image
            // res.end(canvas);
            canvas.pngStream().pipe(res);
            console.log('guest visted');
        });

server.listen(port);
console.log('Server is running');

