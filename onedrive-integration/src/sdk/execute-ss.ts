import "isomorphic-fetch";
import fs from "fs";
import chalk from "chalk";
import program, { OptionValues } from "commander";
import { Parameters } from "src/sdk/script-api-types";
import build from "src/sdk/build";
import { getSuccessJson } from "../../../commons/src/lib/validation";
import {
  encodeRequestBody,
  formatResult,
} from "../../../commons/src/lib/integrationServicePlugins";
import {
  loadFiles,
  parseKeyValue,
} from "../../../commons/src/lib/parameterUtil";
import path from "path";

interface IScriptExecRequest {
  script: string;
  functionName: string;
  userId: string;
  endpointId: string;
  integrationId: string;
  parameters?: Parameters;
  debugMode?: boolean;
}

const scriptExecRequestTemplate: IScriptExecRequest = {
  script: "function search() { return 'nothing'; }",
  functionName: "main",
  userId: "userId",
  endpointId: "endpointId",
  integrationId: "integrationId",
  debugMode: true,
};

program
  .option("-p, --param [parameters...]", "parameters")
  .option("-f, --functionName <name>", "script function name");
program.parse();

main(program.opts())
  .then(() => console.log("Done."))
  .catch((error) => console.error(`Failed with error: ${error}`));

async function main(args: OptionValues) {
  console.log(`main(${JSON.stringify(args)})`);
  return build()
    .then(() => {
      const script = getBuiltScriptFromWebpack();
      // FIXME encodeRequestBody is required for IS scripts
      const parameters = encodeRequestBody(
        loadFiles(parseKeyValue(args.param))
      );

      const executeRequestBody: IScriptExecRequest = {
        ...scriptExecRequestTemplate,
        script: script.toString(),
        functionName:
          args.functionName || scriptExecRequestTemplate.functionName,
        parameters: parameters,
      };
      const requestInit: RequestInit = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(executeRequestBody),
      };
      // TODO scripting service endpoint from .env
      return fetch("http://localhost:8080/api/script/execute", requestInit);
    })
    .then(
      getSuccessJson(async (response) => {
        return new Error(
          `Request to /api/script/execute failed: ${await response.text()}`
        );
      })
    )
    .then((executionResponse: any) => {
      if (executionResponse.result) {
        console.log(chalk.green("*** result ***"));
        console.log(chalk.green(formatResult(executionResponse.result)));
        console.log(chalk.green("*** end of result ***"));
      }
      if (executionResponse.scriptOutput) {
        console.log(chalk.cyanBright("*** script output ***"));
        console.log(chalk.cyanBright(executionResponse.scriptOutput));
        console.log(chalk.cyanBright("*** end of script output ***"));
      }
    })
    .catch((error) => console.error(chalk.redBright(error)));
}

function getBuiltScriptFromWebpack() {
  // must match output in webpack.config.js
  const webpackConfig = require("../../webpack.config");
  const scriptFile = path.resolve(
    webpackConfig.output.path,
    webpackConfig.output.filename
  );
  return fs.readFileSync(scriptFile);
}
