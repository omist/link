import {Node} from "../../Node";
import {Output} from "../../Output";
import {ValueTypes} from "../../ValueTypes";

export class GetItem extends Node {
    static sourceTemplates = [{
        label: 'Array',
        accepts: <ValueTypes[]>['array']
    }]
    static outputTemplates = [
        {
            label: 'Item',
            type: 'unknown'
        }
    ]
    outputs: Output<object>[] = [new Output<object>(this, 'unknown')]
    calculateOutputValue = async (output: number) => {
        if (output) return undefined;
        const sources = await this.evaluateSources();
        return (<any[]>sources[0])[<number>sources[1]];
    }
}
