import https from "https";
import crypto from "crypto";
import fs from "fs";

const start = Date.now();

function doRequest() {
  https
    .request("https://www.google.com", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("doRequest - end:", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", (_err: Error | null, _derivedKey: Buffer) => {
    console.log("doHash:", Date.now() - start);
  });
}

doRequest();

fs.readFile("multiTask.ts", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
