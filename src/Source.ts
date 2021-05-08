import {Node} from "./Node";
import {Output} from "./Output";

class Network {
    nodes: Node[] = [];
    getNodeById = (id: string) => this.nodes.find(n => n.id === id);
}

export class Source<valueType> {
    currentValue: any;
    needsUpdate: boolean = false;
    getValue?: () => Promise<valueType>;
}

export class OutputSource<valueType> extends Source<valueType> {
    needsUpdate = true;
    getValue = async () => {
        if (this.needsUpdate)
            this.currentValue = await this.output?.getValue();
        //console.log('Returning OutputSource', this.currentValue, this.output?.getValue);
        return this.currentValue;
    }
    constructor(public output?: Output<valueType>){
        super();
    }
}

export class ValueSource<valueType> extends Source<valueType> {
    getValue = async () => this.value;
    constructor(public value: any) {
        super();
    }
}
