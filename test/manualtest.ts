import {Add, FormArray} from "../src/Nodes";
import {Network} from "../src/Network";

(async()=> {
    const add = new Add();
    add.setSource(0, 2);
    add.setSource(1, 3);
    const add2 = new Add();
    const net = new Network();
    net.addNode(add);
    net.addNode(add2);
    add2.setSource(0, add.outputs[0]);
    add2.setSource(1, 4);
    const form = new FormArray();
    form.setSource(0, add);
    form.setSource(1, add2);
    console.log(await form.outputs[0].getValue());
})()