import { Expression } from './expression';

export class Factor extends Expression {

    constructor(public expr: Expression) {
        super();
    }

    canonify() {
        return this.expr.canonify();
    }

    getVars(set: Set<string>) {
        return this.expr.getVars(set);
    }

    invert() {
        return this.expr.invert();
    }
}
