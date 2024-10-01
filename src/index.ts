#!/usr/bin/env node

import * as fs from 'fs';
import { createRequire } from 'module';
import * as path from 'path';
import type typescript from 'typescript';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
  handleExceptions: true,
});

const startTime = process.hrtime();

const projectFileEnv = process.env['TSCONFIG'];
if (!projectFileEnv) {
  throw new Error(`TSCONFIG env not found.`);
}

const projectFile = path.resolve(projectFileEnv);
if (!fs.existsSync(projectFile)) {
  throw new Error(`Project file not found: ${projectFile}`);
}

const projectFileMessage = `Using project file: \`${projectFile}\``;
logger.info(projectFileMessage);

let extraConfig: typescript.ParsedCommandLine['options'] = {};
const extraConfigEnv = process.env['EXTRA_CONFIG'];
if (extraConfigEnv) {
  extraConfig = JSON.parse(extraConfigEnv);
}

const extraConfigMessage = `Using extra config: \`${JSON.stringify(extraConfig)}\``;
logger.info(extraConfigMessage);

const outputFileEnv = process.env['OUTPUT'];
if (!outputFileEnv) {
  throw new Error(`OUTPUT env not found.`);
}

const outputFile = path.resolve(outputFileEnv);
logger.info(`Using output file: ${outputFile}`);

let outputMdFile: string | undefined;
const outputMdFileEnv = process.env['OUTPUT_MD'];
if (outputMdFileEnv) {
  outputMdFile = path.resolve(outputMdFileEnv);
  logger.info(`Using output md file: ${outputMdFile}`);
}

const projectBase = path.dirname(projectFile);
const ts: typeof typescript = createRequire(projectFile)('typescript');

const projectBaseMessage = `Using project base: \`${projectBase}\``;
logger.info(projectBaseMessage);
const tsVersionMessage = `Using TS version: \`${ts.version}\``;
logger.info(tsVersionMessage);

const throwOnError = process.env['THROW_ON_ERROR'] == 'true';
if (throwOnError) {
  logger.info(`THROW_ON_ERROR is true. Execution will fail if there are any errors.`);
}

const config = ts.parseJsonConfigFileContent(
  ts.readConfigFile(projectFile, ts.sys.readFile).config,
  ts.sys,
  path.dirname(projectFile),
  undefined,
  path.basename(projectFile),
);

config.options = {
  ...config.options,
  sourceMap: false,
  emitDecoratorMetadata: false,
  skipLibCheck: true,
  skipDefaultLibCheck: true,
  ...extraConfig,
};

const host = ts.createCompilerHost(config.options);
logger.info(`Using in-memory compilation`);

// do absolutely nothing with the file
host.writeFile = (_fileName: string, _ignoredResult: string) => {};

const program = ts.createProgram({
  rootNames: config.fileNames,
  options: config.options,
  projectReferences: config.projectReferences,
  configFileParsingDiagnostics: ts.getConfigFileParsingDiagnostics(config),
  host,
});

logger.info(`Compiling...`);
const emitResult = program.emit();
logger.info(`Compile finished.`);
const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

const relevantDiagnostics = allDiagnostics.filter(({ file }) => {
  return file && file.fileName.includes(projectBase);
});
logger.info(`Parsing diagnostics`);
const diagnostics = relevantDiagnostics.map((diagnostic) => {
  if (diagnostic.file) {
    const { fileName } = diagnostic.file;
    let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
    line += 1;
    character += 1;

    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    return { fileName, line, character, message };
  }
});

const json: Record<string, string> = {};
diagnostics.forEach((diag) => {
  if (diag) {
    const relativeFileName = diag.fileName.replace(`${projectBase}/`, '');
    const link = `${relativeFileName}:${diag.line}:${diag.character}`;
    json[link] = diag.message;
  }
});

const [seconds, nanoSeconds] = process.hrtime(startTime);
const milliseconds = Math.round(nanoSeconds / 1000000);

const tookSecondsMessage = `Took ${seconds}.${milliseconds} seconds`;
logger.info(tookSecondsMessage);

let errorsMessage: string | undefined;
const errorCount = Object.keys(json).length;
if (errorCount > 0) {
  errorsMessage = `There were ${errorCount} errors in the compilation`;
  logger.error(errorsMessage);
}

logger.info(`Writing output file: ${outputFile}`);
fs.writeFileSync(outputFile, JSON.stringify(json, null, 2));

if (outputMdFile) {
  logger.info(`Writing output md file: ${outputMdFile}`);
  const errorTableContent: string[] = [];
  Object.keys(json).forEach((key) => {
    const error = json[key];
    errorTableContent.push(`| \`${key}\` ${error} |`);
  });
  const errorTableLines = ['| error |', '| ----- |', ...errorTableContent];
  const mdContent = [
    projectFileMessage,
    extraConfigMessage,
    projectBaseMessage,
    tsVersionMessage,
    errorsMessage,
    ...errorTableLines,
    tookSecondsMessage,
  ]
    .filter((m) => !!m)
    .join('\n');
  fs.writeFileSync(outputMdFile, mdContent);
}

if (throwOnError && errorCount > 0) {
  logger.error(`There were errors in the compilation, and THROW_ON_ERROR was true.`);
  process.exit(1);
}
