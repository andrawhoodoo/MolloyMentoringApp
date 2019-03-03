const http = require("http");
const Router = require("./router");

var counter = 0;
var clientList = [];
const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*"
};
const router = new Router();

http
  .createServer((request, response) => {
    const messages = [];

    response.writeHead(200, header);
    console.log(request.method); // *** COMPArE IN ROUTER ***

    request
      .on("data", chunk => {
        messages.push(chunk);
        console.log(messages[0] + "message1");
        response.writeHead(200, header);
        response.end(messages[0]);
      })
      .on("end", () => {
        console.log("end");
        // at this point, `body` has the entire request body stored in it as a string
      });

    console.log("ServerPotato" + counter++);

    //response.writeHead(200, header);
    //response.write("" + message);

    //console.log("potato" + counter++); //TEST
  })
  .listen(8000);
console.log("Listening PORT:8000");

/*const { createServer } = require("http");
const Router = require("./router");

var counter = 0;
const messages = [];
var clientList = [];
const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*"
};
const router = new Router();

let server = createServer((request, response) => {
  response.writeHead(200, header);
  console.log(request.method); // *** COMPArE IN ROUTER ***

  request
    .on("data", chunk => {
      console.log(JSON.stringify(chunk));
    })
    .on("end", () => {
      console.log(messages);
      // at this point, `body` has the entire request body stored in it as a string
    });

  console.log(messages);

  console.log("ServerPotato" + counter++);
  response.writeHead(200, header);
  response.write("" + messages[1]);

  //response.writeHead(200, header);
  //response.write("" + message);

  //console.log("potato" + counter++); //TEST
  response.end();
});
server.listen(8000);
console.log("Listening PORT:8000");
*/
