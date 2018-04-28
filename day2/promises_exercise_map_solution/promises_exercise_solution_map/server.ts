// You probobly don't need a helper library for Promise/Async after all

const seedValues = [Promise.resolve(777), Promise.resolve(888)];

// reduce
// Promise based
seedValues
  .reduce((accumulator, currentValue) =>
    accumulator.then(v => currentValue.then(cv => v + cv))
  )
  .then(console.log.bind(console));

// async
seedValues
  .reduce(async (acc, c) => (await acc) + (await c))
  .then(console.log.bind(console));

// simple map
// Promise based
Promise.all(seedValues.map(p => p.then(v => v.toString()))).then(
  console.log.bind(console)
);

// async
Promise.all(seedValues.map(async p => (await p).toString())).then(
  console.log.bind(console)
);

// map with concurrency (Similar to bluebird's map)
const concurrency = 4;
const control = {
    pipelines: new Array<Promise<void>>(4).fill(Promise.resolve()),
    values: [] as string[]
};

for (let i = 0; i < seedValues.length; i++) {
    control.pipelines[i % concurrency] = control.pipelines[i % concurrency].then(() => {
        return seedValues[i].then((seed) => {
            control.values.push(seed.toString());
            // or will keep us stable!
            // control.values[i] = seed.toString();
        });
    });
}

Promise.all(control.pipelines).then(() => control.values);

// cancellation?
// use AbortController! or similar cancellation token mechnizem
/// https://developer.mozilla.org/en-US/docs/Web/API/AbortController 