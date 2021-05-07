import {Node} from "../Node";
import {Output} from "../Output";
import {ValueTypes} from "../ValueTypes";

export class Add extends Node {
    static sourceTemplates = [
        {
            label: 'Number {n}',
            accepts: <ValueTypes[]>['number'],
            multiple: true
        }
    ]
    static outputTemplates = [
        {
            label: 'Mean',
            type: 'number'
        },
        {
            label: 'Median',
            type: 'number'
        },
        {
            label: 'Mode',
            type: 'number'
        },
    ]
    outputs: Output<string>[] = [new Output(this, 'string')]
    calculateOutputValue = async (output: number) => {
        const values = <number[]>await this.evaluateSources(),
            count = values.length;
        return [calculateMean, calculateMedian, calculateMode][output](values, count);
    }
}

type averageCalculator = (values: number[], count: number) => number | null;

const calculateMean: averageCalculator = (values, count) => values.reduce((a, b) => a + b) / count;
const calculateMedian: averageCalculator = (values, count) => {
    const half = count / 2;
    return count % 2 ? values[half - .5] : (values[half - 1] + values[half]) / 2;
}
const calculateMode: averageCalculator = (values, count) => {
    const frequencies = Object.entries(values
        .reduce((obj, num) => ({
            ...obj,
            [num]: (obj[num] ?? 0) + 1
        }), <{ [key: number]: number }>{}));
    let max = frequencies[0], valid = true;
    for (let i = 1; i < frequencies.length; i++) {
        if (max[1] < frequencies[i][1]) {
            max = frequencies[i];
            valid = true;
        } else if (max[1] === frequencies[i][1])
            valid = false;
    }
    console.log(max)
    return valid ? parseFloat(max[0]) : null;
}
