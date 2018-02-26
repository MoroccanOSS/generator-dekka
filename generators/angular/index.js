const BaseGenerator = require('../BaseGenerator');
let options   = require('./options')
let _ = require('lodash')
let commands = require('./commands')
let Path = require('path')
module.exports = class extends BaseGenerator{

        constructor(args,opt){
            super(args,opt)
        }

        _init(args, opts) {
            // setting static arch folder
            this.sourceRoot(Path.join(this.sourceRoot(),"static-architecture"))
            //define genrator options
            _.keys(options).forEach((key)=>{
                let option = options[key]
                this.option(key,option)
            })
         }
         _exists(){
            return this.fs.exists(Path.join(this.destinationPath(),"package.json"));
         }
        main(){
            if(!this._exists()){
                let {scaffold} = commands;
                scaffold(this);
                return
            }
            this.log("Another command to implement :)")
        }

        end(){
            this.config.save();
        }
}