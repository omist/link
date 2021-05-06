import {OutputSource, Source, ValueSource} from "./Source";
import {uuid} from "./uuid";
import {Output} from "./Output";
import {ValueTypes} from "./ValueTypes";
import {Egress} from "./nodes/Egress";
import {notnull} from "./notnull";

export class Node {
    id: string = uuid();
    sources: Source<unknown>[] = [];
    evaluateSources = () => Promise.all(this.sources.map(s => s.getValue?.()));
    calculateOutputValue: (output: number) => unknown = () => null;
    outputs: Output<unknown>[] = [];
    static sourceTemplates: {
        label: string,
        accepts: ValueTypes[],
        multiple?: boolean
    }[];
    static outputTemplates: {
        label: string,
        type: string
    }[];
    dependsOn = (node: Node) => this.sources.find(source => source instanceof OutputSource && source.output?.node === node)
    dependentEgressNodes: Egress[] = [];
    setSource = (index: number, source: Source<unknown> | Output<unknown> | unknown) => {
        const kind = source instanceof Source ? ;
    }
}
