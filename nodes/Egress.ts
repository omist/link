import {Node} from "../Node";
import {Output} from "../Output";
import {ValueTypes} from "../ValueTypes";

export class Egress extends Node {
    static sourceTemplates = [
        {
            label: 'Input {n}',
            accepts: <ValueTypes[]>['number'],
            multiple: true
        }
    ]
    static outputTemplates = []
    outputs: Output<number>[] = [new Output(this)]
    calculateOutputValue = async (output: number) => output
        ? undefined
        : (<number[]>await this.evaluateSources()).reduce((a, b) => a + b);
}
