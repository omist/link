import {Node} from "../Node";
import {Output} from "../Output";
import {ValueTypes} from "../ValueTypes";

export class FormArray extends Node {
    static sourceTemplates = [{
        label: 'Item {n}',
        accepts: <ValueTypes[]>['number'],
        multiple: true
    }]
    static outputTemplates = [
        {
            label: 'Array',
            type: 'array'
        }
    ]
    outputs: Output<string>[] = [new Output(this)]
    calculateOutputValue = async (output: number) => {
        if (output) return undefined;
        return <(string | number | boolean)[]>await this.evaluateSources()
    }
}
