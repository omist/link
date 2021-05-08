import {Node} from "../../Node";
import {Output} from "../../Output";
import {ValueTypes} from "../../ValueTypes";

export class Values extends Node {
    static sourceTemplates = [{
        label: 'Object',
        accepts: <ValueTypes[]>['object']
    }]
    static outputTemplates = [
        {
            label: 'KV pairs',
            type: 'object'
        }
    ]
    outputs: Output<object>[] = [new Output<object>(this, 'unknown')]
    calculateOutputValue = async (output: number) => {
        if (output) return undefined;
        const object = <any[]>(await this.evaluateSources())[0];
        return Object.values(object);
    }
}
