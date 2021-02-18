const http = require("http");
const fs = require('fs');

const server = http.createServer((req ,res) => {
    // console.log(req);

    // set header contant type
    res.setHeader('Content-Type', 'text/html')

    //send the html file
    fs.readFile('./Views/index.html' , (err, data) => {
        if(err){
            console.log('Something went wrong');
            res.end()
        }
        // res.write(data);
        console.log('HTML transfer success!');
        res.end(data);
    })
});

server.listen(3000, 'localhost' , () => {
    console.log('The server is up and running listening on port 3000');
})

