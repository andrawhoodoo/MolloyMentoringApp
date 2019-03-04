/*const http = require("http");
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
    console.log("ServerPotato" + counter++);
    const requestURL = request.url;

    response.writeHead(200, header);

    let resolved = router.resolve(this, request);
    router.add("POST", requestURL, async request => {
      if (requestURL == "/GETMESSAGE") {
        console.log("GETTTTTTTTTMESSSSAGEEE");
      } else if (requestURL == "/MESSAGE") {
        console.log("MESSSSSSSSSSSSSSsAGE");
        request.on("data", chunk => {
          messages.push(chunk);
          console.log("INSIDEREQUESTDATA");
          console.log(messages[0] + "message1");
          response.end(messages[0]);
        });
      } else {
        console.log("fail");
      }
    });

    if (resolved) {
      resolved
        .catch(error => {
          if (error.status != null) return error;
          return { body: String(error), status: 500 };
        })
        .then(console.log("potatototoatospotasotpaopt"));
    }

    //console.log(requestURL);
    //console.log(request.method); // *** COMPArE IN ROUTER ***

    console.log("ServerPotato" + counter);
  })
  .listen(8000);
console.log("Listening PORT:8000");

*/

// WORKING ITERATION

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
