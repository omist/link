import {Node} from "./Node";
import {v4} from "uuid";
import {ValueTypes} from "./ValueTypes";

export class Output<valueType> {
    id: string = v4();
    needsUpdate: boolean = true;
    value?: valueType;
    getValue = (): valueType | undefined => {
        if(this.needsUpdate)
            this.node.calculateOutputValue(1);
        return this.value;
    }
    constructor(public node: Node, public valueType: ValueTypes){}
}