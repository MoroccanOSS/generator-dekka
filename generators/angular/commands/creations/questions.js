module.exports  = ({skipAuth}) => {
    return [
        {
            name:'appName',
            type:'input',
            message:'Application name ?',
            default:"angular-app",
            store:true,
        },
        {
            name:'auth',
            type:'confirm',
            message:'Do you want secure you application module ?',
            default:false,
            when:()=> !skipAuth,
        },
        {
            name:'strategy',
            type:'list',
            choices: [{
                name: 'JWT',
                value: true
            }],
            message:'What strategy you want  ?',
            default:true,
            when : ({auth}) => auth
        }
    ]
}