const BaseGenerator = require('../BaseGenerator');
let options   = require('./options')
let _ = require('lodash')
let commands = require('./commands')

module.exports = class extends BaseGenerator{

        constructor(args,opt){
            super(args,opt)
            this._init(args,opt)
        }

        _init(args, opts) {
            _.keys(options).forEach((key)=>{
                let option = options[key]
                this.option(key,option)
            })
         }
        main(){
            let {scaffold} = commands;
            scaffold(this);
        }

        end(){
            this.config.save();
        }
}