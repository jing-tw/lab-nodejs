import needle from 'needle'
import fs from 'fs'

function main(){
    let strImg:string = './A123-20210226102306.jpg';
    const urlEndPoint:string = 'https://notify-api.line.me/api/notify';
    const bufContent = fs.readFileSync(strImg);

    var data = {
        message: 'send from nodejs',
        imageFile: bufContent
    }

    var options = {
        multipart: true,    // must have for sending image.
        json: true,
        headers: { 'Authorization': 'Bearer eBTHTlHvJJXX8Bc6WsQ8XPs05j75Vbz4rj7FNgrivVj' }
    }

    needle.post(urlEndPoint, data, options, function(err, resp, body) {
        if(err){
            console.log('Shoot! Something is wrong: ' + err.message);
            return;
        }
        if (resp.statusCode != 200){
            console.log('Post not 200. resp = ' + resp.body.toString());
            return;
        }

        console.log('Post OK. resp = ' + resp.body.toString());
    });
}

main();


// import fs from 'fs'
// import FormData from 'form-data'

// var form = new FormData();
// form.append('message', 'sent txt from nodejs');

// form.submit('https://notify-api.line.me/api/notify', function(err, result) {
//     console.log('error = ' + err + ' result = ' + result);
// });