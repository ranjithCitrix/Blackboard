import 'isomorphic-fetch'
import program, {OptionValues} from 'commander'
import {Parameters} from 'src/sdk/script-api-types'
import {encodeRequestBody} from "../../../commons/src/lib/integrationServicePlugins";
import {loadFiles, parseKeyValue} from "../../../commons/src/lib/parameterUtil";
import {spawn} from 'child_process'
import path from 'path'

program
    .option('-p, --param [parameters...]', 'parameters')
    .option('-f, --functionName <name>', 'script function name')
program.parse()

main(program.opts())

function main(args: OptionValues) {

    console.warn('*** Warning: building script is not not part of console runner execution yet, `npm run build` !!! ***')

    const parameters = encodeRequestBody(loadFiles(parseKeyValue(args.param)))

    // TODO from .env ?
    // extract console runner sdk zip file to "console-runner-sdk directory in root of this project
    const consoleRunnerJar = "console-runner-sdk/scripting-service-console-runner.jar"

    // TODO from CLI options or .env
    const configFile = "local/onedrive_config.json"

    const webpackConfig = require('../../webpack.config')
    const scriptFile = path.resolve(webpackConfig.output.path, webpackConfig.output.filename)
    console.log(`scriptFile=${scriptFile}`)

    const consoleRunnerArguments: string[] = [
        "exec",
        "-fn",
        args.functionName,
        ...expandParameters(parameters),
        "--config",
        configFile,
        // TODO not supported yet :( "--context-type", "FILE",
        scriptFile
    ]
    console.log(`console runner arguments: "${consoleRunnerArguments.join(' ')}"`)

    const consoleRunner = spawn('java', ["-cp", consoleRunnerJar, "com.citrix.cdi.script.runner.cmdparameters.RunCommand", ...consoleRunnerArguments])

    consoleRunner.stdout.on('data', data => console.log(`stdout: ${bufferToConsole(data)}`))
    consoleRunner.stderr.on('data', data => console.log(`stderr: ${bufferToConsole(data)}`))
    consoleRunner.on('error', error => console.error(` error: ${error}`))

    consoleRunner.on('close', code => {
        console.log(`Closed with status = ${code}`)
    })
}

function bufferToConsole(buffer: Buffer) {
    return buffer && buffer.toString().replace(/\n$/g, '')
}

function expandParameters(parameters: Parameters): string[] {
    return Object.entries(parameters)
        .reduce((acc: string[], [name, value]) => {
            return [...acc, "--parameter", `${name}=${value}`]
        }, []);
}
