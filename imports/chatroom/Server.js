const { createServer } = require("http");
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
  //router.resolve(this, request);

  // MOVE TO ROUTER
  var message = decodeURIComponent(request.url);
  while (message.charAt(0) === "/") {
    message = message.substr(1);
  }
  clientList.push(request.url);
  console.log(clientList);
  //console.log(request.origin);

  messages.push(message);
  console.log(messages);
  // MOVE TO ROUTER

  //messages.map(console.log); //TEST
  //clientList.map(console.log); //TEST

  clientList.map((message, i) => {
    key = { i };
    console.log(message + counter++);
    response.writeHead(200, header);
    response.write("" + message);
  });

  //response.writeHead(200, header);
  //response.write("" + message);

  //console.log("potato" + counter++); //TEST
  clientList = [];
  response.end();
});
server.listen(8000);
console.log("Listening PORT:8000");
