import {Node} from "../../Node";
import {Output} from "../../Output";
import {ValueTypes} from "../../ValueTypes";

export class GroupBy extends Node {
    static sourceTemplates = [{
        label: 'Array',
        accepts: <ValueTypes[]>['array']
    }]
    static outputTemplates = [
        {
            label: 'Item',
            type: 'object'
        }
    ]
    outputs: Output<object>[] = [new Output<object>(this, 'unknown')]
    calculateOutputValue = async (output: number) => {
        if (output) return undefined;
        const original = <any[]>(await this.evaluateSources())[0],
            groups: any = {};
        for (const item of original)
            groups[item] =
                groups[item]
                    ? groups[item] + 1
                    : 1;
        return groups;
    }
}
