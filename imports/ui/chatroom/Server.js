const http = require("http");
const Router = require("./router");

const messages = [];
const clientList = [];
const header = {
  "Content-Type": "text/plain",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*"
};
var counter = 0;

const router = new Router();

http
  .createServer((request, response) => {
    let resolved = router.resolve(this, { request, response });
    //console.log("ServerPotato" + counter++);
    //console.log(request.url);
    //console.log(messages);

    if (resolved) {
      resolved.catch(error => {
        if (error.status != null) return error;
        return { body: String(error), status: 500 };
      });
    } else {
      response.writeHead(200, header);
      console.log(messages);

      response.write(JSON.stringify(messages));
    }
    //response.writeHead(200, header);
    response.end();
    //console.log("ServerPotato" + counter);
  })
  .listen(8000);
console.log("Listening PORT:8000");

const getMessageURL = "/GETMESSAGE";
const messageURL = "/MESSAGE";
let message = "";

router.add("POST", getMessageURL, (http, requestURL, { request, response }) => {
  console.log(request.url);
  clientList.push({ request, response });
});

router.add("POST", messageURL, (http, requestURL, { request, response }) => {
  console.log(request.url);
  request
    .on("data", chunk => {
      message += chunk;
      console.log("INSIDEREQUESTDATA");
    })
    .on("end", chunk => {
      messages.push(JSON.parse(message));
      message = "";
    });
});

// WORKING ITERATION
/*
const http = require("http");
const Router = require("./router");

var counter = 0;
const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*"
};
const router = new Router();

http
  .createServer((request, response) => {
    let resolved = router.resolve(this, request);
    const messages = [];
    const clientList = [];

    response.writeHead(200, header);

    console.log(request.method); // *** COMPArE IN ROUTER ***

    request
      .on("data", chunk => {
        messages.push(chunk);
        console.log(messages[0] + "message1");
        response.end(messages[0]);
      })
      .on("end", () => {
        console.log("end");
      });

    console.log("ServerPotato" + counter++);
  })
  .listen(8000);
console.log("Listening PORT:8000");
*/
