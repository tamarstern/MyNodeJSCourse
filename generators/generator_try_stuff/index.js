
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'), { multiArgs: true });
var url1 = 'http://httpbin.org/', url2 = url1, url3 = url1, url4 = url1;
function* foo() {
    var res1 = yield request.getAsync(url1);
    //you can print the html received with console.log(res1[1]);
    var res2 = yield request.getAsync(url2);
    var res3 = yield request.getAsync(url3);
    var res4 = yield request.getAsync(url4);
    return "all done!!!!";
}
foo = Promise.coroutine(foo);
function* callerFunction() {
    try {
        message = yield foo();
        console.log("success foo!", message);
        return message;
    } catch (err) {
        console.log("error!", err);
    }
}
callerFunction = Promise.coroutine(callerFunction);
callerFunction().then(function (message) {
    console.log("success callfunction!", message);
}).catch(function (err) {
    console.log("error!", err);
});