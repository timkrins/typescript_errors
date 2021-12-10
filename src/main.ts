#!/usr/bin/env node

import * as fs from 'fs';
import { createRequire } from 'module';
import * as path from 'path';
import typescript from 'typescript';

const projectFile = process.env['TSCONFIG'];
if (!projectFile) {
  throw new Error(`TSCONFIG env not found.`);
}

const outputFile = process.env['OUTPUT'];
if (!outputFile) {
  throw new Error(`OUTPUT env not found.`);
}

const projectBase = path.dirname(projectFile);
const ts: typeof typescript = createRequire(projectFile)('typescript');

const config = ts.parseJsonConfigFileContent(
  ts.readConfigFile(projectFile, ts.sys.readFile).config,
  ts.sys,
  path.dirname(projectFile),
  undefined,
  path.basename(projectFile),
);

config.options.skipLibCheck = true;
config.options.noImplicitAny = true;

const createdFiles: Record<string, string> = {};
const host = ts.createCompilerHost(config.options);
host.writeFile = (fileName: string, contents: string) => (createdFiles[fileName] = contents);

const program = ts.createProgram({
  rootNames: config.fileNames,
  options: config.options,
  projectReferences: config.projectReferences,
  configFileParsingDiagnostics: ts.getConfigFileParsingDiagnostics(config),
  host,
});

const emitResult = program.emit();
const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

const relevantDiagnostics = allDiagnostics.filter(({ file }) => {
  return file && file.fileName.includes(projectBase);
});

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

fs.writeFileSync(outputFile, JSON.stringify(json, null, 2));
