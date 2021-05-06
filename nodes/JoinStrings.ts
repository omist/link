import {Node} from "../Node";
import {Output} from "../Output";
import {ValueTypes} from "../ValueTypes";

export class Add extends Node {
    static sourceTemplates = [
        {
            label: 'Joiner',
            accepts: <ValueTypes[]>['string', 'number', 'boolean']
        },
        {
            label: 'Phrase {n}',
            accepts: <ValueTypes[]>['string', 'number', 'boolean'],
            multiple: true
        }
    ]
    static outputTemplates = [
        {
            label: 'Phrase',
            type: 'string'
        }
    ]
    outputs: Output<string>[] = [new Output(this)]
    calculateOutputValue = async (output: number) => {
        if(output) return undefined;
        const values = <(string | number | boolean)[]>await this.evaluateSources(),
            joiner = values[0];
        return values
            .slice(1)
            .reduce((a, b) => a.toString() + joiner.toString() + b.toString());
    }
}
