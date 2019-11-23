import { ProgLin } from "./prog-lin";

export declare class SyntaxError {
    message: any;
    expected: any;
    found: any;
    location: any
}

export declare function parse(text: string): ProgLin;