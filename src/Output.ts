import {Node} from "./Node";
import {v4} from "uuid";
import {ValueTypes} from "./ValueTypes";

export class Output<valueType> {
    id: string = v4();
    needsUpdate: boolean = true;
    value?: valueType;
    getValue = async (): Promise<valueType | undefined> => {
        if(this.needsUpdate)
            this.value = <any>await this.node.calculateOutputValue(this.node.outputs.indexOf(this));
        //console.log('Returning Output', this.value);
        return this.value;
    }
    constructor(public node: Node, public valueType: ValueTypes){}
}