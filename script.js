const fs   = require('fs');
const jwt   = require('jsonwebtoken');

// PAYLOAD
var payload = {
    data1: "Data 1",
    data2: "Data 2",
    data3: "Data 3",
    data4: "Data 4",
};

// PRIVATE and PUBLIC key
var privateKEY  = fs.readFileSync('./jwtRS256.key', 'utf8');
var publicKEY  = fs.readFileSync('./jwtRS256.key.pub', 'utf8');
var i  = 'Mysoft corp';          // Issuer 
var s  = 'some@user.com';        // Subject 
var a  = 'http://mysoftcorp.in'; // Audience

// SIGNING OPTIONS
var signOptions = {
    expiresIn:  "12h",
    algorithm:  "RS256"
}

console.log(privateKEY);
//var token = jwt.sign(payload, "secret")
var token = jwt.sign(payload, privateKEY, signOptions);
console.log("Token - " + token)



var verifyOptions = {
    expiresIn:  "12h",
    algorithm:  "RS256"
};
console.log(publicKEY);
//var legit = jwt.verify(token, "secret");
var legit = jwt.verify(token, publicKEY, verifyOptions);
console.log("\nJWT verification result: " + JSON.stringify(legit));

try {
    var badtoken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhMSI6IkRhdGEgMSIsImRhdGEyIjoiRGF0YSAyIiwiZGF0YTMiOiJEYXRhIDMiLCJkYXRhNCI6IkRhdGEgNCIsImlhdCI6MTU0MDAxNzkwNSwiZXhwIjoxNTQwMDYxMTA1fQ.cr2VtxSojrpCKdkJatzkv3NFGi8brCEAMT_GWo2pUbBNkX2UtZF8HmK5mRzGvW0PEYmd8glX4pD49d47K3X28MwkkDoayKYWnVHjYUrM9bexuTXXz1j-WoGGMnqMW0BntK10K2jZYUXHFHvC0s7UETIzhbhkG-wClI-f3Zg8QfrD0dqzzWUYkHacvK85U6esABHM13wgWYwypmeboxpp4mwcR186VUHCsldM6_XKf1UUnVREUT9pfwZvkz7mRqLNZDE-hOG0OFmV4BHYhYgXwN-0peJSp5oYK9sllSvt4z1Z0oVCMBtySE3GAWY_ipJglB1nuzvXNPfmeoY41KmAqE8LRdc6h04EXLQ2hciWJqOTVj9XejfLorJmPcyd0aN9azpv-P8V__5L7QNhiwKRaxF1CRaRulojRW1sRqjXTauNe-MdE0L668WUAYBtsjxA-L2bc1Ie4w4xUWxfq_cj8EaBXevPdWHRj0GO9QQ8hynyMH5xf2APqkyeMweCneijud7_7uDZjSsMl-zMe-DT8D7qlbF6IE0c_6yPRw39W2-diCC49fJhgs72E7WNEewp-jD1mnpV9fNxmaJPx-IL-HC_Y2sExKYjugQ8hdKjvBMT5w533Ebdp5RvuhtUn3zH-_9I1Z08NoMtDjE-dcKK6K0WpPhHzNOlxHPxKQkxySM"
    var illegit = jwt.verify(badtoken, publicKEY, verifyOptions);
} catch (error) {
    console.log(error);
}
