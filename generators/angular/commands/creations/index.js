const questions = require("./questions");
let Path = require('path')
module.exports =  (yoContext) => {
    let {options} = yoContext;
    if (!yoContext) {
        console.warn("yoContext should not be null ")
        return;
    }
    yoContext.prompt(
        questions(yoContext)
    ).then(({
                appName,
                auth,
                strategy
            }) => {
        let source = yoContext.sourceRoot();
        let destination = yoContext.destinationPath();
        yoContext.fs.copy(source, destination);
        yoContext.fs.copyTpl(Path.join(source, 'package.json')
            , Path.join(destination, 'package.json'),
            {
                appName
            })
        yoContext.npmInstall()
    })
}