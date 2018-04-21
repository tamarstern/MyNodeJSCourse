function *foo() {
    var x = yield 3;
    var y = x.toUpperCase(); // could be a TypeError error!
    yield y;
}

var it = foo();

it.next(); // { value:3, done:false }

try {
    it.next( 42 ); // `42` won't have `toUpperCase()`
}
catch (err) {
    console.log( err ); // TypeError (from `toUpperCase()` call)
}