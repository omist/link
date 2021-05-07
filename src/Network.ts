import {Node} from "./Node";
import {Egress} from "./nodes/Egress";

export class Network {
    nodes: Node[] = [];
    addNode = (node: Node) => {
        this.nodes.push(node);
        this.refreshDependentEgressNodesFor(node);
    }
    nodeHasDependents = (node: Node) =>
        this.nodes.find(n => n.dependsOn(node));

    removeNode = (node: Node) =>
        this.nodes.splice(this.nodes.indexOf(node), 1);

    findDirectDependents = (node: Node) =>
        this.nodes.filter(n => n.dependsOn(node))

    countDirectDependents = (node: Node) =>
        this.findDirectDependents(node).length;

    safelyRemoveNode = (node: Node) => {
        if (this.nodeHasDependents(node))
            throw new Error(`Cannot remove node as it has ${this.countDirectDependents(node)} direct dependencies`);
        this.removeNode(node);
    }

    refreshDependentEgressNodesFor = (targetNode: Node) =>
        targetNode.dependentEgressNodes = this.findDependentEgressNodes(targetNode);

    findDependentNodes = (targetNode: Node): Node[] => {
        const processedNodes: Set<Node> = new Set(),
            nodesToMap: Set<Node> = new Set(this.nodes.filter(node => node.dependsOn(targetNode)));
        while (nodesToMap.size) {
            const nextBatch = [...new Set([...nodesToMap].flatMap(currentNode => this.nodes.filter(node => node.dependsOn(currentNode) && !processedNodes.has(node))))];
            for(const node of nextBatch)
                processedNodes.add(node);
        }
        return [...processedNodes];
    }

    findDependentEgressNodes = (targetNode: Node): Egress[] => {
        const dependentEgressNodes: Egress[] = [],
            processedNodes: Set<Node> = new Set(),
            nodesToMap: Set<Node> = new Set(this.nodes.filter(node => node.dependsOn(targetNode)));
        while (nodesToMap.size) {
            const nextBatch = [...new Set([...nodesToMap].flatMap(currentNode =>
                this.nodes.filter(node => node.dependsOn(currentNode) && !processedNodes.has(node))
            ))];
            dependentEgressNodes.push(...<Egress[]>nextBatch.filter(node => node instanceof Egress));
            for(const node of nextBatch)
                processedNodes.add(node);
            //nodesToMap = new Set([...nodesToMap].flatMap(currentNode => this.nodes.filter(node => node.dependsOn(currentNode))))
        }
        return dependentEgressNodes;
    }

    oldFindDependentEgressNodes = (targetNode: Node): Egress[] => {
        const dependentNodes: Node[] = this.nodes.filter(node => node.dependsOn(targetNode));
        let dependentEgressNodes: Egress[] = [],
            dependentNonEgressNodes: Node[] = [];
        for (const node of dependentNodes)
            (node instanceof Egress ? dependentEgressNodes : dependentNonEgressNodes).push(node);
        dependentEgressNodes.push(...dependentNonEgressNodes.flatMap(this.findDependentEgressNodes));
        return dependentEgressNodes;
    }
}