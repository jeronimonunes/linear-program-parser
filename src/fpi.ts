import { CanonicalAddition } from './canonical-addition';
import { CanonicalEquality } from './canonical-equality';
import { NEG } from './fraction';

export class Fpi {

    constructor(public objective: CanonicalAddition, public restrictions: CanonicalEquality[], public vars: string[]) {

    }

    toMatrix() {
        const c = this.vars.map(v => this.objective.getCoefficient(v).multiply(NEG));
        const a = this.restrictions.map(r => this.vars.map(v => r.getCoefficient(v)));
        const b = this.restrictions.map(r => r.getIndependent());
        const vars = this.vars;
        return { a, b, c, vars };
    }

    toString() {
        let result = `max(${this.objective})\n`;
        result += `\tst:\n`;
        for (const restriction of this.restrictions) {
            result += `\t${restriction};\n`;
        }
        result += '\n\t' + this.vars.join(',') + ' >= 0\n';
        return result;
    }

}
