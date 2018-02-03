const Generator = require('yeoman-generator');

class BaseGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this._init(args, opts);
    }
    _init(args, opts) {
        console.log('Please Override _init when extending BaseGenerator');
    }
}

module.exports = BaseGenerator;
