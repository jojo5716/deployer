const chalk       = require('chalk');


const help = () => {
    console.log(`
        ${chalk.bold('𝚫 deploy')} [options] <command | path>

        ${chalk.dim('Commands:')}

            deploy       [path]       Performs a deployment ${chalk.bold('(default)')}
            ls | list    [app]        List deployments
            rm | remove  [id]         Remove a deployment
            help         [cmd]        Displays complete help for [cmd]

        ${chalk.dim('Options:')}

            -h, --help                Output usage information
            -v, --version             Output the version number
            -n, --name                Set the name of the deployment
            -f, --force               Force a new deployment even if nothing has changed
            -t ${chalk.underline('TOKEN')}, --token=${chalk.underline('TOKEN')}   Login token
            -L, --login               Configure login
            -p, --public              Deployment is public (${chalk.dim('`/_src`')} is exposed) [on for oss, off for premium]

        ${chalk.dim('Examples:')}

        ${chalk.gray('–')} Deploys the current directory

        ${chalk.cyan('$ deploy')}

        ${chalk.gray('–')} Deploys a custom path ${chalk.dim('`/usr/src/project`')}

        ${chalk.cyan('$ deploy help')}

    `)
}

module.exports  = { show: help };
