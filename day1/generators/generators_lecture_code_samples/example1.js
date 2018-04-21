function *simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

var sGen = simpleGenerator();
console.log(sGen.next());
console.log(sGen.next());
console.log(sGen.next());
console.log(sGen.next());
console.log(sGen.next());
console.log(sGen.next());