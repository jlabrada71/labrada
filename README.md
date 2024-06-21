# Description
This library is intended to help you measure the performance of your functions, both synch and asych.

# How to Install
npm install labrada

# How to Use it

For measuring the performance of a function simply call the measure or measureAsync funtions passing as parameters the function you want to measure, as well as some options that allows to customize the measurement.

```

const functionThatDoesTheMeasurement = measure( functionToBeMeasure, options );
const results = functionThatDoesTheMeasurement(the same parameters as for calling the original function);

```

## Options

- measureName: the name used for identifiying the measurement
- startMark: the mark to be used to signal the start of the measurement
- endMark: the mark to be used to signal the end of the measurement
- collector: It is a function that receive the measurement. Defaults to console.log
- measurer: when using in node js pass the node performance object imported.

## For measuring a node js synch function

'f' is the function we want to measure.

```
import { measure } from 'labrada';
import { performance } from "perf_hooks"

const f = (n) => {
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    return result;
}

const g = measure(f, { measureName: 'f', startMark: 'start', endMark: 'end', measurer: performance });

console.log(g(1000000));

```

## For measuring an async html function

'fetchTodos' is the function we want to measure.

```
import { measureAsync } from 'labrada';

const fetchTodos = () => {
    return fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
};

const measureFetch = measureAsync(fetchTodos, { measureName: 'fetchTodos', startMark: 'fetchInit', endMark: 'fetchEnd' });
measureFetch().then(
    (todos) => {
        console.log("todos: ")
        console.log(todos);
    }
);
```

## For measuring an asynch using a collector

'fetchTodos' is the function we want to measure.

```
import { measureAsync } from 'labrada';

const measurements = [];

const fetchTodos = () => {
    return fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
};

const simpleCollector = (measure) => {
    measurements.push(measure);
}

const measureFetch = measureAsync(fetchTodos, { measureName: 'fetchTodos', startMark: 'fetchInit', endMark: 'fetchEnd', collector: simpleCollector });
measureFetch().then(
    (todos) => {
        console.log("todos: ")
        console.log(todos);
    }
);
```