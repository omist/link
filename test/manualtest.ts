import {Add} from "../src/Nodes";

(async()=> {
    const add = new Add();
    add.setSource(0, 2);
    add.setSource(1, 3);
    console.log(await add.calculateOutputValue(0));
})()