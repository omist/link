import {Node} from "../../Node";
import {Output} from "../../Output";
import {ValueTypes} from "../../ValueTypes";

export class Multiply extends Node {
    static sourceTemplates = [
        {
            label: 'Number {n}',
            accepts: <ValueTypes[]>['number'],
            multiple: true
        }
    ]
    static outputTemplates = [
        {
            label: 'Product',
            type: 'number'
        }
    ]
    outputs: Output<number>[] = [new Output(this, 'number')]
    calculateOutputValue = async (output: number) => output
        ? undefined
        : (<number[]>await this.evaluateSources()).reduce((a, b) => a * b);

}
