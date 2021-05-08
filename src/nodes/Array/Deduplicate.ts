import {Node} from "../../Node";
import {Output} from "../../Output";
import {ValueTypes} from "../../ValueTypes";

export class Deduplicate extends Node {
    static sourceTemplates = [{
        label: 'Array',
        accepts: <ValueTypes[]>['array']
    }]
    static outputTemplates = [
        {
            label: 'New array',
            type: 'array'
        },
        {
            label: 'Removed count',
            type: 'number'
        },
        {
            label: 'Kept count',
            type: 'number'
        }
    ]
    outputs: Output<object>[] = [new Output<object>(this, 'unknown')]
    calculateOutputValue = async (output: number) => {
        if (output) return undefined;
        const sources = await this.evaluateSources();
        return [...new Set(<any[]>sources[0])];
    }
}
