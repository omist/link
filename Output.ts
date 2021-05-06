import {Node} from "./Node";
import {uuid} from "./uuid";

export class Output<valueType> {
    id: string = uuid();
    needsUpdate: boolean = true;
    value?: valueType;
    getValue = (): valueType | undefined => {
        if(this.needsUpdate)
            this.node.calculateOutputValue(1);
        return this.value;
    }
    constructor(public node: Node){}
}