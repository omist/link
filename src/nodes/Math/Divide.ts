import {Node} from "../../Node";
import {Output} from "../../Output";
import {ValueTypes} from "../../ValueTypes";

export class Divide extends Node {
    static sourceTemplates = [
        {
            label: 'Dividend {n}',
            accepts: <ValueTypes[]>['number']
        },
        {
            label: 'Divisor {n}',
            accepts: <ValueTypes[]>['number']
        }
    ]
    static outputTemplates = [
        {
            label: 'Quotient',
            type: 'number'
        },
        {
            label: 'Remainder',
            type: 'number'
        }
    ]
    outputs: Output<number>[] = [new Output(this, 'number')]
    calculateOutputValue = async (output: number) => output
        ? undefined
        : (<number[]>await this.evaluateSources()).reduce((a, b) => a * b);

}
