const Generator = require('yeoman-generator');
const Command = require('../utils/Command');

class BaseGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this._init(args, opts);
    }
    _init(args, opts) {
        console.log('Please Override _init when extending BaseGenerator');
    }

   _abort(opts) {
        console.log('aborting..(TODO)');
    }

    _validateCommand(tree) {
        const command = new Command(tree, this.args);

        if(command.isNoOp()) {
            command.rootChildNodes().forEach(node => this.argument(node.name, node.config));
            this._abort({ showHelp: true });
        } else {
            const lastNode = command.lastNode();
            if(lastNode.isLeaf) {
                this.argument(lastNode.name, lastNode.config);
            } else {
                command.lastNodeChildren().forEach(node => this.argument(node.name, node.config));
                this._abort({ showHelp: true });
            }
        }

        this.command = command.path;
    }
}

module.exports = BaseGenerator;
