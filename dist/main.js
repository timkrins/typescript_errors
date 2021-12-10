#!/usr/bin/env node
var $gSQc9$fs = require("fs");
var $gSQc9$module = require("module");
var $gSQc9$path = require("path");
var $gSQc9$winston = require("winston");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}




const $796570daa245f54d$var$logger = ($parcel$interopDefault($gSQc9$winston)).createLogger({
    level: 'info',
    transports: [
        new ($parcel$interopDefault($gSQc9$winston)).transports.Console({
            format: ($parcel$interopDefault($gSQc9$winston)).format.combine(($parcel$interopDefault($gSQc9$winston)).format.colorize(), ($parcel$interopDefault($gSQc9$winston)).format.simple())
        }), 
    ],
    handleExceptions: true
});
const $796570daa245f54d$var$startTime = process.hrtime();
const $796570daa245f54d$var$projectFileEnv = process.env['TSCONFIG'];
if (!$796570daa245f54d$var$projectFileEnv) throw new Error(`TSCONFIG env not found.`);
const $796570daa245f54d$var$projectFile = $gSQc9$path.resolve($796570daa245f54d$var$projectFileEnv);
if (!$gSQc9$fs.existsSync($796570daa245f54d$var$projectFile)) throw new Error(`Project file not found: ${$796570daa245f54d$var$projectFile}`);
$796570daa245f54d$var$logger.info(`Using project file: ${$796570daa245f54d$var$projectFile}`);
let $796570daa245f54d$var$extraConfig = {
};
const $796570daa245f54d$var$extraConfigEnv = process.env['EXTRA_CONFIG'];
if ($796570daa245f54d$var$extraConfigEnv) $796570daa245f54d$var$extraConfig = JSON.parse($796570daa245f54d$var$extraConfigEnv);
$796570daa245f54d$var$logger.info(`Using extra config: ${JSON.stringify($796570daa245f54d$var$extraConfig)}`);
const $796570daa245f54d$var$outputFileEnv = process.env['OUTPUT'];
if (!$796570daa245f54d$var$outputFileEnv) throw new Error(`OUTPUT env not found.`);
const $796570daa245f54d$var$outputFile = $gSQc9$path.resolve($796570daa245f54d$var$outputFileEnv);
$796570daa245f54d$var$logger.info(`Using output file: ${$796570daa245f54d$var$outputFile}`);
const $796570daa245f54d$var$projectBase = $gSQc9$path.dirname($796570daa245f54d$var$projectFile);
const $796570daa245f54d$var$ts = $gSQc9$module.createRequire($796570daa245f54d$var$projectFile)('typescript');
$796570daa245f54d$var$logger.info(`Using project base: ${$796570daa245f54d$var$projectBase}`);
$796570daa245f54d$var$logger.info(`Using TS version: ${$796570daa245f54d$var$ts.version}`);
const $796570daa245f54d$var$config = $796570daa245f54d$var$ts.parseJsonConfigFileContent($796570daa245f54d$var$ts.readConfigFile($796570daa245f54d$var$projectFile, $796570daa245f54d$var$ts.sys.readFile).config, $796570daa245f54d$var$ts.sys, $gSQc9$path.dirname($796570daa245f54d$var$projectFile), undefined, $gSQc9$path.basename($796570daa245f54d$var$projectFile));
$796570daa245f54d$var$config.options = {
    ...$796570daa245f54d$var$config.options,
    sourceMap: false,
    emitDecoratorMetadata: false,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    ...$796570daa245f54d$var$extraConfig
};
const $796570daa245f54d$var$host = $796570daa245f54d$var$ts.createCompilerHost($796570daa245f54d$var$config.options);
$796570daa245f54d$var$logger.info(`Using in-memory compilation`);
// do absolutely nothing with the file
$796570daa245f54d$var$host.writeFile = (_fileName, _ignoredResult)=>{
};
const $796570daa245f54d$var$program = $796570daa245f54d$var$ts.createProgram({
    rootNames: $796570daa245f54d$var$config.fileNames,
    options: $796570daa245f54d$var$config.options,
    projectReferences: $796570daa245f54d$var$config.projectReferences,
    configFileParsingDiagnostics: $796570daa245f54d$var$ts.getConfigFileParsingDiagnostics($796570daa245f54d$var$config),
    host: $796570daa245f54d$var$host
});
$796570daa245f54d$var$logger.info(`Compiling...`);
const $796570daa245f54d$var$emitResult = $796570daa245f54d$var$program.emit();
$796570daa245f54d$var$logger.info(`Compile finished.`);
const $796570daa245f54d$var$allDiagnostics = $796570daa245f54d$var$ts.getPreEmitDiagnostics($796570daa245f54d$var$program).concat($796570daa245f54d$var$emitResult.diagnostics);
const $796570daa245f54d$var$relevantDiagnostics = $796570daa245f54d$var$allDiagnostics.filter(({ file: file  })=>{
    return file && file.fileName.includes($796570daa245f54d$var$projectBase);
});
$796570daa245f54d$var$logger.info(`Parsing diagnostics`);
const $796570daa245f54d$var$diagnostics = $796570daa245f54d$var$relevantDiagnostics.map((diagnostic)=>{
    if (diagnostic.file) {
        const { fileName: fileName  } = diagnostic.file;
        let { line: line , character: character  } = $796570daa245f54d$var$ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
        line += 1;
        character += 1;
        const message = $796570daa245f54d$var$ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        return {
            fileName: fileName,
            line: line,
            character: character,
            message: message
        };
    }
});
const $796570daa245f54d$var$json = {
};
$796570daa245f54d$var$diagnostics.forEach((diag)=>{
    if (diag) {
        const relativeFileName = diag.fileName.replace(`${$796570daa245f54d$var$projectBase}/`, '');
        const link = `${relativeFileName}:${diag.line}:${diag.character}`;
        $796570daa245f54d$var$json[link] = diag.message;
    }
});
$796570daa245f54d$var$logger.info(`Writing output file: ${$796570daa245f54d$var$outputFile}`);
$gSQc9$fs.writeFileSync($796570daa245f54d$var$outputFile, JSON.stringify($796570daa245f54d$var$json, null, 2));
const [$796570daa245f54d$var$seconds, $796570daa245f54d$var$nanoSeconds] = process.hrtime($796570daa245f54d$var$startTime);
const $796570daa245f54d$var$milliseconds = Math.round($796570daa245f54d$var$nanoSeconds / 1000000);
$796570daa245f54d$var$logger.info(`Took ${$796570daa245f54d$var$seconds}.${$796570daa245f54d$var$milliseconds} seconds`);


//# sourceMappingURL=main.js.map
