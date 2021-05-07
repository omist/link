import {OutputSource, Source, ValueSource} from "./Source";
import {v4} from "uuid";
import {Output} from "./Output";
import {ValueTypes} from "./ValueTypes";
import {Egress} from "./nodes/Egress";
import {notnull} from "./notnull";

export class Node {
    id: string = v4();
    sources: Source<unknown>[] = [];
    evaluateSources = () => Promise.all(this.sources.map(s => s.getValue?.()));
    calculateOutputValue: (output: number) => unknown = () => null;
    //outputs: Output<unknown>[] = [];
    sourceTemplates: {
        label: string,
        accepts: ValueTypes[],
        multiple?: boolean
    }[] = [];
    outputTemplates: {
        label: string,
        type: string
    }[] = [];
    dependsOn = (node: Node) => this.sources.find(source => source instanceof OutputSource && source.output?.node === node)
    dependentEgressNodes: Egress[] = [];
    safeSetSource = (index: number, source: Source<unknown> | Output<unknown> | unknown) => {
        const canSet =
            source instanceof OutputSource
            && this.sourceTemplates[index]?.accepts.includes(source.output?.valueType ?? 'any');
        if (!canSet)
            throw new Error('Incompatible source type');
        this.setSource(index, source);
    }
    setSource = (index: number, source: Source<unknown> | Output<unknown> | unknown) =>
        this.sources[index] = source instanceof Source
            ? source
            : source instanceof Output
                ? new OutputSource(source)
                : new ValueSource(source);
}
