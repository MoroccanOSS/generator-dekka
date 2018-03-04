const _ = require('lodash');

class Command {
    constructor(tree, args) {
        this.path = [];
        this.tree = tree;
        this.currentNode = tree;

        let argIndex = 0;
        let node;
        do {
            node = this.push(args[argIndex++]);
        } while(node && argIndex < args.length);
    }

    push(nodeName) {
        const parent = this.currentNode;
        const node = this.findChildNode(parent, nodeName);
        if(node) {
            const commandNode = {
                name: node.name,
                config: node.config,
                isLeaf: !node.children,
                parent: parent 
            };
            this.path.push(commandNode);
            this.currentNode = node;
            return commandNode;
        }
    }

    pop() {
        const lastNode = this.lastNode();
        if(lastNode && lastNode.parent) {
            this.currentNode = lastNode.parent;
            return this.path.pop();
        }
    }

    findChildNode(node, childNodeName) {
        return _.find(node.children, { name: childNodeName })
    }

    rootChildNodes() {
        const parent = this.tree;
        return this.tree.children.map(node => {
            return {
                name: node.name,
                config: node.config,
                isLeaf: !node.children,
                parent: parent 
            }
        }) 
    }

    lastNode() {
        return _.last(this.path) || null;
    }

    lastNodeChildren() {
        if(this.currentNode) {
            const parent = this.currentNode;
            const children = parent.children || [];
            return _.map(children, node => {
                return {
                    name: node.name,
                    config: node.config,
                    isLeaf: !node.children,
                    parent: parent 
                }
            });
        }
    }
    
    isNoOp() {
        return _.isEmpty(this.path);
    }
}

module.exports = Command;