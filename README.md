# Linear Program Parser

A Library to parse a Linear Program text.

This library is built upon [Pegjs](https://pegjs.org/) and is able to transform the Linear Programming text representation in a JavaScript object. The object is an instance of a class that can be able to evaluate some of the math present in the representation and return the FPI (portuguese initials for Standard Form of Equality).

To use this library first install it by running `npm install linear-program-parser` import the `parse` function and you're ready to go.

Example:

```js
import { parse } from 'linear-program-parser';

const linearProgram = parse(`max(-3a -4b +5c -5d)
    st:
        +1a +1b +0c +0d <= +5;
        -1a +0b -5c +5d <= -10;
        +2a +1b +1c -1d <= +10;
        -2a -1b -1c +1d <= -10;
        a >= 0;
        b >= 0;
        c >= 0;
        d >= 0;
`);

const fpi = linearProgram.toFPI();

const { a, b, c, vars } = fpi.toMatrix();
```

Go to [Simplex Web](https://jeronimonunes.github.io/simplex-web) and see this library being used to prepare input for the [Simplex](https://github.com/jeronimonunes/simplex) program to compute its optimal value.
