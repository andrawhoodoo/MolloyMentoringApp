const http = require("http");
const Router = require("./router");

const messages = [];
const clientList = [];
const header = {
  "Content-Type": "application/json",
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
      for (i = 0; i < messages.length; i++) {
        response.writeHead(200, header);
        console.log(clientList[1]);
        console.log(messages[i]);
        response.end(messages[i]);
      }
    }

    //console.log("ServerPotato" + counter);
  })
  .listen(8000);
console.log("Listening PORT:8000");

const getMessageURL = "/GETMESSAGE";
const messageURL = "/MESSAGE";

router.add("POST", getMessageURL, (http, requestURL, { request, response }) => {
  console.log(request.url);
  clientList.push({ request, response });
});

router.add("POST", messageURL, (http, requestURL, { request, response }) => {
  console.log(request.url);
  request.on("data", chunk => {
    messages.push(chunk);
    console.log("INSIDEREQUESTDATA");
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
