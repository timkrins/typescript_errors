#!/usr/bin/env node
var $9xlVa$util = require("util");
var $9xlVa$os = require("os");
var $9xlVa$buffer = require("buffer");
var $9xlVa$stream = require("stream");
var $9xlVa$events = require("events");
var $9xlVa$fs = require("fs");
var $9xlVa$path = require("path");
var $9xlVa$zlib = require("zlib");
var $9xlVa$tty = require("tty");
var $9xlVa$string_decoder = require("string_decoder");
var $9xlVa$http = require("http");
var $9xlVa$https = require("https");
var $9xlVa$module = require("module");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequirea5a5"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequirea5a5"] = parcelRequire;
}
parcelRequire.register("lqhyJ", function(module, exports) {
"use strict";
/*
 * Displays a helpful message and the source of
 * the format when it is invalid.
 */ class $f989a5936d4afc17$var$InvalidFormatError extends Error {
    constructor(formatFn){
        super(`Format functions must be synchronous taking a two arguments: (info, opts)
Found: ${formatFn.toString().split("\n")[0]}\n`);
        Error.captureStackTrace(this, $f989a5936d4afc17$var$InvalidFormatError);
    }
}
/*
 * function format (formatFn)
 * Returns a create function for the `formatFn`.
 */ module.exports = (formatFn)=>{
    if (formatFn.length > 2) throw new $f989a5936d4afc17$var$InvalidFormatError(formatFn);
    /*
   * function Format (options)
   * Base prototype which calls a `_format`
   * function and pushes the result.
   */ function Format(options = {}) {
        this.options = options;
    }
    Format.prototype.transform = formatFn;
    //
    // Create a function which returns new instances of
    // FormatWrap for simple syntax like:
    //
    // require('winston').formats.json();
    //
    function createFormatWrap(opts) {
        return new Format(opts);
    }
    //
    // Expose the FormatWrap through the create function
    // for testability.
    //
    createFormatWrap.Format = Format;
    return createFormatWrap;
};

});

parcelRequire.register("fsNYU", function(module, exports) {
"use strict";

var $eOReR = parcelRequire("eOReR");
var $b4203dcf788369e8$require$Colorizer = $eOReR.Colorizer;
/*
 * Simple method to register colors with a simpler require
 * path within the module.
 */ module.exports = (config)=>{
    $b4203dcf788369e8$require$Colorizer.addColors(config.colors || config);
    return config;
};

});
parcelRequire.register("eOReR", function(module, exports) {
"use strict";

var $f0D1h = parcelRequire("f0D1h");

var $7tLiS = parcelRequire("7tLiS");
var $ac9f08503507f95e$require$LEVEL = $7tLiS.LEVEL;
var $ac9f08503507f95e$require$MESSAGE = $7tLiS.MESSAGE;
//
// Fix colors not appearing in non-tty environments
//
$f0D1h.enabled = true;
/**
 * @property {RegExp} hasSpace
 * Simple regex to check for presence of spaces.
 */ const $ac9f08503507f95e$var$hasSpace = /\s+/;
/*
 * Colorizer format. Wraps the `level` and/or `message` properties
 * of the `info` objects with ANSI color codes based on a few options.
 */ class $ac9f08503507f95e$var$Colorizer {
    constructor(opts = {}){
        if (opts.colors) this.addColors(opts.colors);
        this.options = opts;
    }
    /*
   * Adds the colors Object to the set of allColors
   * known by the Colorizer
   *
   * @param {Object} colors Set of color mappings to add.
   */ static addColors(clrs) {
        const nextColors = Object.keys(clrs).reduce((acc, level)=>{
            acc[level] = $ac9f08503507f95e$var$hasSpace.test(clrs[level]) ? clrs[level].split($ac9f08503507f95e$var$hasSpace) : clrs[level];
            return acc;
        }, {});
        $ac9f08503507f95e$var$Colorizer.allColors = Object.assign({}, $ac9f08503507f95e$var$Colorizer.allColors || {}, nextColors);
        return $ac9f08503507f95e$var$Colorizer.allColors;
    }
    /*
   * Adds the colors Object to the set of allColors
   * known by the Colorizer
   *
   * @param {Object} colors Set of color mappings to add.
   */ addColors(clrs) {
        return $ac9f08503507f95e$var$Colorizer.addColors(clrs);
    }
    /*
   * function colorize (lookup, level, message)
   * Performs multi-step colorization using @colors/colors/safe
   */ colorize(lookup, level, message) {
        if (typeof message === "undefined") message = level;
        //
        // If the color for the level is just a string
        // then attempt to colorize the message with it.
        //
        if (!Array.isArray($ac9f08503507f95e$var$Colorizer.allColors[lookup])) return $f0D1h[$ac9f08503507f95e$var$Colorizer.allColors[lookup]](message);
        //
        // If it is an Array then iterate over that Array, applying
        // the colors function for each item.
        //
        for(let i = 0, len = $ac9f08503507f95e$var$Colorizer.allColors[lookup].length; i < len; i++)message = $f0D1h[$ac9f08503507f95e$var$Colorizer.allColors[lookup][i]](message);
        return message;
    }
    /*
   * function transform (info, opts)
   * Attempts to colorize the { level, message } of the given
   * `logform` info object.
   */ transform(info, opts) {
        if (opts.all && typeof info[$ac9f08503507f95e$require$MESSAGE] === "string") info[$ac9f08503507f95e$require$MESSAGE] = this.colorize(info[$ac9f08503507f95e$require$LEVEL], info.level, info[$ac9f08503507f95e$require$MESSAGE]);
        if (opts.level || opts.all || !opts.message) info.level = this.colorize(info[$ac9f08503507f95e$require$LEVEL], info.level);
        if (opts.all || opts.message) info.message = this.colorize(info[$ac9f08503507f95e$require$LEVEL], info.level, info.message);
        return info;
    }
}
/*
 * function colorize (info)
 * Returns a new instance of the colorize Format that applies
 * level colors to `info` objects. This was previously exposed
 * as { colorize: true } to transports in `winston < 3.0.0`.
 */ module.exports = (opts)=>new $ac9f08503507f95e$var$Colorizer(opts);
//
// Attach the Colorizer for registration purposes
//
module.exports.Colorizer = module.exports.Format = $ac9f08503507f95e$var$Colorizer;

});
parcelRequire.register("f0D1h", function(module, exports) {

var $GZVHe = parcelRequire("GZVHe");
module.exports = $GZVHe;

});
parcelRequire.register("GZVHe", function(module, exports) {
/*

The MIT License (MIT)

Original Library
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/ var $0813f648b263415c$var$colors = {};
module.exports = $0813f648b263415c$var$colors;
$0813f648b263415c$var$colors.themes = {};


var $0813f648b263415c$var$ansiStyles = $0813f648b263415c$var$colors.styles = (parcelRequire("hS7dG"));
var $0813f648b263415c$var$defineProps = Object.defineProperties;
var $0813f648b263415c$var$newLineRegex = new RegExp(/[\r\n]+/g);

$0813f648b263415c$var$colors.supportsColor = (parcelRequire("4xHj2")).supportsColor;
if (typeof $0813f648b263415c$var$colors.enabled === "undefined") $0813f648b263415c$var$colors.enabled = $0813f648b263415c$var$colors.supportsColor() !== false;
$0813f648b263415c$var$colors.enable = function() {
    $0813f648b263415c$var$colors.enabled = true;
};
$0813f648b263415c$var$colors.disable = function() {
    $0813f648b263415c$var$colors.enabled = false;
};
$0813f648b263415c$var$colors.stripColors = $0813f648b263415c$var$colors.strip = function(str) {
    return ("" + str).replace(/\x1B\[\d+m/g, "");
};
// eslint-disable-next-line no-unused-vars
var $0813f648b263415c$var$stylize = $0813f648b263415c$var$colors.stylize = function stylize(str, style) {
    if (!$0813f648b263415c$var$colors.enabled) return str + "";
    var styleMap = $0813f648b263415c$var$ansiStyles[style];
    // Stylize should work for non-ANSI styles, too
    if (!styleMap && style in $0813f648b263415c$var$colors) // Style maps like trap operate as functions on strings;
    // they don't have properties like open or close.
    return $0813f648b263415c$var$colors[style](str);
    return styleMap.open + str + styleMap.close;
};
var $0813f648b263415c$var$matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var $0813f648b263415c$var$escapeStringRegexp = function(str) {
    if (typeof str !== "string") throw new TypeError("Expected a string");
    return str.replace($0813f648b263415c$var$matchOperatorsRe, "\\$&");
};
function $0813f648b263415c$var$build(_styles) {
    var builder1 = function builder() {
        return $0813f648b263415c$var$applyStyle.apply(builder, arguments);
    };
    builder1._styles = _styles;
    // __proto__ is used because we must return a function, but there is
    // no way to create a function with a different prototype.
    builder1.__proto__ = $0813f648b263415c$var$proto;
    return builder1;
}
var $0813f648b263415c$var$styles = function() {
    var ret = {};
    $0813f648b263415c$var$ansiStyles.grey = $0813f648b263415c$var$ansiStyles.gray;
    Object.keys($0813f648b263415c$var$ansiStyles).forEach(function(key) {
        $0813f648b263415c$var$ansiStyles[key].closeRe = new RegExp($0813f648b263415c$var$escapeStringRegexp($0813f648b263415c$var$ansiStyles[key].close), "g");
        ret[key] = {
            get: function() {
                return $0813f648b263415c$var$build(this._styles.concat(key));
            }
        };
    });
    return ret;
}();
var $0813f648b263415c$var$proto = $0813f648b263415c$var$defineProps(function colors() {}, $0813f648b263415c$var$styles);
function $0813f648b263415c$var$applyStyle() {
    var args = Array.prototype.slice.call(arguments);
    var str = args.map(function(arg) {
        // Use weak equality check so we can colorize null/undefined in safe mode
        if (arg != null && arg.constructor === String) return arg;
        else return $9xlVa$util.inspect(arg);
    }).join(" ");
    if (!$0813f648b263415c$var$colors.enabled || !str) return str;
    var newLinesPresent = str.indexOf("\n") != -1;
    var nestedStyles = this._styles;
    var i = nestedStyles.length;
    while(i--){
        var code = $0813f648b263415c$var$ansiStyles[nestedStyles[i]];
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        if (newLinesPresent) str = str.replace($0813f648b263415c$var$newLineRegex, function(match) {
            return code.close + match + code.open;
        });
    }
    return str;
}
$0813f648b263415c$var$colors.setTheme = function(theme) {
    if (typeof theme === "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
    }
    for(var style1 in theme)(function(style) {
        $0813f648b263415c$var$colors[style] = function(str) {
            if (typeof theme[style] === "object") {
                var out = str;
                for(var i in theme[style])out = $0813f648b263415c$var$colors[theme[style][i]](out);
                return out;
            }
            return $0813f648b263415c$var$colors[theme[style]](str);
        };
    })(style1);
};
function $0813f648b263415c$var$init() {
    var ret = {};
    Object.keys($0813f648b263415c$var$styles).forEach(function(name) {
        ret[name] = {
            get: function() {
                return $0813f648b263415c$var$build([
                    name
                ]);
            }
        };
    });
    return ret;
}
var $0813f648b263415c$var$sequencer = function sequencer(map1, str) {
    var exploded = str.split("");
    exploded = exploded.map(map1);
    return exploded.join("");
};

// custom formatter methods
$0813f648b263415c$var$colors.trap = (parcelRequire("6Zrb0"));

$0813f648b263415c$var$colors.zalgo = (parcelRequire("4p4jr"));
// maps
$0813f648b263415c$var$colors.maps = {};

$0813f648b263415c$var$colors.maps.america = (parcelRequire("6yji4"))($0813f648b263415c$var$colors);

$0813f648b263415c$var$colors.maps.zebra = (parcelRequire("5W0Z4"))($0813f648b263415c$var$colors);

$0813f648b263415c$var$colors.maps.rainbow = (parcelRequire("c6VLv"))($0813f648b263415c$var$colors);

$0813f648b263415c$var$colors.maps.random = (parcelRequire("lA8sb"))($0813f648b263415c$var$colors);
for(var $0813f648b263415c$var$map in $0813f648b263415c$var$colors.maps)(function(map2) {
    $0813f648b263415c$var$colors[map2] = function(str) {
        return $0813f648b263415c$var$sequencer($0813f648b263415c$var$colors.maps[map2], str);
    };
})($0813f648b263415c$var$map);
$0813f648b263415c$var$defineProps($0813f648b263415c$var$colors, $0813f648b263415c$var$init());

});
parcelRequire.register("hS7dG", function(module, exports) {
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/ var $d02d1483bd768408$var$styles = {};
module.exports = $d02d1483bd768408$var$styles;
var $d02d1483bd768408$var$codes = {
    reset: [
        0,
        0
    ],
    bold: [
        1,
        22
    ],
    dim: [
        2,
        22
    ],
    italic: [
        3,
        23
    ],
    underline: [
        4,
        24
    ],
    inverse: [
        7,
        27
    ],
    hidden: [
        8,
        28
    ],
    strikethrough: [
        9,
        29
    ],
    black: [
        30,
        39
    ],
    red: [
        31,
        39
    ],
    green: [
        32,
        39
    ],
    yellow: [
        33,
        39
    ],
    blue: [
        34,
        39
    ],
    magenta: [
        35,
        39
    ],
    cyan: [
        36,
        39
    ],
    white: [
        37,
        39
    ],
    gray: [
        90,
        39
    ],
    grey: [
        90,
        39
    ],
    brightRed: [
        91,
        39
    ],
    brightGreen: [
        92,
        39
    ],
    brightYellow: [
        93,
        39
    ],
    brightBlue: [
        94,
        39
    ],
    brightMagenta: [
        95,
        39
    ],
    brightCyan: [
        96,
        39
    ],
    brightWhite: [
        97,
        39
    ],
    bgBlack: [
        40,
        49
    ],
    bgRed: [
        41,
        49
    ],
    bgGreen: [
        42,
        49
    ],
    bgYellow: [
        43,
        49
    ],
    bgBlue: [
        44,
        49
    ],
    bgMagenta: [
        45,
        49
    ],
    bgCyan: [
        46,
        49
    ],
    bgWhite: [
        47,
        49
    ],
    bgGray: [
        100,
        49
    ],
    bgGrey: [
        100,
        49
    ],
    bgBrightRed: [
        101,
        49
    ],
    bgBrightGreen: [
        102,
        49
    ],
    bgBrightYellow: [
        103,
        49
    ],
    bgBrightBlue: [
        104,
        49
    ],
    bgBrightMagenta: [
        105,
        49
    ],
    bgBrightCyan: [
        106,
        49
    ],
    bgBrightWhite: [
        107,
        49
    ],
    // legacy styles for colors pre v1.0.0
    blackBG: [
        40,
        49
    ],
    redBG: [
        41,
        49
    ],
    greenBG: [
        42,
        49
    ],
    yellowBG: [
        43,
        49
    ],
    blueBG: [
        44,
        49
    ],
    magentaBG: [
        45,
        49
    ],
    cyanBG: [
        46,
        49
    ],
    whiteBG: [
        47,
        49
    ]
};
Object.keys($d02d1483bd768408$var$codes).forEach(function(key) {
    var val = $d02d1483bd768408$var$codes[key];
    var style = $d02d1483bd768408$var$styles[key] = [];
    style.open = "\x1b[" + val[0] + "m";
    style.close = "\x1b[" + val[1] + "m";
});

});

parcelRequire.register("4xHj2", function(module, exports) {
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/ "use strict";


var $ajj6m = parcelRequire("ajj6m");
var $34ebd62e79f158a7$var$env = process.env;
var $34ebd62e79f158a7$var$forceColor = void 0;
if ($ajj6m("no-color") || $ajj6m("no-colors") || $ajj6m("color=false")) $34ebd62e79f158a7$var$forceColor = false;
else if ($ajj6m("color") || $ajj6m("colors") || $ajj6m("color=true") || $ajj6m("color=always")) $34ebd62e79f158a7$var$forceColor = true;
if ("FORCE_COLOR" in $34ebd62e79f158a7$var$env) $34ebd62e79f158a7$var$forceColor = $34ebd62e79f158a7$var$env.FORCE_COLOR.length === 0 || parseInt($34ebd62e79f158a7$var$env.FORCE_COLOR, 10) !== 0;
function $34ebd62e79f158a7$var$translateLevel(level) {
    if (level === 0) return false;
    return {
        level: level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function $34ebd62e79f158a7$var$supportsColor(stream) {
    if ($34ebd62e79f158a7$var$forceColor === false) return 0;
    if ($ajj6m("color=16m") || $ajj6m("color=full") || $ajj6m("color=truecolor")) return 3;
    if ($ajj6m("color=256")) return 2;
    if (stream && !stream.isTTY && $34ebd62e79f158a7$var$forceColor !== true) return 0;
    var min = $34ebd62e79f158a7$var$forceColor ? 1 : 0;
    if (process.platform === "win32") {
        // Node.js 7.5.0 is the first version of Node.js to include a patch to
        // libuv that enables 256 color output on Windows. Anything earlier and it
        // won't work. However, here we target Node.js 8 at minimum as it is an LTS
        // release, and Node.js 7 is not. Windows 10 build 10586 is the first
        // Windows release that supports 256 colors. Windows 10 build 14931 is the
        // first release that supports 16m/TrueColor.
        var osRelease = $9xlVa$os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
        return 1;
    }
    if ("CI" in $34ebd62e79f158a7$var$env) {
        if ([
            "TRAVIS",
            "CIRCLECI",
            "APPVEYOR",
            "GITLAB_CI"
        ].some(function(sign) {
            return sign in $34ebd62e79f158a7$var$env;
        }) || $34ebd62e79f158a7$var$env.CI_NAME === "codeship") return 1;
        return min;
    }
    if ("TEAMCITY_VERSION" in $34ebd62e79f158a7$var$env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test($34ebd62e79f158a7$var$env.TEAMCITY_VERSION) ? 1 : 0;
    if ("TERM_PROGRAM" in $34ebd62e79f158a7$var$env) {
        var version = parseInt(($34ebd62e79f158a7$var$env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch($34ebd62e79f158a7$var$env.TERM_PROGRAM){
            case "iTerm.app":
                return version >= 3 ? 3 : 2;
            case "Hyper":
                return 3;
            case "Apple_Terminal":
                return 2;
        }
    }
    if (/-256(color)?$/i.test($34ebd62e79f158a7$var$env.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test($34ebd62e79f158a7$var$env.TERM)) return 1;
    if ("COLORTERM" in $34ebd62e79f158a7$var$env) return 1;
    if ($34ebd62e79f158a7$var$env.TERM === "dumb") return min;
    return min;
}
function $34ebd62e79f158a7$var$getSupportLevel(stream) {
    var level = $34ebd62e79f158a7$var$supportsColor(stream);
    return $34ebd62e79f158a7$var$translateLevel(level);
}
module.exports = {
    supportsColor: $34ebd62e79f158a7$var$getSupportLevel,
    stdout: $34ebd62e79f158a7$var$getSupportLevel(process.stdout),
    stderr: $34ebd62e79f158a7$var$getSupportLevel(process.stderr)
};

});
parcelRequire.register("ajj6m", function(module, exports) {
/*
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/ "use strict";
module.exports = function(flag, argv) {
    argv = argv || process.argv;
    var terminatorPos = argv.indexOf("--");
    var prefix = /^-{1,2}/.test(flag) ? "" : "--";
    var pos = argv.indexOf(prefix + flag);
    return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

});


parcelRequire.register("6Zrb0", function(module, exports) {
module.exports = function runTheTrap(text, options) {
    var result = "";
    text = text || "Run the trap, drop the bass";
    text = text.split("");
    var trap = {
        a: [
            "@",
            "\u0104",
            "\u023A",
            "\u0245",
            "\u0394",
            "\u039B",
            "\u0414"
        ],
        b: [
            "\xdf",
            "\u0181",
            "\u0243",
            "\u026E",
            "\u03B2",
            "\u0E3F"
        ],
        c: [
            "\xa9",
            "\u023B",
            "\u03FE"
        ],
        d: [
            "\xd0",
            "\u018A",
            "\u0500",
            "\u0501",
            "\u0502",
            "\u0503"
        ],
        e: [
            "\xcb",
            "\u0115",
            "\u018E",
            "\u0258",
            "\u03A3",
            "\u03BE",
            "\u04BC",
            "\u0A6C"
        ],
        f: [
            "\u04FA"
        ],
        g: [
            "\u0262"
        ],
        h: [
            "\u0126",
            "\u0195",
            "\u04A2",
            "\u04BA",
            "\u04C7",
            "\u050A"
        ],
        i: [
            "\u0F0F"
        ],
        j: [
            "\u0134"
        ],
        k: [
            "\u0138",
            "\u04A0",
            "\u04C3",
            "\u051E"
        ],
        l: [
            "\u0139"
        ],
        m: [
            "\u028D",
            "\u04CD",
            "\u04CE",
            "\u0520",
            "\u0521",
            "\u0D69"
        ],
        n: [
            "\xd1",
            "\u014B",
            "\u019D",
            "\u0376",
            "\u03A0",
            "\u048A"
        ],
        o: [
            "\xd8",
            "\xf5",
            "\xf8",
            "\u01FE",
            "\u0298",
            "\u047A",
            "\u05DD",
            "\u06DD",
            "\u0E4F"
        ],
        p: [
            "\u01F7",
            "\u048E"
        ],
        q: [
            "\u09CD"
        ],
        r: [
            "\xae",
            "\u01A6",
            "\u0210",
            "\u024C",
            "\u0280",
            "\u042F"
        ],
        s: [
            "\xa7",
            "\u03DE",
            "\u03DF",
            "\u03E8"
        ],
        t: [
            "\u0141",
            "\u0166",
            "\u0373"
        ],
        u: [
            "\u01B1",
            "\u054D"
        ],
        v: [
            "\u05D8"
        ],
        w: [
            "\u0428",
            "\u0460",
            "\u047C",
            "\u0D70"
        ],
        x: [
            "\u04B2",
            "\u04FE",
            "\u04FC",
            "\u04FD"
        ],
        y: [
            "\xa5",
            "\u04B0",
            "\u04CB"
        ],
        z: [
            "\u01B5",
            "\u0240"
        ]
    };
    text.forEach(function(c) {
        c = c.toLowerCase();
        var chars = trap[c] || [
            " "
        ];
        var rand = Math.floor(Math.random() * chars.length);
        if (typeof trap[c] !== "undefined") result += trap[c][rand];
        else result += c;
    });
    return result;
};

});

parcelRequire.register("4p4jr", function(module, exports) {
// please no
module.exports = function zalgo(text1, options1) {
    text1 = text1 || "   he is here   ";
    var soul = {
        "up": [
            "\u030D",
            "\u030E",
            "\u0304",
            "\u0305",
            "\u033F",
            "\u0311",
            "\u0306",
            "\u0310",
            "\u0352",
            "\u0357",
            "\u0351",
            "\u0307",
            "\u0308",
            "\u030A",
            "\u0342",
            "\u0313",
            "\u0308",
            "\u034A",
            "\u034B",
            "\u034C",
            "\u0303",
            "\u0302",
            "\u030C",
            "\u0350",
            "\u0300",
            "\u0301",
            "\u030B",
            "\u030F",
            "\u0312",
            "\u0313",
            "\u0314",
            "\u033D",
            "\u0309",
            "\u0363",
            "\u0364",
            "\u0365",
            "\u0366",
            "\u0367",
            "\u0368",
            "\u0369",
            "\u036A",
            "\u036B",
            "\u036C",
            "\u036D",
            "\u036E",
            "\u036F",
            "\u033E",
            "\u035B",
            "\u0346",
            "\u031A", 
        ],
        "down": [
            "\u0316",
            "\u0317",
            "\u0318",
            "\u0319",
            "\u031C",
            "\u031D",
            "\u031E",
            "\u031F",
            "\u0320",
            "\u0324",
            "\u0325",
            "\u0326",
            "\u0329",
            "\u032A",
            "\u032B",
            "\u032C",
            "\u032D",
            "\u032E",
            "\u032F",
            "\u0330",
            "\u0331",
            "\u0332",
            "\u0333",
            "\u0339",
            "\u033A",
            "\u033B",
            "\u033C",
            "\u0345",
            "\u0347",
            "\u0348",
            "\u0349",
            "\u034D",
            "\u034E",
            "\u0353",
            "\u0354",
            "\u0355",
            "\u0356",
            "\u0359",
            "\u035A",
            "\u0323", 
        ],
        "mid": [
            "\u0315",
            "\u031B",
            "\u0300",
            "\u0301",
            "\u0358",
            "\u0321",
            "\u0322",
            "\u0327",
            "\u0328",
            "\u0334",
            "\u0335",
            "\u0336",
            "\u035C",
            "\u035D",
            "\u035E",
            "\u035F",
            "\u0360",
            "\u0362",
            "\u0338",
            "\u0337",
            "\u0361",
            " \u0489", 
        ]
    };
    var all = [].concat(soul.up, soul.down, soul.mid);
    function randomNumber(range) {
        var r = Math.floor(Math.random() * range);
        return r;
    }
    function isChar(character) {
        var bool = false;
        all.filter(function(i) {
            bool = i === character;
        });
        return bool;
    }
    function heComes(text, options) {
        var result = "";
        var counts;
        var l;
        options = options || {};
        options["up"] = typeof options["up"] !== "undefined" ? options["up"] : true;
        options["mid"] = typeof options["mid"] !== "undefined" ? options["mid"] : true;
        options["down"] = typeof options["down"] !== "undefined" ? options["down"] : true;
        options["size"] = typeof options["size"] !== "undefined" ? options["size"] : "maxi";
        text = text.split("");
        for(l in text){
            if (isChar(l)) continue;
            result = result + text[l];
            counts = {
                "up": 0,
                "down": 0,
                "mid": 0
            };
            switch(options.size){
                case "mini":
                    counts.up = randomNumber(8);
                    counts.mid = randomNumber(2);
                    counts.down = randomNumber(8);
                    break;
                case "maxi":
                    counts.up = randomNumber(16) + 3;
                    counts.mid = randomNumber(4) + 1;
                    counts.down = randomNumber(64) + 3;
                    break;
                default:
                    counts.up = randomNumber(8) + 1;
                    counts.mid = randomNumber(6) / 2;
                    counts.down = randomNumber(8) + 1;
                    break;
            }
            var arr = [
                "up",
                "mid",
                "down"
            ];
            for(var d in arr){
                var index = arr[d];
                for(var i = 0; i <= counts[index]; i++)if (options[index]) result = result + soul[index][randomNumber(soul[index].length)];
            }
        }
        return result;
    }
    // don't summon him
    return heComes(text1, options1);
};

});

parcelRequire.register("6yji4", function(module, exports) {
module.exports = function(colors) {
    return function(letter, i, exploded) {
        if (letter === " ") return letter;
        switch(i % 3){
            case 0:
                return colors.red(letter);
            case 1:
                return colors.white(letter);
            case 2:
                return colors.blue(letter);
        }
    };
};

});

parcelRequire.register("5W0Z4", function(module, exports) {
module.exports = function(colors) {
    return function(letter, i, exploded) {
        return i % 2 === 0 ? letter : colors.inverse(letter);
    };
};

});

parcelRequire.register("c6VLv", function(module, exports) {
module.exports = function(colors) {
    // RoY G BiV
    var rainbowColors = [
        "red",
        "yellow",
        "green",
        "blue",
        "magenta"
    ];
    return function(letter, i, exploded) {
        if (letter === " ") return letter;
        else return colors[rainbowColors[(i++) % rainbowColors.length]](letter);
    };
};

});

parcelRequire.register("lA8sb", function(module, exports) {
module.exports = function(colors) {
    var available = [
        "underline",
        "inverse",
        "grey",
        "yellow",
        "red",
        "green",
        "blue",
        "white",
        "cyan",
        "magenta",
        "brightYellow",
        "brightRed",
        "brightGreen",
        "brightBlue",
        "brightWhite",
        "brightCyan",
        "brightMagenta"
    ];
    return function(letter, i, exploded) {
        return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 2))]](letter);
    };
};

});



parcelRequire.register("7tLiS", function(module, exports) {
"use strict";
/**
 * A shareable symbol constant that can be used
 * as a non-enumerable / semi-hidden level identifier
 * to allow the readable level property to be mutable for
 * operations like colorization
 *
 * @type {Symbol}
 */ Object.defineProperty(module.exports, "LEVEL", {
    value: Symbol.for("level")
});
/**
 * A shareable symbol constant that can be used
 * as a non-enumerable / semi-hidden message identifier
 * to allow the final message property to not have
 * side effects on another.
 *
 * @type {Symbol}
 */ Object.defineProperty(module.exports, "MESSAGE", {
    value: Symbol.for("message")
});
/**
 * A shareable symbol constant that can be used
 * as a non-enumerable / semi-hidden message identifier
 * to allow the extracted splat property be hidden
 *
 * @type {Symbol}
 */ Object.defineProperty(module.exports, "SPLAT", {
    value: Symbol.for("splat")
});

/**
 * A shareable object constant  that can be used
 * as a standard configuration for winston@3.
 *
 * @type {Object}
 */ Object.defineProperty(module.exports, "configs", {
    value: (parcelRequire("lv273"))
});

});
parcelRequire.register("lv273", function(module, exports) {
/**
 * index.js: Default settings for all levels that winston knows about.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

/**
 * Export config set for the CLI.
 * @type {Object}
 */ Object.defineProperty(module.exports, "cli", {
    value: (parcelRequire("jeFL9"))
});

/**
 * Export config set for npm.
 * @type {Object}
 */ Object.defineProperty(module.exports, "npm", {
    value: (parcelRequire("9QnK6"))
});

/**
 * Export config set for the syslog.
 * @type {Object}
 */ Object.defineProperty(module.exports, "syslog", {
    value: (parcelRequire("8M2oq"))
});

});
parcelRequire.register("jeFL9", function(module, exports) {

$parcel$export(module.exports, "levels", () => $e00fb7adcb2b162c$export$cc32c6afed33d362, (v) => $e00fb7adcb2b162c$export$cc32c6afed33d362 = v);
$parcel$export(module.exports, "colors", () => $e00fb7adcb2b162c$export$8f45430ccf837300, (v) => $e00fb7adcb2b162c$export$8f45430ccf837300 = v);
/**
 * Default levels for the CLI configuration.
 * @type {Object}
 */ var $e00fb7adcb2b162c$export$cc32c6afed33d362;
/**
 * Default colors for the CLI configuration.
 * @type {Object}
 */ var $e00fb7adcb2b162c$export$8f45430ccf837300;
/**
 * cli.js: Config that conform to commonly used CLI logging levels.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";
$e00fb7adcb2b162c$export$cc32c6afed33d362 = {
    error: 0,
    warn: 1,
    help: 2,
    data: 3,
    info: 4,
    debug: 5,
    prompt: 6,
    verbose: 7,
    input: 8,
    silly: 9
};
$e00fb7adcb2b162c$export$8f45430ccf837300 = {
    error: "red",
    warn: "yellow",
    help: "cyan",
    data: "grey",
    info: "green",
    debug: "blue",
    prompt: "grey",
    verbose: "cyan",
    input: "grey",
    silly: "magenta"
};

});

parcelRequire.register("9QnK6", function(module, exports) {

$parcel$export(module.exports, "levels", () => $72ab6327dc78112e$export$cc32c6afed33d362, (v) => $72ab6327dc78112e$export$cc32c6afed33d362 = v);
$parcel$export(module.exports, "colors", () => $72ab6327dc78112e$export$8f45430ccf837300, (v) => $72ab6327dc78112e$export$8f45430ccf837300 = v);
/**
 * Default levels for the npm configuration.
 * @type {Object}
 */ var $72ab6327dc78112e$export$cc32c6afed33d362;
/**
 * Default levels for the npm configuration.
 * @type {Object}
 */ var $72ab6327dc78112e$export$8f45430ccf837300;
/**
 * npm.js: Config that conform to npm logging levels.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";
$72ab6327dc78112e$export$cc32c6afed33d362 = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
};
$72ab6327dc78112e$export$8f45430ccf837300 = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "green",
    verbose: "cyan",
    debug: "blue",
    silly: "magenta"
};

});

parcelRequire.register("8M2oq", function(module, exports) {

$parcel$export(module.exports, "levels", () => $6634a9a413257728$export$cc32c6afed33d362, (v) => $6634a9a413257728$export$cc32c6afed33d362 = v);
$parcel$export(module.exports, "colors", () => $6634a9a413257728$export$8f45430ccf837300, (v) => $6634a9a413257728$export$8f45430ccf837300 = v);
/**
 * Default levels for the syslog configuration.
 * @type {Object}
 */ var $6634a9a413257728$export$cc32c6afed33d362;
/**
 * Default levels for the syslog configuration.
 * @type {Object}
 */ var $6634a9a413257728$export$8f45430ccf837300;
/**
 * syslog.js: Config that conform to syslog logging levels.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";
$6634a9a413257728$export$cc32c6afed33d362 = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
};
$6634a9a413257728$export$8f45430ccf837300 = {
    emerg: "red",
    alert: "yellow",
    crit: "red",
    error: "red",
    warning: "red",
    notice: "yellow",
    info: "green",
    debug: "blue"
};

});





parcelRequire.register("kjTEw", function(module, exports) {
"use strict";

var $lqhyJ = parcelRequire("lqhyJ");
/*
 * function align (info)
 * Returns a new instance of the align Format which adds a `\t`
 * delimiter before the message to properly align it in the same place.
 * It was previously { align: true } in winston < 3.0.0
 */ module.exports = $lqhyJ((info)=>{
    info.message = `\t${info.message}`;
    return info;
});

});

parcelRequire.register("2uh0s", function(module, exports) {
/* eslint no-undefined: 0 */ "use strict";

var $lqhyJ = parcelRequire("lqhyJ");

var $7tLiS = parcelRequire("7tLiS");
var $1cfb933d8301f752$require$LEVEL = $7tLiS.LEVEL;
var $1cfb933d8301f752$require$MESSAGE = $7tLiS.MESSAGE;
/*
 * function errors (info)
 * If the `message` property of the `info` object is an instance of `Error`,
 * replace the `Error` object its own `message` property.
 *
 * Optionally, the Error's `stack` property can also be appended to the `info` object.
 */ module.exports = $lqhyJ((einfo, { stack: stack  })=>{
    if (einfo instanceof Error) {
        const info = Object.assign({}, einfo, {
            level: einfo.level,
            [$1cfb933d8301f752$require$LEVEL]: einfo[$1cfb933d8301f752$require$LEVEL] || einfo.level,
            message: einfo.message,
            [$1cfb933d8301f752$require$MESSAGE]: einfo[$1cfb933d8301f752$require$MESSAGE] || einfo.message
        });
        if (stack) info.stack = einfo.stack;
        return info;
    }
    if (!(einfo.message instanceof Error)) return einfo;
    // Assign all enumerable properties and the
    // message property from the error provided.
    const err = einfo.message;
    Object.assign(einfo, err);
    einfo.message = err.message;
    einfo[$1cfb933d8301f752$require$MESSAGE] = err.message;
    // Assign the stack if requested.
    if (stack) einfo.stack = err.stack;
    return einfo;
});

});

parcelRequire.register("3jgWx", function(module, exports) {
"use strict";

var $eOReR = parcelRequire("eOReR");
var $26904a03993b31ba$require$Colorizer = $eOReR.Colorizer;

var $3CTO0 = parcelRequire("3CTO0");
var $26904a03993b31ba$require$Padder = $3CTO0.Padder;

var $7tLiS = parcelRequire("7tLiS");
var $26904a03993b31ba$require$configs = $7tLiS.configs;
var $26904a03993b31ba$require$MESSAGE = $7tLiS.MESSAGE;
/**
 * Cli format class that handles initial state for a a separate
 * Colorizer and Padder instance.
 */ class $26904a03993b31ba$var$CliFormat {
    constructor(opts = {}){
        if (!opts.levels) opts.levels = $26904a03993b31ba$require$configs.cli.levels;
        this.colorizer = new $26904a03993b31ba$require$Colorizer(opts);
        this.padder = new $26904a03993b31ba$require$Padder(opts);
        this.options = opts;
    }
    /*
   * function transform (info, opts)
   * Attempts to both:
   * 1. Pad the { level }
   * 2. Colorize the { level, message }
   * of the given `logform` info object depending on the `opts`.
   */ transform(info, opts) {
        this.colorizer.transform(this.padder.transform(info, opts), opts);
        info[$26904a03993b31ba$require$MESSAGE] = `${info.level}:${info.message}`;
        return info;
    }
}
/*
 * function cli (opts)
 * Returns a new instance of the CLI format that turns a log
 * `info` object into the same format previously available
 * in `winston.cli()` in `winston < 3.0.0`.
 */ module.exports = (opts)=>new $26904a03993b31ba$var$CliFormat(opts);
//
// Attach the CliFormat for registration purposes
//
module.exports.Format = $26904a03993b31ba$var$CliFormat;

});
parcelRequire.register("3CTO0", function(module, exports) {
/* eslint no-unused-vars: 0 */ "use strict";

var $7tLiS = parcelRequire("7tLiS");
var $2a4035857adc9f77$require$configs = $7tLiS.configs;
var $2a4035857adc9f77$require$LEVEL = $7tLiS.LEVEL;
var $2a4035857adc9f77$require$MESSAGE = $7tLiS.MESSAGE;
class $2a4035857adc9f77$var$Padder {
    constructor(opts = {
        levels: $2a4035857adc9f77$require$configs.npm.levels
    }){
        this.paddings = $2a4035857adc9f77$var$Padder.paddingForLevels(opts.levels, opts.filler);
        this.options = opts;
    }
    /**
   * Returns the maximum length of keys in the specified `levels` Object.
   * @param  {Object} levels Set of all levels to calculate longest level against.
   * @returns {Number} Maximum length of the longest level string.
   */ static getLongestLevel(levels) {
        const lvls = Object.keys(levels).map((level)=>level.length);
        return Math.max(...lvls);
    }
    /**
   * Returns the padding for the specified `level` assuming that the
   * maximum length of all levels it's associated with is `maxLength`.
   * @param  {String} level Level to calculate padding for.
   * @param  {String} filler Repeatable text to use for padding.
   * @param  {Number} maxLength Length of the longest level
   * @returns {String} Padding string for the `level`
   */ static paddingForLevel(level, filler, maxLength) {
        const targetLen = maxLength + 1 - level.length;
        const rep = Math.floor(targetLen / filler.length);
        const padding = `${filler}${filler.repeat(rep)}`;
        return padding.slice(0, targetLen);
    }
    /**
   * Returns an object with the string paddings for the given `levels`
   * using the specified `filler`.
   * @param  {Object} levels Set of all levels to calculate padding for.
   * @param  {String} filler Repeatable text to use for padding.
   * @returns {Object} Mapping of level to desired padding.
   */ static paddingForLevels(levels, filler = " ") {
        const maxLength = $2a4035857adc9f77$var$Padder.getLongestLevel(levels);
        return Object.keys(levels).reduce((acc, level)=>{
            acc[level] = $2a4035857adc9f77$var$Padder.paddingForLevel(level, filler, maxLength);
            return acc;
        }, {});
    }
    /**
   * Prepends the padding onto the `message` based on the `LEVEL` of
   * the `info`. This is based on the behavior of `winston@2` which also
   * prepended the level onto the message.
   *
   * See: https://github.com/winstonjs/winston/blob/2.x/lib/winston/logger.js#L198-L201
   *
   * @param  {Info} info Logform info object
   * @param  {Object} opts Options passed along to this instance.
   * @returns {Info} Modified logform info object.
   */ transform(info, opts) {
        info.message = `${this.paddings[info[$2a4035857adc9f77$require$LEVEL]]}${info.message}`;
        if (info[$2a4035857adc9f77$require$MESSAGE]) info[$2a4035857adc9f77$require$MESSAGE] = `${this.paddings[info[$2a4035857adc9f77$require$LEVEL]]}${info[$2a4035857adc9f77$require$MESSAGE]}`;
        return info;
    }
}
/*
 * function padLevels (info)
 * Returns a new instance of the padLevels Format which pads
 * levels to be the same length. This was previously exposed as
 * { padLevels: true } to transports in `winston < 3.0.0`.
 */ module.exports = (opts)=>new $2a4035857adc9f77$var$Padder(opts);
module.exports.Padder = module.exports.Format = $2a4035857adc9f77$var$Padder;

});


parcelRequire.register("csRG3", function(module, exports) {
"use strict";

var $lqhyJ = parcelRequire("lqhyJ");
/*
 * function cascade(formats)
 * Returns a function that invokes the `._format` function in-order
 * for the specified set of `formats`. In this manner we say that Formats
 * are "pipe-like", but not a pure pumpify implementation. Since there is no back
 * pressure we can remove all of the "readable" plumbing in Node streams.
 */ function $9131bcc514d3d1d7$var$cascade(formats) {
    if (!formats.every($9131bcc514d3d1d7$var$isValidFormat)) return;
    return (info)=>{
        let obj = info;
        for(let i = 0; i < formats.length; i++){
            obj = formats[i].transform(obj, formats[i].options);
            if (!obj) return false;
        }
        return obj;
    };
}
/*
 * function isValidFormat(format)
 * If the format does not define a `transform` function throw an error
 * with more detailed usage.
 */ function $9131bcc514d3d1d7$var$isValidFormat(fmt) {
    if (typeof fmt.transform !== "function") throw new Error([
        "No transform function found on format. Did you create a format instance?",
        "const myFormat = format(formatFn);",
        "const instance = myFormat();"
    ].join("\n"));
    return true;
}
/*
 * function combine (info)
 * Returns a new instance of the combine Format which combines the specified
 * formats into a new format. This is similar to a pipe-chain in transform streams.
 * We choose to combine the prototypes this way because there is no back pressure in
 * an in-memory transform chain.
 */ module.exports = (...formats)=>{
    const combinedFormat = $lqhyJ($9131bcc514d3d1d7$var$cascade(formats));
    const instance = combinedFormat();
    instance.Format = combinedFormat.Format;
    return instance;
};
//
// Export the cascade method for use in cli and other
// combined formats that should not be assumed to be
// singletons.
//
module.exports.cascade = $9131bcc514d3d1d7$var$cascade;

});

parcelRequire.register("iX4fb", function(module, exports) {
"use strict";

var $lqhyJ = parcelRequire("lqhyJ");

var $7tLiS = parcelRequire("7tLiS");
var $dcc107721101fe68$require$MESSAGE = $7tLiS.MESSAGE;

var $ag5xU = parcelRequire("ag5xU");
/*
 * function replacer (key, value)
 * Handles proper stringification of Buffer and bigint output.
 */ function $dcc107721101fe68$var$replacer(key, value) {
    // safe-stable-stringify does support BigInt, however, it doesn't wrap the value in quotes.
    // Leading to a loss in fidelity if the resulting string is parsed.
    // It would also be a breaking change for logform.
    if (typeof value === "bigint") return value.toString();
    return value;
}
/*
 * function json (info)
 * Returns a new instance of the JSON format that turns a log `info`
 * object into pure JSON. This was previously exposed as { json: true }
 * to transports in `winston < 3.0.0`.
 */ module.exports = $lqhyJ((info, opts)=>{
    const jsonStringify = $ag5xU.configure(opts);
    info[$dcc107721101fe68$require$MESSAGE] = jsonStringify(info, opts.replacer || $dcc107721101fe68$var$replacer, opts.space);
    return info;
});

});
parcelRequire.register("ag5xU", function(module, exports) {
"use strict";
const $777fb355ff6a12d9$var$stringify = $777fb355ff6a12d9$var$configure();
// @ts-expect-error
$777fb355ff6a12d9$var$stringify.configure = $777fb355ff6a12d9$var$configure;
// @ts-expect-error
$777fb355ff6a12d9$var$stringify.stringify = $777fb355ff6a12d9$var$stringify;
// @ts-expect-error
$777fb355ff6a12d9$var$stringify.default = $777fb355ff6a12d9$var$stringify;
// @ts-expect-error used for named export
module.exports.stringify = $777fb355ff6a12d9$var$stringify;
// @ts-expect-error used for named export
module.exports.configure = $777fb355ff6a12d9$var$configure;
module.exports = $777fb355ff6a12d9$var$stringify;
// eslint-disable-next-line
const $777fb355ff6a12d9$var$strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/;
// eslint-disable-next-line
const $777fb355ff6a12d9$var$strEscapeSequencesReplacer = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]|[\ud800-\udbff](?![\udc00-\udfff])|(?:[^\ud800-\udbff]|^)[\udc00-\udfff]/g;
// Escaped special characters. Use empty strings to fill up unused entries.
const $777fb355ff6a12d9$var$meta = [
    "\\u0000",
    "\\u0001",
    "\\u0002",
    "\\u0003",
    "\\u0004",
    "\\u0005",
    "\\u0006",
    "\\u0007",
    "\\b",
    "\\t",
    "\\n",
    "\\u000b",
    "\\f",
    "\\r",
    "\\u000e",
    "\\u000f",
    "\\u0010",
    "\\u0011",
    "\\u0012",
    "\\u0013",
    "\\u0014",
    "\\u0015",
    "\\u0016",
    "\\u0017",
    "\\u0018",
    "\\u0019",
    "\\u001a",
    "\\u001b",
    "\\u001c",
    "\\u001d",
    "\\u001e",
    "\\u001f",
    "",
    "",
    '\\"',
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\\\"
];
function $777fb355ff6a12d9$var$escapeFn(str) {
    if (str.length === 2) {
        const charCode = str.charCodeAt(1);
        return `${str[0]}\\u${charCode.toString(16)}`;
    }
    const charCode = str.charCodeAt(0);
    return $777fb355ff6a12d9$var$meta.length > charCode ? $777fb355ff6a12d9$var$meta[charCode] : `\\u${charCode.toString(16)}`;
}
// Escape C0 control characters, double quotes, the backslash and every code
// unit with a numeric value in the inclusive range 0xD800 to 0xDFFF.
function $777fb355ff6a12d9$var$strEscape(str) {
    // Some magic numbers that worked out fine while benchmarking with v8 8.0
    if (str.length < 5000 && !$777fb355ff6a12d9$var$strEscapeSequencesRegExp.test(str)) return str;
    if (str.length > 100) return str.replace($777fb355ff6a12d9$var$strEscapeSequencesReplacer, $777fb355ff6a12d9$var$escapeFn);
    let result = "";
    let last = 0;
    for(let i = 0; i < str.length; i++){
        const point = str.charCodeAt(i);
        if (point === 34 || point === 92 || point < 32) {
            result += `${str.slice(last, i)}${$777fb355ff6a12d9$var$meta[point]}`;
            last = i + 1;
        } else if (point >= 0xd800 && point <= 0xdfff) {
            if (point <= 0xdbff && i + 1 < str.length) {
                const point = str.charCodeAt(i + 1);
                if (point >= 0xdc00 && point <= 0xdfff) {
                    i++;
                    continue;
                }
            }
            result += `${str.slice(last, i)}${`\\u${point.toString(16)}`}`;
            last = i + 1;
        }
    }
    result += str.slice(last);
    return result;
}
function $777fb355ff6a12d9$var$insertSort(array) {
    // Insertion sort is very efficient for small input sizes but it has a bad
    // worst case complexity. Thus, use native array sort for bigger values.
    if (array.length > 2e2) return array.sort();
    for(let i = 1; i < array.length; i++){
        const currentValue = array[i];
        let position = i;
        while(position !== 0 && array[position - 1] > currentValue){
            array[position] = array[position - 1];
            position--;
        }
        array[position] = currentValue;
    }
    return array;
}
const $777fb355ff6a12d9$var$typedArrayPrototypeGetSymbolToStringTag = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Object.getPrototypeOf(new Uint8Array())), Symbol.toStringTag).get;
function $777fb355ff6a12d9$var$isTypedArrayWithEntries(value) {
    return $777fb355ff6a12d9$var$typedArrayPrototypeGetSymbolToStringTag.call(value) !== undefined && value.length !== 0;
}
function $777fb355ff6a12d9$var$stringifyTypedArray(array, separator, maximumBreadth) {
    if (array.length < maximumBreadth) maximumBreadth = array.length;
    const whitespace = separator === "," ? "" : " ";
    let res = `"0":${whitespace}${array[0]}`;
    for(let i = 1; i < maximumBreadth; i++)res += `${separator}"${i}":${whitespace}${array[i]}`;
    return res;
}
function $777fb355ff6a12d9$var$getCircularValueOption(options) {
    if (options && Object.prototype.hasOwnProperty.call(options, "circularValue")) {
        var circularValue = options.circularValue;
        if (typeof circularValue === "string") return `"${circularValue}"`;
        if (circularValue == null) return circularValue;
        if (circularValue === Error || circularValue === TypeError) return {
            toString () {
                throw new TypeError("Converting circular structure to JSON");
            }
        };
        throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined');
    }
    return '"[Circular]"';
}
function $777fb355ff6a12d9$var$getBooleanOption(options, key) {
    if (options && Object.prototype.hasOwnProperty.call(options, key)) {
        var value = options[key];
        if (typeof value !== "boolean") throw new TypeError(`The "${key}" argument must be of type boolean`);
    }
    return value === undefined ? true : value;
}
function $777fb355ff6a12d9$var$getPositiveIntegerOption(options, key) {
    if (options && Object.prototype.hasOwnProperty.call(options, key)) {
        var value = options[key];
        if (typeof value !== "number") throw new TypeError(`The "${key}" argument must be of type number`);
        if (!Number.isInteger(value)) throw new TypeError(`The "${key}" argument must be an integer`);
        if (value < 1) throw new RangeError(`The "${key}" argument must be >= 1`);
    }
    return value === undefined ? Infinity : value;
}
function $777fb355ff6a12d9$var$getItemCount(number) {
    if (number === 1) return "1 item";
    return `${number} items`;
}
function $777fb355ff6a12d9$var$getUniqueReplacerSet(replacerArray) {
    const replacerSet = new Set();
    for (const value of replacerArray){
        if (typeof value === "string") replacerSet.add(value);
        else if (typeof value === "number") replacerSet.add(String(value));
    }
    return replacerSet;
}
function $777fb355ff6a12d9$var$configure(options) {
    const circularValue = $777fb355ff6a12d9$var$getCircularValueOption(options);
    const bigint = $777fb355ff6a12d9$var$getBooleanOption(options, "bigint");
    const deterministic = $777fb355ff6a12d9$var$getBooleanOption(options, "deterministic");
    const maximumDepth = $777fb355ff6a12d9$var$getPositiveIntegerOption(options, "maximumDepth");
    const maximumBreadth = $777fb355ff6a12d9$var$getPositiveIntegerOption(options, "maximumBreadth");
    function stringifyFnReplacer(key, parent, stack, replacer, spacer, indentation) {
        let value = parent[key];
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") value = value.toJSON(key);
        value = replacer.call(parent, key, value);
        switch(typeof value){
            case "string":
                return `"${$777fb355ff6a12d9$var$strEscape(value)}"`;
            case "object":
                {
                    if (value === null) return "null";
                    if (stack.indexOf(value) !== -1) return circularValue;
                    let res = "";
                    let join = ",";
                    const originalIndentation = indentation;
                    if (Array.isArray(value)) {
                        if (value.length === 0) return "[]";
                        if (maximumDepth < stack.length + 1) return '"[Array]"';
                        stack.push(value);
                        if (spacer !== "") {
                            indentation += spacer;
                            res += `\n${indentation}`;
                            join = `,\n${indentation}`;
                        }
                        const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
                        let i = 0;
                        for(; i < maximumValuesToStringify - 1; i++){
                            const tmp = stringifyFnReplacer(i, value, stack, replacer, spacer, indentation);
                            res += tmp !== undefined ? tmp : "null";
                            res += join;
                        }
                        const tmp = stringifyFnReplacer(i, value, stack, replacer, spacer, indentation);
                        res += tmp !== undefined ? tmp : "null";
                        if (value.length - 1 > maximumBreadth) {
                            const removedKeys = value.length - maximumBreadth - 1;
                            res += `${join}"... ${$777fb355ff6a12d9$var$getItemCount(removedKeys)} not stringified"`;
                        }
                        if (spacer !== "") res += `\n${originalIndentation}`;
                        stack.pop();
                        return `[${res}]`;
                    }
                    let keys = Object.keys(value);
                    const keyLength = keys.length;
                    if (keyLength === 0) return "{}";
                    if (maximumDepth < stack.length + 1) return '"[Object]"';
                    let whitespace = "";
                    let separator = "";
                    if (spacer !== "") {
                        indentation += spacer;
                        join = `,\n${indentation}`;
                        whitespace = " ";
                    }
                    let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
                    if ($777fb355ff6a12d9$var$isTypedArrayWithEntries(value)) {
                        res += $777fb355ff6a12d9$var$stringifyTypedArray(value, join, maximumBreadth);
                        keys = keys.slice(value.length);
                        maximumPropertiesToStringify -= value.length;
                        separator = join;
                    }
                    if (deterministic) keys = $777fb355ff6a12d9$var$insertSort(keys);
                    stack.push(value);
                    for(let i = 0; i < maximumPropertiesToStringify; i++){
                        const key = keys[i];
                        const tmp = stringifyFnReplacer(key, value, stack, replacer, spacer, indentation);
                        if (tmp !== undefined) {
                            res += `${separator}"${$777fb355ff6a12d9$var$strEscape(key)}":${whitespace}${tmp}`;
                            separator = join;
                        }
                    }
                    if (keyLength > maximumBreadth) {
                        const removedKeys = keyLength - maximumBreadth;
                        res += `${separator}"...":${whitespace}"${$777fb355ff6a12d9$var$getItemCount(removedKeys)} not stringified"`;
                        separator = join;
                    }
                    if (spacer !== "" && separator.length > 1) res = `\n${indentation}${res}\n${originalIndentation}`;
                    stack.pop();
                    return `{${res}}`;
                }
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
                return value === true ? "true" : "false";
            case "bigint":
                return bigint ? String(value) : undefined;
        }
    }
    function stringifyArrayReplacer(key, value, stack, replacer, spacer, indentation) {
        if (typeof value === "object" && value !== null && typeof value.toJSON === "function") value = value.toJSON(key);
        switch(typeof value){
            case "string":
                return `"${$777fb355ff6a12d9$var$strEscape(value)}"`;
            case "object":
                {
                    if (value === null) return "null";
                    if (stack.indexOf(value) !== -1) return circularValue;
                    const originalIndentation = indentation;
                    let res = "";
                    let join = ",";
                    if (Array.isArray(value)) {
                        if (value.length === 0) return "[]";
                        if (maximumDepth < stack.length + 1) return '"[Array]"';
                        stack.push(value);
                        if (spacer !== "") {
                            indentation += spacer;
                            res += `\n${indentation}`;
                            join = `,\n${indentation}`;
                        }
                        const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
                        let i = 0;
                        for(; i < maximumValuesToStringify - 1; i++){
                            const tmp = stringifyArrayReplacer(i, value[i], stack, replacer, spacer, indentation);
                            res += tmp !== undefined ? tmp : "null";
                            res += join;
                        }
                        const tmp = stringifyArrayReplacer(i, value[i], stack, replacer, spacer, indentation);
                        res += tmp !== undefined ? tmp : "null";
                        if (value.length - 1 > maximumBreadth) {
                            const removedKeys = value.length - maximumBreadth - 1;
                            res += `${join}"... ${$777fb355ff6a12d9$var$getItemCount(removedKeys)} not stringified"`;
                        }
                        if (spacer !== "") res += `\n${originalIndentation}`;
                        stack.pop();
                        return `[${res}]`;
                    }
                    if (replacer.size === 0) return "{}";
                    stack.push(value);
                    let whitespace = "";
                    if (spacer !== "") {
                        indentation += spacer;
                        join = `,\n${indentation}`;
                        whitespace = " ";
                    }
                    let separator = "";
                    for (const key of replacer){
                        const tmp = stringifyArrayReplacer(key, value[key], stack, replacer, spacer, indentation);
                        if (tmp !== undefined) {
                            res += `${separator}"${$777fb355ff6a12d9$var$strEscape(key)}":${whitespace}${tmp}`;
                            separator = join;
                        }
                    }
                    if (spacer !== "" && separator.length > 1) res = `\n${indentation}${res}\n${originalIndentation}`;
                    stack.pop();
                    return `{${res}}`;
                }
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
                return value === true ? "true" : "false";
            case "bigint":
                return bigint ? String(value) : undefined;
        }
    }
    function stringifyIndent(key, value, stack, spacer, indentation) {
        switch(typeof value){
            case "string":
                return `"${$777fb355ff6a12d9$var$strEscape(value)}"`;
            case "object":
                {
                    if (value === null) return "null";
                    if (typeof value.toJSON === "function") {
                        value = value.toJSON(key);
                        // Prevent calling `toJSON` again.
                        if (typeof value !== "object") return stringifyIndent(key, value, stack, spacer, indentation);
                        if (value === null) return "null";
                    }
                    if (stack.indexOf(value) !== -1) return circularValue;
                    const originalIndentation = indentation;
                    if (Array.isArray(value)) {
                        if (value.length === 0) return "[]";
                        if (maximumDepth < stack.length + 1) return '"[Array]"';
                        stack.push(value);
                        indentation += spacer;
                        let res = `\n${indentation}`;
                        const join = `,\n${indentation}`;
                        const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
                        let i = 0;
                        for(; i < maximumValuesToStringify - 1; i++){
                            const tmp = stringifyIndent(i, value[i], stack, spacer, indentation);
                            res += tmp !== undefined ? tmp : "null";
                            res += join;
                        }
                        const tmp = stringifyIndent(i, value[i], stack, spacer, indentation);
                        res += tmp !== undefined ? tmp : "null";
                        if (value.length - 1 > maximumBreadth) {
                            const removedKeys = value.length - maximumBreadth - 1;
                            res += `${join}"... ${$777fb355ff6a12d9$var$getItemCount(removedKeys)} not stringified"`;
                        }
                        res += `\n${originalIndentation}`;
                        stack.pop();
                        return `[${res}]`;
                    }
                    let keys = Object.keys(value);
                    const keyLength = keys.length;
                    if (keyLength === 0) return "{}";
                    if (maximumDepth < stack.length + 1) return '"[Object]"';
                    indentation += spacer;
                    const join = `,\n${indentation}`;
                    let res = "";
                    let separator = "";
                    let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
                    if ($777fb355ff6a12d9$var$isTypedArrayWithEntries(value)) {
                        res += $777fb355ff6a12d9$var$stringifyTypedArray(value, join, maximumBreadth);
                        keys = keys.slice(value.length);
                        maximumPropertiesToStringify -= value.length;
                        separator = join;
                    }
                    if (deterministic) keys = $777fb355ff6a12d9$var$insertSort(keys);
                    stack.push(value);
                    for(let i = 0; i < maximumPropertiesToStringify; i++){
                        const key = keys[i];
                        const tmp = stringifyIndent(key, value[key], stack, spacer, indentation);
                        if (tmp !== undefined) {
                            res += `${separator}"${$777fb355ff6a12d9$var$strEscape(key)}": ${tmp}`;
                            separator = join;
                        }
                    }
                    if (keyLength > maximumBreadth) {
                        const removedKeys = keyLength - maximumBreadth;
                        res += `${separator}"...": "${$777fb355ff6a12d9$var$getItemCount(removedKeys)} not stringified"`;
                        separator = join;
                    }
                    if (separator !== "") res = `\n${indentation}${res}\n${originalIndentation}`;
                    stack.pop();
                    return `{${res}}`;
                }
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
                return value === true ? "true" : "false";
            case "bigint":
                return bigint ? String(value) : undefined;
        }
    }
    function stringifySimple(key, value, stack) {
        switch(typeof value){
            case "string":
                return `"${$777fb355ff6a12d9$var$strEscape(value)}"`;
            case "object":
                {
                    if (value === null) return "null";
                    if (typeof value.toJSON === "function") {
                        value = value.toJSON(key);
                        // Prevent calling `toJSON` again
                        if (typeof value !== "object") return stringifySimple(key, value, stack);
                        if (value === null) return "null";
                    }
                    if (stack.indexOf(value) !== -1) return circularValue;
                    let res = "";
                    if (Array.isArray(value)) {
                        if (value.length === 0) return "[]";
                        if (maximumDepth < stack.length + 1) return '"[Array]"';
                        stack.push(value);
                        const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
                        let i = 0;
                        for(; i < maximumValuesToStringify - 1; i++){
                            const tmp = stringifySimple(i, value[i], stack);
                            res += tmp !== undefined ? tmp : "null";
                            res += ",";
                        }
                        const tmp = stringifySimple(i, value[i], stack);
                        res += tmp !== undefined ? tmp : "null";
                        if (value.length - 1 > maximumBreadth) {
                            const removedKeys = value.length - maximumBreadth - 1;
                            res += `,"... ${$777fb355ff6a12d9$var$getItemCount(removedKeys)} not stringified"`;
                        }
                        stack.pop();
                        return `[${res}]`;
                    }
                    let keys = Object.keys(value);
                    const keyLength = keys.length;
                    if (keyLength === 0) return "{}";
                    if (maximumDepth < stack.length + 1) return '"[Object]"';
                    let separator = "";
                    let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
                    if ($777fb355ff6a12d9$var$isTypedArrayWithEntries(value)) {
                        res += $777fb355ff6a12d9$var$stringifyTypedArray(value, ",", maximumBreadth);
                        keys = keys.slice(value.length);
                        maximumPropertiesToStringify -= value.length;
                        separator = ",";
                    }
                    if (deterministic) keys = $777fb355ff6a12d9$var$insertSort(keys);
                    stack.push(value);
                    for(let i = 0; i < maximumPropertiesToStringify; i++){
                        const key = keys[i];
                        const tmp = stringifySimple(key, value[key], stack);
                        if (tmp !== undefined) {
                            res += `${separator}"${$777fb355ff6a12d9$var$strEscape(key)}":${tmp}`;
                            separator = ",";
                        }
                    }
                    if (keyLength > maximumBreadth) {
                        const removedKeys = keyLength - maximumBreadth;
                        res += `${separator}"...":"${$777fb355ff6a12d9$var$getItemCount(removedKeys)} not stringified"`;
                    }
                    stack.pop();
                    return `{${res}}`;
                }
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
                return value === true ? "true" : "false";
            case "bigint":
                return bigint ? String(value) : undefined;
        }
    }
    function stringify1(value, replacer, space) {
        if (arguments.length > 1) {
            let spacer = "";
            if (typeof space === "number") spacer = " ".repeat(Math.min(space, 10));
            else if (typeof space === "string") spacer = space.slice(0, 10);
            if (replacer != null) {
                if (typeof replacer === "function") return stringifyFnReplacer("", {
                    "": value
                }, [], replacer, spacer, "");
                if (Array.isArray(replacer)) return stringifyArrayReplacer("", value, [], $777fb355ff6a12d9$var$getUniqueReplacerSet(replacer), spacer, "");
            }
            if (spacer.length !== 0) return stringifyIndent("", value, [], spacer, "");
        }
        return stringifySimple("", value, []);
    }
    return stringify1;
}

});


parcelRequire.register("2fzy0", function(module, exports) {
"use strict";

var $lqhyJ = parcelRequire("lqhyJ");
/*
 * function label (info)
 * Returns a new instance of the label Format which adds the specified
 * `opts.label` before the message. This was previously exposed as
 * { label: 'my label' } to transports in `winston < 3.0.0`.
 */ module.exports = $lqhyJ((info, opts)=>{
    if (opts.message) {
        info.message = `[${opts.label}] ${info.message}`;
        return info;
    }
    info.label = opts.label;
    return info;
});

});

parcelRequire.register("cw1ks", function(module, exports) {
"use strict";

var $lqhyJ = parcelRequire("lqhyJ");

var $7tLiS = parcelRequire("7tLiS");
var $91c9811e51245142$require$MESSAGE = $7tLiS.MESSAGE;

var $ag5xU = parcelRequire("ag5xU");
/*
 * function logstash (info)
 * Returns a new instance of the LogStash Format that turns a
 * log `info` object into pure JSON with the appropriate logstash
 * options. This was previously exposed as { logstash: true }
 * to transports in `winston < 3.0.0`.
 */ module.exports = $lqhyJ((info)=>{
    const logstash = {};
    if (info.message) {
        logstash["@message"] = info.message;
        delete info.message;
    }
    if (info.timestamp) {
        logstash["@timestamp"] = info.timestamp;
        delete info.timestamp;
    }
    logstash["@fields"] = info;
    info[$91c9811e51245142$require$MESSAGE] = $ag5xU(logstash);
    return info;
});

});

parcelRequire.register("bfYg0", function(module, exports) {
"use strict";

var $lqhyJ = parcelRequire("lqhyJ");
function $831fd641217a0971$var$fillExcept(info, fillExceptKeys, metadataKey) {
    const savedKeys = fillExceptKeys.reduce((acc, key)=>{
        acc[key] = info[key];
        delete info[key];
        return acc;
    }, {});
    const metadata = Object.keys(info).reduce((acc, key)=>{
        acc[key] = info[key];
        delete info[key];
        return acc;
    }, {});
    Object.assign(info, savedKeys, {
        [metadataKey]: metadata
    });
    return info;
}
function $831fd641217a0971$var$fillWith(info, fillWithKeys, metadataKey) {
    info[metadataKey] = fillWithKeys.reduce((acc, key)=>{
        acc[key] = info[key];
        delete info[key];
        return acc;
    }, {});
    return info;
}
/**
 * Adds in a "metadata" object to collect extraneous data, similar to the metadata
 * object in winston 2.x.
 */ module.exports = $lqhyJ((info, opts = {})=>{
    let metadataKey = "metadata";
    if (opts.key) metadataKey = opts.key;
    let fillExceptKeys = [];
    if (!opts.fillExcept && !opts.fillWith) {
        fillExceptKeys.push("level");
        fillExceptKeys.push("message");
    }
    if (opts.fillExcept) fillExceptKeys = opts.fillExcept;
    if (fillExceptKeys.length > 0) return $831fd641217a0971$var$fillExcept(info, fillExceptKeys, metadataKey);
    if (opts.fillWith) return $831fd641217a0971$var$fillWith(info, opts.fillWith, metadataKey);
    return info;
});

});

parcelRequire.register("lvCZm", function(module, exports) {
"use strict";

var $lqhyJ = parcelRequire("lqhyJ");

var $v9aVM = parcelRequire("v9aVM");
/*
 * function ms (info)
 * Returns an `info` with a `ms` property. The `ms` property holds the Value
 * of the time difference between two calls in milliseconds.
 */ module.exports = $lqhyJ((info)=>{
    const curr = +new Date();
    module.exports.diff = curr - (module.exports.prevTime || curr);
    module.exports.prevTime = curr;
    info.ms = `+${$v9aVM(module.exports.diff)}`;
    return info;
});

});
parcelRequire.register("v9aVM", function(module, exports) {
/**
 * Helpers.
 */ var $05da0363c4ec6f8d$var$s = 1000;
var $05da0363c4ec6f8d$var$m = $05da0363c4ec6f8d$var$s * 60;
var $05da0363c4ec6f8d$var$h = $05da0363c4ec6f8d$var$m * 60;
var $05da0363c4ec6f8d$var$d = $05da0363c4ec6f8d$var$h * 24;
var $05da0363c4ec6f8d$var$w = $05da0363c4ec6f8d$var$d * 7;
var $05da0363c4ec6f8d$var$y = $05da0363c4ec6f8d$var$d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) return $05da0363c4ec6f8d$var$parse(val);
    else if (type === "number" && isFinite(val)) return options.long ? $05da0363c4ec6f8d$var$fmtLong(val) : $05da0363c4ec6f8d$var$fmtShort(val);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function $05da0363c4ec6f8d$var$parse(str) {
    str = String(str);
    if (str.length > 100) return;
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) return;
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch(type){
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
            return n * $05da0363c4ec6f8d$var$y;
        case "weeks":
        case "week":
        case "w":
            return n * $05da0363c4ec6f8d$var$w;
        case "days":
        case "day":
        case "d":
            return n * $05da0363c4ec6f8d$var$d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
            return n * $05da0363c4ec6f8d$var$h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
            return n * $05da0363c4ec6f8d$var$m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
            return n * $05da0363c4ec6f8d$var$s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $05da0363c4ec6f8d$var$fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $05da0363c4ec6f8d$var$d) return Math.round(ms / $05da0363c4ec6f8d$var$d) + "d";
    if (msAbs >= $05da0363c4ec6f8d$var$h) return Math.round(ms / $05da0363c4ec6f8d$var$h) + "h";
    if (msAbs >= $05da0363c4ec6f8d$var$m) return Math.round(ms / $05da0363c4ec6f8d$var$m) + "m";
    if (msAbs >= $05da0363c4ec6f8d$var$s) return Math.round(ms / $05da0363c4ec6f8d$var$s) + "s";
    return ms + "ms";
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function $05da0363c4ec6f8d$var$fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= $05da0363c4ec6f8d$var$d) return $05da0363c4ec6f8d$var$plural(ms, msAbs, $05da0363c4ec6f8d$var$d, "day");
    if (msAbs >= $05da0363c4ec6f8d$var$h) return $05da0363c4ec6f8d$var$plural(ms, msAbs, $05da0363c4ec6f8d$var$h, "hour");
    if (msAbs >= $05da0363c4ec6f8d$var$m) return $05da0363c4ec6f8d$var$plural(ms, msAbs, $05da0363c4ec6f8d$var$m, "minute");
    if (msAbs >= $05da0363c4ec6f8d$var$s) return $05da0363c4ec6f8d$var$plural(ms, msAbs, $05da0363c4ec6f8d$var$s, "second");
    return ms + " ms";
}
/**
 * Pluralization helper.
 */ function $05da0363c4ec6f8d$var$plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
}

});


parcelRequire.register("eKbmI", function(module, exports) {
"use strict";

var $abbe2d788591b08d$require$inspect = $9xlVa$util.inspect;

var $lqhyJ = parcelRequire("lqhyJ");

var $7tLiS = parcelRequire("7tLiS");
var $abbe2d788591b08d$require$LEVEL = $7tLiS.LEVEL;
var $abbe2d788591b08d$require$MESSAGE = $7tLiS.MESSAGE;
var $abbe2d788591b08d$require$SPLAT = $7tLiS.SPLAT;
/*
 * function prettyPrint (info)
 * Returns a new instance of the prettyPrint Format that "prettyPrint"
 * serializes `info` objects. This was previously exposed as
 * { prettyPrint: true } to transports in `winston < 3.0.0`.
 */ module.exports = $lqhyJ((info, opts = {})=>{
    //
    // info[{LEVEL, MESSAGE, SPLAT}] are enumerable here. Since they
    // are internal, we remove them before util.inspect so they
    // are not printed.
    //
    const stripped = Object.assign({}, info);
    // Remark (indexzero): update this technique in April 2019
    // when node@6 is EOL
    delete stripped[$abbe2d788591b08d$require$LEVEL];
    delete stripped[$abbe2d788591b08d$require$MESSAGE];
    delete stripped[$abbe2d788591b08d$require$SPLAT];
    info[$abbe2d788591b08d$require$MESSAGE] = $abbe2d788591b08d$require$inspect(stripped, false, opts.depth || null, opts.colorize);
    return info;
});

});

parcelRequire.register("iLfjv", function(module, exports) {
"use strict";

var $7tLiS = parcelRequire("7tLiS");
var $da887ec0210b3513$require$MESSAGE = $7tLiS.MESSAGE;
class $da887ec0210b3513$var$Printf {
    constructor(templateFn){
        this.template = templateFn;
    }
    transform(info) {
        info[$da887ec0210b3513$require$MESSAGE] = this.template(info);
        return info;
    }
}
/*
 * function printf (templateFn)
 * Returns a new instance of the printf Format that creates an
 * intermediate prototype to store the template string-based formatter
 * function.
 */ module.exports = (opts)=>new $da887ec0210b3513$var$Printf(opts);
module.exports.Printf = module.exports.Format = $da887ec0210b3513$var$Printf;

});

parcelRequire.register("4UEcd", function(module, exports) {
/* eslint no-undefined: 0 */ "use strict";

var $lqhyJ = parcelRequire("lqhyJ");

var $7tLiS = parcelRequire("7tLiS");
var $393b92788fe4c360$require$MESSAGE = $7tLiS.MESSAGE;

var $ag5xU = parcelRequire("ag5xU");
/*
 * function simple (info)
 * Returns a new instance of the simple format TransformStream
 * which writes a simple representation of logs.
 *
 *    const { level, message, splat, ...rest } = info;
 *
 *    ${level}: ${message}                            if rest is empty
 *    ${level}: ${message} ${JSON.stringify(rest)}    otherwise
 */ module.exports = $lqhyJ((info)=>{
    const stringifiedRest = $ag5xU(Object.assign({}, info, {
        level: undefined,
        message: undefined,
        splat: undefined
    }));
    const padding = info.padding && info.padding[info.level] || "";
    if (stringifiedRest !== "{}") info[$393b92788fe4c360$require$MESSAGE] = `${info.level}:${padding} ${info.message} ${stringifiedRest}`;
    else info[$393b92788fe4c360$require$MESSAGE] = `${info.level}:${padding} ${info.message}`;
    return info;
});

});

parcelRequire.register("RKDth", function(module, exports) {
"use strict";


var $7tLiS = parcelRequire("7tLiS");
var $0a19203782bc14d9$require$SPLAT = $7tLiS.SPLAT;
/**
 * Captures the number of format (i.e. %s strings) in a given string.
 * Based on `util.format`, see Node.js source:
 * https://github.com/nodejs/node/blob/b1c8f15c5f169e021f7c46eb7b219de95fe97603/lib/util.js#L201-L230
 * @type {RegExp}
 */ const $0a19203782bc14d9$var$formatRegExp = /%[scdjifoO%]/g;
/**
 * Captures the number of escaped % signs in a format string (i.e. %s strings).
 * @type {RegExp}
 */ const $0a19203782bc14d9$var$escapedPercent = /%%/g;
class $0a19203782bc14d9$var$Splatter {
    constructor(opts){
        this.options = opts;
    }
    /**
     * Check to see if tokens <= splat.length, assign { splat, meta } into the
     * `info` accordingly, and write to this instance.
     *
     * @param  {Info} info Logform info message.
     * @param  {String[]} tokens Set of string interpolation tokens.
     * @returns {Info} Modified info message
     * @private
     */ _splat(info, tokens) {
        const msg = info.message;
        const splat = info[$0a19203782bc14d9$require$SPLAT] || info.splat || [];
        const percents = msg.match($0a19203782bc14d9$var$escapedPercent);
        const escapes = percents && percents.length || 0;
        // The expected splat is the number of tokens minus the number of escapes
        // e.g.
        // - { expectedSplat: 3 } '%d %s %j'
        // - { expectedSplat: 5 } '[%s] %d%% %d%% %s %j'
        //
        // Any "meta" will be arugments in addition to the expected splat size
        // regardless of type. e.g.
        //
        // logger.log('info', '%d%% %s %j', 100, 'wow', { such: 'js' }, { thisIsMeta: true });
        // would result in splat of four (4), but only three (3) are expected. Therefore:
        //
        // extraSplat = 3 - 4 = -1
        // metas = [100, 'wow', { such: 'js' }, { thisIsMeta: true }].splice(-1, -1 * -1);
        // splat = [100, 'wow', { such: 'js' }]
        const expectedSplat = tokens.length - escapes;
        const extraSplat = expectedSplat - splat.length;
        const metas = extraSplat < 0 ? splat.splice(extraSplat, -1 * extraSplat) : [];
        // Now that { splat } has been separated from any potential { meta }. we
        // can assign this to the `info` object and write it to our format stream.
        // If the additional metas are **NOT** objects or **LACK** enumerable properties
        // you are going to have a bad time.
        const metalen = metas.length;
        if (metalen) for(let i = 0; i < metalen; i++)Object.assign(info, metas[i]);
        info.message = $9xlVa$util.format(msg, ...splat);
        return info;
    }
    /**
    * Transforms the `info` message by using `util.format` to complete
    * any `info.message` provided it has string interpolation tokens.
    * If no tokens exist then `info` is immutable.
    *
    * @param  {Info} info Logform info message.
    * @param  {Object} opts Options for this instance.
    * @returns {Info} Modified info message
    */ transform(info) {
        const msg = info.message;
        const splat = info[$0a19203782bc14d9$require$SPLAT] || info.splat;
        // No need to process anything if splat is undefined
        if (!splat || !splat.length) return info;
        // Extract tokens, if none available default to empty array to
        // ensure consistancy in expected results
        const tokens = msg && msg.match && msg.match($0a19203782bc14d9$var$formatRegExp);
        // This condition will take care of inputs with info[SPLAT]
        // but no tokens present
        if (!tokens && (splat || splat.length)) {
            const metas = splat.length > 1 ? splat.splice(0) : splat;
            // Now that { splat } has been separated from any potential { meta }. we
            // can assign this to the `info` object and write it to our format stream.
            // If the additional metas are **NOT** objects or **LACK** enumerable properties
            // you are going to have a bad time.
            const metalen = metas.length;
            if (metalen) for(let i = 0; i < metalen; i++)Object.assign(info, metas[i]);
            return info;
        }
        if (tokens) return this._splat(info, tokens);
        return info;
    }
}
/*
 * function splat (info)
 * Returns a new instance of the splat format TransformStream
 * which performs string interpolation from `info` objects. This was
 * previously exposed implicitly in `winston < 3.0.0`.
 */ module.exports = (opts)=>new $0a19203782bc14d9$var$Splatter(opts);

});

parcelRequire.register("32g3q", function(module, exports) {
"use strict";

var $4TK6d = parcelRequire("4TK6d");

var $lqhyJ = parcelRequire("lqhyJ");
/*
 * function timestamp (info)
 * Returns a new instance of the timestamp Format which adds a timestamp
 * to the info. It was previously available in winston < 3.0.0 as:
 *
 * - { timestamp: true }             // `new Date.toISOString()`
 * - { timestamp: function:String }  // Value returned by `timestamp()`
 */ module.exports = $lqhyJ((info, opts = {})=>{
    if (opts.format) info.timestamp = typeof opts.format === "function" ? opts.format() : $4TK6d.format(new Date(), opts.format);
    if (!info.timestamp) info.timestamp = new Date().toISOString();
    if (opts.alias) info[opts.alias] = info.timestamp;
    return info;
});

});
parcelRequire.register("4TK6d", function(module, exports) {

$parcel$export(module.exports, "format", () => $39100ed9c4af050e$export$d9468344d3651243);
var $39100ed9c4af050e$var$token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
var $39100ed9c4af050e$var$twoDigitsOptional = "[1-9]\\d?";
var $39100ed9c4af050e$var$twoDigits = "\\d\\d";
var $39100ed9c4af050e$var$threeDigits = "\\d{3}";
var $39100ed9c4af050e$var$fourDigits = "\\d{4}";
var $39100ed9c4af050e$var$word = "[^\\s]+";
var $39100ed9c4af050e$var$literal = /\[([^]*?)\]/gm;
function $39100ed9c4af050e$var$shorten(arr, sLen) {
    var newArr = [];
    for(var i = 0, len = arr.length; i < len; i++)newArr.push(arr[i].substr(0, sLen));
    return newArr;
}
var $39100ed9c4af050e$var$monthUpdate = function(arrName) {
    return function(v1, i18n) {
        var lowerCaseArr = i18n[arrName].map(function(v) {
            return v.toLowerCase();
        });
        var index = lowerCaseArr.indexOf(v1.toLowerCase());
        if (index > -1) return index;
        return null;
    };
};
function $39100ed9c4af050e$export$e6e34fd1f2686227(origObj) {
    var args = [];
    for(var _i = 1; _i < arguments.length; _i++)args[_i - 1] = arguments[_i];
    for(var _a = 0, args_1 = args; _a < args_1.length; _a++){
        var obj = args_1[_a];
        for(var key in obj)// @ts-ignore ex
        origObj[key] = obj[key];
    }
    return origObj;
}
var $39100ed9c4af050e$var$dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
var $39100ed9c4af050e$var$monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
var $39100ed9c4af050e$var$monthNamesShort = $39100ed9c4af050e$var$shorten($39100ed9c4af050e$var$monthNames, 3);
var $39100ed9c4af050e$var$dayNamesShort = $39100ed9c4af050e$var$shorten($39100ed9c4af050e$var$dayNames, 3);
var $39100ed9c4af050e$export$a497cb29076adb1d = {
    dayNamesShort: $39100ed9c4af050e$var$dayNamesShort,
    dayNames: $39100ed9c4af050e$var$dayNames,
    monthNamesShort: $39100ed9c4af050e$var$monthNamesShort,
    monthNames: $39100ed9c4af050e$var$monthNames,
    amPm: [
        "am",
        "pm"
    ],
    DoFn: function(dayOfMonth) {
        return dayOfMonth + [
            "th",
            "st",
            "nd",
            "rd"
        ][dayOfMonth % 10 > 3 ? 0 : (dayOfMonth - dayOfMonth % 10 !== 10 ? 1 : 0) * dayOfMonth % 10];
    }
};
var $39100ed9c4af050e$var$globalI18n = $39100ed9c4af050e$export$e6e34fd1f2686227({}, $39100ed9c4af050e$export$a497cb29076adb1d);
var $39100ed9c4af050e$export$711e602c8bee3a79 = function(i18n) {
    return $39100ed9c4af050e$var$globalI18n = $39100ed9c4af050e$export$e6e34fd1f2686227($39100ed9c4af050e$var$globalI18n, i18n);
};
var $39100ed9c4af050e$var$regexEscape = function(str) {
    return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
};
var $39100ed9c4af050e$var$pad = function(val, len) {
    if (len === void 0) len = 2;
    val = String(val);
    while(val.length < len)val = "0" + val;
    return val;
};
var $39100ed9c4af050e$var$formatFlags = {
    D: function(dateObj) {
        return String(dateObj.getDate());
    },
    DD: function(dateObj) {
        return $39100ed9c4af050e$var$pad(dateObj.getDate());
    },
    Do: function(dateObj, i18n) {
        return i18n.DoFn(dateObj.getDate());
    },
    d: function(dateObj) {
        return String(dateObj.getDay());
    },
    dd: function(dateObj) {
        return $39100ed9c4af050e$var$pad(dateObj.getDay());
    },
    ddd: function(dateObj, i18n) {
        return i18n.dayNamesShort[dateObj.getDay()];
    },
    dddd: function(dateObj, i18n) {
        return i18n.dayNames[dateObj.getDay()];
    },
    M: function(dateObj) {
        return String(dateObj.getMonth() + 1);
    },
    MM: function(dateObj) {
        return $39100ed9c4af050e$var$pad(dateObj.getMonth() + 1);
    },
    MMM: function(dateObj, i18n) {
        return i18n.monthNamesShort[dateObj.getMonth()];
    },
    MMMM: function(dateObj, i18n) {
        return i18n.monthNames[dateObj.getMonth()];
    },
    YY: function(dateObj) {
        return $39100ed9c4af050e$var$pad(String(dateObj.getFullYear()), 4).substr(2);
    },
    YYYY: function(dateObj) {
        return $39100ed9c4af050e$var$pad(dateObj.getFullYear(), 4);
    },
    h: function(dateObj) {
        return String(dateObj.getHours() % 12 || 12);
    },
    hh: function(dateObj) {
        return $39100ed9c4af050e$var$pad(dateObj.getHours() % 12 || 12);
    },
    H: function(dateObj) {
        return String(dateObj.getHours());
    },
    HH: function(dateObj) {
        return $39100ed9c4af050e$var$pad(dateObj.getHours());
    },
    m: function(dateObj) {
        return String(dateObj.getMinutes());
    },
    mm: function(dateObj) {
        return $39100ed9c4af050e$var$pad(dateObj.getMinutes());
    },
    s: function(dateObj) {
        return String(dateObj.getSeconds());
    },
    ss: function(dateObj) {
        return $39100ed9c4af050e$var$pad(dateObj.getSeconds());
    },
    S: function(dateObj) {
        return String(Math.round(dateObj.getMilliseconds() / 100));
    },
    SS: function(dateObj) {
        return $39100ed9c4af050e$var$pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function(dateObj) {
        return $39100ed9c4af050e$var$pad(dateObj.getMilliseconds(), 3);
    },
    a: function(dateObj, i18n) {
        return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A: function(dateObj, i18n) {
        return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
    },
    ZZ: function(dateObj) {
        var offset = dateObj.getTimezoneOffset();
        return (offset > 0 ? "-" : "+") + $39100ed9c4af050e$var$pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4);
    },
    Z: function(dateObj) {
        var offset = dateObj.getTimezoneOffset();
        return (offset > 0 ? "-" : "+") + $39100ed9c4af050e$var$pad(Math.floor(Math.abs(offset) / 60), 2) + ":" + $39100ed9c4af050e$var$pad(Math.abs(offset) % 60, 2);
    }
};
var $39100ed9c4af050e$var$monthParse = function(v) {
    return +v - 1;
};
var $39100ed9c4af050e$var$emptyDigits = [
    null,
    $39100ed9c4af050e$var$twoDigitsOptional
];
var $39100ed9c4af050e$var$emptyWord = [
    null,
    $39100ed9c4af050e$var$word
];
var $39100ed9c4af050e$var$amPm = [
    "isPm",
    $39100ed9c4af050e$var$word,
    function(v, i18n) {
        var val = v.toLowerCase();
        if (val === i18n.amPm[0]) return 0;
        else if (val === i18n.amPm[1]) return 1;
        return null;
    }
];
var $39100ed9c4af050e$var$timezoneOffset = [
    "timezoneOffset",
    "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
    function(v) {
        var parts = (v + "").match(/([+-]|\d\d)/gi);
        if (parts) {
            var minutes = +parts[1] * 60 + parseInt(parts[2], 10);
            return parts[0] === "+" ? minutes : -minutes;
        }
        return 0;
    }
];
var $39100ed9c4af050e$var$parseFlags = {
    D: [
        "day",
        $39100ed9c4af050e$var$twoDigitsOptional
    ],
    DD: [
        "day",
        $39100ed9c4af050e$var$twoDigits
    ],
    Do: [
        "day",
        $39100ed9c4af050e$var$twoDigitsOptional + $39100ed9c4af050e$var$word,
        function(v) {
            return parseInt(v, 10);
        }
    ],
    M: [
        "month",
        $39100ed9c4af050e$var$twoDigitsOptional,
        $39100ed9c4af050e$var$monthParse
    ],
    MM: [
        "month",
        $39100ed9c4af050e$var$twoDigits,
        $39100ed9c4af050e$var$monthParse
    ],
    YY: [
        "year",
        $39100ed9c4af050e$var$twoDigits,
        function(v) {
            var now = new Date();
            var cent = +("" + now.getFullYear()).substr(0, 2);
            return +("" + (+v > 68 ? cent - 1 : cent) + v);
        }
    ],
    h: [
        "hour",
        $39100ed9c4af050e$var$twoDigitsOptional,
        undefined,
        "isPm"
    ],
    hh: [
        "hour",
        $39100ed9c4af050e$var$twoDigits,
        undefined,
        "isPm"
    ],
    H: [
        "hour",
        $39100ed9c4af050e$var$twoDigitsOptional
    ],
    HH: [
        "hour",
        $39100ed9c4af050e$var$twoDigits
    ],
    m: [
        "minute",
        $39100ed9c4af050e$var$twoDigitsOptional
    ],
    mm: [
        "minute",
        $39100ed9c4af050e$var$twoDigits
    ],
    s: [
        "second",
        $39100ed9c4af050e$var$twoDigitsOptional
    ],
    ss: [
        "second",
        $39100ed9c4af050e$var$twoDigits
    ],
    YYYY: [
        "year",
        $39100ed9c4af050e$var$fourDigits
    ],
    S: [
        "millisecond",
        "\\d",
        function(v) {
            return +v * 100;
        }
    ],
    SS: [
        "millisecond",
        $39100ed9c4af050e$var$twoDigits,
        function(v) {
            return +v * 10;
        }
    ],
    SSS: [
        "millisecond",
        $39100ed9c4af050e$var$threeDigits
    ],
    d: $39100ed9c4af050e$var$emptyDigits,
    dd: $39100ed9c4af050e$var$emptyDigits,
    ddd: $39100ed9c4af050e$var$emptyWord,
    dddd: $39100ed9c4af050e$var$emptyWord,
    MMM: [
        "month",
        $39100ed9c4af050e$var$word,
        $39100ed9c4af050e$var$monthUpdate("monthNamesShort")
    ],
    MMMM: [
        "month",
        $39100ed9c4af050e$var$word,
        $39100ed9c4af050e$var$monthUpdate("monthNames")
    ],
    a: $39100ed9c4af050e$var$amPm,
    A: $39100ed9c4af050e$var$amPm,
    ZZ: $39100ed9c4af050e$var$timezoneOffset,
    Z: $39100ed9c4af050e$var$timezoneOffset
};
// Some common format strings
var $39100ed9c4af050e$var$globalMasks = {
    default: "ddd MMM DD YYYY HH:mm:ss",
    shortDate: "M/D/YY",
    mediumDate: "MMM D, YYYY",
    longDate: "MMMM D, YYYY",
    fullDate: "dddd, MMMM D, YYYY",
    isoDate: "YYYY-MM-DD",
    isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
    shortTime: "HH:mm",
    mediumTime: "HH:mm:ss",
    longTime: "HH:mm:ss.SSS"
};
var $39100ed9c4af050e$export$c51b90a810c230a8 = function(masks) {
    return $39100ed9c4af050e$export$e6e34fd1f2686227($39100ed9c4af050e$var$globalMasks, masks);
};
/***
 * Format a date
 * @method format
 * @param {Date|number} dateObj
 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
 * @returns {string} Formatted date string
 */ var $39100ed9c4af050e$export$d9468344d3651243 = function(dateObj, mask, i18n) {
    if (mask === void 0) mask = $39100ed9c4af050e$var$globalMasks["default"];
    if (i18n === void 0) i18n = {};
    if (typeof dateObj === "number") dateObj = new Date(dateObj);
    if (Object.prototype.toString.call(dateObj) !== "[object Date]" || isNaN(dateObj.getTime())) throw new Error("Invalid Date pass to format");
    mask = $39100ed9c4af050e$var$globalMasks[mask] || mask;
    var literals = [];
    // Make literals inactive by replacing them with @@@
    mask = mask.replace($39100ed9c4af050e$var$literal, function($0, $1) {
        literals.push($1);
        return "@@@";
    });
    var combinedI18nSettings = $39100ed9c4af050e$export$e6e34fd1f2686227($39100ed9c4af050e$export$e6e34fd1f2686227({}, $39100ed9c4af050e$var$globalI18n), i18n);
    // Apply formatting rules
    mask = mask.replace($39100ed9c4af050e$var$token, function($0) {
        return $39100ed9c4af050e$var$formatFlags[$0](dateObj, combinedI18nSettings);
    });
    // Inline literal values back into the formatted value
    return mask.replace(/@@@/g, function() {
        return literals.shift();
    });
};
/**
 * Parse a date string into a Javascript Date object /
 * @method parse
 * @param {string} dateStr Date string
 * @param {string} format Date parse format
 * @param {i18n} I18nSettingsOptional Full or subset of I18N settings
 * @returns {Date|null} Returns Date object. Returns null what date string is invalid or doesn't match format
 */ function $39100ed9c4af050e$export$98e6a39c04603d36(dateStr, format1, i18n) {
    if (i18n === void 0) i18n = {};
    if (typeof format1 !== "string") throw new Error("Invalid format in fecha parse");
    // Check to see if the format is actually a mask
    format1 = $39100ed9c4af050e$var$globalMasks[format1] || format1;
    // Avoid regular expression denial of service, fail early for really long strings
    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
    if (dateStr.length > 1000) return null;
    // Default to the beginning of the year.
    var today = new Date();
    var dateInfo = {
        year: today.getFullYear(),
        month: 0,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        isPm: null,
        timezoneOffset: null
    };
    var parseInfo = [];
    var literals = [];
    // Replace all the literals with @@@. Hopefully a string that won't exist in the format
    var newFormat = format1.replace($39100ed9c4af050e$var$literal, function($0, $1) {
        literals.push($39100ed9c4af050e$var$regexEscape($1));
        return "@@@";
    });
    var specifiedFields = {};
    var requiredFields = {};
    // Change every token that we find into the correct regex
    newFormat = $39100ed9c4af050e$var$regexEscape(newFormat).replace($39100ed9c4af050e$var$token, function($0) {
        var info = $39100ed9c4af050e$var$parseFlags[$0];
        var field = info[0], regex = info[1], requiredField = info[3];
        // Check if the person has specified the same field twice. This will lead to confusing results.
        if (specifiedFields[field]) throw new Error("Invalid format. " + field + " specified twice in format");
        specifiedFields[field] = true;
        // Check if there are any required fields. For instance, 12 hour time requires AM/PM specified
        if (requiredField) requiredFields[requiredField] = true;
        parseInfo.push(info);
        return "(" + regex + ")";
    });
    // Check all the required fields are present
    Object.keys(requiredFields).forEach(function(field) {
        if (!specifiedFields[field]) throw new Error("Invalid format. " + field + " is required in specified format");
    });
    // Add back all the literals after
    newFormat = newFormat.replace(/@@@/g, function() {
        return literals.shift();
    });
    // Check if the date string matches the format. If it doesn't return null
    var matches = dateStr.match(new RegExp(newFormat, "i"));
    if (!matches) return null;
    var combinedI18nSettings = $39100ed9c4af050e$export$e6e34fd1f2686227($39100ed9c4af050e$export$e6e34fd1f2686227({}, $39100ed9c4af050e$var$globalI18n), i18n);
    // For each match, call the parser function for that date part
    for(var i = 1; i < matches.length; i++){
        var _a = parseInfo[i - 1], field1 = _a[0], parser = _a[2];
        var value = parser ? parser(matches[i], combinedI18nSettings) : +matches[i];
        // If the parser can't make sense of the value, return null
        if (value == null) return null;
        dateInfo[field1] = value;
    }
    if (dateInfo.isPm === 1 && dateInfo.hour != null && +dateInfo.hour !== 12) dateInfo.hour = +dateInfo.hour + 12;
    else if (dateInfo.isPm === 0 && +dateInfo.hour === 12) dateInfo.hour = 0;
    var dateWithoutTZ = new Date(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute, dateInfo.second, dateInfo.millisecond);
    var validateFields = [
        [
            "month",
            "getMonth"
        ],
        [
            "day",
            "getDate"
        ],
        [
            "hour",
            "getHours"
        ],
        [
            "minute",
            "getMinutes"
        ],
        [
            "second",
            "getSeconds"
        ]
    ];
    for(var i = 0, len = validateFields.length; i < len; i++){
        // Check to make sure the date field is within the allowed range. Javascript dates allows values
        // outside the allowed range. If the values don't match the value was invalid
        if (specifiedFields[validateFields[i][0]] && dateInfo[validateFields[i][0]] !== dateWithoutTZ[validateFields[i][1]]()) return null;
    }
    if (dateInfo.timezoneOffset == null) return dateWithoutTZ;
    return new Date(Date.UTC(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute - dateInfo.timezoneOffset, dateInfo.second, dateInfo.millisecond));
}
var $39100ed9c4af050e$var$fecha = {
    format: $39100ed9c4af050e$export$d9468344d3651243,
    parse: $39100ed9c4af050e$export$98e6a39c04603d36,
    defaultI18n: $39100ed9c4af050e$export$a497cb29076adb1d,
    setGlobalDateI18n: $39100ed9c4af050e$export$711e602c8bee3a79,
    setGlobalDateMasks: $39100ed9c4af050e$export$c51b90a810c230a8
};
var $39100ed9c4af050e$export$2e2bcd8739ae039 = $39100ed9c4af050e$var$fecha;

});


parcelRequire.register("3wuCW", function(module, exports) {
"use strict";

var $f0D1h = parcelRequire("f0D1h");

var $lqhyJ = parcelRequire("lqhyJ");

var $7tLiS = parcelRequire("7tLiS");
var $290c1e2e23998b06$require$MESSAGE = $7tLiS.MESSAGE;
/*
 * function uncolorize (info)
 * Returns a new instance of the uncolorize Format that strips colors
 * from `info` objects. This was previously exposed as { stripColors: true }
 * to transports in `winston < 3.0.0`.
 */ module.exports = $lqhyJ((info, opts)=>{
    if (opts.level !== false) info.level = $f0D1h.strip(info.level);
    if (opts.message !== false) info.message = $f0D1h.strip(info.message);
    if (opts.raw !== false && info[$290c1e2e23998b06$require$MESSAGE]) info[$290c1e2e23998b06$require$MESSAGE] = $f0D1h.strip(info[$290c1e2e23998b06$require$MESSAGE]);
    return info;
});

});

parcelRequire.register("63S0x", function(module, exports) {
module.exports = JSON.parse('{"name":"winston","description":"A logger for just about everything.","version":"3.7.2","author":"Charlie Robbins <charlie.robbins@gmail.com>","maintainers":["David Hyde <dabh@alumni.stanford.edu>"],"repository":{"type":"git","url":"https://github.com/winstonjs/winston.git"},"keywords":["winston","logger","logging","logs","sysadmin","bunyan","pino","loglevel","tools","json","stream"],"dependencies":{"@dabh/diagnostics":"^2.0.2","async":"^3.2.3","is-stream":"^2.0.0","logform":"^2.4.0","one-time":"^1.0.0","readable-stream":"^3.4.0","safe-stable-stringify":"^2.3.1","stack-trace":"0.0.x","triple-beam":"^1.3.0","winston-transport":"^4.5.0"},"devDependencies":{"@babel/cli":"^7.17.0","@babel/core":"^7.17.2","@babel/preset-env":"^7.16.7","@colors/colors":"1.5.0","@dabh/eslint-config-populist":"^5.0.0","@types/node":"^17.0.17","abstract-winston-transport":"^0.5.1","assume":"^2.2.0","cross-spawn-async":"^2.2.5","eslint":"^8.9.0","hock":"^1.4.1","mocha":"8.1.3","nyc":"^15.1.0","rimraf":"^3.0.2","split2":"^4.1.0","std-mocks":"^1.0.1","through2":"^4.0.2","winston-compat":"^0.1.5"},"main":"./lib/winston","browser":"./dist/winston","types":"./index.d.ts","scripts":{"lint":"eslint lib/*.js lib/winston/*.js lib/winston/**/*.js --resolve-plugins-relative-to ./node_modules/@dabh/eslint-config-populist","test":"mocha","test:coverage":"nyc npm run test:unit","test:unit":"mocha test/unit","test:integration":"mocha test/integration","build":"rimraf dist && babel lib -d dist","prepublishOnly":"npm run build"},"engines":{"node":">= 12.0.0"},"license":"MIT"}');

});

parcelRequire.register("4rSU0", function(module, exports) {
/**
 * transports.js: Set of all transports Winston knows about.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

/**
 * TODO: add property description.
 * @type {Console}
 */ Object.defineProperty(module.exports, "Console", {
    configurable: true,
    enumerable: true,
    get () {
        return (parcelRequire("jxPkW"));
    }
});

/**
 * TODO: add property description.
 * @type {File}
 */ Object.defineProperty(module.exports, "File", {
    configurable: true,
    enumerable: true,
    get () {
        return (parcelRequire("6DsoP"));
    }
});

/**
 * TODO: add property description.
 * @type {Http}
 */ Object.defineProperty(module.exports, "Http", {
    configurable: true,
    enumerable: true,
    get () {
        return (parcelRequire("cbx0Y"));
    }
});

/**
 * TODO: add property description.
 * @type {Stream}
 */ Object.defineProperty(module.exports, "Stream", {
    configurable: true,
    enumerable: true,
    get () {
        return (parcelRequire("aHBra"));
    }
});

});
parcelRequire.register("jxPkW", function(module, exports) {
/* eslint-disable no-console */ /*
 * console.js: Transport for outputting to the console.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";


var $7tLiS = parcelRequire("7tLiS");
var $e3a8ebc889ac59bd$require$LEVEL = $7tLiS.LEVEL;
var $e3a8ebc889ac59bd$require$MESSAGE = $7tLiS.MESSAGE;

var $72KRt = parcelRequire("72KRt");
/**
 * Transport for outputting to the console.
 * @type {Console}
 * @extends {TransportStream}
 */ module.exports = class Console extends $72KRt {
    /**
   * Constructor function for the Console transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */ constructor(options = {}){
        super(options);
        // Expose the name of this Transport on the prototype
        this.name = options.name || "console";
        this.stderrLevels = this._stringArrayToSet(options.stderrLevels);
        this.consoleWarnLevels = this._stringArrayToSet(options.consoleWarnLevels);
        this.eol = typeof options.eol === "string" ? options.eol : $9xlVa$os.EOL;
        this.setMaxListeners(30);
    }
    /**
   * Core logging method exposed to Winston.
   * @param {Object} info - TODO: add param description.
   * @param {Function} callback - TODO: add param description.
   * @returns {undefined}
   */ log(info, callback) {
        setImmediate(()=>this.emit("logged", info));
        // Remark: what if there is no raw...?
        if (this.stderrLevels[info[$e3a8ebc889ac59bd$require$LEVEL]]) {
            if (console._stderr) // Node.js maps `process.stderr` to `console._stderr`.
            console._stderr.write(`${info[$e3a8ebc889ac59bd$require$MESSAGE]}${this.eol}`);
            else // console.error adds a newline
            console.error(info[$e3a8ebc889ac59bd$require$MESSAGE]);
            if (callback) callback(); // eslint-disable-line callback-return
            return;
        } else if (this.consoleWarnLevels[info[$e3a8ebc889ac59bd$require$LEVEL]]) {
            if (console._stderr) // Node.js maps `process.stderr` to `console._stderr`.
            // in Node.js console.warn is an alias for console.error
            console._stderr.write(`${info[$e3a8ebc889ac59bd$require$MESSAGE]}${this.eol}`);
            else // console.warn adds a newline
            console.warn(info[$e3a8ebc889ac59bd$require$MESSAGE]);
            if (callback) callback(); // eslint-disable-line callback-return
            return;
        }
        if (console._stdout) // Node.js maps `process.stdout` to `console._stdout`.
        console._stdout.write(`${info[$e3a8ebc889ac59bd$require$MESSAGE]}${this.eol}`);
        else // console.log adds a newline.
        console.log(info[$e3a8ebc889ac59bd$require$MESSAGE]);
        if (callback) callback(); // eslint-disable-line callback-return
    }
    /**
   * Returns a Set-like object with strArray's elements as keys (each with the
   * value true).
   * @param {Array} strArray - Array of Set-elements as strings.
   * @param {?string} [errMsg] - Custom error message thrown on invalid input.
   * @returns {Object} - TODO: add return description.
   * @private
   */ _stringArrayToSet(strArray, errMsg) {
        if (!strArray) return {};
        errMsg = errMsg || "Cannot make set from type other than Array of string elements";
        if (!Array.isArray(strArray)) throw new Error(errMsg);
        return strArray.reduce((set, el)=>{
            if (typeof el !== "string") throw new Error(errMsg);
            set[el] = true;
            return set;
        }, {});
    }
};

});
parcelRequire.register("72KRt", function(module, exports) {
"use strict";


var $1oME0 = parcelRequire("1oME0");

var $7tLiS = parcelRequire("7tLiS");
var $520d120545491185$require$LEVEL = $7tLiS.LEVEL;
/**
 * Constructor function for the TransportStream. This is the base prototype
 * that all `winston >= 3` transports should inherit from.
 * @param {Object} options - Options for this TransportStream instance
 * @param {String} options.level - Highest level according to RFC5424.
 * @param {Boolean} options.handleExceptions - If true, info with
 * { exception: true } will be written.
 * @param {Function} options.log - Custom log function for simple Transport
 * creation
 * @param {Function} options.close - Called on "unpipe" from parent.
 */ const $520d120545491185$var$TransportStream = module.exports = function TransportStream(options = {}) {
    $1oME0.call(this, {
        objectMode: true,
        highWaterMark: options.highWaterMark
    });
    this.format = options.format;
    this.level = options.level;
    this.handleExceptions = options.handleExceptions;
    this.handleRejections = options.handleRejections;
    this.silent = options.silent;
    if (options.log) this.log = options.log;
    if (options.logv) this.logv = options.logv;
    if (options.close) this.close = options.close;
    // Get the levels from the source we are piped from.
    this.once("pipe", (logger)=>{
        // Remark (indexzero): this bookkeeping can only support multiple
        // Logger parents with the same `levels`. This comes into play in
        // the `winston.Container` code in which `container.add` takes
        // a fully realized set of options with pre-constructed TransportStreams.
        this.levels = logger.levels;
        this.parent = logger;
    });
    // If and/or when the transport is removed from this instance
    this.once("unpipe", (src)=>{
        // Remark (indexzero): this bookkeeping can only support multiple
        // Logger parents with the same `levels`. This comes into play in
        // the `winston.Container` code in which `container.add` takes
        // a fully realized set of options with pre-constructed TransportStreams.
        if (src === this.parent) {
            this.parent = null;
            if (this.close) this.close();
        }
    });
};
/*
 * Inherit from Writeable using Node.js built-ins
 */ $9xlVa$util.inherits($520d120545491185$var$TransportStream, $1oME0);
/**
 * Writes the info object to our transport instance.
 * @param {mixed} info - TODO: add param description.
 * @param {mixed} enc - TODO: add param description.
 * @param {function} callback - TODO: add param description.
 * @returns {undefined}
 * @private
 */ $520d120545491185$var$TransportStream.prototype._write = function _write(info, enc, callback) {
    if (this.silent || info.exception === true && !this.handleExceptions) return callback(null);
    // Remark: This has to be handled in the base transport now because we
    // cannot conditionally write to our pipe targets as stream. We always
    // prefer any explicit level set on the Transport itself falling back to
    // any level set on the parent.
    const level = this.level || this.parent && this.parent.level;
    if (!level || this.levels[level] >= this.levels[info[$520d120545491185$require$LEVEL]]) {
        if (info && !this.format) return this.log(info, callback);
        let errState;
        let transformed;
        // We trap(and re-throw) any errors generated by the user-provided format, but also
        // guarantee that the streams callback is invoked so that we can continue flowing.
        try {
            transformed = this.format.transform(Object.assign({}, info), this.format.options);
        } catch (err) {
            errState = err;
        }
        if (errState || !transformed) {
            // eslint-disable-next-line callback-return
            callback();
            if (errState) throw errState;
            return;
        }
        return this.log(transformed, callback);
    }
    this._writableState.sync = false;
    return callback(null);
};
/**
 * Writes the batch of info objects (i.e. "object chunks") to our transport
 * instance after performing any necessary filtering.
 * @param {mixed} chunks - TODO: add params description.
 * @param {function} callback - TODO: add params description.
 * @returns {mixed} - TODO: add returns description.
 * @private
 */ $520d120545491185$var$TransportStream.prototype._writev = function _writev(chunks, callback) {
    if (this.logv) {
        const infos = chunks.filter(this._accept, this);
        if (!infos.length) return callback(null);
        // Remark (indexzero): from a performance perspective if Transport
        // implementers do choose to implement logv should we make it their
        // responsibility to invoke their format?
        return this.logv(infos, callback);
    }
    for(let i = 0; i < chunks.length; i++){
        if (!this._accept(chunks[i])) continue;
        if (chunks[i].chunk && !this.format) {
            this.log(chunks[i].chunk, chunks[i].callback);
            continue;
        }
        let errState;
        let transformed;
        // We trap(and re-throw) any errors generated by the user-provided format, but also
        // guarantee that the streams callback is invoked so that we can continue flowing.
        try {
            transformed = this.format.transform(Object.assign({}, chunks[i].chunk), this.format.options);
        } catch (err) {
            errState = err;
        }
        if (errState || !transformed) {
            // eslint-disable-next-line callback-return
            chunks[i].callback();
            if (errState) {
                // eslint-disable-next-line callback-return
                callback(null);
                throw errState;
            }
        } else this.log(transformed, chunks[i].callback);
    }
    return callback(null);
};
/**
 * Predicate function that returns true if the specfied `info` on the
 * WriteReq, `write`, should be passed down into the derived
 * TransportStream's I/O via `.log(info, callback)`.
 * @param {WriteReq} write - winston@3 Node.js WriteReq for the `info` object
 * representing the log message.
 * @returns {Boolean} - Value indicating if the `write` should be accepted &
 * logged.
 */ $520d120545491185$var$TransportStream.prototype._accept = function _accept(write) {
    const info = write.chunk;
    if (this.silent) return false;
    // We always prefer any explicit level set on the Transport itself
    // falling back to any level set on the parent.
    const level = this.level || this.parent && this.parent.level;
    // Immediately check the average case: log level filtering.
    if (info.exception === true || !level || this.levels[level] >= this.levels[info[$520d120545491185$require$LEVEL]]) {
        // Ensure the info object is valid based on `{ exception }`:
        // 1. { handleExceptions: true }: all `info` objects are valid
        // 2. { exception: false }: accepted by all transports.
        if (this.handleExceptions || info.exception !== true) return true;
    }
    return false;
};
/**
 * _nop is short for "No operation"
 * @returns {Boolean} Intentionally false.
 */ $520d120545491185$var$TransportStream.prototype._nop = function _nop() {
    // eslint-disable-next-line no-undefined
    return void 0;
};

// Expose legacy stream
module.exports.LegacyTransportStream = (parcelRequire("ggirm"));

});
parcelRequire.register("1oME0", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
"use strict";
module.exports = $104dc412007cbb1c$var$Writable;
/* <replacement> */ function $104dc412007cbb1c$var$WriteReq(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
    this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream
function $104dc412007cbb1c$var$CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
        $104dc412007cbb1c$var$onCorkedFinish(_this, state);
    };
}
/* </replacement> */ /*<replacement>*/ var $104dc412007cbb1c$var$Duplex;
/*</replacement>*/ $104dc412007cbb1c$var$Writable.WritableState = $104dc412007cbb1c$var$WritableState;

/*<replacement>*/ var $104dc412007cbb1c$var$internalUtil = {
    deprecate: (parcelRequire("c56vP"))
};

var $fxlbS = parcelRequire("fxlbS");

var $104dc412007cbb1c$require$Buffer = $9xlVa$buffer.Buffer;
var $104dc412007cbb1c$var$OurUint8Array = $parcel$global.Uint8Array || function() {};
function $104dc412007cbb1c$var$_uint8ArrayToBuffer(chunk) {
    return $104dc412007cbb1c$require$Buffer.from(chunk);
}
function $104dc412007cbb1c$var$_isUint8Array(obj) {
    return $104dc412007cbb1c$require$Buffer.isBuffer(obj) || obj instanceof $104dc412007cbb1c$var$OurUint8Array;
}

var $1LQVG = parcelRequire("1LQVG");

var $aC464 = parcelRequire("aC464");
var $104dc412007cbb1c$var$getHighWaterMark = $aC464.getHighWaterMark;

var $g4f1y = parcelRequire("g4f1y");
var $104dc412007cbb1c$require$_require$codes = $g4f1y.codes;
var $104dc412007cbb1c$var$ERR_INVALID_ARG_TYPE = $104dc412007cbb1c$require$_require$codes.ERR_INVALID_ARG_TYPE, $104dc412007cbb1c$var$ERR_METHOD_NOT_IMPLEMENTED = $104dc412007cbb1c$require$_require$codes.ERR_METHOD_NOT_IMPLEMENTED, $104dc412007cbb1c$var$ERR_MULTIPLE_CALLBACK = $104dc412007cbb1c$require$_require$codes.ERR_MULTIPLE_CALLBACK, $104dc412007cbb1c$var$ERR_STREAM_CANNOT_PIPE = $104dc412007cbb1c$require$_require$codes.ERR_STREAM_CANNOT_PIPE, $104dc412007cbb1c$var$ERR_STREAM_DESTROYED = $104dc412007cbb1c$require$_require$codes.ERR_STREAM_DESTROYED, $104dc412007cbb1c$var$ERR_STREAM_NULL_VALUES = $104dc412007cbb1c$require$_require$codes.ERR_STREAM_NULL_VALUES, $104dc412007cbb1c$var$ERR_STREAM_WRITE_AFTER_END = $104dc412007cbb1c$require$_require$codes.ERR_STREAM_WRITE_AFTER_END, $104dc412007cbb1c$var$ERR_UNKNOWN_ENCODING = $104dc412007cbb1c$require$_require$codes.ERR_UNKNOWN_ENCODING;
var $104dc412007cbb1c$var$errorOrDestroy = $1LQVG.errorOrDestroy;

(parcelRequire("eNM4u"))($104dc412007cbb1c$var$Writable, $fxlbS);
function $104dc412007cbb1c$var$nop() {}

function $104dc412007cbb1c$var$WritableState(options, stream, isDuplex) {
    $104dc412007cbb1c$var$Duplex = $104dc412007cbb1c$var$Duplex || (parcelRequire("erzCT"));
    options = options || {}; // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream,
    // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof $104dc412007cbb1c$var$Duplex; // object stream flag to indicate whether or not this stream
    // contains buffers or objects.
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
    // Note: 0 is a valid value, means that we always return false if
    // the entire buffer is not flushed immediately on write()
    this.highWaterMark = $104dc412007cbb1c$var$getHighWaterMark(this, options, "writableHighWaterMark", isDuplex); // if _final has been called
    this.finalCalled = false; // drain event flag.
    this.needDrain = false; // at the start of calling end()
    this.ending = false; // when end() has been called, and returned
    this.ended = false; // when 'finish' is emitted
    this.finished = false; // has it been destroyed
    this.destroyed = false; // should we decode strings into buffers before passing to _write?
    // this is here so that some node-core streams can optimize string
    // handling at a lower level.
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || "utf8"; // not an actual buffer we keep track of, but a measurement
    // of how much we're waiting to get pushed to some underlying
    // socket or file.
    this.length = 0; // a flag to see when we're in the middle of a write.
    this.writing = false; // when true all writes will be buffered until .uncork() call
    this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
    // or on a later tick.  We set this to true at first, because any
    // actions that shouldn't happen until "later" should generally also
    // not happen before the first write call.
    this.sync = true; // a flag to know if we're processing previously buffered items, which
    // may call the _write() callback in the same tick, so that we don't
    // end up in an overlapped onwrite situation.
    this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)
    this.onwrite = function(er) {
        $104dc412007cbb1c$var$onwrite(stream, er);
    }; // the callback that the user supplies to write(chunk,encoding,cb)
    this.writecb = null; // the amount that is being written when _write is called.
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
    // this must be 0 before 'finish' can be emitted
    this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
    // This is relevant for synchronous Transform streams
    this.prefinished = false; // True if the error was already emitted and should not be thrown again
    this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')
    this.autoDestroy = !!options.autoDestroy; // count buffered requests
    this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
    // one allocated and free to use, and we maintain at most two
    this.corkedRequestsFree = new $104dc412007cbb1c$var$CorkedRequest(this);
}
$104dc412007cbb1c$var$WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while(current){
        out.push(current);
        current = current.next;
    }
    return out;
};
(function() {
    try {
        Object.defineProperty($104dc412007cbb1c$var$WritableState.prototype, "buffer", {
            get: $104dc412007cbb1c$var$internalUtil.deprecate(function writableStateBufferGetter() {
                return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
    } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var $104dc412007cbb1c$var$realHasInstance;
if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    $104dc412007cbb1c$var$realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty($104dc412007cbb1c$var$Writable, Symbol.hasInstance, {
        value: function value(object) {
            if ($104dc412007cbb1c$var$realHasInstance.call(this, object)) return true;
            if (this !== $104dc412007cbb1c$var$Writable) return false;
            return object && object._writableState instanceof $104dc412007cbb1c$var$WritableState;
        }
    });
} else $104dc412007cbb1c$var$realHasInstance = function realHasInstance(object) {
    return object instanceof this;
};

function $104dc412007cbb1c$var$Writable(options) {
    $104dc412007cbb1c$var$Duplex = $104dc412007cbb1c$var$Duplex || (parcelRequire("erzCT")); // Writable ctor is applied to Duplexes, too.
    // `realHasInstance` is necessary because using plain `instanceof`
    // would return false, as no `_writableState` property is attached.
    // Trying to use the custom `instanceof` for Writable here will also break the
    // Node.js LazyTransform implementation, which has a non-trivial getter for
    // `_writableState` that would lead to infinite recursion.
    // Checking for a Stream.Duplex instance is faster here instead of inside
    // the WritableState constructor, at least with V8 6.5
    var isDuplex = this instanceof $104dc412007cbb1c$var$Duplex;
    if (!isDuplex && !$104dc412007cbb1c$var$realHasInstance.call($104dc412007cbb1c$var$Writable, this)) return new $104dc412007cbb1c$var$Writable(options);
    this._writableState = new $104dc412007cbb1c$var$WritableState(options, this, isDuplex); // legacy.
    this.writable = true;
    if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
    }
    $fxlbS.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.
$104dc412007cbb1c$var$Writable.prototype.pipe = function() {
    $104dc412007cbb1c$var$errorOrDestroy(this, new $104dc412007cbb1c$var$ERR_STREAM_CANNOT_PIPE());
};
function $104dc412007cbb1c$var$writeAfterEnd(stream, cb) {
    var er = new $104dc412007cbb1c$var$ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb
    $104dc412007cbb1c$var$errorOrDestroy(stream, er);
    process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function $104dc412007cbb1c$var$validChunk(stream, state, chunk, cb) {
    var er;
    if (chunk === null) er = new $104dc412007cbb1c$var$ERR_STREAM_NULL_VALUES();
    else if (typeof chunk !== "string" && !state.objectMode) er = new $104dc412007cbb1c$var$ERR_INVALID_ARG_TYPE("chunk", [
        "string",
        "Buffer"
    ], chunk);
    if (er) {
        $104dc412007cbb1c$var$errorOrDestroy(stream, er);
        process.nextTick(cb, er);
        return false;
    }
    return true;
}
$104dc412007cbb1c$var$Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && $104dc412007cbb1c$var$_isUint8Array(chunk);
    if (isBuf && !$104dc412007cbb1c$require$Buffer.isBuffer(chunk)) chunk = $104dc412007cbb1c$var$_uint8ArrayToBuffer(chunk);
    if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
    }
    if (isBuf) encoding = "buffer";
    else if (!encoding) encoding = state.defaultEncoding;
    if (typeof cb !== "function") cb = $104dc412007cbb1c$var$nop;
    if (state.ending) $104dc412007cbb1c$var$writeAfterEnd(this, cb);
    else if (isBuf || $104dc412007cbb1c$var$validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = $104dc412007cbb1c$var$writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
};
$104dc412007cbb1c$var$Writable.prototype.cork = function() {
    this._writableState.corked++;
};
$104dc412007cbb1c$var$Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) $104dc412007cbb1c$var$clearBuffer(this, state);
    }
};
$104dc412007cbb1c$var$Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    // node::ParseEncoding() requires lower case.
    if (typeof encoding === "string") encoding = encoding.toLowerCase();
    if (!([
        "hex",
        "utf8",
        "utf-8",
        "ascii",
        "binary",
        "base64",
        "ucs2",
        "ucs-2",
        "utf16le",
        "utf-16le",
        "raw"
    ].indexOf((encoding + "").toLowerCase()) > -1)) throw new $104dc412007cbb1c$var$ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
};
Object.defineProperty($104dc412007cbb1c$var$Writable.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
function $104dc412007cbb1c$var$decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") chunk = $104dc412007cbb1c$require$Buffer.from(chunk, encoding);
    return chunk;
}
Object.defineProperty($104dc412007cbb1c$var$Writable.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function $104dc412007cbb1c$var$writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
        var newChunk = $104dc412007cbb1c$var$decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
            isBuf = true;
            encoding = "buffer";
            chunk = newChunk;
        }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.
    if (!ret) state.needDrain = true;
    if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
            chunk: chunk,
            encoding: encoding,
            isBuf: isBuf,
            callback: cb,
            next: null
        };
        if (last) last.next = state.lastBufferedRequest;
        else state.bufferedRequest = state.lastBufferedRequest;
        state.bufferedRequestCount += 1;
    } else $104dc412007cbb1c$var$doWrite(stream, state, false, len, chunk, encoding, cb);
    return ret;
}
function $104dc412007cbb1c$var$doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed) state.onwrite(new $104dc412007cbb1c$var$ERR_STREAM_DESTROYED("write"));
    else if (writev) stream._writev(chunk, state.onwrite);
    else stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
}
function $104dc412007cbb1c$var$onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
        // defer the callback if we are being called synchronously
        // to avoid piling up things on the stack
        process.nextTick(cb, er); // this can emit finish, and it will always happen
        // after error
        process.nextTick($104dc412007cbb1c$var$finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        $104dc412007cbb1c$var$errorOrDestroy(stream, er);
    } else {
        // the caller expect this to happen before if
        // it is async
        cb(er);
        stream._writableState.errorEmitted = true;
        $104dc412007cbb1c$var$errorOrDestroy(stream, er); // this can emit finish, but finish must
        // always follow error
        $104dc412007cbb1c$var$finishMaybe(stream, state);
    }
}
function $104dc412007cbb1c$var$onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
}
function $104dc412007cbb1c$var$onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    if (typeof cb !== "function") throw new $104dc412007cbb1c$var$ERR_MULTIPLE_CALLBACK();
    $104dc412007cbb1c$var$onwriteStateUpdate(state);
    if (er) $104dc412007cbb1c$var$onwriteError(stream, state, sync, er, cb);
    else {
        // Check if we're actually ready to finish, but don't emit yet
        var finished = $104dc412007cbb1c$var$needFinish(state) || stream.destroyed;
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) $104dc412007cbb1c$var$clearBuffer(stream, state);
        if (sync) process.nextTick($104dc412007cbb1c$var$afterWrite, stream, state, finished, cb);
        else $104dc412007cbb1c$var$afterWrite(stream, state, finished, cb);
    }
}
function $104dc412007cbb1c$var$afterWrite(stream, state, finished, cb) {
    if (!finished) $104dc412007cbb1c$var$onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    $104dc412007cbb1c$var$finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function $104dc412007cbb1c$var$onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
    }
} // if there's something in the buffer waiting, then process it
function $104dc412007cbb1c$var$clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
        // Fast case, write everything using _writev()
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while(entry){
            buffer[count] = entry;
            if (!entry.isBuf) allBuffers = false;
            entry = entry.next;
            count += 1;
        }
        buffer.allBuffers = allBuffers;
        $104dc412007cbb1c$var$doWrite(stream, state, true, state.length, buffer, "", holder.finish); // doWrite is almost always async, defer these to save a bit of time
        // as the hot path ends with doWrite
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
        } else state.corkedRequestsFree = new $104dc412007cbb1c$var$CorkedRequest(state);
        state.bufferedRequestCount = 0;
    } else {
        // Slow case, write chunks one-by-one
        while(entry){
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            $104dc412007cbb1c$var$doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
            // it means that we need to wait until it does.
            // also, that means that the chunk and cb are currently
            // being processed, so move the buffer counter past them.
            if (state.writing) break;
        }
        if (entry === null) state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
}
$104dc412007cbb1c$var$Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new $104dc412007cbb1c$var$ERR_METHOD_NOT_IMPLEMENTED("_write()"));
};
$104dc412007cbb1c$var$Writable.prototype._writev = null;
$104dc412007cbb1c$var$Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
    } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
    }
    if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks
    if (state.corked) {
        state.corked = 1;
        this.uncork();
    } // ignore unnecessary end() calls.
    if (!state.ending) $104dc412007cbb1c$var$endWritable(this, state, cb);
    return this;
};
Object.defineProperty($104dc412007cbb1c$var$Writable.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
});
function $104dc412007cbb1c$var$needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function $104dc412007cbb1c$var$callFinal(stream, state) {
    stream._final(function(err) {
        state.pendingcb--;
        if (err) $104dc412007cbb1c$var$errorOrDestroy(stream, err);
        state.prefinished = true;
        stream.emit("prefinish");
        $104dc412007cbb1c$var$finishMaybe(stream, state);
    });
}
function $104dc412007cbb1c$var$prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function" && !state.destroyed) {
            state.pendingcb++;
            state.finalCalled = true;
            process.nextTick($104dc412007cbb1c$var$callFinal, stream, state);
        } else {
            state.prefinished = true;
            stream.emit("prefinish");
        }
    }
}
function $104dc412007cbb1c$var$finishMaybe(stream, state) {
    var need = $104dc412007cbb1c$var$needFinish(state);
    if (need) {
        $104dc412007cbb1c$var$prefinish(stream, state);
        if (state.pendingcb === 0) {
            state.finished = true;
            stream.emit("finish");
            if (state.autoDestroy) {
                // In case of duplex streams we need a way to detect
                // if the readable side is ready for autoDestroy as well
                var rState = stream._readableState;
                if (!rState || rState.autoDestroy && rState.endEmitted) stream.destroy();
            }
        }
    }
    return need;
}
function $104dc412007cbb1c$var$endWritable(stream, state, cb) {
    state.ending = true;
    $104dc412007cbb1c$var$finishMaybe(stream, state);
    if (cb) {
        if (state.finished) process.nextTick(cb);
        else stream.once("finish", cb);
    }
    state.ended = true;
    stream.writable = false;
}
function $104dc412007cbb1c$var$onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while(entry){
        var cb = entry.callback;
        state.pendingcb--;
        cb(err);
        entry = entry.next;
    } // reuse the free corkReq.
    state.corkedRequestsFree.next = corkReq;
}
Object.defineProperty($104dc412007cbb1c$var$Writable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._writableState === undefined) return false;
        return this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._writableState) return;
         // backward compatibility, the user is explicitly
        // managing destroyed
        this._writableState.destroyed = value;
    }
});
$104dc412007cbb1c$var$Writable.prototype.destroy = $1LQVG.destroy;
$104dc412007cbb1c$var$Writable.prototype._undestroy = $1LQVG.undestroy;
$104dc412007cbb1c$var$Writable.prototype._destroy = function(err, cb) {
    cb(err);
};

});
parcelRequire.register("c56vP", function(module, exports) {

/**
 * For Node.js, simply re-export the core `util.deprecate` function.
 */ module.exports = $9xlVa$util.deprecate;

});

parcelRequire.register("fxlbS", function(module, exports) {

module.exports = $9xlVa$stream;

});

parcelRequire.register("1LQVG", function(module, exports) {
"use strict"; // undocumented cb() API, needed for core, not for public API
function $14a33ce32cf48c79$var$destroy(err1, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
        if (cb) cb(err1);
        else if (err1) {
            if (!this._writableState) process.nextTick($14a33ce32cf48c79$var$emitErrorNT, this, err1);
            else if (!this._writableState.errorEmitted) {
                this._writableState.errorEmitted = true;
                process.nextTick($14a33ce32cf48c79$var$emitErrorNT, this, err1);
            }
        }
        return this;
    } // we set destroyed to true before firing error callbacks in order
    // to make it re-entrance safe in case destroy() is called within callbacks
    if (this._readableState) this._readableState.destroyed = true;
     // if this is a duplex stream mark the writable part as destroyed as well
    if (this._writableState) this._writableState.destroyed = true;
    this._destroy(err1 || null, function(err) {
        if (!cb && err) {
            if (!_this._writableState) process.nextTick($14a33ce32cf48c79$var$emitErrorAndCloseNT, _this, err);
            else if (!_this._writableState.errorEmitted) {
                _this._writableState.errorEmitted = true;
                process.nextTick($14a33ce32cf48c79$var$emitErrorAndCloseNT, _this, err);
            } else process.nextTick($14a33ce32cf48c79$var$emitCloseNT, _this);
        } else if (cb) {
            process.nextTick($14a33ce32cf48c79$var$emitCloseNT, _this);
            cb(err);
        } else process.nextTick($14a33ce32cf48c79$var$emitCloseNT, _this);
    });
    return this;
}
function $14a33ce32cf48c79$var$emitErrorAndCloseNT(self, err) {
    $14a33ce32cf48c79$var$emitErrorNT(self, err);
    $14a33ce32cf48c79$var$emitCloseNT(self);
}
function $14a33ce32cf48c79$var$emitCloseNT(self) {
    if (self._writableState && !self._writableState.emitClose) return;
    if (self._readableState && !self._readableState.emitClose) return;
    self.emit("close");
}
function $14a33ce32cf48c79$var$undestroy() {
    if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
    }
    if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
    }
}
function $14a33ce32cf48c79$var$emitErrorNT(self, err) {
    self.emit("error", err);
}
function $14a33ce32cf48c79$var$errorOrDestroy(stream, err) {
    // We have tests that rely on errors being emitted
    // in the same tick, so changing this is semver major.
    // For now when you opt-in to autoDestroy we allow
    // the error to be emitted nextTick. In a future
    // semver major update we should change the default to this.
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);
    else stream.emit("error", err);
}
module.exports = {
    destroy: $14a33ce32cf48c79$var$destroy,
    undestroy: $14a33ce32cf48c79$var$undestroy,
    errorOrDestroy: $14a33ce32cf48c79$var$errorOrDestroy
};

});

parcelRequire.register("aC464", function(module, exports) {
"use strict";

var $g4f1y = parcelRequire("g4f1y");
var $7ba0a18f6c762740$var$ERR_INVALID_OPT_VALUE = $g4f1y.codes.ERR_INVALID_OPT_VALUE;
function $7ba0a18f6c762740$var$highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}
function $7ba0a18f6c762740$var$getHighWaterMark(state, options, duplexKey, isDuplex) {
    var hwm = $7ba0a18f6c762740$var$highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
        if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
            var name = isDuplex ? duplexKey : "highWaterMark";
            throw new $7ba0a18f6c762740$var$ERR_INVALID_OPT_VALUE(name, hwm);
        }
        return Math.floor(hwm);
    } // Default value
    return state.objectMode ? 16 : 16384;
}
module.exports = {
    getHighWaterMark: $7ba0a18f6c762740$var$getHighWaterMark
};

});
parcelRequire.register("g4f1y", function(module, exports) {

$parcel$export(module.exports, "codes", () => $bb28ac86e21f5e5e$export$e45cb6485273080e, (v) => $bb28ac86e21f5e5e$export$e45cb6485273080e = v);
var $bb28ac86e21f5e5e$export$e45cb6485273080e;
"use strict";
const $bb28ac86e21f5e5e$var$codes = {};
function $bb28ac86e21f5e5e$var$createErrorType(code, message, Base) {
    if (!Base) Base = Error;
    function getMessage(arg1, arg2, arg3) {
        if (typeof message === "string") return message;
        else return message(arg1, arg2, arg3);
    }
    class NodeError extends Base {
        constructor(arg1, arg2, arg3){
            super(getMessage(arg1, arg2, arg3));
        }
    }
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    $bb28ac86e21f5e5e$var$codes[code] = NodeError;
}
// https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js
function $bb28ac86e21f5e5e$var$oneOf(expected, thing) {
    if (Array.isArray(expected)) {
        const len = expected.length;
        expected = expected.map((i)=>String(i));
        if (len > 2) return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
        else if (len === 2) return `one of ${thing} ${expected[0]} or ${expected[1]}`;
        else return `of ${thing} ${expected[0]}`;
    } else return `of ${thing} ${String(expected)}`;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
function $bb28ac86e21f5e5e$var$startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
function $bb28ac86e21f5e5e$var$endsWith(str, search, this_len) {
    if (this_len === undefined || this_len > str.length) this_len = str.length;
    return str.substring(this_len - search.length, this_len) === search;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
function $bb28ac86e21f5e5e$var$includes(str, search, start) {
    if (typeof start !== "number") start = 0;
    if (start + search.length > str.length) return false;
    else return str.indexOf(search, start) !== -1;
}
$bb28ac86e21f5e5e$var$createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
    return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
$bb28ac86e21f5e5e$var$createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
    // determiner: 'must be' or 'must not be'
    let determiner;
    if (typeof expected === "string" && $bb28ac86e21f5e5e$var$startsWith(expected, "not ")) {
        determiner = "must not be";
        expected = expected.replace(/^not /, "");
    } else determiner = "must be";
    let msg;
    if ($bb28ac86e21f5e5e$var$endsWith(name, " argument")) // For cases like 'first argument'
    msg = `The ${name} ${determiner} ${$bb28ac86e21f5e5e$var$oneOf(expected, "type")}`;
    else {
        const type = $bb28ac86e21f5e5e$var$includes(name, ".") ? "property" : "argument";
        msg = `The "${name}" ${type} ${determiner} ${$bb28ac86e21f5e5e$var$oneOf(expected, "type")}`;
    }
    msg += `. Received type ${typeof actual}`;
    return msg;
}, TypeError);
$bb28ac86e21f5e5e$var$createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
$bb28ac86e21f5e5e$var$createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
    return "The " + name + " method is not implemented";
});
$bb28ac86e21f5e5e$var$createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
$bb28ac86e21f5e5e$var$createErrorType("ERR_STREAM_DESTROYED", function(name) {
    return "Cannot call " + name + " after a stream was destroyed";
});
$bb28ac86e21f5e5e$var$createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
$bb28ac86e21f5e5e$var$createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
$bb28ac86e21f5e5e$var$createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
$bb28ac86e21f5e5e$var$createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
$bb28ac86e21f5e5e$var$createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
    return "Unknown encoding: " + arg;
}, TypeError);
$bb28ac86e21f5e5e$var$createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
$bb28ac86e21f5e5e$export$e45cb6485273080e = $bb28ac86e21f5e5e$var$codes;

});


parcelRequire.register("eNM4u", function(module, exports) {


try {
    var $ac6aee417f4caded$var$util = $ac6aee417f4caded$import$7debb50ef11d5e0b;
    /* istanbul ignore next */ if (typeof $ac6aee417f4caded$var$util.inherits !== "function") throw "";
    module.exports = $ac6aee417f4caded$var$util.inherits;
} catch (e) {
    /* istanbul ignore next */ module.exports = (parcelRequire("gVTk7"));
}

});
parcelRequire.register("gVTk7", function(module, exports) {
if (typeof Object.create === "function") // implementation from standard node.js 'util' module
module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    }
};
else // old school shim for old browsers
module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
    }
};

});


parcelRequire.register("erzCT", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
"use strict";
/*<replacement>*/ var $a83f38ec8105b704$var$objectKeys = Object.keys || function(obj) {
    var keys1 = [];
    for(var key in obj)keys1.push(key);
    return keys1;
};
/*</replacement>*/ module.exports = $a83f38ec8105b704$var$Duplex;

var $4ypXz = parcelRequire("4ypXz");

var $1oME0 = parcelRequire("1oME0");

(parcelRequire("eNM4u"))($a83f38ec8105b704$var$Duplex, $4ypXz);
// Allow the keys array to be GC'ed.
var $a83f38ec8105b704$var$keys = $a83f38ec8105b704$var$objectKeys($1oME0.prototype);
for(var $a83f38ec8105b704$var$v = 0; $a83f38ec8105b704$var$v < $a83f38ec8105b704$var$keys.length; $a83f38ec8105b704$var$v++){
    var $a83f38ec8105b704$var$method = $a83f38ec8105b704$var$keys[$a83f38ec8105b704$var$v];
    if (!$a83f38ec8105b704$var$Duplex.prototype[$a83f38ec8105b704$var$method]) $a83f38ec8105b704$var$Duplex.prototype[$a83f38ec8105b704$var$method] = $1oME0.prototype[$a83f38ec8105b704$var$method];
}
function $a83f38ec8105b704$var$Duplex(options) {
    if (!(this instanceof $a83f38ec8105b704$var$Duplex)) return new $a83f38ec8105b704$var$Duplex(options);
    $4ypXz.call(this, options);
    $1oME0.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
        if (options.readable === false) this.readable = false;
        if (options.writable === false) this.writable = false;
        if (options.allowHalfOpen === false) {
            this.allowHalfOpen = false;
            this.once("end", $a83f38ec8105b704$var$onend);
        }
    }
}
Object.defineProperty($a83f38ec8105b704$var$Duplex.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.highWaterMark;
    }
});
Object.defineProperty($a83f38ec8105b704$var$Duplex.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState && this._writableState.getBuffer();
    }
});
Object.defineProperty($a83f38ec8105b704$var$Duplex.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._writableState.length;
    }
}); // the no-half-open enforcer
function $a83f38ec8105b704$var$onend() {
    // If the writable side ended, then we're ok.
    if (this._writableState.ended) return; // no more data can be written.
    // But allow more writes to happen in this tick.
    process.nextTick($a83f38ec8105b704$var$onEndNT, this);
}
function $a83f38ec8105b704$var$onEndNT(self) {
    self.end();
}
Object.defineProperty($a83f38ec8105b704$var$Duplex.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined || this._writableState === undefined) return false;
        return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (this._readableState === undefined || this._writableState === undefined) return;
         // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
    }
});

});
parcelRequire.register("4ypXz", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
module.exports = $350e797d4b599347$var$Readable;
/*<replacement>*/ var $350e797d4b599347$var$Duplex;
/*</replacement>*/ $350e797d4b599347$var$Readable.ReadableState = $350e797d4b599347$var$ReadableState;

var $350e797d4b599347$require$EE = $9xlVa$events.EventEmitter;
var $350e797d4b599347$var$EElistenerCount = function EElistenerCount(emitter, type) {
    return emitter.listeners(type).length;
};

var $fxlbS = parcelRequire("fxlbS");

var $350e797d4b599347$require$Buffer = $9xlVa$buffer.Buffer;
var $350e797d4b599347$var$OurUint8Array = $parcel$global.Uint8Array || function() {};
function $350e797d4b599347$var$_uint8ArrayToBuffer(chunk) {
    return $350e797d4b599347$require$Buffer.from(chunk);
}
function $350e797d4b599347$var$_isUint8Array(obj) {
    return $350e797d4b599347$require$Buffer.isBuffer(obj) || obj instanceof $350e797d4b599347$var$OurUint8Array;
}

var $350e797d4b599347$var$debug;
if ($9xlVa$util && $9xlVa$util.debuglog) $350e797d4b599347$var$debug = $9xlVa$util.debuglog("stream");
else $350e797d4b599347$var$debug = function debug() {};

var $1jHQ5 = parcelRequire("1jHQ5");

var $1LQVG = parcelRequire("1LQVG");

var $aC464 = parcelRequire("aC464");
var $350e797d4b599347$var$getHighWaterMark = $aC464.getHighWaterMark;

var $g4f1y = parcelRequire("g4f1y");
var $350e797d4b599347$require$_require$codes = $g4f1y.codes;
var $350e797d4b599347$var$ERR_INVALID_ARG_TYPE = $350e797d4b599347$require$_require$codes.ERR_INVALID_ARG_TYPE, $350e797d4b599347$var$ERR_STREAM_PUSH_AFTER_EOF = $350e797d4b599347$require$_require$codes.ERR_STREAM_PUSH_AFTER_EOF, $350e797d4b599347$var$ERR_METHOD_NOT_IMPLEMENTED = $350e797d4b599347$require$_require$codes.ERR_METHOD_NOT_IMPLEMENTED, $350e797d4b599347$var$ERR_STREAM_UNSHIFT_AFTER_END_EVENT = $350e797d4b599347$require$_require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.
var $350e797d4b599347$var$StringDecoder;
var $350e797d4b599347$var$createReadableStreamAsyncIterator;
var $350e797d4b599347$var$from;

(parcelRequire("eNM4u"))($350e797d4b599347$var$Readable, $fxlbS);
var $350e797d4b599347$var$errorOrDestroy = $1LQVG.errorOrDestroy;
var $350e797d4b599347$var$kProxyEvents = [
    "error",
    "close",
    "destroy",
    "pause",
    "resume"
];
function $350e797d4b599347$var$prependListener(emitter, event, fn) {
    // Sadly this is not cacheable as some libraries bundle their own
    // event emitter implementation with them.
    if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [
        fn,
        emitter._events[event]
    ];
}


function $350e797d4b599347$var$ReadableState(options, stream, isDuplex) {
    $350e797d4b599347$var$Duplex = $350e797d4b599347$var$Duplex || (parcelRequire("erzCT"));
    options = options || {}; // Duplex streams are both readable and writable, but share
    // the same options object.
    // However, some cases require setting options to different
    // values for the readable and the writable sides of the duplex stream.
    // These options can be provided separately as readableXXX and writableXXX.
    if (typeof isDuplex !== "boolean") isDuplex = stream instanceof $350e797d4b599347$var$Duplex; // object stream flag. Used to make read(n) ignore n and to
    // make all the buffer merging and length checks go away
    this.objectMode = !!options.objectMode;
    if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
    // Note: 0 is a valid value, means "don't call _read preemptively ever"
    this.highWaterMark = $350e797d4b599347$var$getHighWaterMark(this, options, "readableHighWaterMark", isDuplex); // A linked list is used to store data chunks instead of an array because the
    // linked list can remove elements from the beginning faster than
    // array.shift()
    this.buffer = new $1jHQ5();
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
    // immediately, or on a later tick.  We set this to true at first, because
    // any actions that shouldn't happen until "later" should generally also
    // not happen before the first read call.
    this.sync = true; // whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true; // Should close be emitted on destroy. Defaults to true.
    this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')
    this.autoDestroy = !!options.autoDestroy; // has it been destroyed
    this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
    // encoding is 'binary' so we have to make this configurable.
    // Everything else in the universe uses 'utf8', though.
    this.defaultEncoding = options.defaultEncoding || "utf8"; // the number of writers that are awaiting a drain event in .pipe()s
    this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
        if (!$350e797d4b599347$var$StringDecoder) $350e797d4b599347$var$StringDecoder = (parcelRequire("l6vLm")).StringDecoder;
        this.decoder = new $350e797d4b599347$var$StringDecoder(options.encoding);
        this.encoding = options.encoding;
    }
}

function $350e797d4b599347$var$Readable(options) {
    $350e797d4b599347$var$Duplex = $350e797d4b599347$var$Duplex || (parcelRequire("erzCT"));
    if (!(this instanceof $350e797d4b599347$var$Readable)) return new $350e797d4b599347$var$Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
    // the ReadableState constructor, at least with V8 6.5
    var isDuplex = this instanceof $350e797d4b599347$var$Duplex;
    this._readableState = new $350e797d4b599347$var$ReadableState(options, this, isDuplex); // legacy
    this.readable = true;
    if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
    }
    $fxlbS.call(this);
}
Object.defineProperty($350e797d4b599347$var$Readable.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        if (this._readableState === undefined) return false;
        return this._readableState.destroyed;
    },
    set: function set(value) {
        // we ignore the value if the stream
        // has not been initialized yet
        if (!this._readableState) return;
         // backward compatibility, the user is explicitly
        // managing destroyed
        this._readableState.destroyed = value;
    }
});
$350e797d4b599347$var$Readable.prototype.destroy = $1LQVG.destroy;
$350e797d4b599347$var$Readable.prototype._undestroy = $1LQVG.undestroy;
$350e797d4b599347$var$Readable.prototype._destroy = function(err, cb) {
    cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
$350e797d4b599347$var$Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
        if (typeof chunk === "string") {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
                chunk = $350e797d4b599347$require$Buffer.from(chunk, encoding);
                encoding = "";
            }
            skipChunkCheck = true;
        }
    } else skipChunkCheck = true;
    return $350e797d4b599347$var$readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()
$350e797d4b599347$var$Readable.prototype.unshift = function(chunk) {
    return $350e797d4b599347$var$readableAddChunk(this, chunk, null, true, false);
};
function $350e797d4b599347$var$readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    $350e797d4b599347$var$debug("readableAddChunk", chunk);
    var state = stream._readableState;
    if (chunk === null) {
        state.reading = false;
        $350e797d4b599347$var$onEofChunk(stream, state);
    } else {
        var er;
        if (!skipChunkCheck) er = $350e797d4b599347$var$chunkInvalid(state, chunk);
        if (er) $350e797d4b599347$var$errorOrDestroy(stream, er);
        else if (state.objectMode || chunk && chunk.length > 0) {
            if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== $350e797d4b599347$require$Buffer.prototype) chunk = $350e797d4b599347$var$_uint8ArrayToBuffer(chunk);
            if (addToFront) {
                if (state.endEmitted) $350e797d4b599347$var$errorOrDestroy(stream, new $350e797d4b599347$var$ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
                else $350e797d4b599347$var$addChunk(stream, state, chunk, true);
            } else if (state.ended) $350e797d4b599347$var$errorOrDestroy(stream, new $350e797d4b599347$var$ERR_STREAM_PUSH_AFTER_EOF());
            else if (state.destroyed) return false;
            else {
                state.reading = false;
                if (state.decoder && !encoding) {
                    chunk = state.decoder.write(chunk);
                    if (state.objectMode || chunk.length !== 0) $350e797d4b599347$var$addChunk(stream, state, chunk, false);
                    else $350e797d4b599347$var$maybeReadMore(stream, state);
                } else $350e797d4b599347$var$addChunk(stream, state, chunk, false);
            }
        } else if (!addToFront) {
            state.reading = false;
            $350e797d4b599347$var$maybeReadMore(stream, state);
        }
    } // We can push more data if we are below the highWaterMark.
    // Also, if we have no data yet, we can stand some more bytes.
    // This is to work around cases where hwm=0, such as the repl.
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}
function $350e797d4b599347$var$addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
        state.awaitDrain = 0;
        stream.emit("data", chunk);
    } else {
        // update the buffer info.
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) $350e797d4b599347$var$emitReadable(stream);
    }
    $350e797d4b599347$var$maybeReadMore(stream, state);
}
function $350e797d4b599347$var$chunkInvalid(state, chunk) {
    var er;
    if (!$350e797d4b599347$var$_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== undefined && !state.objectMode) er = new $350e797d4b599347$var$ERR_INVALID_ARG_TYPE("chunk", [
        "string",
        "Buffer",
        "Uint8Array"
    ], chunk);
    return er;
}
$350e797d4b599347$var$Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
}; // backwards compatibility.

$350e797d4b599347$var$Readable.prototype.setEncoding = function(enc) {
    if (!$350e797d4b599347$var$StringDecoder) $350e797d4b599347$var$StringDecoder = (parcelRequire("l6vLm")).StringDecoder;
    var decoder = new $350e797d4b599347$var$StringDecoder(enc);
    this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8
    this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:
    var p = this._readableState.buffer.head;
    var content = "";
    while(p !== null){
        content += decoder.write(p.data);
        p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== "") this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
}; // Don't raise the hwm > 1GB
var $350e797d4b599347$var$MAX_HWM = 0x40000000;
function $350e797d4b599347$var$computeNewHighWaterMark(n) {
    if (n >= $350e797d4b599347$var$MAX_HWM) // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = $350e797d4b599347$var$MAX_HWM;
    else {
        // Get the next highest power of 2 to prevent increasing hwm excessively in
        // tiny amounts
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
    }
    return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.
function $350e797d4b599347$var$howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended) return 0;
    if (state.objectMode) return 1;
    if (n !== n) {
        // Only flow one buffer at a time
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
    } // If we're asking for more than the current hwm, then raise the hwm.
    if (n > state.highWaterMark) state.highWaterMark = $350e797d4b599347$var$computeNewHighWaterMark(n);
    if (n <= state.length) return n; // Don't have enough
    if (!state.ended) {
        state.needReadable = true;
        return 0;
    }
    return state.length;
} // you can override either this method, or the async _read(n) below.
$350e797d4b599347$var$Readable.prototype.read = function(n) {
    $350e797d4b599347$var$debug("read", n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
    // already have a bunch of data in the buffer, then just trigger
    // the 'readable' event and move on.
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
        $350e797d4b599347$var$debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) $350e797d4b599347$var$endReadable(this);
        else $350e797d4b599347$var$emitReadable(this);
        return null;
    }
    n = $350e797d4b599347$var$howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.
    if (n === 0 && state.ended) {
        if (state.length === 0) $350e797d4b599347$var$endReadable(this);
        return null;
    } // All the actual chunk generation logic needs to be
    // *below* the call to _read.  The reason is that in certain
    // synthetic stream cases, such as passthrough streams, _read
    // may be a completely synchronous operation which may change
    // the state of the read buffer, providing enough data when
    // before there was *not* enough.
    //
    // So, the steps are:
    // 1. Figure out what the state of things will be after we do
    // a read from the buffer.
    //
    // 2. If that resulting state will trigger a _read, then call _read.
    // Note that this may be asynchronous, or synchronous.  Yes, it is
    // deeply ugly to write APIs this way, but that still doesn't mean
    // that the Readable class should behave improperly, as streams are
    // designed to be sync/async agnostic.
    // Take note if the _read call is sync or async (ie, if the read call
    // has returned yet), so that we know whether or not it's safe to emit
    // 'readable' etc.
    //
    // 3. Actually pull the requested chunks out of the buffer and return.
    // if we need a readable event, then we need to do some reading.
    var doRead = state.needReadable;
    $350e797d4b599347$var$debug("need readable", doRead); // if we currently have less than the highWaterMark, then also read some
    if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        $350e797d4b599347$var$debug("length less than watermark", doRead);
    } // however, if we've ended, then there's no point, and if we're already
    // reading, then it's unnecessary.
    if (state.ended || state.reading) {
        doRead = false;
        $350e797d4b599347$var$debug("reading or ended", doRead);
    } else if (doRead) {
        $350e797d4b599347$var$debug("do read");
        state.reading = true;
        state.sync = true; // if the length is currently zero, then we *need* a readable event.
        if (state.length === 0) state.needReadable = true; // call internal read method
        this._read(state.highWaterMark);
        state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
        // and we need to re-evaluate how much data we can return to the user.
        if (!state.reading) n = $350e797d4b599347$var$howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0) ret = $350e797d4b599347$var$fromList(n, state);
    else ret = null;
    if (ret === null) {
        state.needReadable = state.length <= state.highWaterMark;
        n = 0;
    } else {
        state.length -= n;
        state.awaitDrain = 0;
    }
    if (state.length === 0) {
        // If we have nothing in the buffer, then we want to know
        // as soon as we *do* get something into the buffer.
        if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.
        if (nOrig !== n && state.ended) $350e797d4b599347$var$endReadable(this);
    }
    if (ret !== null) this.emit("data", ret);
    return ret;
};
function $350e797d4b599347$var$onEofChunk(stream, state) {
    $350e797d4b599347$var$debug("onEofChunk");
    if (state.ended) return;
    if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
        }
    }
    state.ended = true;
    if (state.sync) // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    $350e797d4b599347$var$emitReadable(stream);
    else {
        // emit 'readable' now to make sure it gets picked up.
        state.needReadable = false;
        if (!state.emittedReadable) {
            state.emittedReadable = true;
            $350e797d4b599347$var$emitReadable_(stream);
        }
    }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function $350e797d4b599347$var$emitReadable(stream) {
    var state = stream._readableState;
    $350e797d4b599347$var$debug("emitReadable", state.needReadable, state.emittedReadable);
    state.needReadable = false;
    if (!state.emittedReadable) {
        $350e797d4b599347$var$debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        process.nextTick($350e797d4b599347$var$emitReadable_, stream);
    }
}
function $350e797d4b599347$var$emitReadable_(stream) {
    var state = stream._readableState;
    $350e797d4b599347$var$debug("emitReadable_", state.destroyed, state.length, state.ended);
    if (!state.destroyed && (state.length || state.ended)) {
        stream.emit("readable");
        state.emittedReadable = false;
    } // The stream needs another readable event if
    // 1. It is not flowing, as the flow mechanism will take
    //    care of it.
    // 2. It is not ended.
    // 3. It is below the highWaterMark, so we can schedule
    //    another readable later.
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    $350e797d4b599347$var$flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function $350e797d4b599347$var$maybeReadMore(stream, state) {
    if (!state.readingMore) {
        state.readingMore = true;
        process.nextTick($350e797d4b599347$var$maybeReadMore_, stream, state);
    }
}
function $350e797d4b599347$var$maybeReadMore_(stream, state) {
    // Attempt to read more data if we should.
    //
    // The conditions for reading more data are (one of):
    // - Not enough data buffered (state.length < state.highWaterMark). The loop
    //   is responsible for filling the buffer with enough data if such data
    //   is available. If highWaterMark is 0 and we are not in the flowing mode
    //   we should _not_ attempt to buffer any extra data. We'll get more data
    //   when the stream consumer calls read() instead.
    // - No data in the buffer, and the stream is in flowing mode. In this mode
    //   the loop below is responsible for ensuring read() is called. Failing to
    //   call read here would abort the flow and there's no other mechanism for
    //   continuing the flow if the stream consumer has just subscribed to the
    //   'data' event.
    //
    // In addition to the above conditions to keep reading data, the following
    // conditions prevent the data from being read:
    // - The stream has ended (state.ended).
    // - There is already a pending 'read' operation (state.reading). This is a
    //   case where the the stream has called the implementation defined _read()
    //   method, but they are processing the call asynchronously and have _not_
    //   called push() with new data. In this case we skip performing more
    //   read()s. The execution ends in this method again after the _read() ends
    //   up calling push() with more data.
    while(!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)){
        var len = state.length;
        $350e797d4b599347$var$debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length) break;
    }
    state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
$350e797d4b599347$var$Readable.prototype._read = function(n) {
    $350e797d4b599347$var$errorOrDestroy(this, new $350e797d4b599347$var$ERR_METHOD_NOT_IMPLEMENTED("_read()"));
};
$350e797d4b599347$var$Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch(state.pipesCount){
        case 0:
            state.pipes = dest;
            break;
        case 1:
            state.pipes = [
                state.pipes,
                dest
            ];
            break;
        default:
            state.pipes.push(dest);
            break;
    }
    state.pipesCount += 1;
    $350e797d4b599347$var$debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted) process.nextTick(endFn);
    else src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
        $350e797d4b599347$var$debug("onunpipe");
        if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
                unpipeInfo.hasUnpiped = true;
                cleanup();
            }
        }
    }
    function onend() {
        $350e797d4b599347$var$debug("onend");
        dest.end();
    } // when the dest drains, it reduces the awaitDrain counter
    // on the source.  This would be more elegant with a .once()
    // handler in flow(), but adding and removing repeatedly is
    // too slow.
    var ondrain = $350e797d4b599347$var$pipeOnDrain(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
        $350e797d4b599347$var$debug("cleanup"); // cleanup event handlers once the pipe is broken
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true; // if the reader is waiting for a drain event from this
        // specific writer, then it would cause it to never start
        // flowing again.
        // So, if this is awaiting a drain, then we just call it now.
        // If we don't know, then assume that we are waiting for one.
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }
    src.on("data", ondata);
    function ondata(chunk) {
        $350e797d4b599347$var$debug("ondata");
        var ret = dest.write(chunk);
        $350e797d4b599347$var$debug("dest.write", ret);
        if (ret === false) {
            // If the user unpiped during `dest.write()`, it is possible
            // to get stuck in a permanently paused state if that write
            // also returned false.
            // => Check whether `dest` is still a piping destination.
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && $350e797d4b599347$var$indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
                $350e797d4b599347$var$debug("false write response, pause", state.awaitDrain);
                state.awaitDrain++;
            }
            src.pause();
        }
    } // if the dest has an error, then stop piping into it.
    // however, don't suppress the throwing behavior for this.
    function onerror(er) {
        $350e797d4b599347$var$debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if ($350e797d4b599347$var$EElistenerCount(dest, "error") === 0) $350e797d4b599347$var$errorOrDestroy(dest, er);
    } // Make sure our error handler is attached before userland ones.
    $350e797d4b599347$var$prependListener(dest, "error", onerror); // Both close and finish should trigger unpipe, but only once.
    function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
        $350e797d4b599347$var$debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
        $350e797d4b599347$var$debug("unpipe");
        src.unpipe(dest);
    } // tell the dest that it's being piped to
    dest.emit("pipe", src); // start the flow if it hasn't been started already.
    if (!state.flowing) {
        $350e797d4b599347$var$debug("pipe resume");
        src.resume();
    }
    return dest;
};
function $350e797d4b599347$var$pipeOnDrain(src) {
    return function pipeOnDrainFunctionResult() {
        var state = src._readableState;
        $350e797d4b599347$var$debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && $350e797d4b599347$var$EElistenerCount(src, "data")) {
            state.flowing = true;
            $350e797d4b599347$var$flow(src);
        }
    };
}
$350e797d4b599347$var$Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = {
        hasUnpiped: false
    }; // if we're not piping anywhere, then do nothing.
    if (state.pipesCount === 0) return this; // just one destination.  most common case.
    if (state.pipesCount === 1) {
        // passed in one, but it's not the right one.
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes; // got a match.
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit("unpipe", this, unpipeInfo);
        return this;
    } // slow case. multiple pipe destinations.
    if (!dest) {
        // remove all.
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for(var i = 0; i < len; i++)dests[i].emit("unpipe", this, {
            hasUnpiped: false
        });
        return this;
    } // try to find the right one.
    var index = $350e797d4b599347$var$indexOf(state.pipes, dest);
    if (index === -1) return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1) state.pipes = state.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something
$350e797d4b599347$var$Readable.prototype.on = function(ev, fn) {
    var res = $fxlbS.prototype.on.call(this, ev, fn);
    var state = this._readableState;
    if (ev === "data") {
        // update readableListening so that resume() may be a no-op
        // a few lines down. This is needed to support once('readable').
        state.readableListening = this.listenerCount("readable") > 0; // Try start flowing on next tick if stream isn't explicitly paused
        if (state.flowing !== false) this.resume();
    } else if (ev === "readable") {
        if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            $350e797d4b599347$var$debug("on readable", state.length, state.reading);
            if (state.length) $350e797d4b599347$var$emitReadable(this);
            else if (!state.reading) process.nextTick($350e797d4b599347$var$nReadingNextTick, this);
        }
    }
    return res;
};
$350e797d4b599347$var$Readable.prototype.addListener = $350e797d4b599347$var$Readable.prototype.on;
$350e797d4b599347$var$Readable.prototype.removeListener = function(ev, fn) {
    var res = $fxlbS.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick($350e797d4b599347$var$updateReadableListening, this);
    return res;
};
$350e797d4b599347$var$Readable.prototype.removeAllListeners = function(ev) {
    var res = $fxlbS.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === undefined) // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick($350e797d4b599347$var$updateReadableListening, this);
    return res;
};
function $350e797d4b599347$var$updateReadableListening(self) {
    var state = self._readableState;
    state.readableListening = self.listenerCount("readable") > 0;
    if (state.resumeScheduled && !state.paused) // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
    else if (self.listenerCount("data") > 0) self.resume();
}
function $350e797d4b599347$var$nReadingNextTick(self) {
    $350e797d4b599347$var$debug("readable nexttick read 0");
    self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
$350e797d4b599347$var$Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
        $350e797d4b599347$var$debug("resume"); // we flow only if there is no one listening
        // for readable, but we still have to call
        // resume()
        state.flowing = !state.readableListening;
        $350e797d4b599347$var$resume(this, state);
    }
    state.paused = false;
    return this;
};
function $350e797d4b599347$var$resume(stream, state) {
    if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        process.nextTick($350e797d4b599347$var$resume_, stream, state);
    }
}
function $350e797d4b599347$var$resume_(stream, state) {
    $350e797d4b599347$var$debug("resume", state.reading);
    if (!state.reading) stream.read(0);
    state.resumeScheduled = false;
    stream.emit("resume");
    $350e797d4b599347$var$flow(stream);
    if (state.flowing && !state.reading) stream.read(0);
}
$350e797d4b599347$var$Readable.prototype.pause = function() {
    $350e797d4b599347$var$debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
        $350e797d4b599347$var$debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
    }
    this._readableState.paused = true;
    return this;
};
function $350e797d4b599347$var$flow(stream) {
    var state = stream._readableState;
    $350e797d4b599347$var$debug("flow", state.flowing);
    while(state.flowing && stream.read() !== null);
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
$350e797d4b599347$var$Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on("end", function() {
        $350e797d4b599347$var$debug("wrapped end");
        if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
    });
    stream.on("data", function(chunk) {
        $350e797d4b599347$var$debug("wrapped data");
        if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode
        if (state.objectMode && (chunk === null || chunk === undefined)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
            paused = true;
            stream.pause();
        }
    }); // proxy all the other methods.
    // important when wrapping filters and duplexes.
    for(var i in stream)if (this[i] === undefined && typeof stream[i] === "function") this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
            return stream[method].apply(stream, arguments);
        };
    }(i);
     // proxy certain important events.
    for(var n1 = 0; n1 < $350e797d4b599347$var$kProxyEvents.length; n1++)stream.on($350e797d4b599347$var$kProxyEvents[n1], this.emit.bind(this, $350e797d4b599347$var$kProxyEvents[n1]));
     // when we try to consume some more bytes, simply unpause the
    // underlying stream.
    this._read = function(n) {
        $350e797d4b599347$var$debug("wrapped _read", n);
        if (paused) {
            paused = false;
            stream.resume();
        }
    };
    return this;
};

if (typeof Symbol === "function") $350e797d4b599347$var$Readable.prototype[Symbol.asyncIterator] = function() {
    if ($350e797d4b599347$var$createReadableStreamAsyncIterator === undefined) $350e797d4b599347$var$createReadableStreamAsyncIterator = (parcelRequire("aYN4E"));
    return $350e797d4b599347$var$createReadableStreamAsyncIterator(this);
};
Object.defineProperty($350e797d4b599347$var$Readable.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.highWaterMark;
    }
});
Object.defineProperty($350e797d4b599347$var$Readable.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState && this._readableState.buffer;
    }
});
Object.defineProperty($350e797d4b599347$var$Readable.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.flowing;
    },
    set: function set(state) {
        if (this._readableState) this._readableState.flowing = state;
    }
}); // exposed for testing purposes only.
$350e797d4b599347$var$Readable._fromList = $350e797d4b599347$var$fromList;
Object.defineProperty($350e797d4b599347$var$Readable.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: false,
    get: function get() {
        return this._readableState.length;
    }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function $350e797d4b599347$var$fromList(n, state) {
    // nothing buffered
    if (state.length === 0) return null;
    var ret;
    if (state.objectMode) ret = state.buffer.shift();
    else if (!n || n >= state.length) {
        // read it all, truncate the list
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.first();
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
    } else // read part of list
    ret = state.buffer.consume(n, state.decoder);
    return ret;
}
function $350e797d4b599347$var$endReadable(stream) {
    var state = stream._readableState;
    $350e797d4b599347$var$debug("endReadable", state.endEmitted);
    if (!state.endEmitted) {
        state.ended = true;
        process.nextTick($350e797d4b599347$var$endReadableNT, state, stream);
    }
}
function $350e797d4b599347$var$endReadableNT(state, stream) {
    $350e797d4b599347$var$debug("endReadableNT", state.endEmitted, state.length); // Check that we didn't get one last unshift.
    if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
        if (state.autoDestroy) {
            // In case of duplex streams we need a way to detect
            // if the writable side is ready for autoDestroy as well
            var wState = stream._writableState;
            if (!wState || wState.autoDestroy && wState.finished) stream.destroy();
        }
    }
}

if (typeof Symbol === "function") $350e797d4b599347$var$Readable.from = function(iterable, opts) {
    if ($350e797d4b599347$var$from === undefined) $350e797d4b599347$var$from = (parcelRequire("6VHMj"));
    return $350e797d4b599347$var$from($350e797d4b599347$var$Readable, iterable, opts);
};
function $350e797d4b599347$var$indexOf(xs, x) {
    for(var i = 0, l = xs.length; i < l; i++){
        if (xs[i] === x) return i;
    }
    return -1;
}

});
parcelRequire.register("1jHQ5", function(module, exports) {
"use strict";
function $0f59924ed8b5fa6c$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $0f59924ed8b5fa6c$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) $0f59924ed8b5fa6c$var$ownKeys(Object(source), true).forEach(function(key) {
            $0f59924ed8b5fa6c$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $0f59924ed8b5fa6c$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $0f59924ed8b5fa6c$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $0f59924ed8b5fa6c$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $0f59924ed8b5fa6c$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $0f59924ed8b5fa6c$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $0f59924ed8b5fa6c$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $0f59924ed8b5fa6c$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}

var $0f59924ed8b5fa6c$var$Buffer = $9xlVa$buffer.Buffer;

var $0f59924ed8b5fa6c$var$inspect = $9xlVa$util.inspect;
var $0f59924ed8b5fa6c$var$custom = $0f59924ed8b5fa6c$var$inspect && $0f59924ed8b5fa6c$var$inspect.custom || "inspect";
function $0f59924ed8b5fa6c$var$copyBuffer(src, target, offset) {
    $0f59924ed8b5fa6c$var$Buffer.prototype.copy.call(src, target, offset);
}
module.exports = /*#__PURE__*/ function() {
    function BufferList() {
        $0f59924ed8b5fa6c$var$_classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    $0f59924ed8b5fa6c$var$_createClass(BufferList, [
        {
            key: "push",
            value: function push(v) {
                var entry = {
                    data: v,
                    next: null
                };
                if (this.length > 0) this.tail.next = entry;
                else this.head = entry;
                this.tail = entry;
                ++this.length;
            }
        },
        {
            key: "unshift",
            value: function unshift(v) {
                var entry = {
                    data: v,
                    next: this.head
                };
                if (this.length === 0) this.tail = entry;
                this.head = entry;
                ++this.length;
            }
        },
        {
            key: "shift",
            value: function shift() {
                if (this.length === 0) return;
                var ret = this.head.data;
                if (this.length === 1) this.head = this.tail = null;
                else this.head = this.head.next;
                --this.length;
                return ret;
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.head = this.tail = null;
                this.length = 0;
            }
        },
        {
            key: "join",
            value: function join(s) {
                if (this.length === 0) return "";
                var p = this.head;
                var ret = "" + p.data;
                while(p = p.next)ret += s + p.data;
                return ret;
            }
        },
        {
            key: "concat",
            value: function concat(n) {
                if (this.length === 0) return $0f59924ed8b5fa6c$var$Buffer.alloc(0);
                var ret = $0f59924ed8b5fa6c$var$Buffer.allocUnsafe(n >>> 0);
                var p = this.head;
                var i = 0;
                while(p){
                    $0f59924ed8b5fa6c$var$copyBuffer(p.data, ret, i);
                    i += p.data.length;
                    p = p.next;
                }
                return ret;
            } // Consumes a specified amount of bytes or characters from the buffered data.
        },
        {
            key: "consume",
            value: function consume(n, hasStrings) {
                var ret;
                if (n < this.head.data.length) {
                    // `slice` is the same for buffers and strings.
                    ret = this.head.data.slice(0, n);
                    this.head.data = this.head.data.slice(n);
                } else if (n === this.head.data.length) // First chunk is a perfect match.
                ret = this.shift();
                else // Result spans more than one buffer.
                ret = hasStrings ? this._getString(n) : this._getBuffer(n);
                return ret;
            }
        },
        {
            key: "first",
            value: function first() {
                return this.head.data;
            } // Consumes a specified amount of characters from the buffered data.
        },
        {
            key: "_getString",
            value: function _getString(n) {
                var p = this.head;
                var c = 1;
                var ret = p.data;
                n -= ret.length;
                while(p = p.next){
                    var str = p.data;
                    var nb = n > str.length ? str.length : n;
                    if (nb === str.length) ret += str;
                    else ret += str.slice(0, n);
                    n -= nb;
                    if (n === 0) {
                        if (nb === str.length) {
                            ++c;
                            if (p.next) this.head = p.next;
                            else this.head = this.tail = null;
                        } else {
                            this.head = p;
                            p.data = str.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                this.length -= c;
                return ret;
            } // Consumes a specified amount of bytes from the buffered data.
        },
        {
            key: "_getBuffer",
            value: function _getBuffer(n) {
                var ret = $0f59924ed8b5fa6c$var$Buffer.allocUnsafe(n);
                var p = this.head;
                var c = 1;
                p.data.copy(ret);
                n -= p.data.length;
                while(p = p.next){
                    var buf = p.data;
                    var nb = n > buf.length ? buf.length : n;
                    buf.copy(ret, ret.length - n, 0, nb);
                    n -= nb;
                    if (n === 0) {
                        if (nb === buf.length) {
                            ++c;
                            if (p.next) this.head = p.next;
                            else this.head = this.tail = null;
                        } else {
                            this.head = p;
                            p.data = buf.slice(nb);
                        }
                        break;
                    }
                    ++c;
                }
                this.length -= c;
                return ret;
            } // Make sure the linked list only shows the minimal necessary information.
        },
        {
            key: $0f59924ed8b5fa6c$var$custom,
            value: function value(_, options) {
                return $0f59924ed8b5fa6c$var$inspect(this, $0f59924ed8b5fa6c$var$_objectSpread({}, options, {
                    // Only inspect one level.
                    depth: 0,
                    // It should not recurse.
                    customInspect: false
                }));
            }
        }
    ]);
    return BufferList;
}();

});

parcelRequire.register("l6vLm", function(module, exports) {

$parcel$export(module.exports, "StringDecoder", () => $f5d2cbf7eec6a452$export$63a7aa211a91ed69, (v) => $f5d2cbf7eec6a452$export$63a7aa211a91ed69 = v);
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
var $f5d2cbf7eec6a452$export$63a7aa211a91ed69;
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";

var $iHmYN = parcelRequire("iHmYN");
var $f5d2cbf7eec6a452$require$Buffer = $iHmYN.Buffer;
/*</replacement>*/ var $f5d2cbf7eec6a452$var$isEncoding = $f5d2cbf7eec6a452$require$Buffer.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch(encoding && encoding.toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
            return true;
        default:
            return false;
    }
};
function $f5d2cbf7eec6a452$var$_normalizeEncoding(enc) {
    if (!enc) return "utf8";
    var retried;
    while(true)switch(enc){
        case "utf8":
        case "utf-8":
            return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return "utf16le";
        case "latin1":
        case "binary":
            return "latin1";
        case "base64":
        case "ascii":
        case "hex":
            return enc;
        default:
            if (retried) return; // undefined
            enc = ("" + enc).toLowerCase();
            retried = true;
    }
}
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function $f5d2cbf7eec6a452$var$normalizeEncoding(enc) {
    var nenc = $f5d2cbf7eec6a452$var$_normalizeEncoding(enc);
    if (typeof nenc !== "string" && ($f5d2cbf7eec6a452$require$Buffer.isEncoding === $f5d2cbf7eec6a452$var$isEncoding || !$f5d2cbf7eec6a452$var$isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
}
$f5d2cbf7eec6a452$export$63a7aa211a91ed69 = $f5d2cbf7eec6a452$var$StringDecoder;
function $f5d2cbf7eec6a452$var$StringDecoder(encoding) {
    this.encoding = $f5d2cbf7eec6a452$var$normalizeEncoding(encoding);
    var nb;
    switch(this.encoding){
        case "utf16le":
            this.text = $f5d2cbf7eec6a452$var$utf16Text;
            this.end = $f5d2cbf7eec6a452$var$utf16End;
            nb = 4;
            break;
        case "utf8":
            this.fillLast = $f5d2cbf7eec6a452$var$utf8FillLast;
            nb = 4;
            break;
        case "base64":
            this.text = $f5d2cbf7eec6a452$var$base64Text;
            this.end = $f5d2cbf7eec6a452$var$base64End;
            nb = 3;
            break;
        default:
            this.write = $f5d2cbf7eec6a452$var$simpleWrite;
            this.end = $f5d2cbf7eec6a452$var$simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = $f5d2cbf7eec6a452$require$Buffer.allocUnsafe(nb);
}
$f5d2cbf7eec6a452$var$StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return "";
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
    } else i = 0;
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
};
$f5d2cbf7eec6a452$var$StringDecoder.prototype.end = $f5d2cbf7eec6a452$var$utf8End;
// Returns only complete characters in a Buffer
$f5d2cbf7eec6a452$var$StringDecoder.prototype.text = $f5d2cbf7eec6a452$var$utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
$f5d2cbf7eec6a452$var$StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function $f5d2cbf7eec6a452$var$utf8CheckByte(byte) {
    if (byte <= 0x7F) return 0;
    else if (byte >> 5 === 0x06) return 2;
    else if (byte >> 4 === 0x0E) return 3;
    else if (byte >> 3 === 0x1E) return 4;
    return byte >> 6 === 0x02 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function $f5d2cbf7eec6a452$var$utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = $f5d2cbf7eec6a452$var$utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = $f5d2cbf7eec6a452$var$utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = $f5d2cbf7eec6a452$var$utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function $f5d2cbf7eec6a452$var$utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return "\uFFFD";
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return "\uFFFD";
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
                self.lastNeed = 2;
                return "\uFFFD";
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function $f5d2cbf7eec6a452$var$utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = $f5d2cbf7eec6a452$var$utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function $f5d2cbf7eec6a452$var$utf8Text(buf, i) {
    var total = $f5d2cbf7eec6a452$var$utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function $f5d2cbf7eec6a452$var$utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + "\uFFFD";
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function $f5d2cbf7eec6a452$var$utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function $f5d2cbf7eec6a452$var$utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
}
function $f5d2cbf7eec6a452$var$base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) this.lastChar[0] = buf[buf.length - 1];
    else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
}
function $f5d2cbf7eec6a452$var$base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function $f5d2cbf7eec6a452$var$simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function $f5d2cbf7eec6a452$var$simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
}

});
parcelRequire.register("iHmYN", function(module, exports) {

var $d9ce1163a1d5fc82$var$Buffer = $9xlVa$buffer.Buffer;
// alternative to using Object.keys for old browsers
function $d9ce1163a1d5fc82$var$copyProps(src, dst) {
    for(var key in src)dst[key] = src[key];
}
if ($d9ce1163a1d5fc82$var$Buffer.from && $d9ce1163a1d5fc82$var$Buffer.alloc && $d9ce1163a1d5fc82$var$Buffer.allocUnsafe && $d9ce1163a1d5fc82$var$Buffer.allocUnsafeSlow) module.exports = $9xlVa$buffer;
else {
    // Copy properties from require('buffer')
    $d9ce1163a1d5fc82$var$copyProps($9xlVa$buffer, module.exports);
    module.exports.Buffer = $d9ce1163a1d5fc82$var$SafeBuffer;
}
function $d9ce1163a1d5fc82$var$SafeBuffer(arg, encodingOrOffset, length) {
    return $d9ce1163a1d5fc82$var$Buffer(arg, encodingOrOffset, length);
}
$d9ce1163a1d5fc82$var$SafeBuffer.prototype = Object.create($d9ce1163a1d5fc82$var$Buffer.prototype);
// Copy static methods from Buffer
$d9ce1163a1d5fc82$var$copyProps($d9ce1163a1d5fc82$var$Buffer, $d9ce1163a1d5fc82$var$SafeBuffer);
$d9ce1163a1d5fc82$var$SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") throw new TypeError("Argument must not be a number");
    return $d9ce1163a1d5fc82$var$Buffer(arg, encodingOrOffset, length);
};
$d9ce1163a1d5fc82$var$SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    var buf = $d9ce1163a1d5fc82$var$Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === "string") buf.fill(fill, encoding);
        else buf.fill(fill);
    } else buf.fill(0);
    return buf;
};
$d9ce1163a1d5fc82$var$SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    return $d9ce1163a1d5fc82$var$Buffer(size);
};
$d9ce1163a1d5fc82$var$SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") throw new TypeError("Argument must be a number");
    return $9xlVa$buffer.SlowBuffer(size);
};

});


parcelRequire.register("aYN4E", function(module, exports) {
"use strict";
var $7fe5930cf0b4b376$var$_Object$setPrototypeO;
function $7fe5930cf0b4b376$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

var $dOEcF = parcelRequire("dOEcF");
var $7fe5930cf0b4b376$var$kLastResolve = Symbol("lastResolve");
var $7fe5930cf0b4b376$var$kLastReject = Symbol("lastReject");
var $7fe5930cf0b4b376$var$kError = Symbol("error");
var $7fe5930cf0b4b376$var$kEnded = Symbol("ended");
var $7fe5930cf0b4b376$var$kLastPromise = Symbol("lastPromise");
var $7fe5930cf0b4b376$var$kHandlePromise = Symbol("handlePromise");
var $7fe5930cf0b4b376$var$kStream = Symbol("stream");
function $7fe5930cf0b4b376$var$createIterResult(value, done) {
    return {
        value: value,
        done: done
    };
}
function $7fe5930cf0b4b376$var$readAndResolve(iter) {
    var resolve = iter[$7fe5930cf0b4b376$var$kLastResolve];
    if (resolve !== null) {
        var data = iter[$7fe5930cf0b4b376$var$kStream].read(); // we defer if data is null
        // we can be expecting either 'end' or
        // 'error'
        if (data !== null) {
            iter[$7fe5930cf0b4b376$var$kLastPromise] = null;
            iter[$7fe5930cf0b4b376$var$kLastResolve] = null;
            iter[$7fe5930cf0b4b376$var$kLastReject] = null;
            resolve($7fe5930cf0b4b376$var$createIterResult(data, false));
        }
    }
}
function $7fe5930cf0b4b376$var$onReadable(iter) {
    // we wait for the next tick, because it might
    // emit an error with process.nextTick
    process.nextTick($7fe5930cf0b4b376$var$readAndResolve, iter);
}
function $7fe5930cf0b4b376$var$wrapForNext(lastPromise, iter) {
    return function(resolve, reject) {
        lastPromise.then(function() {
            if (iter[$7fe5930cf0b4b376$var$kEnded]) {
                resolve($7fe5930cf0b4b376$var$createIterResult(undefined, true));
                return;
            }
            iter[$7fe5930cf0b4b376$var$kHandlePromise](resolve, reject);
        }, reject);
    };
}
var $7fe5930cf0b4b376$var$AsyncIteratorPrototype = Object.getPrototypeOf(function() {});
var $7fe5930cf0b4b376$var$ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf(($7fe5930cf0b4b376$var$_Object$setPrototypeO = {
    get stream () {
        return this[$7fe5930cf0b4b376$var$kStream];
    },
    next: function next() {
        var _this = this;
        // if we have detected an error in the meanwhile
        // reject straight away
        var error = this[$7fe5930cf0b4b376$var$kError];
        if (error !== null) return Promise.reject(error);
        if (this[$7fe5930cf0b4b376$var$kEnded]) return Promise.resolve($7fe5930cf0b4b376$var$createIterResult(undefined, true));
        if (this[$7fe5930cf0b4b376$var$kStream].destroyed) // We need to defer via nextTick because if .destroy(err) is
        // called, the error will be emitted via nextTick, and
        // we cannot guarantee that there is no error lingering around
        // waiting to be emitted.
        return new Promise(function(resolve, reject) {
            process.nextTick(function() {
                if (_this[$7fe5930cf0b4b376$var$kError]) reject(_this[$7fe5930cf0b4b376$var$kError]);
                else resolve($7fe5930cf0b4b376$var$createIterResult(undefined, true));
            });
        });
         // if we have multiple next() calls
        // we will wait for the previous Promise to finish
        // this logic is optimized to support for await loops,
        // where next() is only called once at a time
        var lastPromise = this[$7fe5930cf0b4b376$var$kLastPromise];
        var promise;
        if (lastPromise) promise = new Promise($7fe5930cf0b4b376$var$wrapForNext(lastPromise, this));
        else {
            // fast path needed to support multiple this.push()
            // without triggering the next() queue
            var data = this[$7fe5930cf0b4b376$var$kStream].read();
            if (data !== null) return Promise.resolve($7fe5930cf0b4b376$var$createIterResult(data, false));
            promise = new Promise(this[$7fe5930cf0b4b376$var$kHandlePromise]);
        }
        this[$7fe5930cf0b4b376$var$kLastPromise] = promise;
        return promise;
    }
}, $7fe5930cf0b4b376$var$_defineProperty($7fe5930cf0b4b376$var$_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
}), $7fe5930cf0b4b376$var$_defineProperty($7fe5930cf0b4b376$var$_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    // destroy(err, cb) is a private API
    // we can guarantee we have that here, because we control the
    // Readable class this is attached to
    return new Promise(function(resolve, reject) {
        _this2[$7fe5930cf0b4b376$var$kStream].destroy(null, function(err) {
            if (err) {
                reject(err);
                return;
            }
            resolve($7fe5930cf0b4b376$var$createIterResult(undefined, true));
        });
    });
}), $7fe5930cf0b4b376$var$_Object$setPrototypeO), $7fe5930cf0b4b376$var$AsyncIteratorPrototype);
var $7fe5930cf0b4b376$var$createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
    var _Object$create;
    var iterator = Object.create($7fe5930cf0b4b376$var$ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, $7fe5930cf0b4b376$var$_defineProperty(_Object$create, $7fe5930cf0b4b376$var$kStream, {
        value: stream,
        writable: true
    }), $7fe5930cf0b4b376$var$_defineProperty(_Object$create, $7fe5930cf0b4b376$var$kLastResolve, {
        value: null,
        writable: true
    }), $7fe5930cf0b4b376$var$_defineProperty(_Object$create, $7fe5930cf0b4b376$var$kLastReject, {
        value: null,
        writable: true
    }), $7fe5930cf0b4b376$var$_defineProperty(_Object$create, $7fe5930cf0b4b376$var$kError, {
        value: null,
        writable: true
    }), $7fe5930cf0b4b376$var$_defineProperty(_Object$create, $7fe5930cf0b4b376$var$kEnded, {
        value: stream._readableState.endEmitted,
        writable: true
    }), $7fe5930cf0b4b376$var$_defineProperty(_Object$create, $7fe5930cf0b4b376$var$kHandlePromise, {
        value: function value(resolve, reject) {
            var data = iterator[$7fe5930cf0b4b376$var$kStream].read();
            if (data) {
                iterator[$7fe5930cf0b4b376$var$kLastPromise] = null;
                iterator[$7fe5930cf0b4b376$var$kLastResolve] = null;
                iterator[$7fe5930cf0b4b376$var$kLastReject] = null;
                resolve($7fe5930cf0b4b376$var$createIterResult(data, false));
            } else {
                iterator[$7fe5930cf0b4b376$var$kLastResolve] = resolve;
                iterator[$7fe5930cf0b4b376$var$kLastReject] = reject;
            }
        },
        writable: true
    }), _Object$create));
    iterator[$7fe5930cf0b4b376$var$kLastPromise] = null;
    $dOEcF(stream, function(err) {
        if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var reject = iterator[$7fe5930cf0b4b376$var$kLastReject]; // reject if we are waiting for data in the Promise
            // returned by next() and store the error
            if (reject !== null) {
                iterator[$7fe5930cf0b4b376$var$kLastPromise] = null;
                iterator[$7fe5930cf0b4b376$var$kLastResolve] = null;
                iterator[$7fe5930cf0b4b376$var$kLastReject] = null;
                reject(err);
            }
            iterator[$7fe5930cf0b4b376$var$kError] = err;
            return;
        }
        var resolve = iterator[$7fe5930cf0b4b376$var$kLastResolve];
        if (resolve !== null) {
            iterator[$7fe5930cf0b4b376$var$kLastPromise] = null;
            iterator[$7fe5930cf0b4b376$var$kLastResolve] = null;
            iterator[$7fe5930cf0b4b376$var$kLastReject] = null;
            resolve($7fe5930cf0b4b376$var$createIterResult(undefined, true));
        }
        iterator[$7fe5930cf0b4b376$var$kEnded] = true;
    });
    stream.on("readable", $7fe5930cf0b4b376$var$onReadable.bind(null, iterator));
    return iterator;
};
module.exports = $7fe5930cf0b4b376$var$createReadableStreamAsyncIterator;

});
parcelRequire.register("dOEcF", function(module, exports) {
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
"use strict";

var $g4f1y = parcelRequire("g4f1y");
var $a0ef216a9bd947ca$var$ERR_STREAM_PREMATURE_CLOSE = $g4f1y.codes.ERR_STREAM_PREMATURE_CLOSE;
function $a0ef216a9bd947ca$var$once(callback) {
    var called = false;
    return function() {
        if (called) return;
        called = true;
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        callback.apply(this, args);
    };
}
function $a0ef216a9bd947ca$var$noop() {}
function $a0ef216a9bd947ca$var$isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
}
function $a0ef216a9bd947ca$var$eos(stream, opts, callback) {
    if (typeof opts === "function") return $a0ef216a9bd947ca$var$eos(stream, null, opts);
    if (!opts) opts = {};
    callback = $a0ef216a9bd947ca$var$once(callback || $a0ef216a9bd947ca$var$noop);
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function onlegacyfinish() {
        if (!stream.writable) onfinish();
    };
    var writableEnded = stream._writableState && stream._writableState.finished;
    var onfinish = function onfinish() {
        writable = false;
        writableEnded = true;
        if (!readable) callback.call(stream);
    };
    var readableEnded = stream._readableState && stream._readableState.endEmitted;
    var onend = function onend() {
        readable = false;
        readableEnded = true;
        if (!writable) callback.call(stream);
    };
    var onerror = function onerror(err) {
        callback.call(stream, err);
    };
    var onclose = function onclose() {
        var err;
        if (readable && !readableEnded) {
            if (!stream._readableState || !stream._readableState.ended) err = new $a0ef216a9bd947ca$var$ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
        if (writable && !writableEnded) {
            if (!stream._writableState || !stream._writableState.ended) err = new $a0ef216a9bd947ca$var$ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
        }
    };
    var onrequest = function onrequest() {
        stream.req.on("finish", onfinish);
    };
    if ($a0ef216a9bd947ca$var$isRequest(stream)) {
        stream.on("complete", onfinish);
        stream.on("abort", onclose);
        if (stream.req) onrequest();
        else stream.on("request", onrequest);
    } else if (writable && !stream._writableState) {
        // legacy streams
        stream.on("end", onlegacyfinish);
        stream.on("close", onlegacyfinish);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false) stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
        stream.removeListener("complete", onfinish);
        stream.removeListener("abort", onclose);
        stream.removeListener("request", onrequest);
        if (stream.req) stream.req.removeListener("finish", onfinish);
        stream.removeListener("end", onlegacyfinish);
        stream.removeListener("close", onlegacyfinish);
        stream.removeListener("finish", onfinish);
        stream.removeListener("end", onend);
        stream.removeListener("error", onerror);
        stream.removeListener("close", onclose);
    };
}
module.exports = $a0ef216a9bd947ca$var$eos;

});


parcelRequire.register("6VHMj", function(module, exports) {
"use strict";
function $50ba0663aa4bd8d5$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $50ba0663aa4bd8d5$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $50ba0663aa4bd8d5$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $50ba0663aa4bd8d5$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $50ba0663aa4bd8d5$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $50ba0663aa4bd8d5$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) $50ba0663aa4bd8d5$var$ownKeys(Object(source), true).forEach(function(key) {
            $50ba0663aa4bd8d5$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $50ba0663aa4bd8d5$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $50ba0663aa4bd8d5$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

var $g4f1y = parcelRequire("g4f1y");
var $50ba0663aa4bd8d5$var$ERR_INVALID_ARG_TYPE = $g4f1y.codes.ERR_INVALID_ARG_TYPE;
function $50ba0663aa4bd8d5$var$from(Readable, iterable, opts) {
    var iterator;
    if (iterable && typeof iterable.next === "function") iterator = iterable;
    else if (iterable && iterable[Symbol.asyncIterator]) iterator = iterable[Symbol.asyncIterator]();
    else if (iterable && iterable[Symbol.iterator]) iterator = iterable[Symbol.iterator]();
    else throw new $50ba0663aa4bd8d5$var$ERR_INVALID_ARG_TYPE("iterable", [
        "Iterable"
    ], iterable);
    var readable = new Readable($50ba0663aa4bd8d5$var$_objectSpread({
        objectMode: true
    }, opts)); // Reading boolean to protect against _read
    // being called before last iteration completion.
    var reading = false;
    readable._read = function() {
        if (!reading) {
            reading = true;
            next();
        }
    };
    function next() {
        return _next2.apply(this, arguments);
    }
    function _next2() {
        _next2 = $50ba0663aa4bd8d5$var$_asyncToGenerator(function*() {
            try {
                var _ref = yield iterator.next(), value = _ref.value, done = _ref.done;
                if (done) readable.push(null);
                else if (readable.push((yield value))) next();
                else reading = false;
            } catch (err) {
                readable.destroy(err);
            }
        });
        return _next2.apply(this, arguments);
    }
    return readable;
}
module.exports = $50ba0663aa4bd8d5$var$from;

});




parcelRequire.register("ggirm", function(module, exports) {
"use strict";


var $7tLiS = parcelRequire("7tLiS");
var $bd6c71d007fad91e$require$LEVEL = $7tLiS.LEVEL;

var $72KRt = parcelRequire("72KRt");
/**
 * Constructor function for the LegacyTransportStream. This is an internal
 * wrapper `winston >= 3` uses to wrap older transports implementing
 * log(level, message, meta).
 * @param {Object} options - Options for this TransportStream instance.
 * @param {Transpot} options.transport - winston@2 or older Transport to wrap.
 */ const $bd6c71d007fad91e$var$LegacyTransportStream = module.exports = function LegacyTransportStream(options = {}) {
    $72KRt.call(this, options);
    if (!options.transport || typeof options.transport.log !== "function") throw new Error("Invalid transport, must be an object with a log method.");
    this.transport = options.transport;
    this.level = this.level || options.transport.level;
    this.handleExceptions = this.handleExceptions || options.transport.handleExceptions;
    // Display our deprecation notice.
    this._deprecated();
    // Properly bubble up errors from the transport to the
    // LegacyTransportStream instance, but only once no matter how many times
    // this transport is shared.
    function transportError(err) {
        this.emit("error", err, this.transport);
    }
    if (!this.transport.__winstonError) {
        this.transport.__winstonError = transportError.bind(this);
        this.transport.on("error", this.transport.__winstonError);
    }
};
/*
 * Inherit from TransportStream using Node.js built-ins
 */ $9xlVa$util.inherits($bd6c71d007fad91e$var$LegacyTransportStream, $72KRt);
/**
 * Writes the info object to our transport instance.
 * @param {mixed} info - TODO: add param description.
 * @param {mixed} enc - TODO: add param description.
 * @param {function} callback - TODO: add param description.
 * @returns {undefined}
 * @private
 */ $bd6c71d007fad91e$var$LegacyTransportStream.prototype._write = function _write(info, enc, callback) {
    if (this.silent || info.exception === true && !this.handleExceptions) return callback(null);
    // Remark: This has to be handled in the base transport now because we
    // cannot conditionally write to our pipe targets as stream.
    if (!this.level || this.levels[this.level] >= this.levels[info[$bd6c71d007fad91e$require$LEVEL]]) this.transport.log(info[$bd6c71d007fad91e$require$LEVEL], info.message, info, this._nop);
    callback(null);
};
/**
 * Writes the batch of info objects (i.e. "object chunks") to our transport
 * instance after performing any necessary filtering.
 * @param {mixed} chunks - TODO: add params description.
 * @param {function} callback - TODO: add params description.
 * @returns {mixed} - TODO: add returns description.
 * @private
 */ $bd6c71d007fad91e$var$LegacyTransportStream.prototype._writev = function _writev(chunks, callback) {
    for(let i = 0; i < chunks.length; i++)if (this._accept(chunks[i])) {
        this.transport.log(chunks[i].chunk[$bd6c71d007fad91e$require$LEVEL], chunks[i].chunk.message, chunks[i].chunk, this._nop);
        chunks[i].callback();
    }
    return callback(null);
};
/**
 * Displays a deprecation notice. Defined as a function so it can be
 * overriden in tests.
 * @returns {undefined}
 */ $bd6c71d007fad91e$var$LegacyTransportStream.prototype._deprecated = function _deprecated() {
    // eslint-disable-next-line no-console
    console.error([
        `${this.transport.name} is a legacy winston transport. Consider upgrading: `,
        "- Upgrade docs: https://github.com/winstonjs/winston/blob/master/UPGRADE-3.0.md"
    ].join("\n"));
};
/**
 * Clean up error handling state on the legacy transport associated
 * with this instance.
 * @returns {undefined}
 */ $bd6c71d007fad91e$var$LegacyTransportStream.prototype.close = function close() {
    if (this.transport.close) this.transport.close();
    if (this.transport.__winstonError) {
        this.transport.removeListener("error", this.transport.__winstonError);
        this.transport.__winstonError = null;
    }
};

});



parcelRequire.register("6DsoP", function(module, exports) {
/* eslint-disable complexity,max-statements */ /**
 * file.js: Transport for outputting to a local log file.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";



var $grsN5 = parcelRequire("grsN5");


var $7tLiS = parcelRequire("7tLiS");
var $4d4c6a288dcf751e$require$MESSAGE = $7tLiS.MESSAGE;

var $cOGCw = parcelRequire("cOGCw");
var $4d4c6a288dcf751e$require$Stream = $cOGCw.Stream;
var $4d4c6a288dcf751e$require$PassThrough = $cOGCw.PassThrough;

var $72KRt = parcelRequire("72KRt");

const $4d4c6a288dcf751e$var$debug = (parcelRequire("dJEkP"))("winston:file");


var $ar21H = parcelRequire("ar21H");
/**
 * Transport for outputting to a local log file.
 * @type {File}
 * @extends {TransportStream}
 */ module.exports = class File extends $72KRt {
    /**
   * Constructor function for the File transport object responsible for
   * persisting log messages and metadata to one or more files.
   * @param {Object} options - Options for this instance.
   */ constructor(options = {}){
        super(options);
        // Expose the name of this Transport on the prototype.
        this.name = options.name || "file";
        // Helper function which throws an `Error` in the event that any of the
        // rest of the arguments is present in `options`.
        function throwIf(target, ...args) {
            args.slice(1).forEach((name)=>{
                if (options[name]) throw new Error(`Cannot set ${name} and ${target} together`);
            });
        }
        // Setup the base stream that always gets piped to to handle buffering.
        this._stream = new $4d4c6a288dcf751e$require$PassThrough();
        this._stream.setMaxListeners(30);
        // Bind this context for listener methods.
        this._onError = this._onError.bind(this);
        if (options.filename || options.dirname) {
            throwIf("filename or dirname", "stream");
            this._basename = this.filename = options.filename ? $9xlVa$path.basename(options.filename) : "winston.log";
            this.dirname = options.dirname || $9xlVa$path.dirname(options.filename);
            this.options = options.options || {
                flags: "a"
            };
        } else if (options.stream) {
            // eslint-disable-next-line no-console
            console.warn("options.stream will be removed in winston@4. Use winston.transports.Stream");
            throwIf("stream", "filename", "maxsize");
            this._dest = this._stream.pipe(this._setupStream(options.stream));
            this.dirname = $9xlVa$path.dirname(this._dest.path);
        // We need to listen for drain events when write() returns false. This
        // can make node mad at times.
        } else throw new Error("Cannot log to file without filename or stream.");
        this.maxsize = options.maxsize || null;
        this.rotationFormat = options.rotationFormat || false;
        this.zippedArchive = options.zippedArchive || false;
        this.maxFiles = options.maxFiles || null;
        this.eol = typeof options.eol === "string" ? options.eol : $9xlVa$os.EOL;
        this.tailable = options.tailable || false;
        // Internal state variables representing the number of files this instance
        // has created and the current size (in bytes) of the current logfile.
        this._size = 0;
        this._pendingSize = 0;
        this._created = 0;
        this._drain = false;
        this._opening = false;
        this._ending = false;
        if (this.dirname) this._createLogDirIfNotExist(this.dirname);
        this.open();
    }
    finishIfEnding() {
        if (this._ending) {
            if (this._opening) this.once("open", ()=>{
                this._stream.once("finish", ()=>this.emit("finish"));
                setImmediate(()=>this._stream.end());
            });
            else {
                this._stream.once("finish", ()=>this.emit("finish"));
                setImmediate(()=>this._stream.end());
            }
        }
    }
    /**
   * Core logging method exposed to Winston. Metadata is optional.
   * @param {Object} info - TODO: add param description.
   * @param {Function} callback - TODO: add param description.
   * @returns {undefined}
   */ log(info, callback = ()=>{}) {
        // Remark: (jcrugzz) What is necessary about this callback(null, true) now
        // when thinking about 3.x? Should silent be handled in the base
        // TransportStream _write method?
        if (this.silent) {
            callback();
            return true;
        }
        // Output stream buffer is full and has asked us to wait for the drain event
        if (this._drain) {
            this._stream.once("drain", ()=>{
                this._drain = false;
                this.log(info, callback);
            });
            return;
        }
        if (this._rotate) {
            this._stream.once("rotate", ()=>{
                this._rotate = false;
                this.log(info, callback);
            });
            return;
        }
        // Grab the raw string and append the expected EOL.
        const output = `${info[$4d4c6a288dcf751e$require$MESSAGE]}${this.eol}`;
        const bytes = Buffer.byteLength(output);
        // After we have written to the PassThrough check to see if we need
        // to rotate to the next file.
        //
        // Remark: This gets called too early and does not depict when data
        // has been actually flushed to disk.
        function logged() {
            this._size += bytes;
            this._pendingSize -= bytes;
            $4d4c6a288dcf751e$var$debug("logged %s %s", this._size, output);
            this.emit("logged", info);
            // Do not attempt to rotate files while opening
            if (this._opening) return;
            // Check to see if we need to end the stream and create a new one.
            if (!this._needsNewFile()) return;
            // End the current stream, ensure it flushes and create a new one.
            // This could potentially be optimized to not run a stat call but its
            // the safest way since we are supporting `maxFiles`.
            this._rotate = true;
            this._endStream(()=>this._rotateFile());
        }
        // Keep track of the pending bytes being written while files are opening
        // in order to properly rotate the PassThrough this._stream when the file
        // eventually does open.
        this._pendingSize += bytes;
        if (this._opening && !this.rotatedWhileOpening && this._needsNewFile(this._size + this._pendingSize)) this.rotatedWhileOpening = true;
        const written = this._stream.write(output, logged.bind(this));
        if (!written) {
            this._drain = true;
            this._stream.once("drain", ()=>{
                this._drain = false;
                callback();
            });
        } else callback(); // eslint-disable-line callback-return
        $4d4c6a288dcf751e$var$debug("written", written, this._drain);
        this.finishIfEnding();
        return written;
    }
    /**
   * Query the transport. Options object is optional.
   * @param {Object} options - Loggly-like query options for this instance.
   * @param {function} callback - Continuation to respond to when complete.
   * TODO: Refactor me.
   */ query(options1, callback) {
        if (typeof options1 === "function") {
            callback = options1;
            options1 = {};
        }
        options1 = normalizeQuery(options1);
        const file = $9xlVa$path.join(this.dirname, this.filename);
        let buff1 = "";
        let results = [];
        let row = 0;
        const stream = $9xlVa$fs.createReadStream(file, {
            encoding: "utf8"
        });
        stream.on("error", (err)=>{
            if (stream.readable) stream.destroy();
            if (!callback) return;
            return err.code !== "ENOENT" ? callback(err) : callback(null, results);
        });
        stream.on("data", (data)=>{
            data = (buff1 + data).split(/\n+/);
            const l = data.length - 1;
            let i = 0;
            for(; i < l; i++){
                if (!options1.start || row >= options1.start) add(data[i]);
                row++;
            }
            buff1 = data[l];
        });
        stream.on("close", ()=>{
            if (buff1) add(buff1, true);
            if (options1.order === "desc") results = results.reverse();
            // eslint-disable-next-line callback-return
            if (callback) callback(null, results);
        });
        function add(buff, attempt) {
            try {
                const log = JSON.parse(buff);
                if (check(log)) push(log);
            } catch (e) {
                if (!attempt) stream.emit("error", e);
            }
        }
        function push(log) {
            if (options1.rows && results.length >= options1.rows && options1.order !== "desc") {
                if (stream.readable) stream.destroy();
                return;
            }
            if (options1.fields) log = options1.fields.reduce((obj, key)=>{
                obj[key] = log[key];
                return obj;
            }, {});
            if (options1.order === "desc") {
                if (results.length >= options1.rows) results.shift();
            }
            results.push(log);
        }
        function check(log) {
            if (!log) return;
            if (typeof log !== "object") return;
            const time = new Date(log.timestamp);
            if (options1.from && time < options1.from || options1.until && time > options1.until || options1.level && options1.level !== log.level) return;
            return true;
        }
        function normalizeQuery(options) {
            options = options || {};
            // limit
            options.rows = options.rows || options.limit || 10;
            // starting row offset
            options.start = options.start || 0;
            // now
            options.until = options.until || new Date();
            if (typeof options.until !== "object") options.until = new Date(options.until);
            // now - 24
            options.from = options.from || options.until - 86400000;
            if (typeof options.from !== "object") options.from = new Date(options.from);
            // 'asc' or 'desc'
            options.order = options.order || "desc";
            return options;
        }
    }
    /**
   * Returns a log stream for this transport. Options object is optional.
   * @param {Object} options - Stream options for this instance.
   * @returns {Stream} - TODO: add return description.
   * TODO: Refactor me.
   */ stream(options = {}) {
        const file = $9xlVa$path.join(this.dirname, this.filename);
        const stream = new $4d4c6a288dcf751e$require$Stream();
        const tail = {
            file: file,
            start: options.start
        };
        stream.destroy = $ar21H(tail, (err, line)=>{
            if (err) return stream.emit("error", err);
            try {
                stream.emit("data", line);
                line = JSON.parse(line);
                stream.emit("log", line);
            } catch (e) {
                stream.emit("error", e);
            }
        });
        return stream;
    }
    /**
   * Checks to see the filesize of.
   * @returns {undefined}
   */ open() {
        // If we do not have a filename then we were passed a stream and
        // don't need to keep track of size.
        if (!this.filename) return;
        if (this._opening) return;
        this._opening = true;
        // Stat the target file to get the size and create the stream.
        this.stat((err, size)=>{
            if (err) return this.emit("error", err);
            $4d4c6a288dcf751e$var$debug("stat done: %s { size: %s }", this.filename, size);
            this._size = size;
            this._dest = this._createStream(this._stream);
            this._opening = false;
            this.once("open", ()=>{
                if (this._stream.eventNames().includes("rotate")) this._stream.emit("rotate");
                else this._rotate = false;
            });
        });
    }
    /**
   * Stat the file and assess information in order to create the proper stream.
   * @param {function} callback - TODO: add param description.
   * @returns {undefined}
   */ stat(callback) {
        const target = this._getFile();
        const fullpath = $9xlVa$path.join(this.dirname, target);
        $9xlVa$fs.stat(fullpath, (err, stat)=>{
            if (err && err.code === "ENOENT") {
                $4d4c6a288dcf751e$var$debug("ENOENT\xa0ok", fullpath);
                // Update internally tracked filename with the new target name.
                this.filename = target;
                return callback(null, 0);
            }
            if (err) {
                $4d4c6a288dcf751e$var$debug(`err ${err.code} ${fullpath}`);
                return callback(err);
            }
            if (!stat || this._needsNewFile(stat.size)) // If `stats.size` is greater than the `maxsize` for this
            // instance then try again.
            return this._incFile(()=>this.stat(callback));
            // Once we have figured out what the filename is, set it
            // and return the size.
            this.filename = target;
            callback(null, stat.size);
        });
    }
    /**
   * Closes the stream associated with this instance.
   * @param {function} cb - TODO: add param description.
   * @returns {undefined}
   */ close(cb) {
        if (!this._stream) return;
        this._stream.end(()=>{
            if (cb) cb(); // eslint-disable-line callback-return
            this.emit("flush");
            this.emit("closed");
        });
    }
    /**
   * TODO: add method description.
   * @param {number} size - TODO: add param description.
   * @returns {undefined}
   */ _needsNewFile(size) {
        size = size || this._size;
        return this.maxsize && size >= this.maxsize;
    }
    /**
   * TODO: add method description.
   * @param {Error} err - TODO: add param description.
   * @returns {undefined}
   */ _onError(err) {
        this.emit("error", err);
    }
    /**
   * TODO: add method description.
   * @param {Stream} stream - TODO: add param description.
   * @returns {mixed} - TODO: add return description.
   */ _setupStream(stream) {
        stream.on("error", this._onError);
        return stream;
    }
    /**
   * TODO: add method description.
   * @param {Stream} stream - TODO: add param description.
   * @returns {mixed} - TODO: add return description.
   */ _cleanupStream(stream) {
        stream.removeListener("error", this._onError);
        return stream;
    }
    /**
   * TODO: add method description.
   */ _rotateFile() {
        this._incFile(()=>this.open());
    }
    /**
   * Unpipe from the stream that has been marked as full and end it so it
   * flushes to disk.
   *
   * @param {function} callback - Callback for when the current file has closed.
   * @private
   */ _endStream(callback = ()=>{}) {
        if (this._dest) {
            this._stream.unpipe(this._dest);
            this._dest.end(()=>{
                this._cleanupStream(this._dest);
                callback();
            });
        } else callback(); // eslint-disable-line callback-return
    }
    /**
   * Returns the WritableStream for the active file on this instance. If we
   * should gzip the file then a zlib stream is returned.
   *
   * @param {ReadableStream} source – PassThrough to pipe to the file when open.
   * @returns {WritableStream} Stream that writes to disk for the active file.
   */ _createStream(source) {
        const fullpath = $9xlVa$path.join(this.dirname, this.filename);
        $4d4c6a288dcf751e$var$debug("create stream start", fullpath, this.options);
        const dest = $9xlVa$fs.createWriteStream(fullpath, this.options)// TODO: What should we do with errors here?
        .on("error", (err)=>$4d4c6a288dcf751e$var$debug(err)).on("close", ()=>$4d4c6a288dcf751e$var$debug("close", dest.path, dest.bytesWritten)).on("open", ()=>{
            $4d4c6a288dcf751e$var$debug("file open ok", fullpath);
            this.emit("open", fullpath);
            source.pipe(dest);
            // If rotation occured during the open operation then we immediately
            // start writing to a new PassThrough, begin opening the next file
            // and cleanup the previous source and dest once the source has drained.
            if (this.rotatedWhileOpening) {
                this._stream = new $4d4c6a288dcf751e$require$PassThrough();
                this._stream.setMaxListeners(30);
                this._rotateFile();
                this.rotatedWhileOpening = false;
                this._cleanupStream(dest);
                source.end();
            }
        });
        $4d4c6a288dcf751e$var$debug("create stream ok", fullpath);
        if (this.zippedArchive) {
            const gzip = $9xlVa$zlib.createGzip();
            gzip.pipe(dest);
            return gzip;
        }
        return dest;
    }
    /**
   * TODO: add method description.
   * @param {function} callback - TODO: add param description.
   * @returns {undefined}
   */ _incFile(callback) {
        $4d4c6a288dcf751e$var$debug("_incFile", this.filename);
        const ext = $9xlVa$path.extname(this._basename);
        const basename = $9xlVa$path.basename(this._basename, ext);
        if (!this.tailable) {
            this._created += 1;
            this._checkMaxFilesIncrementing(ext, basename, callback);
        } else this._checkMaxFilesTailable(ext, basename, callback);
    }
    /**
   * Gets the next filename to use for this instance in the case that log
   * filesizes are being capped.
   * @returns {string} - TODO: add return description.
   * @private
   */ _getFile() {
        const ext = $9xlVa$path.extname(this._basename);
        const basename = $9xlVa$path.basename(this._basename, ext);
        const isRotation = this.rotationFormat ? this.rotationFormat() : this._created;
        // Caveat emptor (indexzero): rotationFormat() was broken by design When
        // combined with max files because the set of files to unlink is never
        // stored.
        const target = !this.tailable && this._created ? `${basename}${isRotation}${ext}` : `${basename}${ext}`;
        return this.zippedArchive && !this.tailable ? `${target}.gz` : target;
    }
    /**
   * Increment the number of files created or checked by this instance.
   * @param {mixed} ext - TODO: add param description.
   * @param {mixed} basename - TODO: add param description.
   * @param {mixed} callback - TODO: add param description.
   * @returns {undefined}
   * @private
   */ _checkMaxFilesIncrementing(ext, basename, callback) {
        // Check for maxFiles option and delete file.
        if (!this.maxFiles || this._created < this.maxFiles) return setImmediate(callback);
        const oldest = this._created - this.maxFiles;
        const isOldest = oldest !== 0 ? oldest : "";
        const isZipped = this.zippedArchive ? ".gz" : "";
        const filePath = `${basename}${isOldest}${ext}${isZipped}`;
        const target = $9xlVa$path.join(this.dirname, filePath);
        $9xlVa$fs.unlink(target, callback);
    }
    /**
   * Roll files forward based on integer, up to maxFiles. e.g. if base if
   * file.log and it becomes oversized, roll to file1.log, and allow file.log
   * to be re-used. If file is oversized again, roll file1.log to file2.log,
   * roll file.log to file1.log, and so on.
   * @param {mixed} ext - TODO: add param description.
   * @param {mixed} basename - TODO: add param description.
   * @param {mixed} callback - TODO: add param description.
   * @returns {undefined}
   * @private
   */ _checkMaxFilesTailable(ext, basename, callback) {
        const tasks = [];
        if (!this.maxFiles) return;
        // const isZipped = this.zippedArchive ? '.gz' : '';
        const isZipped = this.zippedArchive ? ".gz" : "";
        for(let x = this.maxFiles - 1; x > 1; x--)tasks.push((function(i, cb) {
            let fileName = `${basename}${i - 1}${ext}${isZipped}`;
            const tmppath = $9xlVa$path.join(this.dirname, fileName);
            $9xlVa$fs.exists(tmppath, (exists)=>{
                if (!exists) return cb(null);
                fileName = `${basename}${i}${ext}${isZipped}`;
                $9xlVa$fs.rename(tmppath, $9xlVa$path.join(this.dirname, fileName), cb);
            });
        }).bind(this, x));
        $grsN5(tasks, ()=>{
            $9xlVa$fs.rename($9xlVa$path.join(this.dirname, `${basename}${ext}`), $9xlVa$path.join(this.dirname, `${basename}1${ext}${isZipped}`), callback);
        });
    }
    _createLogDirIfNotExist(dirPath) {
        /* eslint-disable no-sync */ if (!$9xlVa$fs.existsSync(dirPath)) $9xlVa$fs.mkdirSync(dirPath, {
            recursive: true
        });
    /* eslint-enable no-sync */ }
};

});
parcelRequire.register("grsN5", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = $bf8580342154e558$var$series;

var $9DhkQ = parcelRequire("9DhkQ");
var $bf8580342154e558$var$_parallel3 = $bf8580342154e558$var$_interopRequireDefault($9DhkQ);

var $fr6cV = parcelRequire("fr6cV");
var $bf8580342154e558$var$_eachOfSeries2 = $bf8580342154e558$var$_interopRequireDefault($fr6cV);
function $bf8580342154e558$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Run the functions in the `tasks` collection in series, each one running once
 * the previous function has completed. If any functions in the series pass an
 * error to its callback, no more functions are run, and `callback` is
 * immediately called with the value of the error. Otherwise, `callback`
 * receives an array of results when `tasks` have completed.
 *
 * It is also possible to use an object instead of an array. Each property will
 * be run as a function, and the results will be passed to the final `callback`
 * as an object instead of an array. This can be a more readable way of handling
 *  results from {@link async.series}.
 *
 * **Note** that while many implementations preserve the order of object
 * properties, the [ECMAScript Language Specification](http://www.ecma-international.org/ecma-262/5.1/#sec-8.6)
 * explicitly states that
 *
 * > The mechanics and order of enumerating the properties is not specified.
 *
 * So if you rely on the order in which your series of functions are executed,
 * and want this to work on all platforms, consider using an array.
 *
 * @name series
 * @static
 * @memberOf module:ControlFlow
 * @method
 * @category Control Flow
 * @param {Array|Iterable|AsyncIterable|Object} tasks - A collection containing
 * [async functions]{@link AsyncFunction} to run in series.
 * Each function can complete with any number of optional `result` values.
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This function gets a results array (or object)
 * containing all the result arguments passed to the `task` callbacks. Invoked
 * with (err, result).
 * @return {Promise} a promise, if no callback is passed
 * @example
 *
 * //Using Callbacks
 * async.series([
 *     function(callback) {
 *         setTimeout(function() {
 *             // do some async task
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             // then do another async task
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ], function(err, results) {
 *     console.log(results);
 *     // results is equal to ['one','two']
 * });
 *
 * // an example using objects instead of arrays
 * async.series({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             // do some async task
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             // then do another async task
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }, function(err, results) {
 *     console.log(results);
 *     // results is equal to: { one: 1, two: 2 }
 * });
 *
 * //Using Promises
 * async.series([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ]).then(results => {
 *     console.log(results);
 *     // results is equal to ['one','two']
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * // an example using an object instead of an array
 * async.series({
 *     one: function(callback) {
 *         setTimeout(function() {
 *             // do some async task
 *             callback(null, 1);
 *         }, 200);
 *     },
 *     two: function(callback) {
 *         setTimeout(function() {
 *             // then do another async task
 *             callback(null, 2);
 *         }, 100);
 *     }
 * }).then(results => {
 *     console.log(results);
 *     // results is equal to: { one: 1, two: 2 }
 * }).catch(err => {
 *     console.log(err);
 * });
 *
 * //Using async/await
 * async () => {
 *     try {
 *         let results = await async.series([
 *             function(callback) {
 *                 setTimeout(function() {
 *                     // do some async task
 *                     callback(null, 'one');
 *                 }, 200);
 *             },
 *             function(callback) {
 *                 setTimeout(function() {
 *                     // then do another async task
 *                     callback(null, 'two');
 *                 }, 100);
 *             }
 *         ]);
 *         console.log(results);
 *         // results is equal to ['one','two']
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * // an example using an object instead of an array
 * async () => {
 *     try {
 *         let results = await async.parallel({
 *             one: function(callback) {
 *                 setTimeout(function() {
 *                     // do some async task
 *                     callback(null, 1);
 *                 }, 200);
 *             },
 *            two: function(callback) {
 *                 setTimeout(function() {
 *                     // then do another async task
 *                     callback(null, 2);
 *                 }, 100);
 *            }
 *         });
 *         console.log(results);
 *         // results is equal to: { one: 1, two: 2 }
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 */ function $bf8580342154e558$var$series(tasks, callback) {
    return (0, $bf8580342154e558$var$_parallel3.default)($bf8580342154e558$var$_eachOfSeries2.default, tasks, callback);
}
module.exports = module.exports["default"];

});
parcelRequire.register("9DhkQ", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

var $eN7vK = parcelRequire("eN7vK");
var $703533f9f23e2dd6$var$_isArrayLike2 = $703533f9f23e2dd6$var$_interopRequireDefault($eN7vK);

var $48jUl = parcelRequire("48jUl");
var $703533f9f23e2dd6$var$_wrapAsync2 = $703533f9f23e2dd6$var$_interopRequireDefault($48jUl);

var $h0nmz = parcelRequire("h0nmz");
var $703533f9f23e2dd6$var$_awaitify2 = $703533f9f23e2dd6$var$_interopRequireDefault($h0nmz);
function $703533f9f23e2dd6$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
module.exports.default = (0, $703533f9f23e2dd6$var$_awaitify2.default)((eachfn, tasks, callback)=>{
    var results = (0, $703533f9f23e2dd6$var$_isArrayLike2.default)(tasks) ? [] : {};
    eachfn(tasks, (task, key, taskCb)=>{
        (0, $703533f9f23e2dd6$var$_wrapAsync2.default)(task)((err, ...result)=>{
            if (result.length < 2) [result] = result;
            results[key] = result;
            taskCb(err);
        });
    }, (err)=>callback(err, results));
}, 3);
module.exports = module.exports["default"];

});
parcelRequire.register("eN7vK", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = $02c76928aec553c4$var$isArrayLike;
function $02c76928aec553c4$var$isArrayLike(value) {
    return value && typeof value.length === "number" && value.length >= 0 && value.length % 1 === 0;
}
module.exports = module.exports["default"];

});

parcelRequire.register("48jUl", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.isAsyncIterable = module.exports.isAsyncGenerator = module.exports.isAsync = undefined;

var $gF7NT = parcelRequire("gF7NT");
var $30275a135cf4443c$var$_asyncify2 = $30275a135cf4443c$var$_interopRequireDefault($gF7NT);
function $30275a135cf4443c$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function $30275a135cf4443c$var$isAsync(fn) {
    return fn[Symbol.toStringTag] === "AsyncFunction";
}
function $30275a135cf4443c$var$isAsyncGenerator(fn) {
    return fn[Symbol.toStringTag] === "AsyncGenerator";
}
function $30275a135cf4443c$var$isAsyncIterable(obj) {
    return typeof obj[Symbol.asyncIterator] === "function";
}
function $30275a135cf4443c$var$wrapAsync(asyncFn) {
    if (typeof asyncFn !== "function") throw new Error("expected a function");
    return $30275a135cf4443c$var$isAsync(asyncFn) ? (0, $30275a135cf4443c$var$_asyncify2.default)(asyncFn) : asyncFn;
}
module.exports.default = $30275a135cf4443c$var$wrapAsync;
module.exports.isAsync = $30275a135cf4443c$var$isAsync;
module.exports.isAsyncGenerator = $30275a135cf4443c$var$isAsyncGenerator;
module.exports.isAsyncIterable = $30275a135cf4443c$var$isAsyncIterable;

});
parcelRequire.register("gF7NT", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = $c2168758cce8c3ab$var$asyncify;

var $ewdgt = parcelRequire("ewdgt");
var $c2168758cce8c3ab$var$_initialParams2 = $c2168758cce8c3ab$var$_interopRequireDefault($ewdgt);

var $bwF2K = parcelRequire("bwF2K");
var $c2168758cce8c3ab$var$_setImmediate2 = $c2168758cce8c3ab$var$_interopRequireDefault($bwF2K);

var $48jUl = parcelRequire("48jUl");
function $c2168758cce8c3ab$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Take a sync function and make it async, passing its return value to a
 * callback. This is useful for plugging sync functions into a waterfall,
 * series, or other async functions. Any arguments passed to the generated
 * function will be passed to the wrapped function (except for the final
 * callback argument). Errors thrown will be passed to the callback.
 *
 * If the function passed to `asyncify` returns a Promise, that promises's
 * resolved/rejected state will be used to call the callback, rather than simply
 * the synchronous return value.
 *
 * This also means you can asyncify ES2017 `async` functions.
 *
 * @name asyncify
 * @static
 * @memberOf module:Utils
 * @method
 * @alias wrapSync
 * @category Util
 * @param {Function} func - The synchronous function, or Promise-returning
 * function to convert to an {@link AsyncFunction}.
 * @returns {AsyncFunction} An asynchronous wrapper of the `func`. To be
 * invoked with `(args..., callback)`.
 * @example
 *
 * // passing a regular synchronous function
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(JSON.parse),
 *     function (data, next) {
 *         // data is the result of parsing the text.
 *         // If there was a parsing error, it would have been caught.
 *     }
 * ], callback);
 *
 * // passing a function returning a promise
 * async.waterfall([
 *     async.apply(fs.readFile, filename, "utf8"),
 *     async.asyncify(function (contents) {
 *         return db.model.create(contents);
 *     }),
 *     function (model, next) {
 *         // `model` is the instantiated model object.
 *         // If there was an error, this function would be skipped.
 *     }
 * ], callback);
 *
 * // es2017 example, though `asyncify` is not needed if your JS environment
 * // supports async functions out of the box
 * var q = async.queue(async.asyncify(async function(file) {
 *     var intermediateStep = await processFile(file);
 *     return await somePromise(intermediateStep)
 * }));
 *
 * q.push(files);
 */ function $c2168758cce8c3ab$var$asyncify(func) {
    if ((0, $48jUl.isAsync)(func)) return function(...args /*, callback*/ ) {
        const callback = args.pop();
        const promise = func.apply(this, args);
        return $c2168758cce8c3ab$var$handlePromise(promise, callback);
    };
    return (0, $c2168758cce8c3ab$var$_initialParams2.default)(function(args, callback) {
        var result;
        try {
            result = func.apply(this, args);
        } catch (e) {
            return callback(e);
        }
        // if result is Promise object
        if (result && typeof result.then === "function") return $c2168758cce8c3ab$var$handlePromise(result, callback);
        else callback(null, result);
    });
}
function $c2168758cce8c3ab$var$handlePromise(promise, callback) {
    return promise.then((value)=>{
        $c2168758cce8c3ab$var$invokeCallback(callback, null, value);
    }, (err)=>{
        $c2168758cce8c3ab$var$invokeCallback(callback, err && err.message ? err : new Error(err));
    });
}
function $c2168758cce8c3ab$var$invokeCallback(callback, error, value) {
    try {
        callback(error, value);
    } catch (err) {
        (0, $c2168758cce8c3ab$var$_setImmediate2.default)((e)=>{
            throw e;
        }, err);
    }
}
module.exports = module.exports["default"];

});
parcelRequire.register("ewdgt", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = function(fn) {
    return function(...args /*, callback*/ ) {
        var callback = args.pop();
        return fn.call(this, args, callback);
    };
};
module.exports = module.exports["default"];

});

parcelRequire.register("bwF2K", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.fallback = $864285339b682055$var$fallback;
module.exports.wrap = $864285339b682055$var$wrap;
/* istanbul ignore file */ var $864285339b682055$var$hasQueueMicrotask = module.exports.hasQueueMicrotask = typeof queueMicrotask === "function" && queueMicrotask;
var $864285339b682055$var$hasSetImmediate = module.exports.hasSetImmediate = typeof setImmediate === "function" && setImmediate;
var $864285339b682055$var$hasNextTick = module.exports.hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
function $864285339b682055$var$fallback(fn) {
    setTimeout(fn, 0);
}
function $864285339b682055$var$wrap(defer) {
    return (fn, ...args)=>defer(()=>fn(...args));
}
var $864285339b682055$var$_defer;
if ($864285339b682055$var$hasQueueMicrotask) $864285339b682055$var$_defer = queueMicrotask;
else if ($864285339b682055$var$hasSetImmediate) $864285339b682055$var$_defer = setImmediate;
else if ($864285339b682055$var$hasNextTick) $864285339b682055$var$_defer = process.nextTick;
else $864285339b682055$var$_defer = $864285339b682055$var$fallback;
module.exports.default = $864285339b682055$var$wrap($864285339b682055$var$_defer);

});



parcelRequire.register("h0nmz", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = $c6148f2d83286322$var$awaitify;
// conditionally promisify a function.
// only return a promise if a callback is omitted
function $c6148f2d83286322$var$awaitify(asyncFn, arity = asyncFn.length) {
    if (!arity) throw new Error("arity is undefined");
    function awaitable(...args) {
        if (typeof args[arity - 1] === "function") return asyncFn.apply(this, args);
        return new Promise((resolve, reject)=>{
            args[arity - 1] = (err, ...cbArgs)=>{
                if (err) return reject(err);
                resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
            };
            asyncFn.apply(this, args);
        });
    }
    return awaitable;
}
module.exports = module.exports["default"];

});


parcelRequire.register("fr6cV", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

var $a9GrO = parcelRequire("a9GrO");
var $b3ce315166b0649e$var$_eachOfLimit2 = $b3ce315166b0649e$var$_interopRequireDefault($a9GrO);

var $h0nmz = parcelRequire("h0nmz");
var $b3ce315166b0649e$var$_awaitify2 = $b3ce315166b0649e$var$_interopRequireDefault($h0nmz);
function $b3ce315166b0649e$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs only a single async operation at a time.
 *
 * @name eachOfSeries
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfSeries
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to each item in
 * `coll`.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all `iteratee`
 * functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */ function $b3ce315166b0649e$var$eachOfSeries(coll, iteratee, callback) {
    return (0, $b3ce315166b0649e$var$_eachOfLimit2.default)(coll, 1, iteratee, callback);
}
module.exports.default = (0, $b3ce315166b0649e$var$_awaitify2.default)($b3ce315166b0649e$var$eachOfSeries, 3);
module.exports = module.exports["default"];

});
parcelRequire.register("a9GrO", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

var $dh7ai = parcelRequire("dh7ai");
var $764babd3dc8e254b$var$_eachOfLimit3 = $764babd3dc8e254b$var$_interopRequireDefault($dh7ai);

var $48jUl = parcelRequire("48jUl");
var $764babd3dc8e254b$var$_wrapAsync2 = $764babd3dc8e254b$var$_interopRequireDefault($48jUl);

var $h0nmz = parcelRequire("h0nmz");
var $764babd3dc8e254b$var$_awaitify2 = $764babd3dc8e254b$var$_interopRequireDefault($h0nmz);
function $764babd3dc8e254b$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * The same as [`eachOf`]{@link module:Collections.eachOf} but runs a maximum of `limit` async operations at a
 * time.
 *
 * @name eachOfLimit
 * @static
 * @memberOf module:Collections
 * @method
 * @see [async.eachOf]{@link module:Collections.eachOf}
 * @alias forEachOfLimit
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {number} limit - The maximum number of async operations at a time.
 * @param {AsyncFunction} iteratee - An async function to apply to each
 * item in `coll`. The `key` is the item's key, or index in the case of an
 * array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 */ function $764babd3dc8e254b$var$eachOfLimit(coll, limit, iteratee, callback) {
    return (0, $764babd3dc8e254b$var$_eachOfLimit3.default)(limit)(coll, (0, $764babd3dc8e254b$var$_wrapAsync2.default)(iteratee), callback);
}
module.exports.default = (0, $764babd3dc8e254b$var$_awaitify2.default)($764babd3dc8e254b$var$eachOfLimit, 4);
module.exports = module.exports["default"];

});
parcelRequire.register("dh7ai", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

var $fQRVj = parcelRequire("fQRVj");
var $9aa26bb682ffc673$var$_once2 = $9aa26bb682ffc673$var$_interopRequireDefault($fQRVj);

var $7iYVN = parcelRequire("7iYVN");
var $9aa26bb682ffc673$var$_iterator2 = $9aa26bb682ffc673$var$_interopRequireDefault($7iYVN);

var $4449u = parcelRequire("4449u");
var $9aa26bb682ffc673$var$_onlyOnce2 = $9aa26bb682ffc673$var$_interopRequireDefault($4449u);

var $48jUl = parcelRequire("48jUl");

var $8AEmv = parcelRequire("8AEmv");
var $9aa26bb682ffc673$var$_asyncEachOfLimit2 = $9aa26bb682ffc673$var$_interopRequireDefault($8AEmv);

var $hf5KC = parcelRequire("hf5KC");
var $9aa26bb682ffc673$var$_breakLoop2 = $9aa26bb682ffc673$var$_interopRequireDefault($hf5KC);
function $9aa26bb682ffc673$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
module.exports.default = (limit)=>{
    return (obj, iteratee, callback)=>{
        callback = (0, $9aa26bb682ffc673$var$_once2.default)(callback);
        if (limit <= 0) throw new RangeError("concurrency limit cannot be less than 1");
        if (!obj) return callback(null);
        if ((0, $48jUl.isAsyncGenerator)(obj)) return (0, $9aa26bb682ffc673$var$_asyncEachOfLimit2.default)(obj, limit, iteratee, callback);
        if ((0, $48jUl.isAsyncIterable)(obj)) return (0, $9aa26bb682ffc673$var$_asyncEachOfLimit2.default)(obj[Symbol.asyncIterator](), limit, iteratee, callback);
        var nextElem = (0, $9aa26bb682ffc673$var$_iterator2.default)(obj);
        var done = false;
        var canceled = false;
        var running = 0;
        var looping = false;
        function iterateeCallback(err, value) {
            if (canceled) return;
            running -= 1;
            if (err) {
                done = true;
                callback(err);
            } else if (err === false) {
                done = true;
                canceled = true;
            } else if (value === $9aa26bb682ffc673$var$_breakLoop2.default || done && running <= 0) {
                done = true;
                return callback(null);
            } else if (!looping) replenish();
        }
        function replenish() {
            looping = true;
            while(running < limit && !done){
                var elem = nextElem();
                if (elem === null) {
                    done = true;
                    if (running <= 0) callback(null);
                    return;
                }
                running += 1;
                iteratee(elem.value, elem.key, (0, $9aa26bb682ffc673$var$_onlyOnce2.default)(iterateeCallback));
            }
            looping = false;
        }
        replenish();
    };
};
module.exports = module.exports["default"];

});
parcelRequire.register("fQRVj", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = $b8a58a62636dd8f2$var$once;
function $b8a58a62636dd8f2$var$once(fn) {
    function wrapper(...args) {
        if (fn === null) return;
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
    }
    Object.assign(wrapper, fn);
    return wrapper;
}
module.exports = module.exports["default"];

});

parcelRequire.register("7iYVN", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = $55197a847e5a7bd1$var$createIterator;

var $eN7vK = parcelRequire("eN7vK");
var $55197a847e5a7bd1$var$_isArrayLike2 = $55197a847e5a7bd1$var$_interopRequireDefault($eN7vK);

var $iykOE = parcelRequire("iykOE");
var $55197a847e5a7bd1$var$_getIterator2 = $55197a847e5a7bd1$var$_interopRequireDefault($iykOE);
function $55197a847e5a7bd1$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function $55197a847e5a7bd1$var$createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
        return ++i < len ? {
            value: coll[i],
            key: i
        } : null;
    };
}
function $55197a847e5a7bd1$var$createES2015Iterator(iterator) {
    var i = -1;
    return function next() {
        var item = iterator.next();
        if (item.done) return null;
        i++;
        return {
            value: item.value,
            key: i
        };
    };
}
function $55197a847e5a7bd1$var$createObjectIterator(obj) {
    var okeys = obj ? Object.keys(obj) : [];
    var i = -1;
    var len = okeys.length;
    return function next() {
        var key = okeys[++i];
        if (key === "__proto__") return next();
        return i < len ? {
            value: obj[key],
            key: key
        } : null;
    };
}
function $55197a847e5a7bd1$var$createIterator(coll) {
    if ((0, $55197a847e5a7bd1$var$_isArrayLike2.default)(coll)) return $55197a847e5a7bd1$var$createArrayIterator(coll);
    var iterator = (0, $55197a847e5a7bd1$var$_getIterator2.default)(coll);
    return iterator ? $55197a847e5a7bd1$var$createES2015Iterator(iterator) : $55197a847e5a7bd1$var$createObjectIterator(coll);
}
module.exports = module.exports["default"];

});
parcelRequire.register("iykOE", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = function(coll) {
    return coll[Symbol.iterator] && coll[Symbol.iterator]();
};
module.exports = module.exports["default"];

});


parcelRequire.register("4449u", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = $2f5ac1a9fcf9f54f$var$onlyOnce;
function $2f5ac1a9fcf9f54f$var$onlyOnce(fn) {
    return function(...args) {
        if (fn === null) throw new Error("Callback was already called.");
        var callFn = fn;
        fn = null;
        callFn.apply(this, args);
    };
}
module.exports = module.exports["default"];

});

parcelRequire.register("8AEmv", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = $6410fe8eff6a6e74$var$asyncEachOfLimit;

var $hf5KC = parcelRequire("hf5KC");
var $6410fe8eff6a6e74$var$_breakLoop2 = $6410fe8eff6a6e74$var$_interopRequireDefault($hf5KC);
function $6410fe8eff6a6e74$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// for async generators
function $6410fe8eff6a6e74$var$asyncEachOfLimit(generator, limit, iteratee, callback) {
    let done = false;
    let canceled = false;
    let awaiting = false;
    let running = 0;
    let idx = 0;
    function replenish() {
        //console.log('replenish')
        if (running >= limit || awaiting || done) return;
        //console.log('replenish awaiting')
        awaiting = true;
        generator.next().then(({ value: value , done: iterDone  })=>{
            //console.log('got value', value)
            if (canceled || done) return;
            awaiting = false;
            if (iterDone) {
                done = true;
                if (running <= 0) //console.log('done nextCb')
                callback(null);
                return;
            }
            running++;
            iteratee(value, idx, iterateeCallback);
            idx++;
            replenish();
        }).catch(handleError);
    }
    function iterateeCallback(err, result) {
        //console.log('iterateeCallback')
        running -= 1;
        if (canceled) return;
        if (err) return handleError(err);
        if (err === false) {
            done = true;
            canceled = true;
            return;
        }
        if (result === $6410fe8eff6a6e74$var$_breakLoop2.default || done && running <= 0) {
            done = true;
            //console.log('done iterCb')
            return callback(null);
        }
        replenish();
    }
    function handleError(err) {
        if (canceled) return;
        awaiting = false;
        done = true;
        callback(err);
    }
    replenish();
}
module.exports = module.exports["default"];

});
parcelRequire.register("hf5KC", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
// A temporary value used to identify if the loop should be broken.
// See #1064, #1293
const $c8d84c5eba59b535$var$breakLoop = {};
module.exports.default = $c8d84c5eba59b535$var$breakLoop;
module.exports = module.exports["default"];

});






parcelRequire.register("cOGCw", function(module, exports) {








if (process.env.READABLE_STREAM === "disable" && $9xlVa$stream) {
    module.exports = $9xlVa$stream.Readable;
    Object.assign(module.exports, $9xlVa$stream);
    module.exports.Stream = $9xlVa$stream;
} else {
    exports = module.exports = (parcelRequire("4ypXz"));
    exports.Stream = $9xlVa$stream || exports;
    exports.Readable = exports;
    exports.Writable = (parcelRequire("1oME0"));
    exports.Duplex = (parcelRequire("erzCT"));
    exports.Transform = (parcelRequire("10d01"));
    exports.PassThrough = (parcelRequire("3QQUw"));
    exports.finished = (parcelRequire("dOEcF"));
    exports.pipeline = (parcelRequire("1WSSx"));
}

});
parcelRequire.register("10d01", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
"use strict";
module.exports = $0bafdfe96ad72ff5$var$Transform;

var $g4f1y = parcelRequire("g4f1y");
var $0bafdfe96ad72ff5$require$_require$codes = $g4f1y.codes;
var $0bafdfe96ad72ff5$var$ERR_METHOD_NOT_IMPLEMENTED = $0bafdfe96ad72ff5$require$_require$codes.ERR_METHOD_NOT_IMPLEMENTED, $0bafdfe96ad72ff5$var$ERR_MULTIPLE_CALLBACK = $0bafdfe96ad72ff5$require$_require$codes.ERR_MULTIPLE_CALLBACK, $0bafdfe96ad72ff5$var$ERR_TRANSFORM_ALREADY_TRANSFORMING = $0bafdfe96ad72ff5$require$_require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING, $0bafdfe96ad72ff5$var$ERR_TRANSFORM_WITH_LENGTH_0 = $0bafdfe96ad72ff5$require$_require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var $erzCT = parcelRequire("erzCT");

(parcelRequire("eNM4u"))($0bafdfe96ad72ff5$var$Transform, $erzCT);
function $0bafdfe96ad72ff5$var$afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) return this.emit("error", new $0bafdfe96ad72ff5$var$ERR_MULTIPLE_CALLBACK());
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null) this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
}
function $0bafdfe96ad72ff5$var$Transform(options) {
    if (!(this instanceof $0bafdfe96ad72ff5$var$Transform)) return new $0bafdfe96ad72ff5$var$Transform(options);
    $erzCT.call(this, options);
    this._transformState = {
        afterTransform: $0bafdfe96ad72ff5$var$afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
    }; // start out asking for a readable event once data is transformed.
    this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
    // that Readable wants before the first _read call, so unset the
    // sync guard flag.
    this._readableState.sync = false;
    if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
    } // When the writable side finishes, then flush out anything remaining.
    this.on("prefinish", $0bafdfe96ad72ff5$var$prefinish);
}
function $0bafdfe96ad72ff5$var$prefinish() {
    var _this = this;
    if (typeof this._flush === "function" && !this._readableState.destroyed) this._flush(function(er, data) {
        $0bafdfe96ad72ff5$var$done(_this, er, data);
    });
    else $0bafdfe96ad72ff5$var$done(this, null, null);
}
$0bafdfe96ad72ff5$var$Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return $erzCT.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
$0bafdfe96ad72ff5$var$Transform.prototype._transform = function(chunk, encoding, cb) {
    cb(new $0bafdfe96ad72ff5$var$ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
};
$0bafdfe96ad72ff5$var$Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
    }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
$0bafdfe96ad72ff5$var$Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
};
$0bafdfe96ad72ff5$var$Transform.prototype._destroy = function(err, cb) {
    $erzCT.prototype._destroy.call(this, err, function(err2) {
        cb(err2);
    });
};
function $0bafdfe96ad72ff5$var$done(stream, er, data) {
    if (er) return stream.emit("error", er);
    if (data != null) stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
    // if there's nothing in the write buffer, then that means
    // that nothing more will ever be provided
    if (stream._writableState.length) throw new $0bafdfe96ad72ff5$var$ERR_TRANSFORM_WITH_LENGTH_0();
    if (stream._transformState.transforming) throw new $0bafdfe96ad72ff5$var$ERR_TRANSFORM_ALREADY_TRANSFORMING();
    return stream.push(null);
}

});

parcelRequire.register("3QQUw", function(module, exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
"use strict";
module.exports = $2cdf4560a7d55fee$var$PassThrough;

var $10d01 = parcelRequire("10d01");

(parcelRequire("eNM4u"))($2cdf4560a7d55fee$var$PassThrough, $10d01);
function $2cdf4560a7d55fee$var$PassThrough(options) {
    if (!(this instanceof $2cdf4560a7d55fee$var$PassThrough)) return new $2cdf4560a7d55fee$var$PassThrough(options);
    $10d01.call(this, options);
}
$2cdf4560a7d55fee$var$PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
};

});

parcelRequire.register("1WSSx", function(module, exports) {
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
"use strict";
var $16b5c6fe1b219d04$var$eos;
function $16b5c6fe1b219d04$var$once(callback) {
    var called = false;
    return function() {
        if (called) return;
        called = true;
        callback.apply(void 0, arguments);
    };
}

var $g4f1y = parcelRequire("g4f1y");
var $16b5c6fe1b219d04$require$_require$codes = $g4f1y.codes;
var $16b5c6fe1b219d04$var$ERR_MISSING_ARGS = $16b5c6fe1b219d04$require$_require$codes.ERR_MISSING_ARGS, $16b5c6fe1b219d04$var$ERR_STREAM_DESTROYED = $16b5c6fe1b219d04$require$_require$codes.ERR_STREAM_DESTROYED;
function $16b5c6fe1b219d04$var$noop(err) {
    // Rethrow the error if it exists to avoid swallowing it
    if (err) throw err;
}
function $16b5c6fe1b219d04$var$isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
}

function $16b5c6fe1b219d04$var$destroyer(stream, reading, writing, callback) {
    callback = $16b5c6fe1b219d04$var$once(callback);
    var closed = false;
    stream.on("close", function() {
        closed = true;
    });
    if ($16b5c6fe1b219d04$var$eos === undefined) $16b5c6fe1b219d04$var$eos = (parcelRequire("dOEcF"));
    $16b5c6fe1b219d04$var$eos(stream, {
        readable: reading,
        writable: writing
    }, function(err) {
        if (err) return callback(err);
        closed = true;
        callback();
    });
    var destroyed = false;
    return function(err) {
        if (closed) return;
        if (destroyed) return;
        destroyed = true; // request.destroy just do .end - .abort is what we want
        if ($16b5c6fe1b219d04$var$isRequest(stream)) return stream.abort();
        if (typeof stream.destroy === "function") return stream.destroy();
        callback(err || new $16b5c6fe1b219d04$var$ERR_STREAM_DESTROYED("pipe"));
    };
}
function $16b5c6fe1b219d04$var$call(fn) {
    fn();
}
function $16b5c6fe1b219d04$var$pipe(from, to) {
    return from.pipe(to);
}
function $16b5c6fe1b219d04$var$popCallback(streams) {
    if (!streams.length) return $16b5c6fe1b219d04$var$noop;
    if (typeof streams[streams.length - 1] !== "function") return $16b5c6fe1b219d04$var$noop;
    return streams.pop();
}
function $16b5c6fe1b219d04$var$pipeline() {
    for(var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++)streams[_key] = arguments[_key];
    var callback = $16b5c6fe1b219d04$var$popCallback(streams);
    if (Array.isArray(streams[0])) streams = streams[0];
    if (streams.length < 2) throw new $16b5c6fe1b219d04$var$ERR_MISSING_ARGS("streams");
    var error;
    var destroys = streams.map(function(stream, i) {
        var reading = i < streams.length - 1;
        var writing = i > 0;
        return $16b5c6fe1b219d04$var$destroyer(stream, reading, writing, function(err) {
            if (!error) error = err;
            if (err) destroys.forEach($16b5c6fe1b219d04$var$call);
            if (reading) return;
            destroys.forEach($16b5c6fe1b219d04$var$call);
            callback(error);
        });
    });
    return streams.reduce($16b5c6fe1b219d04$var$pipe);
}
module.exports = $16b5c6fe1b219d04$var$pipeline;

});


parcelRequire.register("dJEkP", function(module, exports) {


//
// Select the correct build version depending on the environment.
//
if (process.env.NODE_ENV === "production") module.exports = (parcelRequire("6nEJJ"));
else module.exports = (parcelRequire("cLKU3"));

});
parcelRequire.register("6nEJJ", function(module, exports) {

var $k9DIW = parcelRequire("k9DIW");
/**
 * Create a new diagnostics logger.
 *
 * @param {String} namespace The namespace it should enable.
 * @param {Object} options Additional options.
 * @returns {Function} The logger.
 * @public
 */ var $4a547d7e3cc423e3$var$diagnostics = $k9DIW(function prod(namespace, options) {
    options = options || {};
    options.namespace = namespace;
    options.prod = true;
    options.dev = false;
    if (!(options.force || prod.force)) return prod.nope(options);
    return prod.yep(options);
});
//
// Expose the diagnostics logger.
//
module.exports = $4a547d7e3cc423e3$var$diagnostics;

});
parcelRequire.register("k9DIW", function(module, exports) {
/**
 * Contains all configured adapters for the given environment.
 *
 * @type {Array}
 * @public
 */ var $eac376427beb60e9$var$adapters = [];
/**
 * Contains all modifier functions.
 *
 * @typs {Array}
 * @public
 */ var $eac376427beb60e9$var$modifiers = [];
/**
 * Our default logger.
 *
 * @public
 */ var $eac376427beb60e9$var$logger = function devnull() {};
/**
 * Register a new adapter that will used to find environments.
 *
 * @param {Function} adapter A function that will return the possible env.
 * @returns {Boolean} Indication of a successful add.
 * @public
 */ function $eac376427beb60e9$var$use(adapter) {
    if (~$eac376427beb60e9$var$adapters.indexOf(adapter)) return false;
    $eac376427beb60e9$var$adapters.push(adapter);
    return true;
}
/**
 * Assign a new log method.
 *
 * @param {Function} custom The log method.
 * @public
 */ function $eac376427beb60e9$var$set(custom) {
    $eac376427beb60e9$var$logger = custom;
}
/**
 * Check if the namespace is allowed by any of our adapters.
 *
 * @param {String} namespace The namespace that needs to be enabled
 * @returns {Boolean|Promise} Indication if the namespace is enabled by our adapters.
 * @public
 */ function $eac376427beb60e9$var$enabled(namespace) {
    var async = [];
    for(var i = 0; i < $eac376427beb60e9$var$adapters.length; i++){
        if ($eac376427beb60e9$var$adapters[i].async) {
            async.push($eac376427beb60e9$var$adapters[i]);
            continue;
        }
        if ($eac376427beb60e9$var$adapters[i](namespace)) return true;
    }
    if (!async.length) return false;
    //
    // Now that we know that we Async functions, we know we run in an ES6
    // environment and can use all the API's that they offer, in this case
    // we want to return a Promise so that we can `await` in React-Native
    // for an async adapter.
    //
    return new Promise(function pinky(resolve) {
        Promise.all(async.map(function prebind(fn) {
            return fn(namespace);
        })).then(function resolved(values) {
            resolve(values.some(Boolean));
        });
    });
}
/**
 * Add a new message modifier to the debugger.
 *
 * @param {Function} fn Modification function.
 * @returns {Boolean} Indication of a successful add.
 * @public
 */ function $eac376427beb60e9$var$modify(fn) {
    if (~$eac376427beb60e9$var$modifiers.indexOf(fn)) return false;
    $eac376427beb60e9$var$modifiers.push(fn);
    return true;
}
/**
 * Write data to the supplied logger.
 *
 * @param {Object} meta Meta information about the log.
 * @param {Array} args Arguments for console.log.
 * @public
 */ function $eac376427beb60e9$var$write() {
    $eac376427beb60e9$var$logger.apply($eac376427beb60e9$var$logger, arguments);
}
/**
 * Process the message with the modifiers.
 *
 * @param {Mixed} message The message to be transformed by modifers.
 * @returns {String} Transformed message.
 * @public
 */ function $eac376427beb60e9$var$process(message) {
    for(var i = 0; i < $eac376427beb60e9$var$modifiers.length; i++)message = $eac376427beb60e9$var$modifiers[i].apply($eac376427beb60e9$var$modifiers[i], arguments);
    return message;
}
/**
 * Introduce options to the logger function.
 *
 * @param {Function} fn Calback function.
 * @param {Object} options Properties to introduce on fn.
 * @returns {Function} The passed function
 * @public
 */ function $eac376427beb60e9$var$introduce(fn, options) {
    var has = Object.prototype.hasOwnProperty;
    for(var key in options)if (has.call(options, key)) fn[key] = options[key];
    return fn;
}
/**
 * Nope, we're not allowed to write messages.
 *
 * @returns {Boolean} false
 * @public
 */ function $eac376427beb60e9$var$nope(options) {
    options.enabled = false;
    options.modify = $eac376427beb60e9$var$modify;
    options.set = $eac376427beb60e9$var$set;
    options.use = $eac376427beb60e9$var$use;
    return $eac376427beb60e9$var$introduce(function diagnopes() {
        return false;
    }, options);
}
/**
 * Yep, we're allowed to write debug messages.
 *
 * @param {Object} options The options for the process.
 * @returns {Function} The function that does the logging.
 * @public
 */ function $eac376427beb60e9$var$yep(options) {
    /**
   * The function that receives the actual debug information.
   *
   * @returns {Boolean} indication that we're logging.
   * @public
   */ function diagnostics() {
        var args = Array.prototype.slice.call(arguments, 0);
        $eac376427beb60e9$var$write.call($eac376427beb60e9$var$write, options, $eac376427beb60e9$var$process(args, options));
        return true;
    }
    options.enabled = true;
    options.modify = $eac376427beb60e9$var$modify;
    options.set = $eac376427beb60e9$var$set;
    options.use = $eac376427beb60e9$var$use;
    return $eac376427beb60e9$var$introduce(diagnostics, options);
}
/**
 * Simple helper function to introduce various of helper methods to our given
 * diagnostics function.
 *
 * @param {Function} diagnostics The diagnostics function.
 * @returns {Function} diagnostics
 * @public
 */ module.exports = function create(diagnostics) {
    diagnostics.introduce = $eac376427beb60e9$var$introduce;
    diagnostics.enabled = $eac376427beb60e9$var$enabled;
    diagnostics.process = $eac376427beb60e9$var$process;
    diagnostics.modify = $eac376427beb60e9$var$modify;
    diagnostics.write = $eac376427beb60e9$var$write;
    diagnostics.nope = $eac376427beb60e9$var$nope;
    diagnostics.yep = $eac376427beb60e9$var$yep;
    diagnostics.set = $eac376427beb60e9$var$set;
    diagnostics.use = $eac376427beb60e9$var$use;
    return diagnostics;
};

});


parcelRequire.register("cLKU3", function(module, exports) {

var $k9DIW = parcelRequire("k9DIW");

var $94be41cd68541057$var$tty = $9xlVa$tty.isatty(1);
/**
 * Create a new diagnostics logger.
 *
 * @param {String} namespace The namespace it should enable.
 * @param {Object} options Additional options.
 * @returns {Function} The logger.
 * @public
 */ var $94be41cd68541057$var$diagnostics = $k9DIW(function dev(namespace, options) {
    options = options || {};
    options.colors = "colors" in options ? options.colors : $94be41cd68541057$var$tty;
    options.namespace = namespace;
    options.prod = false;
    options.dev = true;
    if (!dev.enabled(namespace) && !(options.force || dev.force)) return dev.nope(options);
    return dev.yep(options);
});

//
// Configure the logger for the given environment.
//
$94be41cd68541057$var$diagnostics.modify((parcelRequire("fOUYR")));

$94be41cd68541057$var$diagnostics.use((parcelRequire("6NTxk")));

$94be41cd68541057$var$diagnostics.set((parcelRequire("s5QXZ")));
//
// Expose the diagnostics logger.
//
module.exports = $94be41cd68541057$var$diagnostics;

});
parcelRequire.register("fOUYR", function(module, exports) {

var $gxAuK = parcelRequire("gxAuK");

var $5pk8Q = parcelRequire("5pk8Q");
/**
 * Prefix the messages with a colored namespace.
 *
 * @param {Array} args The messages array that is getting written.
 * @param {Object} options Options for diagnostics.
 * @returns {Array} Altered messages array.
 * @public
 */ module.exports = function ansiModifier(args, options) {
    var namespace = options.namespace;
    var ansi = options.colors !== false ? $5pk8Q(namespace + ":", $gxAuK(namespace)) : namespace + ":";
    args[0] = ansi + " " + args[0];
    return args;
};

});
parcelRequire.register("gxAuK", function(module, exports) {
"use strict";

var $f6NED = parcelRequire("f6NED");

var $dT3Hi = parcelRequire("dT3Hi");
/**
 * Generate a color for a given name. But be reasonably smart about it by
 * understanding name spaces and coloring each namespace a bit lighter so they
 * still have the same base color as the root.
 *
 * @param {string} namespace The namespace
 * @param {string} [delimiter] The delimiter
 * @returns {string} color
 */ module.exports = function colorspace(namespace, delimiter) {
    var split = namespace.split(delimiter || ":");
    var base = $dT3Hi(split[0]);
    if (!split.length) return base;
    for(var i = 0, l = split.length - 1; i < l; i++)base = $f6NED(base).mix($f6NED($dT3Hi(split[i + 1]))).saturate(1).hex();
    return base;
};

});
parcelRequire.register("f6NED", function(module, exports) {
"use strict";

var $ajAvQ = parcelRequire("ajAvQ");

var $7hySK = parcelRequire("7hySK");
var $affdeee143336129$var$_slice = [].slice;
var $affdeee143336129$var$skippedModels = [
    // to be honest, I don't really feel like keyword belongs in color convert, but eh.
    "keyword",
    // gray conflicts with some method names, and has its own method defined.
    "gray",
    // shouldn't really be in color-convert either...
    "hex"
];
var $affdeee143336129$var$hashedModelKeys = {};
Object.keys($7hySK).forEach(function(model) {
    $affdeee143336129$var$hashedModelKeys[$affdeee143336129$var$_slice.call($7hySK[model].labels).sort().join("")] = model;
});
var $affdeee143336129$var$limiters = {};
function $affdeee143336129$var$Color(obj, model) {
    if (!(this instanceof $affdeee143336129$var$Color)) return new $affdeee143336129$var$Color(obj, model);
    if (model && model in $affdeee143336129$var$skippedModels) model = null;
    if (model && !(model in $7hySK)) throw new Error("Unknown model: " + model);
    var i;
    var channels;
    if (obj == null) {
        this.model = "rgb";
        this.color = [
            0,
            0,
            0
        ];
        this.valpha = 1;
    } else if (obj instanceof $affdeee143336129$var$Color) {
        this.model = obj.model;
        this.color = obj.color.slice();
        this.valpha = obj.valpha;
    } else if (typeof obj === "string") {
        var result = $ajAvQ.get(obj);
        if (result === null) throw new Error("Unable to parse color from string: " + obj);
        this.model = result.model;
        channels = $7hySK[this.model].channels;
        this.color = result.value.slice(0, channels);
        this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
    } else if (obj.length) {
        this.model = model || "rgb";
        channels = $7hySK[this.model].channels;
        var newArr = $affdeee143336129$var$_slice.call(obj, 0, channels);
        this.color = $affdeee143336129$var$zeroArray(newArr, channels);
        this.valpha = typeof obj[channels] === "number" ? obj[channels] : 1;
    } else if (typeof obj === "number") {
        // this is always RGB - can be converted later on.
        obj &= 0xFFFFFF;
        this.model = "rgb";
        this.color = [
            obj >> 16 & 0xFF,
            obj >> 8 & 0xFF,
            obj & 0xFF
        ];
        this.valpha = 1;
    } else {
        this.valpha = 1;
        var keys = Object.keys(obj);
        if ("alpha" in obj) {
            keys.splice(keys.indexOf("alpha"), 1);
            this.valpha = typeof obj.alpha === "number" ? obj.alpha : 0;
        }
        var hashedKeys = keys.sort().join("");
        if (!(hashedKeys in $affdeee143336129$var$hashedModelKeys)) throw new Error("Unable to parse color from object: " + JSON.stringify(obj));
        this.model = $affdeee143336129$var$hashedModelKeys[hashedKeys];
        var labels = $7hySK[this.model].labels;
        var color = [];
        for(i = 0; i < labels.length; i++)color.push(obj[labels[i]]);
        this.color = $affdeee143336129$var$zeroArray(color);
    }
    // perform limitations (clamping, etc.)
    if ($affdeee143336129$var$limiters[this.model]) {
        channels = $7hySK[this.model].channels;
        for(i = 0; i < channels; i++){
            var limit = $affdeee143336129$var$limiters[this.model][i];
            if (limit) this.color[i] = limit(this.color[i]);
        }
    }
    this.valpha = Math.max(0, Math.min(1, this.valpha));
    if (Object.freeze) Object.freeze(this);
}
$affdeee143336129$var$Color.prototype = {
    toString: function() {
        return this.string();
    },
    toJSON: function() {
        return this[this.model]();
    },
    string: function(places) {
        var self = this.model in $ajAvQ.to ? this : this.rgb();
        self = self.round(typeof places === "number" ? places : 1);
        var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return $ajAvQ.to[self.model](args);
    },
    percentString: function(places) {
        var self = this.rgb().round(typeof places === "number" ? places : 1);
        var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
        return $ajAvQ.to.rgb.percent(args);
    },
    array: function() {
        return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
    },
    object: function() {
        var result = {};
        var channels = $7hySK[this.model].channels;
        var labels = $7hySK[this.model].labels;
        for(var i = 0; i < channels; i++)result[labels[i]] = this.color[i];
        if (this.valpha !== 1) result.alpha = this.valpha;
        return result;
    },
    unitArray: function() {
        var rgb = this.rgb().color;
        rgb[0] /= 255;
        rgb[1] /= 255;
        rgb[2] /= 255;
        if (this.valpha !== 1) rgb.push(this.valpha);
        return rgb;
    },
    unitObject: function() {
        var rgb = this.rgb().object();
        rgb.r /= 255;
        rgb.g /= 255;
        rgb.b /= 255;
        if (this.valpha !== 1) rgb.alpha = this.valpha;
        return rgb;
    },
    round: function(places) {
        places = Math.max(places || 0, 0);
        return new $affdeee143336129$var$Color(this.color.map($affdeee143336129$var$roundToPlace(places)).concat(this.valpha), this.model);
    },
    alpha: function(val) {
        if (arguments.length) return new $affdeee143336129$var$Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
        return this.valpha;
    },
    // rgb
    red: $affdeee143336129$var$getset("rgb", 0, $affdeee143336129$var$maxfn(255)),
    green: $affdeee143336129$var$getset("rgb", 1, $affdeee143336129$var$maxfn(255)),
    blue: $affdeee143336129$var$getset("rgb", 2, $affdeee143336129$var$maxfn(255)),
    hue: $affdeee143336129$var$getset([
        "hsl",
        "hsv",
        "hsl",
        "hwb",
        "hcg"
    ], 0, function(val) {
        return (val % 360 + 360) % 360;
    }),
    saturationl: $affdeee143336129$var$getset("hsl", 1, $affdeee143336129$var$maxfn(100)),
    lightness: $affdeee143336129$var$getset("hsl", 2, $affdeee143336129$var$maxfn(100)),
    saturationv: $affdeee143336129$var$getset("hsv", 1, $affdeee143336129$var$maxfn(100)),
    value: $affdeee143336129$var$getset("hsv", 2, $affdeee143336129$var$maxfn(100)),
    chroma: $affdeee143336129$var$getset("hcg", 1, $affdeee143336129$var$maxfn(100)),
    gray: $affdeee143336129$var$getset("hcg", 2, $affdeee143336129$var$maxfn(100)),
    white: $affdeee143336129$var$getset("hwb", 1, $affdeee143336129$var$maxfn(100)),
    wblack: $affdeee143336129$var$getset("hwb", 2, $affdeee143336129$var$maxfn(100)),
    cyan: $affdeee143336129$var$getset("cmyk", 0, $affdeee143336129$var$maxfn(100)),
    magenta: $affdeee143336129$var$getset("cmyk", 1, $affdeee143336129$var$maxfn(100)),
    yellow: $affdeee143336129$var$getset("cmyk", 2, $affdeee143336129$var$maxfn(100)),
    black: $affdeee143336129$var$getset("cmyk", 3, $affdeee143336129$var$maxfn(100)),
    x: $affdeee143336129$var$getset("xyz", 0, $affdeee143336129$var$maxfn(100)),
    y: $affdeee143336129$var$getset("xyz", 1, $affdeee143336129$var$maxfn(100)),
    z: $affdeee143336129$var$getset("xyz", 2, $affdeee143336129$var$maxfn(100)),
    l: $affdeee143336129$var$getset("lab", 0, $affdeee143336129$var$maxfn(100)),
    a: $affdeee143336129$var$getset("lab", 1),
    b: $affdeee143336129$var$getset("lab", 2),
    keyword: function(val) {
        if (arguments.length) return new $affdeee143336129$var$Color(val);
        return $7hySK[this.model].keyword(this.color);
    },
    hex: function(val) {
        if (arguments.length) return new $affdeee143336129$var$Color(val);
        return $ajAvQ.to.hex(this.rgb().round().color);
    },
    rgbNumber: function() {
        var rgb = this.rgb().color;
        return (rgb[0] & 0xFF) << 16 | (rgb[1] & 0xFF) << 8 | rgb[2] & 0xFF;
    },
    luminosity: function() {
        // http://www.w3.org/TR/WCAG20/#relativeluminancedef
        var rgb = this.rgb().color;
        var lum = [];
        for(var i = 0; i < rgb.length; i++){
            var chan = rgb[i] / 255;
            lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    },
    contrast: function(color2) {
        // http://www.w3.org/TR/WCAG20/#contrast-ratiodef
        var lum1 = this.luminosity();
        var lum2 = color2.luminosity();
        if (lum1 > lum2) return (lum1 + 0.05) / (lum2 + 0.05);
        return (lum2 + 0.05) / (lum1 + 0.05);
    },
    level: function(color2) {
        var contrastRatio = this.contrast(color2);
        if (contrastRatio >= 7.1) return "AAA";
        return contrastRatio >= 4.5 ? "AA" : "";
    },
    isDark: function() {
        // YIQ equation from http://24ways.org/2010/calculating-color-contrast
        var rgb = this.rgb().color;
        var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return yiq < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    negate: function() {
        var rgb = this.rgb();
        for(var i = 0; i < 3; i++)rgb.color[i] = 255 - rgb.color[i];
        return rgb;
    },
    lighten: function(ratio) {
        var hsl = this.hsl();
        hsl.color[2] += hsl.color[2] * ratio;
        return hsl;
    },
    darken: function(ratio) {
        var hsl = this.hsl();
        hsl.color[2] -= hsl.color[2] * ratio;
        return hsl;
    },
    saturate: function(ratio) {
        var hsl = this.hsl();
        hsl.color[1] += hsl.color[1] * ratio;
        return hsl;
    },
    desaturate: function(ratio) {
        var hsl = this.hsl();
        hsl.color[1] -= hsl.color[1] * ratio;
        return hsl;
    },
    whiten: function(ratio) {
        var hwb = this.hwb();
        hwb.color[1] += hwb.color[1] * ratio;
        return hwb;
    },
    blacken: function(ratio) {
        var hwb = this.hwb();
        hwb.color[2] += hwb.color[2] * ratio;
        return hwb;
    },
    grayscale: function() {
        // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
        var rgb = this.rgb().color;
        var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
        return $affdeee143336129$var$Color.rgb(val, val, val);
    },
    fade: function(ratio) {
        return this.alpha(this.valpha - this.valpha * ratio);
    },
    opaquer: function(ratio) {
        return this.alpha(this.valpha + this.valpha * ratio);
    },
    rotate: function(degrees) {
        var hsl = this.hsl();
        var hue = hsl.color[0];
        hue = (hue + degrees) % 360;
        hue = hue < 0 ? 360 + hue : hue;
        hsl.color[0] = hue;
        return hsl;
    },
    mix: function(mixinColor, weight) {
        // ported from sass implementation in C
        // https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
        if (!mixinColor || !mixinColor.rgb) throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
        var color1 = mixinColor.rgb();
        var color2 = this.rgb();
        var p = weight === undefined ? 0.5 : weight;
        var w = 2 * p - 1;
        var a = color1.alpha() - color2.alpha();
        var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
        var w2 = 1 - w1;
        return $affdeee143336129$var$Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
    }
};
// model conversion methods and static constructors
Object.keys($7hySK).forEach(function(model) {
    if ($affdeee143336129$var$skippedModels.indexOf(model) !== -1) return;
    var channels = $7hySK[model].channels;
    // conversion methods
    $affdeee143336129$var$Color.prototype[model] = function() {
        if (this.model === model) return new $affdeee143336129$var$Color(this);
        if (arguments.length) return new $affdeee143336129$var$Color(arguments, model);
        var newAlpha = typeof arguments[channels] === "number" ? channels : this.valpha;
        return new $affdeee143336129$var$Color($affdeee143336129$var$assertArray($7hySK[this.model][model].raw(this.color)).concat(newAlpha), model);
    };
    // 'static' construction methods
    $affdeee143336129$var$Color[model] = function(color) {
        if (typeof color === "number") color = $affdeee143336129$var$zeroArray($affdeee143336129$var$_slice.call(arguments), channels);
        return new $affdeee143336129$var$Color(color, model);
    };
});
function $affdeee143336129$var$roundTo(num, places) {
    return Number(num.toFixed(places));
}
function $affdeee143336129$var$roundToPlace(places) {
    return function(num) {
        return $affdeee143336129$var$roundTo(num, places);
    };
}
function $affdeee143336129$var$getset(model, channel, modifier) {
    model = Array.isArray(model) ? model : [
        model
    ];
    model.forEach(function(m) {
        ($affdeee143336129$var$limiters[m] || ($affdeee143336129$var$limiters[m] = []))[channel] = modifier;
    });
    model = model[0];
    return function(val) {
        var result;
        if (arguments.length) {
            if (modifier) val = modifier(val);
            result = this[model]();
            result.color[channel] = val;
            return result;
        }
        result = this[model]().color[channel];
        if (modifier) result = modifier(result);
        return result;
    };
}
function $affdeee143336129$var$maxfn(max) {
    return function(v) {
        return Math.max(0, Math.min(max, v));
    };
}
function $affdeee143336129$var$assertArray(val) {
    return Array.isArray(val) ? val : [
        val
    ];
}
function $affdeee143336129$var$zeroArray(arr, length) {
    for(var i = 0; i < length; i++)if (typeof arr[i] !== "number") arr[i] = 0;
    return arr;
}
module.exports = $affdeee143336129$var$Color;

});
parcelRequire.register("ajAvQ", function(module, exports) {

var $1jjkl = parcelRequire("1jjkl");

var $2EG7E = parcelRequire("2EG7E");
var $7828005b42b1dacd$var$hasOwnProperty = Object.hasOwnProperty;
var $7828005b42b1dacd$var$reverseNames = {};
// create a list of reverse color names
for(var $7828005b42b1dacd$var$name in $1jjkl)if ($7828005b42b1dacd$var$hasOwnProperty.call($1jjkl, $7828005b42b1dacd$var$name)) $7828005b42b1dacd$var$reverseNames[$1jjkl[$7828005b42b1dacd$var$name]] = $7828005b42b1dacd$var$name;
var $7828005b42b1dacd$var$cs = module.exports = {
    to: {},
    get: {}
};
$7828005b42b1dacd$var$cs.get = function(string) {
    var prefix = string.substring(0, 3).toLowerCase();
    var val;
    var model;
    switch(prefix){
        case "hsl":
            val = $7828005b42b1dacd$var$cs.get.hsl(string);
            model = "hsl";
            break;
        case "hwb":
            val = $7828005b42b1dacd$var$cs.get.hwb(string);
            model = "hwb";
            break;
        default:
            val = $7828005b42b1dacd$var$cs.get.rgb(string);
            model = "rgb";
            break;
    }
    if (!val) return null;
    return {
        model: model,
        value: val
    };
};
$7828005b42b1dacd$var$cs.get.rgb = function(string) {
    if (!string) return null;
    var abbr = /^#([a-f0-9]{3,4})$/i;
    var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
    var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
    var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
    var keyword = /^(\w+)$/;
    var rgb = [
        0,
        0,
        0,
        1
    ];
    var match;
    var i;
    var hexAlpha;
    if (match = string.match(hex)) {
        hexAlpha = match[2];
        match = match[1];
        for(i = 0; i < 3; i++){
            // https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
            var i2 = i * 2;
            rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
        }
        if (hexAlpha) rgb[3] = parseInt(hexAlpha, 16) / 255;
    } else if (match = string.match(abbr)) {
        match = match[1];
        hexAlpha = match[3];
        for(i = 0; i < 3; i++)rgb[i] = parseInt(match[i] + match[i], 16);
        if (hexAlpha) rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
    } else if (match = string.match(rgba)) {
        for(i = 0; i < 3; i++)rgb[i] = parseInt(match[i + 1], 0);
        if (match[4]) {
            if (match[5]) rgb[3] = parseFloat(match[4]) * 0.01;
            else rgb[3] = parseFloat(match[4]);
        }
    } else if (match = string.match(per)) {
        for(i = 0; i < 3; i++)rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
        if (match[4]) {
            if (match[5]) rgb[3] = parseFloat(match[4]) * 0.01;
            else rgb[3] = parseFloat(match[4]);
        }
    } else if (match = string.match(keyword)) {
        if (match[1] === "transparent") return [
            0,
            0,
            0,
            0
        ];
        if (!$7828005b42b1dacd$var$hasOwnProperty.call($1jjkl, match[1])) return null;
        rgb = $1jjkl[match[1]];
        rgb[3] = 1;
        return rgb;
    } else return null;
    for(i = 0; i < 3; i++)rgb[i] = $7828005b42b1dacd$var$clamp(rgb[i], 0, 255);
    rgb[3] = $7828005b42b1dacd$var$clamp(rgb[3], 0, 1);
    return rgb;
};
$7828005b42b1dacd$var$cs.get.hsl = function(string) {
    if (!string) return null;
    var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    var match = string.match(hsl);
    if (match) {
        var alpha = parseFloat(match[4]);
        var h = (parseFloat(match[1]) % 360 + 360) % 360;
        var s = $7828005b42b1dacd$var$clamp(parseFloat(match[2]), 0, 100);
        var l = $7828005b42b1dacd$var$clamp(parseFloat(match[3]), 0, 100);
        var a = $7828005b42b1dacd$var$clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
        return [
            h,
            s,
            l,
            a
        ];
    }
    return null;
};
$7828005b42b1dacd$var$cs.get.hwb = function(string) {
    if (!string) return null;
    var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    var match = string.match(hwb);
    if (match) {
        var alpha = parseFloat(match[4]);
        var h = (parseFloat(match[1]) % 360 + 360) % 360;
        var w = $7828005b42b1dacd$var$clamp(parseFloat(match[2]), 0, 100);
        var b = $7828005b42b1dacd$var$clamp(parseFloat(match[3]), 0, 100);
        var a = $7828005b42b1dacd$var$clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
        return [
            h,
            w,
            b,
            a
        ];
    }
    return null;
};
$7828005b42b1dacd$var$cs.to.hex = function() {
    var rgba = $2EG7E(arguments);
    return "#" + $7828005b42b1dacd$var$hexDouble(rgba[0]) + $7828005b42b1dacd$var$hexDouble(rgba[1]) + $7828005b42b1dacd$var$hexDouble(rgba[2]) + (rgba[3] < 1 ? $7828005b42b1dacd$var$hexDouble(Math.round(rgba[3] * 255)) : "");
};
$7828005b42b1dacd$var$cs.to.rgb = function() {
    var rgba = $2EG7E(arguments);
    return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
};
$7828005b42b1dacd$var$cs.to.rgb.percent = function() {
    var rgba = $2EG7E(arguments);
    var r = Math.round(rgba[0] / 255 * 100);
    var g = Math.round(rgba[1] / 255 * 100);
    var b = Math.round(rgba[2] / 255 * 100);
    return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r + "%, " + g + "%, " + b + "%)" : "rgba(" + r + "%, " + g + "%, " + b + "%, " + rgba[3] + ")";
};
$7828005b42b1dacd$var$cs.to.hsl = function() {
    var hsla = $2EG7E(arguments);
    return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
};
// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
$7828005b42b1dacd$var$cs.to.hwb = function() {
    var hwba = $2EG7E(arguments);
    var a = "";
    if (hwba.length >= 4 && hwba[3] !== 1) a = ", " + hwba[3];
    return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a + ")";
};
$7828005b42b1dacd$var$cs.to.keyword = function(rgb) {
    return $7828005b42b1dacd$var$reverseNames[rgb.slice(0, 3)];
};
// helpers
function $7828005b42b1dacd$var$clamp(num, min, max) {
    return Math.min(Math.max(min, num), max);
}
function $7828005b42b1dacd$var$hexDouble(num) {
    var str = Math.round(num).toString(16).toUpperCase();
    return str.length < 2 ? "0" + str : str;
}

});
parcelRequire.register("1jjkl", function(module, exports) {
"use strict";
module.exports = {
    "aliceblue": [
        240,
        248,
        255
    ],
    "antiquewhite": [
        250,
        235,
        215
    ],
    "aqua": [
        0,
        255,
        255
    ],
    "aquamarine": [
        127,
        255,
        212
    ],
    "azure": [
        240,
        255,
        255
    ],
    "beige": [
        245,
        245,
        220
    ],
    "bisque": [
        255,
        228,
        196
    ],
    "black": [
        0,
        0,
        0
    ],
    "blanchedalmond": [
        255,
        235,
        205
    ],
    "blue": [
        0,
        0,
        255
    ],
    "blueviolet": [
        138,
        43,
        226
    ],
    "brown": [
        165,
        42,
        42
    ],
    "burlywood": [
        222,
        184,
        135
    ],
    "cadetblue": [
        95,
        158,
        160
    ],
    "chartreuse": [
        127,
        255,
        0
    ],
    "chocolate": [
        210,
        105,
        30
    ],
    "coral": [
        255,
        127,
        80
    ],
    "cornflowerblue": [
        100,
        149,
        237
    ],
    "cornsilk": [
        255,
        248,
        220
    ],
    "crimson": [
        220,
        20,
        60
    ],
    "cyan": [
        0,
        255,
        255
    ],
    "darkblue": [
        0,
        0,
        139
    ],
    "darkcyan": [
        0,
        139,
        139
    ],
    "darkgoldenrod": [
        184,
        134,
        11
    ],
    "darkgray": [
        169,
        169,
        169
    ],
    "darkgreen": [
        0,
        100,
        0
    ],
    "darkgrey": [
        169,
        169,
        169
    ],
    "darkkhaki": [
        189,
        183,
        107
    ],
    "darkmagenta": [
        139,
        0,
        139
    ],
    "darkolivegreen": [
        85,
        107,
        47
    ],
    "darkorange": [
        255,
        140,
        0
    ],
    "darkorchid": [
        153,
        50,
        204
    ],
    "darkred": [
        139,
        0,
        0
    ],
    "darksalmon": [
        233,
        150,
        122
    ],
    "darkseagreen": [
        143,
        188,
        143
    ],
    "darkslateblue": [
        72,
        61,
        139
    ],
    "darkslategray": [
        47,
        79,
        79
    ],
    "darkslategrey": [
        47,
        79,
        79
    ],
    "darkturquoise": [
        0,
        206,
        209
    ],
    "darkviolet": [
        148,
        0,
        211
    ],
    "deeppink": [
        255,
        20,
        147
    ],
    "deepskyblue": [
        0,
        191,
        255
    ],
    "dimgray": [
        105,
        105,
        105
    ],
    "dimgrey": [
        105,
        105,
        105
    ],
    "dodgerblue": [
        30,
        144,
        255
    ],
    "firebrick": [
        178,
        34,
        34
    ],
    "floralwhite": [
        255,
        250,
        240
    ],
    "forestgreen": [
        34,
        139,
        34
    ],
    "fuchsia": [
        255,
        0,
        255
    ],
    "gainsboro": [
        220,
        220,
        220
    ],
    "ghostwhite": [
        248,
        248,
        255
    ],
    "gold": [
        255,
        215,
        0
    ],
    "goldenrod": [
        218,
        165,
        32
    ],
    "gray": [
        128,
        128,
        128
    ],
    "green": [
        0,
        128,
        0
    ],
    "greenyellow": [
        173,
        255,
        47
    ],
    "grey": [
        128,
        128,
        128
    ],
    "honeydew": [
        240,
        255,
        240
    ],
    "hotpink": [
        255,
        105,
        180
    ],
    "indianred": [
        205,
        92,
        92
    ],
    "indigo": [
        75,
        0,
        130
    ],
    "ivory": [
        255,
        255,
        240
    ],
    "khaki": [
        240,
        230,
        140
    ],
    "lavender": [
        230,
        230,
        250
    ],
    "lavenderblush": [
        255,
        240,
        245
    ],
    "lawngreen": [
        124,
        252,
        0
    ],
    "lemonchiffon": [
        255,
        250,
        205
    ],
    "lightblue": [
        173,
        216,
        230
    ],
    "lightcoral": [
        240,
        128,
        128
    ],
    "lightcyan": [
        224,
        255,
        255
    ],
    "lightgoldenrodyellow": [
        250,
        250,
        210
    ],
    "lightgray": [
        211,
        211,
        211
    ],
    "lightgreen": [
        144,
        238,
        144
    ],
    "lightgrey": [
        211,
        211,
        211
    ],
    "lightpink": [
        255,
        182,
        193
    ],
    "lightsalmon": [
        255,
        160,
        122
    ],
    "lightseagreen": [
        32,
        178,
        170
    ],
    "lightskyblue": [
        135,
        206,
        250
    ],
    "lightslategray": [
        119,
        136,
        153
    ],
    "lightslategrey": [
        119,
        136,
        153
    ],
    "lightsteelblue": [
        176,
        196,
        222
    ],
    "lightyellow": [
        255,
        255,
        224
    ],
    "lime": [
        0,
        255,
        0
    ],
    "limegreen": [
        50,
        205,
        50
    ],
    "linen": [
        250,
        240,
        230
    ],
    "magenta": [
        255,
        0,
        255
    ],
    "maroon": [
        128,
        0,
        0
    ],
    "mediumaquamarine": [
        102,
        205,
        170
    ],
    "mediumblue": [
        0,
        0,
        205
    ],
    "mediumorchid": [
        186,
        85,
        211
    ],
    "mediumpurple": [
        147,
        112,
        219
    ],
    "mediumseagreen": [
        60,
        179,
        113
    ],
    "mediumslateblue": [
        123,
        104,
        238
    ],
    "mediumspringgreen": [
        0,
        250,
        154
    ],
    "mediumturquoise": [
        72,
        209,
        204
    ],
    "mediumvioletred": [
        199,
        21,
        133
    ],
    "midnightblue": [
        25,
        25,
        112
    ],
    "mintcream": [
        245,
        255,
        250
    ],
    "mistyrose": [
        255,
        228,
        225
    ],
    "moccasin": [
        255,
        228,
        181
    ],
    "navajowhite": [
        255,
        222,
        173
    ],
    "navy": [
        0,
        0,
        128
    ],
    "oldlace": [
        253,
        245,
        230
    ],
    "olive": [
        128,
        128,
        0
    ],
    "olivedrab": [
        107,
        142,
        35
    ],
    "orange": [
        255,
        165,
        0
    ],
    "orangered": [
        255,
        69,
        0
    ],
    "orchid": [
        218,
        112,
        214
    ],
    "palegoldenrod": [
        238,
        232,
        170
    ],
    "palegreen": [
        152,
        251,
        152
    ],
    "paleturquoise": [
        175,
        238,
        238
    ],
    "palevioletred": [
        219,
        112,
        147
    ],
    "papayawhip": [
        255,
        239,
        213
    ],
    "peachpuff": [
        255,
        218,
        185
    ],
    "peru": [
        205,
        133,
        63
    ],
    "pink": [
        255,
        192,
        203
    ],
    "plum": [
        221,
        160,
        221
    ],
    "powderblue": [
        176,
        224,
        230
    ],
    "purple": [
        128,
        0,
        128
    ],
    "rebeccapurple": [
        102,
        51,
        153
    ],
    "red": [
        255,
        0,
        0
    ],
    "rosybrown": [
        188,
        143,
        143
    ],
    "royalblue": [
        65,
        105,
        225
    ],
    "saddlebrown": [
        139,
        69,
        19
    ],
    "salmon": [
        250,
        128,
        114
    ],
    "sandybrown": [
        244,
        164,
        96
    ],
    "seagreen": [
        46,
        139,
        87
    ],
    "seashell": [
        255,
        245,
        238
    ],
    "sienna": [
        160,
        82,
        45
    ],
    "silver": [
        192,
        192,
        192
    ],
    "skyblue": [
        135,
        206,
        235
    ],
    "slateblue": [
        106,
        90,
        205
    ],
    "slategray": [
        112,
        128,
        144
    ],
    "slategrey": [
        112,
        128,
        144
    ],
    "snow": [
        255,
        250,
        250
    ],
    "springgreen": [
        0,
        255,
        127
    ],
    "steelblue": [
        70,
        130,
        180
    ],
    "tan": [
        210,
        180,
        140
    ],
    "teal": [
        0,
        128,
        128
    ],
    "thistle": [
        216,
        191,
        216
    ],
    "tomato": [
        255,
        99,
        71
    ],
    "turquoise": [
        64,
        224,
        208
    ],
    "violet": [
        238,
        130,
        238
    ],
    "wheat": [
        245,
        222,
        179
    ],
    "white": [
        255,
        255,
        255
    ],
    "whitesmoke": [
        245,
        245,
        245
    ],
    "yellow": [
        255,
        255,
        0
    ],
    "yellowgreen": [
        154,
        205,
        50
    ]
};

});

parcelRequire.register("2EG7E", function(module, exports) {
"use strict";

var $j6VDI = parcelRequire("j6VDI");
var $1eeffdd9b2b4a2b0$var$concat = Array.prototype.concat;
var $1eeffdd9b2b4a2b0$var$slice = Array.prototype.slice;
var $1eeffdd9b2b4a2b0$var$swizzle = module.exports = function swizzle(args) {
    var results = [];
    for(var i = 0, len = args.length; i < len; i++){
        var arg = args[i];
        if ($j6VDI(arg)) // http://jsperf.com/javascript-array-concat-vs-push/98
        results = $1eeffdd9b2b4a2b0$var$concat.call(results, $1eeffdd9b2b4a2b0$var$slice.call(arg));
        else results.push(arg);
    }
    return results;
};
$1eeffdd9b2b4a2b0$var$swizzle.wrap = function(fn) {
    return function() {
        return fn($1eeffdd9b2b4a2b0$var$swizzle(arguments));
    };
};

});
parcelRequire.register("j6VDI", function(module, exports) {
module.exports = function isArrayish(obj) {
    if (!obj || typeof obj === "string") return false;
    return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== "String");
};

});



parcelRequire.register("7hySK", function(module, exports) {

var $l4sA6 = parcelRequire("l4sA6");

var $da0Bj = parcelRequire("da0Bj");
var $54d52dc260d35760$var$convert = {};
var $54d52dc260d35760$var$models = Object.keys($l4sA6);
function $54d52dc260d35760$var$wrapRaw(fn) {
    var wrappedFn = function(args) {
        if (args === undefined || args === null) return args;
        if (arguments.length > 1) args = Array.prototype.slice.call(arguments);
        return fn(args);
    };
    // preserve .conversion property if there is one
    if ("conversion" in fn) wrappedFn.conversion = fn.conversion;
    return wrappedFn;
}
function $54d52dc260d35760$var$wrapRounded(fn) {
    var wrappedFn = function(args) {
        if (args === undefined || args === null) return args;
        if (arguments.length > 1) args = Array.prototype.slice.call(arguments);
        var result = fn(args);
        // we're assuming the result is an array here.
        // see notice in conversions.js; don't use box types
        // in conversion functions.
        if (typeof result === "object") for(var len = result.length, i = 0; i < len; i++)result[i] = Math.round(result[i]);
        return result;
    };
    // preserve .conversion property if there is one
    if ("conversion" in fn) wrappedFn.conversion = fn.conversion;
    return wrappedFn;
}
$54d52dc260d35760$var$models.forEach(function(fromModel) {
    $54d52dc260d35760$var$convert[fromModel] = {};
    Object.defineProperty($54d52dc260d35760$var$convert[fromModel], "channels", {
        value: $l4sA6[fromModel].channels
    });
    Object.defineProperty($54d52dc260d35760$var$convert[fromModel], "labels", {
        value: $l4sA6[fromModel].labels
    });
    var routes = $da0Bj(fromModel);
    var routeModels = Object.keys(routes);
    routeModels.forEach(function(toModel) {
        var fn = routes[toModel];
        $54d52dc260d35760$var$convert[fromModel][toModel] = $54d52dc260d35760$var$wrapRounded(fn);
        $54d52dc260d35760$var$convert[fromModel][toModel].raw = $54d52dc260d35760$var$wrapRaw(fn);
    });
});
module.exports = $54d52dc260d35760$var$convert;

});
parcelRequire.register("l4sA6", function(module, exports) {

var $dHWq1 = parcelRequire("dHWq1");
// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)
var $f570245c61685873$var$reverseKeywords = {};
for(var $f570245c61685873$var$key in $dHWq1)if ($dHWq1.hasOwnProperty($f570245c61685873$var$key)) $f570245c61685873$var$reverseKeywords[$dHWq1[$f570245c61685873$var$key]] = $f570245c61685873$var$key;
var $f570245c61685873$var$convert = module.exports = {
    rgb: {
        channels: 3,
        labels: "rgb"
    },
    hsl: {
        channels: 3,
        labels: "hsl"
    },
    hsv: {
        channels: 3,
        labels: "hsv"
    },
    hwb: {
        channels: 3,
        labels: "hwb"
    },
    cmyk: {
        channels: 4,
        labels: "cmyk"
    },
    xyz: {
        channels: 3,
        labels: "xyz"
    },
    lab: {
        channels: 3,
        labels: "lab"
    },
    lch: {
        channels: 3,
        labels: "lch"
    },
    hex: {
        channels: 1,
        labels: [
            "hex"
        ]
    },
    keyword: {
        channels: 1,
        labels: [
            "keyword"
        ]
    },
    ansi16: {
        channels: 1,
        labels: [
            "ansi16"
        ]
    },
    ansi256: {
        channels: 1,
        labels: [
            "ansi256"
        ]
    },
    hcg: {
        channels: 3,
        labels: [
            "h",
            "c",
            "g"
        ]
    },
    apple: {
        channels: 3,
        labels: [
            "r16",
            "g16",
            "b16"
        ]
    },
    gray: {
        channels: 1,
        labels: [
            "gray"
        ]
    }
};
// hide .channels and .labels properties
for(var $f570245c61685873$var$model in $f570245c61685873$var$convert)if ($f570245c61685873$var$convert.hasOwnProperty($f570245c61685873$var$model)) {
    if (!("channels" in $f570245c61685873$var$convert[$f570245c61685873$var$model])) throw new Error("missing channels property: " + $f570245c61685873$var$model);
    if (!("labels" in $f570245c61685873$var$convert[$f570245c61685873$var$model])) throw new Error("missing channel labels property: " + $f570245c61685873$var$model);
    if ($f570245c61685873$var$convert[$f570245c61685873$var$model].labels.length !== $f570245c61685873$var$convert[$f570245c61685873$var$model].channels) throw new Error("channel and label counts mismatch: " + $f570245c61685873$var$model);
    var $f570245c61685873$var$channels = $f570245c61685873$var$convert[$f570245c61685873$var$model].channels;
    var $f570245c61685873$var$labels = $f570245c61685873$var$convert[$f570245c61685873$var$model].labels;
    delete $f570245c61685873$var$convert[$f570245c61685873$var$model].channels;
    delete $f570245c61685873$var$convert[$f570245c61685873$var$model].labels;
    Object.defineProperty($f570245c61685873$var$convert[$f570245c61685873$var$model], "channels", {
        value: $f570245c61685873$var$channels
    });
    Object.defineProperty($f570245c61685873$var$convert[$f570245c61685873$var$model], "labels", {
        value: $f570245c61685873$var$labels
    });
}
$f570245c61685873$var$convert.rgb.hsl = function(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h;
    var s;
    var l;
    if (max === min) h = 0;
    else if (r === max) h = (g - b) / delta;
    else if (g === max) h = 2 + (b - r) / delta;
    else if (b === max) h = 4 + (r - g) / delta;
    h = Math.min(h * 60, 360);
    if (h < 0) h += 360;
    l = (min + max) / 2;
    if (max === min) s = 0;
    else if (l <= 0.5) s = delta / (max + min);
    else s = delta / (2 - max - min);
    return [
        h,
        s * 100,
        l * 100
    ];
};
$f570245c61685873$var$convert.rgb.hsv = function(rgb) {
    var rdif;
    var gdif;
    var bdif;
    var h;
    var s;
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var v = Math.max(r, g, b);
    var diff = v - Math.min(r, g, b);
    var diffc = function(c) {
        return (v - c) / 6 / diff + 0.5;
    };
    if (diff === 0) h = s = 0;
    else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) h = bdif - gdif;
        else if (g === v) h = 1 / 3 + rdif - bdif;
        else if (b === v) h = 2 / 3 + gdif - rdif;
        if (h < 0) h += 1;
        else if (h > 1) h -= 1;
    }
    return [
        h * 360,
        s * 100,
        v * 100
    ];
};
$f570245c61685873$var$convert.rgb.hwb = function(rgb) {
    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];
    var h = $f570245c61685873$var$convert.rgb.hsl(rgb)[0];
    var w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [
        h,
        w * 100,
        b * 100
    ];
};
$f570245c61685873$var$convert.rgb.cmyk = function(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var c;
    var m;
    var y;
    var k;
    k = Math.min(1 - r, 1 - g, 1 - b);
    c = (1 - r - k) / (1 - k) || 0;
    m = (1 - g - k) / (1 - k) || 0;
    y = (1 - b - k) / (1 - k) || 0;
    return [
        c * 100,
        m * 100,
        y * 100,
        k * 100
    ];
};
/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */ function $f570245c61685873$var$comparativeDistance(x, y) {
    return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
}
$f570245c61685873$var$convert.rgb.keyword = function(rgb) {
    var reversed = $f570245c61685873$var$reverseKeywords[rgb];
    if (reversed) return reversed;
    var currentClosestDistance = Infinity;
    var currentClosestKeyword;
    for(var keyword in $dHWq1)if ($dHWq1.hasOwnProperty(keyword)) {
        var value = $dHWq1[keyword];
        // Compute comparative distance
        var distance = $f570245c61685873$var$comparativeDistance(rgb, value);
        // Check if its less, if so set as closest
        if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
        }
    }
    return currentClosestKeyword;
};
$f570245c61685873$var$convert.keyword.rgb = function(keyword) {
    return $dHWq1[keyword];
};
$f570245c61685873$var$convert.rgb.xyz = function(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    // assume sRGB
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [
        x * 100,
        y * 100,
        z * 100
    ];
};
$f570245c61685873$var$convert.rgb.lab = function(rgb) {
    var xyz = $f570245c61685873$var$convert.rgb.xyz(rgb);
    var x = xyz[0];
    var y = xyz[1];
    var z = xyz[2];
    var l;
    var a;
    var b;
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
    l = 116 * y - 16;
    a = 500 * (x - y);
    b = 200 * (y - z);
    return [
        l,
        a,
        b
    ];
};
$f570245c61685873$var$convert.hsl.rgb = function(hsl) {
    var h = hsl[0] / 360;
    var s = hsl[1] / 100;
    var l = hsl[2] / 100;
    var t1;
    var t2;
    var t3;
    var rgb;
    var val;
    if (s === 0) {
        val = l * 255;
        return [
            val,
            val,
            val
        ];
    }
    if (l < 0.5) t2 = l * (1 + s);
    else t2 = l + s - l * s;
    t1 = 2 * l - t2;
    rgb = [
        0,
        0,
        0
    ];
    for(var i = 0; i < 3; i++){
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) t3++;
        if (t3 > 1) t3--;
        if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3;
        else if (2 * t3 < 1) val = t2;
        else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        else val = t1;
        rgb[i] = val * 255;
    }
    return rgb;
};
$f570245c61685873$var$convert.hsl.hsv = function(hsl) {
    var h = hsl[0];
    var s = hsl[1] / 100;
    var l = hsl[2] / 100;
    var smin = s;
    var lmin = Math.max(l, 0.01);
    var sv;
    var v;
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    v = (l + s) / 2;
    sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [
        h,
        sv * 100,
        v * 100
    ];
};
$f570245c61685873$var$convert.hsv.rgb = function(hsv) {
    var h = hsv[0] / 60;
    var s = hsv[1] / 100;
    var v = hsv[2] / 100;
    var hi = Math.floor(h) % 6;
    var f = h - Math.floor(h);
    var p = 255 * v * (1 - s);
    var q = 255 * v * (1 - s * f);
    var t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch(hi){
        case 0:
            return [
                v,
                t,
                p
            ];
        case 1:
            return [
                q,
                v,
                p
            ];
        case 2:
            return [
                p,
                v,
                t
            ];
        case 3:
            return [
                p,
                q,
                v
            ];
        case 4:
            return [
                t,
                p,
                v
            ];
        case 5:
            return [
                v,
                p,
                q
            ];
    }
};
$f570245c61685873$var$convert.hsv.hsl = function(hsv) {
    var h = hsv[0];
    var s = hsv[1] / 100;
    var v = hsv[2] / 100;
    var vmin = Math.max(v, 0.01);
    var lmin;
    var sl;
    var l;
    l = (2 - s) * v;
    lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [
        h,
        sl * 100,
        l * 100
    ];
};
// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
$f570245c61685873$var$convert.hwb.rgb = function(hwb) {
    var h = hwb[0] / 360;
    var wh = hwb[1] / 100;
    var bl = hwb[2] / 100;
    var ratio = wh + bl;
    var i;
    var v;
    var f;
    var n;
    // wh + bl cant be > 1
    if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
    }
    i = Math.floor(6 * h);
    v = 1 - bl;
    f = 6 * h - i;
    if ((i & 0x01) !== 0) f = 1 - f;
    n = wh + f * (v - wh); // linear interpolation
    var r;
    var g;
    var b;
    switch(i){
        default:
        case 6:
        case 0:
            r = v;
            g = n;
            b = wh;
            break;
        case 1:
            r = n;
            g = v;
            b = wh;
            break;
        case 2:
            r = wh;
            g = v;
            b = n;
            break;
        case 3:
            r = wh;
            g = n;
            b = v;
            break;
        case 4:
            r = n;
            g = wh;
            b = v;
            break;
        case 5:
            r = v;
            g = wh;
            b = n;
            break;
    }
    return [
        r * 255,
        g * 255,
        b * 255
    ];
};
$f570245c61685873$var$convert.cmyk.rgb = function(cmyk) {
    var c = cmyk[0] / 100;
    var m = cmyk[1] / 100;
    var y = cmyk[2] / 100;
    var k = cmyk[3] / 100;
    var r;
    var g;
    var b;
    r = 1 - Math.min(1, c * (1 - k) + k);
    g = 1 - Math.min(1, m * (1 - k) + k);
    b = 1 - Math.min(1, y * (1 - k) + k);
    return [
        r * 255,
        g * 255,
        b * 255
    ];
};
$f570245c61685873$var$convert.xyz.rgb = function(xyz) {
    var x = xyz[0] / 100;
    var y = xyz[1] / 100;
    var z = xyz[2] / 100;
    var r;
    var g;
    var b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.0570;
    // assume sRGB
    r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;
    g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;
    b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [
        r * 255,
        g * 255,
        b * 255
    ];
};
$f570245c61685873$var$convert.xyz.lab = function(xyz) {
    var x = xyz[0];
    var y = xyz[1];
    var z = xyz[2];
    var l;
    var a;
    var b;
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
    l = 116 * y - 16;
    a = 500 * (x - y);
    b = 200 * (y - z);
    return [
        l,
        a,
        b
    ];
};
$f570245c61685873$var$convert.lab.xyz = function(lab) {
    var l = lab[0];
    var a = lab[1];
    var b = lab[2];
    var x;
    var y;
    var z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    var y2 = Math.pow(y, 3);
    var x2 = Math.pow(x, 3);
    var z2 = Math.pow(z, 3);
    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [
        x,
        y,
        z
    ];
};
$f570245c61685873$var$convert.lab.lch = function(lab) {
    var l = lab[0];
    var a = lab[1];
    var b = lab[2];
    var hr;
    var h;
    var c;
    hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) h += 360;
    c = Math.sqrt(a * a + b * b);
    return [
        l,
        c,
        h
    ];
};
$f570245c61685873$var$convert.lch.lab = function(lch) {
    var l = lch[0];
    var c = lch[1];
    var h = lch[2];
    var a;
    var b;
    var hr;
    hr = h / 360 * 2 * Math.PI;
    a = c * Math.cos(hr);
    b = c * Math.sin(hr);
    return [
        l,
        a,
        b
    ];
};
$f570245c61685873$var$convert.rgb.ansi16 = function(args) {
    var r = args[0];
    var g = args[1];
    var b = args[2];
    var value = 1 in arguments ? arguments[1] : $f570245c61685873$var$convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization
    value = Math.round(value / 50);
    if (value === 0) return 30;
    var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) ansi += 60;
    return ansi;
};
$f570245c61685873$var$convert.hsv.ansi16 = function(args) {
    // optimization here; we already know the value and don't need to get
    // it converted for us.
    return $f570245c61685873$var$convert.rgb.ansi16($f570245c61685873$var$convert.hsv.rgb(args), args[2]);
};
$f570245c61685873$var$convert.rgb.ansi256 = function(args) {
    var r = args[0];
    var g = args[1];
    var b = args[2];
    // we use the extended greyscale palette here, with the exception of
    // black and white. normal palette only has 4 greyscale shades.
    if (r === g && g === b) {
        if (r < 8) return 16;
        if (r > 248) return 231;
        return Math.round((r - 8) / 247 * 24) + 232;
    }
    var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
};
$f570245c61685873$var$convert.ansi16.rgb = function(args) {
    var color = args % 10;
    // handle greyscale
    if (color === 0 || color === 7) {
        if (args > 50) color += 3.5;
        color = color / 10.5 * 255;
        return [
            color,
            color,
            color
        ];
    }
    var mult = (~~(args > 50) + 1) * 0.5;
    var r = (color & 1) * mult * 255;
    var g = (color >> 1 & 1) * mult * 255;
    var b = (color >> 2 & 1) * mult * 255;
    return [
        r,
        g,
        b
    ];
};
$f570245c61685873$var$convert.ansi256.rgb = function(args) {
    // handle greyscale
    if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [
            c,
            c,
            c
        ];
    }
    args -= 16;
    var rem;
    var r = Math.floor(args / 36) / 5 * 255;
    var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    var b = rem % 6 / 5 * 255;
    return [
        r,
        g,
        b
    ];
};
$f570245c61685873$var$convert.rgb.hex = function(args) {
    var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
    var string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
};
$f570245c61685873$var$convert.hex.rgb = function(args) {
    var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) return [
        0,
        0,
        0
    ];
    var colorString = match[0];
    if (match[0].length === 3) colorString = colorString.split("").map(function(char) {
        return char + char;
    }).join("");
    var integer = parseInt(colorString, 16);
    var r = integer >> 16 & 0xFF;
    var g = integer >> 8 & 0xFF;
    var b = integer & 0xFF;
    return [
        r,
        g,
        b
    ];
};
$f570245c61685873$var$convert.rgb.hcg = function(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var max = Math.max(Math.max(r, g), b);
    var min = Math.min(Math.min(r, g), b);
    var chroma = max - min;
    var grayscale;
    var hue;
    if (chroma < 1) grayscale = min / (1 - chroma);
    else grayscale = 0;
    if (chroma <= 0) hue = 0;
    else if (max === r) hue = (g - b) / chroma % 6;
    else if (max === g) hue = 2 + (b - r) / chroma;
    else hue = 4 + (r - g) / chroma + 4;
    hue /= 6;
    hue %= 1;
    return [
        hue * 360,
        chroma * 100,
        grayscale * 100
    ];
};
$f570245c61685873$var$convert.hsl.hcg = function(hsl) {
    var s = hsl[1] / 100;
    var l = hsl[2] / 100;
    var c = 1;
    var f = 0;
    if (l < 0.5) c = 2.0 * s * l;
    else c = 2.0 * s * (1.0 - l);
    if (c < 1.0) f = (l - 0.5 * c) / (1.0 - c);
    return [
        hsl[0],
        c * 100,
        f * 100
    ];
};
$f570245c61685873$var$convert.hsv.hcg = function(hsv) {
    var s = hsv[1] / 100;
    var v = hsv[2] / 100;
    var c = s * v;
    var f = 0;
    if (c < 1.0) f = (v - c) / (1 - c);
    return [
        hsv[0],
        c * 100,
        f * 100
    ];
};
$f570245c61685873$var$convert.hcg.rgb = function(hcg) {
    var h = hcg[0] / 360;
    var c = hcg[1] / 100;
    var g = hcg[2] / 100;
    if (c === 0.0) return [
        g * 255,
        g * 255,
        g * 255
    ];
    var pure = [
        0,
        0,
        0
    ];
    var hi = h % 1 * 6;
    var v = hi % 1;
    var w = 1 - v;
    var mg = 0;
    switch(Math.floor(hi)){
        case 0:
            pure[0] = 1;
            pure[1] = v;
            pure[2] = 0;
            break;
        case 1:
            pure[0] = w;
            pure[1] = 1;
            pure[2] = 0;
            break;
        case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v;
            break;
        case 3:
            pure[0] = 0;
            pure[1] = w;
            pure[2] = 1;
            break;
        case 4:
            pure[0] = v;
            pure[1] = 0;
            pure[2] = 1;
            break;
        default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w;
    }
    mg = (1.0 - c) * g;
    return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
    ];
};
$f570245c61685873$var$convert.hcg.hsv = function(hcg) {
    var c = hcg[1] / 100;
    var g = hcg[2] / 100;
    var v = c + g * (1.0 - c);
    var f = 0;
    if (v > 0.0) f = c / v;
    return [
        hcg[0],
        f * 100,
        v * 100
    ];
};
$f570245c61685873$var$convert.hcg.hsl = function(hcg) {
    var c = hcg[1] / 100;
    var g = hcg[2] / 100;
    var l = g * (1.0 - c) + 0.5 * c;
    var s = 0;
    if (l > 0.0 && l < 0.5) s = c / (2 * l);
    else if (l >= 0.5 && l < 1.0) s = c / (2 * (1 - l));
    return [
        hcg[0],
        s * 100,
        l * 100
    ];
};
$f570245c61685873$var$convert.hcg.hwb = function(hcg) {
    var c = hcg[1] / 100;
    var g = hcg[2] / 100;
    var v = c + g * (1.0 - c);
    return [
        hcg[0],
        (v - c) * 100,
        (1 - v) * 100
    ];
};
$f570245c61685873$var$convert.hwb.hcg = function(hwb) {
    var w = hwb[1] / 100;
    var b = hwb[2] / 100;
    var v = 1 - b;
    var c = v - w;
    var g = 0;
    if (c < 1) g = (v - c) / (1 - c);
    return [
        hwb[0],
        c * 100,
        g * 100
    ];
};
$f570245c61685873$var$convert.apple.rgb = function(apple) {
    return [
        apple[0] / 65535 * 255,
        apple[1] / 65535 * 255,
        apple[2] / 65535 * 255
    ];
};
$f570245c61685873$var$convert.rgb.apple = function(rgb) {
    return [
        rgb[0] / 255 * 65535,
        rgb[1] / 255 * 65535,
        rgb[2] / 255 * 65535
    ];
};
$f570245c61685873$var$convert.gray.rgb = function(args) {
    return [
        args[0] / 100 * 255,
        args[0] / 100 * 255,
        args[0] / 100 * 255
    ];
};
$f570245c61685873$var$convert.gray.hsl = $f570245c61685873$var$convert.gray.hsv = function(args) {
    return [
        0,
        0,
        args[0]
    ];
};
$f570245c61685873$var$convert.gray.hwb = function(gray) {
    return [
        0,
        100,
        gray[0]
    ];
};
$f570245c61685873$var$convert.gray.cmyk = function(gray) {
    return [
        0,
        0,
        0,
        gray[0]
    ];
};
$f570245c61685873$var$convert.gray.lab = function(gray) {
    return [
        gray[0],
        0,
        0
    ];
};
$f570245c61685873$var$convert.gray.hex = function(gray) {
    var val = Math.round(gray[0] / 100 * 255) & 0xFF;
    var integer = (val << 16) + (val << 8) + val;
    var string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
};
$f570245c61685873$var$convert.rgb.gray = function(rgb) {
    var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [
        val / 255 * 100
    ];
};

});
parcelRequire.register("dHWq1", function(module, exports) {
"use strict";
module.exports = {
    "aliceblue": [
        240,
        248,
        255
    ],
    "antiquewhite": [
        250,
        235,
        215
    ],
    "aqua": [
        0,
        255,
        255
    ],
    "aquamarine": [
        127,
        255,
        212
    ],
    "azure": [
        240,
        255,
        255
    ],
    "beige": [
        245,
        245,
        220
    ],
    "bisque": [
        255,
        228,
        196
    ],
    "black": [
        0,
        0,
        0
    ],
    "blanchedalmond": [
        255,
        235,
        205
    ],
    "blue": [
        0,
        0,
        255
    ],
    "blueviolet": [
        138,
        43,
        226
    ],
    "brown": [
        165,
        42,
        42
    ],
    "burlywood": [
        222,
        184,
        135
    ],
    "cadetblue": [
        95,
        158,
        160
    ],
    "chartreuse": [
        127,
        255,
        0
    ],
    "chocolate": [
        210,
        105,
        30
    ],
    "coral": [
        255,
        127,
        80
    ],
    "cornflowerblue": [
        100,
        149,
        237
    ],
    "cornsilk": [
        255,
        248,
        220
    ],
    "crimson": [
        220,
        20,
        60
    ],
    "cyan": [
        0,
        255,
        255
    ],
    "darkblue": [
        0,
        0,
        139
    ],
    "darkcyan": [
        0,
        139,
        139
    ],
    "darkgoldenrod": [
        184,
        134,
        11
    ],
    "darkgray": [
        169,
        169,
        169
    ],
    "darkgreen": [
        0,
        100,
        0
    ],
    "darkgrey": [
        169,
        169,
        169
    ],
    "darkkhaki": [
        189,
        183,
        107
    ],
    "darkmagenta": [
        139,
        0,
        139
    ],
    "darkolivegreen": [
        85,
        107,
        47
    ],
    "darkorange": [
        255,
        140,
        0
    ],
    "darkorchid": [
        153,
        50,
        204
    ],
    "darkred": [
        139,
        0,
        0
    ],
    "darksalmon": [
        233,
        150,
        122
    ],
    "darkseagreen": [
        143,
        188,
        143
    ],
    "darkslateblue": [
        72,
        61,
        139
    ],
    "darkslategray": [
        47,
        79,
        79
    ],
    "darkslategrey": [
        47,
        79,
        79
    ],
    "darkturquoise": [
        0,
        206,
        209
    ],
    "darkviolet": [
        148,
        0,
        211
    ],
    "deeppink": [
        255,
        20,
        147
    ],
    "deepskyblue": [
        0,
        191,
        255
    ],
    "dimgray": [
        105,
        105,
        105
    ],
    "dimgrey": [
        105,
        105,
        105
    ],
    "dodgerblue": [
        30,
        144,
        255
    ],
    "firebrick": [
        178,
        34,
        34
    ],
    "floralwhite": [
        255,
        250,
        240
    ],
    "forestgreen": [
        34,
        139,
        34
    ],
    "fuchsia": [
        255,
        0,
        255
    ],
    "gainsboro": [
        220,
        220,
        220
    ],
    "ghostwhite": [
        248,
        248,
        255
    ],
    "gold": [
        255,
        215,
        0
    ],
    "goldenrod": [
        218,
        165,
        32
    ],
    "gray": [
        128,
        128,
        128
    ],
    "green": [
        0,
        128,
        0
    ],
    "greenyellow": [
        173,
        255,
        47
    ],
    "grey": [
        128,
        128,
        128
    ],
    "honeydew": [
        240,
        255,
        240
    ],
    "hotpink": [
        255,
        105,
        180
    ],
    "indianred": [
        205,
        92,
        92
    ],
    "indigo": [
        75,
        0,
        130
    ],
    "ivory": [
        255,
        255,
        240
    ],
    "khaki": [
        240,
        230,
        140
    ],
    "lavender": [
        230,
        230,
        250
    ],
    "lavenderblush": [
        255,
        240,
        245
    ],
    "lawngreen": [
        124,
        252,
        0
    ],
    "lemonchiffon": [
        255,
        250,
        205
    ],
    "lightblue": [
        173,
        216,
        230
    ],
    "lightcoral": [
        240,
        128,
        128
    ],
    "lightcyan": [
        224,
        255,
        255
    ],
    "lightgoldenrodyellow": [
        250,
        250,
        210
    ],
    "lightgray": [
        211,
        211,
        211
    ],
    "lightgreen": [
        144,
        238,
        144
    ],
    "lightgrey": [
        211,
        211,
        211
    ],
    "lightpink": [
        255,
        182,
        193
    ],
    "lightsalmon": [
        255,
        160,
        122
    ],
    "lightseagreen": [
        32,
        178,
        170
    ],
    "lightskyblue": [
        135,
        206,
        250
    ],
    "lightslategray": [
        119,
        136,
        153
    ],
    "lightslategrey": [
        119,
        136,
        153
    ],
    "lightsteelblue": [
        176,
        196,
        222
    ],
    "lightyellow": [
        255,
        255,
        224
    ],
    "lime": [
        0,
        255,
        0
    ],
    "limegreen": [
        50,
        205,
        50
    ],
    "linen": [
        250,
        240,
        230
    ],
    "magenta": [
        255,
        0,
        255
    ],
    "maroon": [
        128,
        0,
        0
    ],
    "mediumaquamarine": [
        102,
        205,
        170
    ],
    "mediumblue": [
        0,
        0,
        205
    ],
    "mediumorchid": [
        186,
        85,
        211
    ],
    "mediumpurple": [
        147,
        112,
        219
    ],
    "mediumseagreen": [
        60,
        179,
        113
    ],
    "mediumslateblue": [
        123,
        104,
        238
    ],
    "mediumspringgreen": [
        0,
        250,
        154
    ],
    "mediumturquoise": [
        72,
        209,
        204
    ],
    "mediumvioletred": [
        199,
        21,
        133
    ],
    "midnightblue": [
        25,
        25,
        112
    ],
    "mintcream": [
        245,
        255,
        250
    ],
    "mistyrose": [
        255,
        228,
        225
    ],
    "moccasin": [
        255,
        228,
        181
    ],
    "navajowhite": [
        255,
        222,
        173
    ],
    "navy": [
        0,
        0,
        128
    ],
    "oldlace": [
        253,
        245,
        230
    ],
    "olive": [
        128,
        128,
        0
    ],
    "olivedrab": [
        107,
        142,
        35
    ],
    "orange": [
        255,
        165,
        0
    ],
    "orangered": [
        255,
        69,
        0
    ],
    "orchid": [
        218,
        112,
        214
    ],
    "palegoldenrod": [
        238,
        232,
        170
    ],
    "palegreen": [
        152,
        251,
        152
    ],
    "paleturquoise": [
        175,
        238,
        238
    ],
    "palevioletred": [
        219,
        112,
        147
    ],
    "papayawhip": [
        255,
        239,
        213
    ],
    "peachpuff": [
        255,
        218,
        185
    ],
    "peru": [
        205,
        133,
        63
    ],
    "pink": [
        255,
        192,
        203
    ],
    "plum": [
        221,
        160,
        221
    ],
    "powderblue": [
        176,
        224,
        230
    ],
    "purple": [
        128,
        0,
        128
    ],
    "rebeccapurple": [
        102,
        51,
        153
    ],
    "red": [
        255,
        0,
        0
    ],
    "rosybrown": [
        188,
        143,
        143
    ],
    "royalblue": [
        65,
        105,
        225
    ],
    "saddlebrown": [
        139,
        69,
        19
    ],
    "salmon": [
        250,
        128,
        114
    ],
    "sandybrown": [
        244,
        164,
        96
    ],
    "seagreen": [
        46,
        139,
        87
    ],
    "seashell": [
        255,
        245,
        238
    ],
    "sienna": [
        160,
        82,
        45
    ],
    "silver": [
        192,
        192,
        192
    ],
    "skyblue": [
        135,
        206,
        235
    ],
    "slateblue": [
        106,
        90,
        205
    ],
    "slategray": [
        112,
        128,
        144
    ],
    "slategrey": [
        112,
        128,
        144
    ],
    "snow": [
        255,
        250,
        250
    ],
    "springgreen": [
        0,
        255,
        127
    ],
    "steelblue": [
        70,
        130,
        180
    ],
    "tan": [
        210,
        180,
        140
    ],
    "teal": [
        0,
        128,
        128
    ],
    "thistle": [
        216,
        191,
        216
    ],
    "tomato": [
        255,
        99,
        71
    ],
    "turquoise": [
        64,
        224,
        208
    ],
    "violet": [
        238,
        130,
        238
    ],
    "wheat": [
        245,
        222,
        179
    ],
    "white": [
        255,
        255,
        255
    ],
    "whitesmoke": [
        245,
        245,
        245
    ],
    "yellow": [
        255,
        255,
        0
    ],
    "yellowgreen": [
        154,
        205,
        50
    ]
};

});


parcelRequire.register("da0Bj", function(module, exports) {

var $l4sA6 = parcelRequire("l4sA6");
/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/ function $994cacd352ca227e$var$buildGraph() {
    var graph = {};
    // https://jsperf.com/object-keys-vs-for-in-with-closure/3
    var models = Object.keys($l4sA6);
    for(var len = models.length, i = 0; i < len; i++)graph[models[i]] = {
        // http://jsperf.com/1-vs-infinity
        // micro-opt, but this is simple.
        distance: -1,
        parent: null
    };
    return graph;
}
// https://en.wikipedia.org/wiki/Breadth-first_search
function $994cacd352ca227e$var$deriveBFS(fromModel) {
    var graph = $994cacd352ca227e$var$buildGraph();
    var queue = [
        fromModel
    ]; // unshift -> queue -> pop
    graph[fromModel].distance = 0;
    while(queue.length){
        var current = queue.pop();
        var adjacents = Object.keys($l4sA6[current]);
        for(var len = adjacents.length, i = 0; i < len; i++){
            var adjacent = adjacents[i];
            var node = graph[adjacent];
            if (node.distance === -1) {
                node.distance = graph[current].distance + 1;
                node.parent = current;
                queue.unshift(adjacent);
            }
        }
    }
    return graph;
}
function $994cacd352ca227e$var$link(from, to) {
    return function(args) {
        return to(from(args));
    };
}
function $994cacd352ca227e$var$wrapConversion(toModel, graph) {
    var path = [
        graph[toModel].parent,
        toModel
    ];
    var fn = $l4sA6[graph[toModel].parent][toModel];
    var cur = graph[toModel].parent;
    while(graph[cur].parent){
        path.unshift(graph[cur].parent);
        fn = $994cacd352ca227e$var$link($l4sA6[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
}
module.exports = function(fromModel) {
    var graph = $994cacd352ca227e$var$deriveBFS(fromModel);
    var conversion = {};
    var models = Object.keys(graph);
    for(var len = models.length, i = 0; i < len; i++){
        var toModel = models[i];
        var node = graph[toModel];
        if (node.parent === null) continue;
        conversion[toModel] = $994cacd352ca227e$var$wrapConversion(toModel, graph);
    }
    return conversion;
};

});



parcelRequire.register("dT3Hi", function(module, exports) {
"use strict";
/***
 * Convert string to hex color.
 *
 * @param {String} str Text to hash and convert to hex.
 * @returns {String}
 * @api public
 */ module.exports = function hex(str) {
    for(var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    var color = Math.floor(Math.abs(Math.sin(hash) * 10000 % 1 * 16777216)).toString(16);
    return "#" + Array(6 - color.length + 1).join("0") + color;
};

});


parcelRequire.register("5pk8Q", function(module, exports) {
"use strict";
/**
 * Kuler: Color text using CSS colors
 *
 * @constructor
 * @param {String} text The text that needs to be styled
 * @param {String} color Optional color for alternate API.
 * @api public
 */ function $3efee93d30f48a2b$var$Kuler(text, color) {
    if (color) return new $3efee93d30f48a2b$var$Kuler(text).style(color);
    if (!(this instanceof $3efee93d30f48a2b$var$Kuler)) return new $3efee93d30f48a2b$var$Kuler(text);
    this.text = text;
}
/**
 * ANSI color codes.
 *
 * @type {String}
 * @private
 */ $3efee93d30f48a2b$var$Kuler.prototype.prefix = "\x1b[";
$3efee93d30f48a2b$var$Kuler.prototype.suffix = "m";
/**
 * Parse a hex color string and parse it to it's RGB equiv.
 *
 * @param {String} color
 * @returns {Array}
 * @api private
 */ $3efee93d30f48a2b$var$Kuler.prototype.hex = function hex(color) {
    color = color[0] === "#" ? color.substring(1) : color;
    //
    // Pre-parse for shorthand hex colors.
    //
    if (color.length === 3) {
        color = color.split("");
        color[5] = color[2]; // F60##0
        color[4] = color[2]; // F60#00
        color[3] = color[1]; // F60600
        color[2] = color[1]; // F66600
        color[1] = color[0]; // FF6600
        color = color.join("");
    }
    var r = color.substring(0, 2), g = color.substring(2, 4), b = color.substring(4, 6);
    return [
        parseInt(r, 16),
        parseInt(g, 16),
        parseInt(b, 16)
    ];
};
/**
 * Transform a 255 RGB value to an RGV code.
 *
 * @param {Number} r Red color channel.
 * @param {Number} g Green color channel.
 * @param {Number} b Blue color channel.
 * @returns {String}
 * @api public
 */ $3efee93d30f48a2b$var$Kuler.prototype.rgb = function rgb(r, g, b) {
    var red = r / 255 * 5, green = g / 255 * 5, blue = b / 255 * 5;
    return this.ansi(red, green, blue);
};
/**
 * Turns RGB 0-5 values into a single ANSI code.
 *
 * @param {Number} r Red color channel.
 * @param {Number} g Green color channel.
 * @param {Number} b Blue color channel.
 * @returns {String}
 * @api public
 */ $3efee93d30f48a2b$var$Kuler.prototype.ansi = function ansi(r, g, b) {
    var red = Math.round(r), green = Math.round(g), blue = Math.round(b);
    return 16 + red * 36 + green * 6 + blue;
};
/**
 * Marks an end of color sequence.
 *
 * @returns {String} Reset sequence.
 * @api public
 */ $3efee93d30f48a2b$var$Kuler.prototype.reset = function reset() {
    return this.prefix + "39;49" + this.suffix;
};
/**
 * Colour the terminal using CSS.
 *
 * @param {String} color The HEX color code.
 * @returns {String} the escape code.
 * @api public
 */ $3efee93d30f48a2b$var$Kuler.prototype.style = function style(color) {
    return this.prefix + "38;5;" + this.rgb.apply(this, this.hex(color)) + this.suffix + this.text + this.reset();
};
//
// Expose the actual interface.
//
module.exports = $3efee93d30f48a2b$var$Kuler;

});


parcelRequire.register("6NTxk", function(module, exports) {

var $6lwqW = parcelRequire("6lwqW");
/**
 * Extracts the values from process.env.
 *
 * @type {Function}
 * @public
 */ module.exports = $6lwqW(function processenv() {
    return process.env.DEBUG || process.env.DIAGNOSTICS;
});

});
parcelRequire.register("6lwqW", function(module, exports) {

var $4EAgW = parcelRequire("4EAgW");
/**
 * Creates a new Adapter.
 *
 * @param {Function} fn Function that returns the value.
 * @returns {Function} The adapter logic.
 * @public
 */ module.exports = function create(fn) {
    return function adapter(namespace) {
        try {
            return $4EAgW(namespace, fn());
        } catch (e) {}
        return false;
    };
};

});
parcelRequire.register("4EAgW", function(module, exports) {
"use strict";
/**
 * Checks if a given namespace is allowed by the given variable.
 *
 * @param {String} name namespace that should be included.
 * @param {String} variable Value that needs to be tested.
 * @returns {Boolean} Indication if namespace is enabled.
 * @public
 */ module.exports = function enabled(name, variable) {
    if (!variable) return false;
    var variables = variable.split(/[\s,]+/), i = 0;
    for(; i < variables.length; i++){
        variable = variables[i].replace("*", ".*?");
        if ("-" === variable.charAt(0)) {
            if (new RegExp("^" + variable.substr(1) + "$").test(name)) return false;
            continue;
        }
        if (new RegExp("^" + variable + "$").test(name)) return true;
    }
    return false;
};

});



parcelRequire.register("s5QXZ", function(module, exports) {
/**
 * An idiot proof logger to be used as default. We've wrapped it in a try/catch
 * statement to ensure the environments without the `console` API do not crash
 * as well as an additional fix for ancient browsers like IE8 where the
 * `console.log` API doesn't have an `apply`, so we need to use the Function's
 * apply functionality to apply the arguments.
 *
 * @param {Object} meta Options of the logger.
 * @param {Array} messages The actuall message that needs to be logged.
 * @public
 */ module.exports = function(meta, messages) {
    //
    // So yea. IE8 doesn't have an apply so we need a work around to puke the
    // arguments in place.
    //
    try {
        Function.prototype.apply.call(console.log, console, messages);
    } catch (e) {}
};

});



parcelRequire.register("ar21H", function(module, exports) {
/**
 * tail-file.js: TODO: add file header description.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";


var $798dff6675544522$require$StringDecoder = $9xlVa$string_decoder.StringDecoder;

var $cOGCw = parcelRequire("cOGCw");
var $798dff6675544522$require$Stream = $cOGCw.Stream;
/**
 * Simple no-op function.
 * @returns {undefined}
 */ function $798dff6675544522$var$noop() {}
/**
 * TODO: add function description.
 * @param {Object} options - Options for tail.
 * @param {function} iter - Iterator function to execute on every line.
* `tail -f` a file. Options must include file.
 * @returns {mixed} - TODO: add return description.
 */ module.exports = (options, iter)=>{
    const buffer = Buffer.alloc(65536);
    const decode = new $798dff6675544522$require$StringDecoder("utf8");
    const stream = new $798dff6675544522$require$Stream();
    let buff = "";
    let pos = 0;
    let row = 0;
    if (options.start === -1) delete options.start;
    stream.readable = true;
    stream.destroy = ()=>{
        stream.destroyed = true;
        stream.emit("end");
        stream.emit("close");
    };
    $9xlVa$fs.open(options.file, "a+", "0644", (err, fd)=>{
        if (err) {
            if (!iter) stream.emit("error", err);
            else iter(err);
            stream.destroy();
            return;
        }
        (function read() {
            if (stream.destroyed) {
                $9xlVa$fs.close(fd, $798dff6675544522$var$noop);
                return;
            }
            return $9xlVa$fs.read(fd, buffer, 0, buffer.length, pos, (error, bytes)=>{
                if (error) {
                    if (!iter) stream.emit("error", error);
                    else iter(error);
                    stream.destroy();
                    return;
                }
                if (!bytes) {
                    if (buff) {
                        // eslint-disable-next-line eqeqeq
                        if (options.start == null || row > options.start) {
                            if (!iter) stream.emit("line", buff);
                            else iter(null, buff);
                        }
                        row++;
                        buff = "";
                    }
                    return setTimeout(read, 1000);
                }
                let data = decode.write(buffer.slice(0, bytes));
                if (!iter) stream.emit("data", data);
                data = (buff + data).split(/\n+/);
                const l = data.length - 1;
                let i = 0;
                for(; i < l; i++){
                    // eslint-disable-next-line eqeqeq
                    if (options.start == null || row > options.start) {
                        if (!iter) stream.emit("line", data[i]);
                        else iter(null, data[i]);
                    }
                    row++;
                }
                buff = data[l];
                pos += bytes;
                return read();
            });
        })();
    });
    if (!iter) return stream;
    return stream.destroy;
};

});


parcelRequire.register("cbx0Y", function(module, exports) {
/**
 * http.js: Transport for outputting to a json-rpcserver.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";



var $cOGCw = parcelRequire("cOGCw");
var $8df01f20d4f8961b$require$Stream = $cOGCw.Stream;

var $72KRt = parcelRequire("72KRt");

var $ag5xU = parcelRequire("ag5xU");
/**
 * Transport for outputting to a json-rpc server.
 * @type {Stream}
 * @extends {TransportStream}
 */ module.exports = class Http extends $72KRt {
    /**
   * Constructor function for the Http transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */ // eslint-disable-next-line max-statements
    constructor(options = {}){
        super(options);
        this.options = options;
        this.name = options.name || "http";
        this.ssl = !!options.ssl;
        this.host = options.host || "localhost";
        this.port = options.port;
        this.auth = options.auth;
        this.path = options.path || "";
        this.agent = options.agent;
        this.headers = options.headers || {};
        this.headers["content-type"] = "application/json";
        this.batch = options.batch || false;
        this.batchInterval = options.batchInterval || 5000;
        this.batchCount = options.batchCount || 10;
        this.batchOptions = [];
        this.batchTimeoutID = -1;
        this.batchCallback = {};
        if (!this.port) this.port = this.ssl ? 443 : 80;
    }
    /**
   * Core logging method exposed to Winston.
   * @param {Object} info - TODO: add param description.
   * @param {function} callback - TODO: add param description.
   * @returns {undefined}
   */ log(info, callback) {
        this._request(info, (err, res)=>{
            if (res && res.statusCode !== 200) err = new Error(`Invalid HTTP Status Code: ${res.statusCode}`);
            if (err) this.emit("warn", err);
            else this.emit("logged", info);
        });
        // Remark: (jcrugzz) Fire and forget here so requests dont cause buffering
        // and block more requests from happening?
        if (callback) setImmediate(callback);
    }
    /**
   * Query the transport. Options object is optional.
   * @param {Object} options -  Loggly-like query options for this instance.
   * @param {function} callback - Continuation to respond to when complete.
   * @returns {undefined}
   */ query(options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        options = {
            method: "query",
            params: this.normalizeQuery(options)
        };
        if (options.params.path) {
            options.path = options.params.path;
            delete options.params.path;
        }
        if (options.params.auth) {
            options.auth = options.params.auth;
            delete options.params.auth;
        }
        this._request(options, (err, res, body)=>{
            if (res && res.statusCode !== 200) err = new Error(`Invalid HTTP Status Code: ${res.statusCode}`);
            if (err) return callback(err);
            if (typeof body === "string") try {
                body = JSON.parse(body);
            } catch (e) {
                return callback(e);
            }
            callback(null, body);
        });
    }
    /**
   * Returns a log stream for this transport. Options object is optional.
   * @param {Object} options - Stream options for this instance.
   * @returns {Stream} - TODO: add return description
   */ stream(options = {}) {
        const stream = new $8df01f20d4f8961b$require$Stream();
        options = {
            method: "stream",
            params: options
        };
        if (options.params.path) {
            options.path = options.params.path;
            delete options.params.path;
        }
        if (options.params.auth) {
            options.auth = options.params.auth;
            delete options.params.auth;
        }
        let buff = "";
        const req = this._request(options);
        stream.destroy = ()=>req.destroy();
        req.on("data", (data)=>{
            data = (buff + data).split(/\n+/);
            const l = data.length - 1;
            let i = 0;
            for(; i < l; i++)try {
                stream.emit("log", JSON.parse(data[i]));
            } catch (e) {
                stream.emit("error", e);
            }
            buff = data[l];
        });
        req.on("error", (err)=>stream.emit("error", err));
        return stream;
    }
    /**
   * Make a request to a winstond server or any http server which can
   * handle json-rpc.
   * @param {function} options - Options to sent the request.
   * @param {function} callback - Continuation to respond to when complete.
   */ _request(options, callback) {
        options = options || {};
        const auth = options.auth || this.auth;
        const path = options.path || this.path || "";
        delete options.auth;
        delete options.path;
        if (this.batch) this._doBatch(options, callback, auth, path);
        else this._doRequest(options, callback, auth, path);
    }
    /**
   * Send or memorize the options according to batch configuration
   * @param {function} options - Options to sent the request.
   * @param {function} callback - Continuation to respond to when complete.
   * @param {Object?} auth - authentication options
   * @param {string} path - request path
   */ _doBatch(options, callback, auth, path) {
        this.batchOptions.push(options);
        if (this.batchOptions.length === 1) {
            // First message stored, it's time to start the timeout!
            const me = this;
            this.batchCallback = callback;
            this.batchTimeoutID = setTimeout(function() {
                // timeout is reached, send all messages to endpoint
                me.batchTimeoutID = -1;
                me._doBatchRequest(me.batchCallback, auth, path);
            }, this.batchInterval);
        }
        if (this.batchOptions.length === this.batchCount) // max batch count is reached, send all messages to endpoint
        this._doBatchRequest(this.batchCallback, auth, path);
    }
    /**
   * Initiate a request with the memorized batch options, stop the batch timeout
   * @param {function} callback - Continuation to respond to when complete.
   * @param {Object?} auth - authentication options
   * @param {string} path - request path
   */ _doBatchRequest(callback, auth, path) {
        if (this.batchTimeoutID > 0) {
            clearTimeout(this.batchTimeoutID);
            this.batchTimeoutID = -1;
        }
        const batchOptionsCopy = this.batchOptions.slice();
        this.batchOptions = [];
        this._doRequest(batchOptionsCopy, callback, auth, path);
    }
    /**
   * Make a request to a winstond server or any http server which can
   * handle json-rpc.
   * @param {function} options - Options to sent the request.
   * @param {function} callback - Continuation to respond to when complete.
   * @param {Object?} auth - authentication options
   * @param {string} path - request path
   */ _doRequest(options, callback, auth, path) {
        // Prepare options for outgoing HTTP request
        const headers = Object.assign({}, this.headers);
        if (auth && auth.bearer) headers.Authorization = `Bearer ${auth.bearer}`;
        const req = (this.ssl ? $9xlVa$https : $9xlVa$http).request({
            ...this.options,
            method: "POST",
            host: this.host,
            port: this.port,
            path: `/${path.replace(/^\//, "")}`,
            headers: headers,
            auth: auth && auth.username && auth.password ? `${auth.username}:${auth.password}` : "",
            agent: this.agent
        });
        req.on("error", callback);
        req.on("response", (res)=>res.on("end", ()=>callback(null, res)).resume());
        req.end(Buffer.from($ag5xU(options), "utf8"));
    }
};

});

parcelRequire.register("aHBra", function(module, exports) {
/**
 * stream.js: Transport for outputting to any arbitrary stream.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

var $btTXs = parcelRequire("btTXs");

var $7tLiS = parcelRequire("7tLiS");
var $7caaf5ca4178e05a$require$MESSAGE = $7tLiS.MESSAGE;


var $72KRt = parcelRequire("72KRt");
/**
 * Transport for outputting to any arbitrary stream.
 * @type {Stream}
 * @extends {TransportStream}
 */ module.exports = class Stream extends $72KRt {
    /**
   * Constructor function for the Console transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */ constructor(options = {}){
        super(options);
        if (!options.stream || !$btTXs(options.stream)) throw new Error("options.stream is required.");
        // We need to listen for drain events when write() returns false. This can
        // make node mad at times.
        this._stream = options.stream;
        this._stream.setMaxListeners(Infinity);
        this.isObjectMode = options.stream._writableState.objectMode;
        this.eol = typeof options.eol === "string" ? options.eol : $9xlVa$os.EOL;
    }
    /**
   * Core logging method exposed to Winston.
   * @param {Object} info - TODO: add param description.
   * @param {Function} callback - TODO: add param description.
   * @returns {undefined}
   */ log(info, callback) {
        setImmediate(()=>this.emit("logged", info));
        if (this.isObjectMode) {
            this._stream.write(info);
            if (callback) callback(); // eslint-disable-line callback-return
            return;
        }
        this._stream.write(`${info[$7caaf5ca4178e05a$require$MESSAGE]}${this.eol}`);
        if (callback) callback(); // eslint-disable-line callback-return
        return;
    }
};

});
parcelRequire.register("btTXs", function(module, exports) {
"use strict";
const $85bdcf4093a43d06$var$isStream = (stream)=>stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
$85bdcf4093a43d06$var$isStream.writable = (stream)=>$85bdcf4093a43d06$var$isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
$85bdcf4093a43d06$var$isStream.readable = (stream)=>$85bdcf4093a43d06$var$isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
$85bdcf4093a43d06$var$isStream.duplex = (stream)=>$85bdcf4093a43d06$var$isStream.writable(stream) && $85bdcf4093a43d06$var$isStream.readable(stream);
$85bdcf4093a43d06$var$isStream.transform = (stream)=>$85bdcf4093a43d06$var$isStream.duplex(stream) && typeof stream._transform === "function";
module.exports = $85bdcf4093a43d06$var$isStream;

});



parcelRequire.register("Vm3ka", function(module, exports) {

$parcel$export(module.exports, "cli", () => $0ac66e2d1fe7f152$export$939799c7582f469e, (v) => $0ac66e2d1fe7f152$export$939799c7582f469e = v);
$parcel$export(module.exports, "npm", () => $0ac66e2d1fe7f152$export$7f92512924424016, (v) => $0ac66e2d1fe7f152$export$7f92512924424016 = v);
$parcel$export(module.exports, "syslog", () => $0ac66e2d1fe7f152$export$995bff0e75b8c234, (v) => $0ac66e2d1fe7f152$export$995bff0e75b8c234 = v);
$parcel$export(module.exports, "addColors", () => $0ac66e2d1fe7f152$export$6f4bf07a61cd31ed, (v) => $0ac66e2d1fe7f152$export$6f4bf07a61cd31ed = v);
/**
 * Export config set for the CLI.
 * @type {Object}
 */ var $0ac66e2d1fe7f152$export$939799c7582f469e;
/**
 * Export config set for npm.
 * @type {Object}
 */ var $0ac66e2d1fe7f152$export$7f92512924424016;
/**
 * Export config set for the syslog.
 * @type {Object}
 */ var $0ac66e2d1fe7f152$export$995bff0e75b8c234;
/**
 * Hoist addColors from logform where it was refactored into in winston@3.
 * @type {Object}
 */ var $0ac66e2d1fe7f152$export$6f4bf07a61cd31ed;
/**
 * index.js: Default settings for all levels that winston knows about.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

var $2hjEK = parcelRequire("2hjEK");

var $7tLiS = parcelRequire("7tLiS");
var $0ac66e2d1fe7f152$require$configs = $7tLiS.configs;
$0ac66e2d1fe7f152$export$939799c7582f469e = $2hjEK.levels($0ac66e2d1fe7f152$require$configs.cli);
$0ac66e2d1fe7f152$export$7f92512924424016 = $2hjEK.levels($0ac66e2d1fe7f152$require$configs.npm);
$0ac66e2d1fe7f152$export$995bff0e75b8c234 = $2hjEK.levels($0ac66e2d1fe7f152$require$configs.syslog);
$0ac66e2d1fe7f152$export$6f4bf07a61cd31ed = $2hjEK.levels;

});
parcelRequire.register("2hjEK", function(module, exports) {

$parcel$export(module.exports, "format", () => $1a8c6aa0da50eb39$export$d9468344d3651243, (v) => $1a8c6aa0da50eb39$export$d9468344d3651243 = v);
$parcel$export(module.exports, "levels", () => $1a8c6aa0da50eb39$export$cc32c6afed33d362, (v) => $1a8c6aa0da50eb39$export$cc32c6afed33d362 = v);
var $1a8c6aa0da50eb39$export$d9468344d3651243;
/*
 * @api public
 * @method {function} levels
 * Registers the specified levels with logform.
 */ var $1a8c6aa0da50eb39$export$cc32c6afed33d362;
"use strict";

/*
 * @api public
 * @property {function} format
 * Both the construction method and set of exposed
 * formats.
 */ const $1a8c6aa0da50eb39$var$format = $1a8c6aa0da50eb39$export$d9468344d3651243 = (parcelRequire("lqhyJ"));

$1a8c6aa0da50eb39$export$cc32c6afed33d362 = (parcelRequire("fsNYU"));
/*
 * @api private
 * method {function} exposeFormat
 * Exposes a sub-format on the main format object
 * as a lazy-loaded getter.
 */ function $1a8c6aa0da50eb39$var$exposeFormat(name, requireFormat) {
    Object.defineProperty($1a8c6aa0da50eb39$var$format, name, {
        get () {
            return requireFormat();
        },
        configurable: true
    });
}

//
// Setup all transports as lazy-loaded getters.
//
$1a8c6aa0da50eb39$var$exposeFormat("align", function() {
    return (parcelRequire("kjTEw"));
});

$1a8c6aa0da50eb39$var$exposeFormat("errors", function() {
    return (parcelRequire("2uh0s"));
});

$1a8c6aa0da50eb39$var$exposeFormat("cli", function() {
    return (parcelRequire("3jgWx"));
});

$1a8c6aa0da50eb39$var$exposeFormat("combine", function() {
    return (parcelRequire("csRG3"));
});

$1a8c6aa0da50eb39$var$exposeFormat("colorize", function() {
    return (parcelRequire("eOReR"));
});

$1a8c6aa0da50eb39$var$exposeFormat("json", function() {
    return (parcelRequire("iX4fb"));
});

$1a8c6aa0da50eb39$var$exposeFormat("label", function() {
    return (parcelRequire("2fzy0"));
});

$1a8c6aa0da50eb39$var$exposeFormat("logstash", function() {
    return (parcelRequire("cw1ks"));
});

$1a8c6aa0da50eb39$var$exposeFormat("metadata", function() {
    return (parcelRequire("bfYg0"));
});

$1a8c6aa0da50eb39$var$exposeFormat("ms", function() {
    return (parcelRequire("lvCZm"));
});

$1a8c6aa0da50eb39$var$exposeFormat("padLevels", function() {
    return (parcelRequire("3CTO0"));
});

$1a8c6aa0da50eb39$var$exposeFormat("prettyPrint", function() {
    return (parcelRequire("eKbmI"));
});

$1a8c6aa0da50eb39$var$exposeFormat("printf", function() {
    return (parcelRequire("iLfjv"));
});

$1a8c6aa0da50eb39$var$exposeFormat("simple", function() {
    return (parcelRequire("4UEcd"));
});

$1a8c6aa0da50eb39$var$exposeFormat("splat", function() {
    return (parcelRequire("RKDth"));
});

$1a8c6aa0da50eb39$var$exposeFormat("timestamp", function() {
    return (parcelRequire("32g3q"));
});

$1a8c6aa0da50eb39$var$exposeFormat("uncolorize", function() {
    return (parcelRequire("3wuCW"));
});

});


parcelRequire.register("3jY7l", function(module, exports) {
/**
 * create-logger.js: Logger factory for winston logger instances.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

var $7tLiS = parcelRequire("7tLiS");
var $26b1c77f09a0a384$require$LEVEL = $7tLiS.LEVEL;

var $Vm3ka = parcelRequire("Vm3ka");

var $gRTm4 = parcelRequire("gRTm4");

const $26b1c77f09a0a384$var$debug = (parcelRequire("dJEkP"))("winston:create-logger");
function $26b1c77f09a0a384$var$isLevelEnabledFunctionName(level) {
    return "is" + level.charAt(0).toUpperCase() + level.slice(1) + "Enabled";
}
/**
 * Create a new instance of a winston Logger. Creates a new
 * prototype for each instance.
 * @param {!Object} opts - Options for the created logger.
 * @returns {Logger} - A newly created logger instance.
 */ module.exports = function(opts = {}) {
    //
    // Default levels: npm
    //
    opts.levels = opts.levels || $Vm3ka.npm.levels;
    /**
   * DerivedLogger to attach the logs level methods.
   * @type {DerivedLogger}
   * @extends {Logger}
   */ class DerivedLogger extends $gRTm4 {
        /**
     * Create a new class derived logger for which the levels can be attached to
     * the prototype of. This is a V8 optimization that is well know to increase
     * performance of prototype functions.
     * @param {!Object} options - Options for the created logger.
     */ constructor(options){
            super(options);
        }
    }
    const logger = new DerivedLogger(opts);
    //
    // Create the log level methods for the derived logger.
    //
    Object.keys(opts.levels).forEach(function(level) {
        $26b1c77f09a0a384$var$debug('Define prototype method for "%s"', level);
        if (level === "log") {
            // eslint-disable-next-line no-console
            console.warn('Level "log" not defined: conflicts with the method "log". Use a different level name.');
            return;
        }
        //
        // Define prototype methods for each log level e.g.:
        // logger.log('info', msg) implies these methods are defined:
        // - logger.info(msg)
        // - logger.isInfoEnabled()
        //
        // Remark: to support logger.child this **MUST** be a function
        // so it'll always be called on the instance instead of a fixed
        // place in the prototype chain.
        //
        DerivedLogger.prototype[level] = function(...args) {
            // Prefer any instance scope, but default to "root" logger
            const self = this || logger;
            // Optimize the hot-path which is the single object.
            if (args.length === 1) {
                const [msg] = args;
                const info = msg && msg.message && msg || {
                    message: msg
                };
                info.level = info[$26b1c77f09a0a384$require$LEVEL] = level;
                self._addDefaultMeta(info);
                self.write(info);
                return this || logger;
            }
            // When provided nothing assume the empty string
            if (args.length === 0) {
                self.log(level, "");
                return self;
            }
            // Otherwise build argument list which could potentially conform to
            // either:
            // . v3 API: log(obj)
            // 2. v1/v2 API: log(level, msg, ... [string interpolate], [{metadata}], [callback])
            return self.log(level, ...args);
        };
        DerivedLogger.prototype[$26b1c77f09a0a384$var$isLevelEnabledFunctionName(level)] = function() {
            return (this || logger).isLevelEnabled(level);
        };
    });
    return logger;
};

});
parcelRequire.register("gRTm4", function(module, exports) {
/**
 * logger.js: TODO: add file header description.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

var $cOGCw = parcelRequire("cOGCw");
var $c47c88f046966586$require$Stream = $cOGCw.Stream;
var $c47c88f046966586$require$Transform = $cOGCw.Transform;

var $lC7MF = parcelRequire("lC7MF");

var $7tLiS = parcelRequire("7tLiS");
var $c47c88f046966586$require$LEVEL = $7tLiS.LEVEL;
var $c47c88f046966586$require$SPLAT = $7tLiS.SPLAT;

var $btTXs = parcelRequire("btTXs");

var $6Z8WK = parcelRequire("6Z8WK");

var $g7qlT = parcelRequire("g7qlT");

var $ggirm = parcelRequire("ggirm");

var $kwsWr = parcelRequire("kwsWr");

var $gCsvX = parcelRequire("gCsvX");
var $c47c88f046966586$require$warn = $gCsvX.warn;

var $Vm3ka = parcelRequire("Vm3ka");
/**
 * Captures the number of format (i.e. %s strings) in a given string.
 * Based on `util.format`, see Node.js source:
 * https://github.com/nodejs/node/blob/b1c8f15c5f169e021f7c46eb7b219de95fe97603/lib/util.js#L201-L230
 * @type {RegExp}
 */ const $c47c88f046966586$var$formatRegExp = /%[scdjifoO%]/g;

/**
 * TODO: add class description.
 * @type {Logger}
 * @extends {Transform}
 */ class $c47c88f046966586$var$Logger extends $c47c88f046966586$require$Transform {
    /**
   * Constructor function for the Logger object responsible for persisting log
   * messages and metadata to one or more transports.
   * @param {!Object} options - foo
   */ constructor(options){
        super({
            objectMode: true
        });
        this.configure(options);
    }
    child(defaultRequestMetadata) {
        const logger = this;
        return Object.create(logger, {
            write: {
                value: function(info) {
                    const infoClone = Object.assign({}, defaultRequestMetadata, info);
                    // Object.assign doesn't copy inherited Error
                    // properties so we have to do that explicitly
                    //
                    // Remark (indexzero): we should remove this
                    // since the errors format will handle this case.
                    //
                    if (info instanceof Error) {
                        infoClone.stack = info.stack;
                        infoClone.message = info.message;
                    }
                    logger.write(infoClone);
                }
            }
        });
    }
    /**
   * This will wholesale reconfigure this instance by:
   * 1. Resetting all transports. Older transports will be removed implicitly.
   * 2. Set all other options including levels, colors, rewriters, filters,
   *    exceptionHandlers, etc.
   * @param {!Object} options - TODO: add param description.
   * @returns {undefined}
   */ configure({ silent: silent , format: format , defaultMeta: defaultMeta , levels: levels , level: level = "info" , exitOnError: exitOnError = true , transports: transports , colors: colors , emitErrs: emitErrs , formatters: formatters , padLevels: padLevels , rewriters: rewriters , stripColors: stripColors , exceptionHandlers: exceptionHandlers , rejectionHandlers: rejectionHandlers  } = {}) {
        // Reset transports if we already have them
        if (this.transports.length) this.clear();
        this.silent = silent;
        this.format = format || this.format || (parcelRequire("iX4fb"))();
        this.defaultMeta = defaultMeta || null;
        // Hoist other options onto this instance.
        this.levels = levels || this.levels || $Vm3ka.npm.levels;
        this.level = level;
        if (this.exceptions) this.exceptions.unhandle();
        if (this.rejections) this.rejections.unhandle();
        this.exceptions = new $6Z8WK(this);
        this.rejections = new $g7qlT(this);
        this.profilers = {};
        this.exitOnError = exitOnError;
        // Add all transports we have been provided.
        if (transports) {
            transports = Array.isArray(transports) ? transports : [
                transports
            ];
            transports.forEach((transport)=>this.add(transport));
        }
        if (colors || emitErrs || formatters || padLevels || rewriters || stripColors) throw new Error([
            "{ colors, emitErrs, formatters, padLevels, rewriters, stripColors } were removed in winston@3.0.0.",
            "Use a custom winston.format(function) instead.",
            "See: https://github.com/winstonjs/winston/tree/master/UPGRADE-3.0.md"
        ].join("\n"));
        if (exceptionHandlers) this.exceptions.handle(exceptionHandlers);
        if (rejectionHandlers) this.rejections.handle(rejectionHandlers);
    }
    isLevelEnabled(level) {
        const givenLevelValue = $c47c88f046966586$var$getLevelValue(this.levels, level);
        if (givenLevelValue === null) return false;
        const configuredLevelValue = $c47c88f046966586$var$getLevelValue(this.levels, this.level);
        if (configuredLevelValue === null) return false;
        if (!this.transports || this.transports.length === 0) return configuredLevelValue >= givenLevelValue;
        const index = this.transports.findIndex((transport)=>{
            let transportLevelValue = $c47c88f046966586$var$getLevelValue(this.levels, transport.level);
            if (transportLevelValue === null) transportLevelValue = configuredLevelValue;
            return transportLevelValue >= givenLevelValue;
        });
        return index !== -1;
    }
    /* eslint-disable valid-jsdoc */ /**
   * Ensure backwards compatibility with a `log` method
   * @param {mixed} level - Level the log message is written at.
   * @param {mixed} msg - TODO: add param description.
   * @param {mixed} meta - TODO: add param description.
   * @returns {Logger} - TODO: add return description.
   *
   * @example
   *    // Supports the existing API:
   *    logger.log('info', 'Hello world', { custom: true });
   *    logger.log('info', new Error('Yo, it\'s on fire'));
   *
   *    // Requires winston.format.splat()
   *    logger.log('info', '%s %d%%', 'A string', 50, { thisIsMeta: true });
   *
   *    // And the new API with a single JSON literal:
   *    logger.log({ level: 'info', message: 'Hello world', custom: true });
   *    logger.log({ level: 'info', message: new Error('Yo, it\'s on fire') });
   *
   *    // Also requires winston.format.splat()
   *    logger.log({
   *      level: 'info',
   *      message: '%s %d%%',
   *      [SPLAT]: ['A string', 50],
   *      meta: { thisIsMeta: true }
   *    });
   *
   */ /* eslint-enable valid-jsdoc */ log(level, msg, ...splat) {
        // eslint-disable-line max-params
        // Optimize for the hotpath of logging JSON literals
        if (arguments.length === 1) {
            // Yo dawg, I heard you like levels ... seriously ...
            // In this context the LHS `level` here is actually the `info` so read
            // this as: info[LEVEL] = info.level;
            level[$c47c88f046966586$require$LEVEL] = level.level;
            this._addDefaultMeta(level);
            this.write(level);
            return this;
        }
        // Slightly less hotpath, but worth optimizing for.
        if (arguments.length === 2) {
            if (msg && typeof msg === "object") {
                msg[$c47c88f046966586$require$LEVEL] = msg.level = level;
                this._addDefaultMeta(msg);
                this.write(msg);
                return this;
            }
            msg = {
                [$c47c88f046966586$require$LEVEL]: level,
                level: level,
                message: msg
            };
            this._addDefaultMeta(msg);
            this.write(msg);
            return this;
        }
        const [meta] = splat;
        if (typeof meta === "object" && meta !== null) {
            // Extract tokens, if none available default to empty array to
            // ensure consistancy in expected results
            const tokens = msg && msg.match && msg.match($c47c88f046966586$var$formatRegExp);
            if (!tokens) {
                const info = Object.assign({}, this.defaultMeta, meta, {
                    [$c47c88f046966586$require$LEVEL]: level,
                    [$c47c88f046966586$require$SPLAT]: splat,
                    level: level,
                    message: msg
                });
                if (meta.message) info.message = `${info.message} ${meta.message}`;
                if (meta.stack) info.stack = meta.stack;
                this.write(info);
                return this;
            }
        }
        this.write(Object.assign({}, this.defaultMeta, {
            [$c47c88f046966586$require$LEVEL]: level,
            [$c47c88f046966586$require$SPLAT]: splat,
            level: level,
            message: msg
        }));
        return this;
    }
    /**
   * Pushes data so that it can be picked up by all of our pipe targets.
   * @param {mixed} info - TODO: add param description.
   * @param {mixed} enc - TODO: add param description.
   * @param {mixed} callback - Continues stream processing.
   * @returns {undefined}
   * @private
   */ _transform(info, enc, callback) {
        if (this.silent) return callback();
        // [LEVEL] is only soft guaranteed to be set here since we are a proper
        // stream. It is likely that `info` came in through `.log(info)` or
        // `.info(info)`. If it is not defined, however, define it.
        // This LEVEL symbol is provided by `triple-beam` and also used in:
        // - logform
        // - winston-transport
        // - abstract-winston-transport
        if (!info[$c47c88f046966586$require$LEVEL]) info[$c47c88f046966586$require$LEVEL] = info.level;
        // Remark: really not sure what to do here, but this has been reported as
        // very confusing by pre winston@2.0.0 users as quite confusing when using
        // custom levels.
        if (!this.levels[info[$c47c88f046966586$require$LEVEL]] && this.levels[info[$c47c88f046966586$require$LEVEL]] !== 0) // eslint-disable-next-line no-console
        console.error("[winston] Unknown logger level: %s", info[$c47c88f046966586$require$LEVEL]);
        // Remark: not sure if we should simply error here.
        if (!this._readableState.pipes) // eslint-disable-next-line no-console
        console.error("[winston] Attempt to write logs with no transports %j", info);
        // Here we write to the `format` pipe-chain, which on `readable` above will
        // push the formatted `info` Object onto the buffer for this instance. We trap
        // (and re-throw) any errors generated by the user-provided format, but also
        // guarantee that the streams callback is invoked so that we can continue flowing.
        try {
            this.push(this.format.transform(info, this.format.options));
        } finally{
            this._writableState.sync = false;
            // eslint-disable-next-line callback-return
            callback();
        }
    }
    /**
   * Delays the 'finish' event until all transport pipe targets have
   * also emitted 'finish' or are already finished.
   * @param {mixed} callback - Continues stream processing.
   */ _final(callback) {
        const transports = this.transports.slice();
        $lC7MF(transports, (transport, next)=>{
            if (!transport || transport.finished) return setImmediate(next);
            transport.once("finish", next);
            transport.end();
        }, callback);
    }
    /**
   * Adds the transport to this logger instance by piping to it.
   * @param {mixed} transport - TODO: add param description.
   * @returns {Logger} - TODO: add return description.
   */ add(transport) {
        // Support backwards compatibility with all existing `winston < 3.x.x`
        // transports which meet one of two criteria:
        // 1. They inherit from winston.Transport in  < 3.x.x which is NOT a stream.
        // 2. They expose a log method which has a length greater than 2 (i.e. more then
        //    just `log(info, callback)`.
        const target = !$btTXs(transport) || transport.log.length > 2 ? new $ggirm({
            transport: transport
        }) : transport;
        if (!target._writableState || !target._writableState.objectMode) throw new Error("Transports must WritableStreams in objectMode. Set { objectMode: true }.");
        // Listen for the `error` event and the `warn` event on the new Transport.
        this._onEvent("error", target);
        this._onEvent("warn", target);
        this.pipe(target);
        if (transport.handleExceptions) this.exceptions.handle();
        if (transport.handleRejections) this.rejections.handle();
        return this;
    }
    /**
   * Removes the transport from this logger instance by unpiping from it.
   * @param {mixed} transport - TODO: add param description.
   * @returns {Logger} - TODO: add return description.
   */ remove(transport) {
        if (!transport) return this;
        let target = transport;
        if (!$btTXs(transport) || transport.log.length > 2) target = this.transports.filter((match)=>match.transport === transport)[0];
        if (target) this.unpipe(target);
        return this;
    }
    /**
   * Removes all transports from this logger instance.
   * @returns {Logger} - TODO: add return description.
   */ clear() {
        this.unpipe();
        return this;
    }
    /**
   * Cleans up resources (streams, event listeners) for all transports
   * associated with this instance (if necessary).
   * @returns {Logger} - TODO: add return description.
   */ close() {
        this.exceptions.unhandle();
        this.rejections.unhandle();
        this.clear();
        this.emit("close");
        return this;
    }
    /**
   * Sets the `target` levels specified on this instance.
   * @param {Object} Target levels to use on this instance.
   */ setLevels() {
        $c47c88f046966586$require$warn.deprecated("setLevels");
    }
    /**
   * Queries the all transports for this instance with the specified `options`.
   * This will aggregate each transport's results into one object containing
   * a property per transport.
   * @param {Object} options - Query options for this instance.
   * @param {function} callback - Continuation to respond to when complete.
   */ query(options, callback) {
        if (typeof options === "function") {
            callback = options;
            options = {};
        }
        options = options || {};
        const results = {};
        const queryObject = Object.assign({}, options.query || {});
        // Helper function to query a single transport
        function queryTransport(transport, next) {
            if (options.query && typeof transport.formatQuery === "function") options.query = transport.formatQuery(queryObject);
            transport.query(options, (err, res)=>{
                if (err) return next(err);
                if (typeof transport.formatResults === "function") res = transport.formatResults(res, options.format);
                next(null, res);
            });
        }
        // Helper function to accumulate the results from `queryTransport` into
        // the `results`.
        function addResults(transport, next) {
            queryTransport(transport, (err, result)=>{
                // queryTransport could potentially invoke the callback multiple times
                // since Transport code can be unpredictable.
                if (next) {
                    result = err || result;
                    if (result) results[transport.name] = result;
                    // eslint-disable-next-line callback-return
                    next();
                }
                next = null;
            });
        }
        // Iterate over the transports in parallel setting the appropriate key in
        // the `results`.
        $lC7MF(this.transports.filter((transport)=>!!transport.query), addResults, ()=>callback(null, results));
    }
    /**
   * Returns a log stream for all transports. Options object is optional.
   * @param{Object} options={} - Stream options for this instance.
   * @returns {Stream} - TODO: add return description.
   */ stream(options = {}) {
        const out = new $c47c88f046966586$require$Stream();
        const streams = [];
        out._streams = streams;
        out.destroy = ()=>{
            let i = streams.length;
            while(i--)streams[i].destroy();
        };
        // Create a list of all transports for this instance.
        this.transports.filter((transport)=>!!transport.stream).forEach((transport)=>{
            const str = transport.stream(options);
            if (!str) return;
            streams.push(str);
            str.on("log", (log)=>{
                log.transport = log.transport || [];
                log.transport.push(transport.name);
                out.emit("log", log);
            });
            str.on("error", (err)=>{
                err.transport = err.transport || [];
                err.transport.push(transport.name);
                out.emit("error", err);
            });
        });
        return out;
    }
    /**
   * Returns an object corresponding to a specific timing. When done is called
   * the timer will finish and log the duration. e.g.:
   * @returns {Profile} - TODO: add return description.
   * @example
   *    const timer = winston.startTimer()
   *    setTimeout(() => {
   *      timer.done({
   *        message: 'Logging message'
   *      });
   *    }, 1000);
   */ startTimer() {
        return new $kwsWr(this);
    }
    /**
   * Tracks the time inbetween subsequent calls to this method with the same
   * `id` parameter. The second call to this method will log the difference in
   * milliseconds along with the message.
   * @param {string} id Unique id of the profiler
   * @returns {Logger} - TODO: add return description.
   */ profile(id, ...args) {
        const time = Date.now();
        if (this.profilers[id]) {
            const timeEnd = this.profilers[id];
            delete this.profilers[id];
            // Attempt to be kind to users if they are still using older APIs.
            if (typeof args[args.length - 2] === "function") {
                // eslint-disable-next-line no-console
                console.warn("Callback function no longer supported as of winston@3.0.0");
                args.pop();
            }
            // Set the duration property of the metadata
            const info = typeof args[args.length - 1] === "object" ? args.pop() : {};
            info.level = info.level || "info";
            info.durationMs = time - timeEnd;
            info.message = info.message || id;
            return this.write(info);
        }
        this.profilers[id] = time;
        return this;
    }
    /**
   * Backwards compatibility to `exceptions.handle` in winston < 3.0.0.
   * @returns {undefined}
   * @deprecated
   */ handleExceptions(...args) {
        // eslint-disable-next-line no-console
        console.warn("Deprecated: .handleExceptions() will be removed in winston@4. Use .exceptions.handle()");
        this.exceptions.handle(...args);
    }
    /**
   * Backwards compatibility to `exceptions.handle` in winston < 3.0.0.
   * @returns {undefined}
   * @deprecated
   */ unhandleExceptions(...args) {
        // eslint-disable-next-line no-console
        console.warn("Deprecated: .unhandleExceptions() will be removed in winston@4. Use .exceptions.unhandle()");
        this.exceptions.unhandle(...args);
    }
    /**
   * Throw a more meaningful deprecation notice
   * @throws {Error} - TODO: add throws description.
   */ cli() {
        throw new Error([
            "Logger.cli() was removed in winston@3.0.0",
            "Use a custom winston.formats.cli() instead.",
            "See: https://github.com/winstonjs/winston/tree/master/UPGRADE-3.0.md"
        ].join("\n"));
    }
    /**
   * Bubbles the `event` that occured on the specified `transport` up
   * from this instance.
   * @param {string} event - The event that occured
   * @param {Object} transport - Transport on which the event occured
   * @private
   */ _onEvent(event, transport) {
        function transportEvent(err) {
            // https://github.com/winstonjs/winston/issues/1364
            if (event === "error" && !this.transports.includes(transport)) this.add(transport);
            this.emit(event, err, transport);
        }
        if (!transport["__winston" + event]) {
            transport["__winston" + event] = transportEvent.bind(this);
            transport.on(event, transport["__winston" + event]);
        }
    }
    _addDefaultMeta(msg) {
        if (this.defaultMeta) Object.assign(msg, this.defaultMeta);
    }
}
function $c47c88f046966586$var$getLevelValue(levels, level) {
    const value = levels[level];
    if (!value && value !== 0) return null;
    return value;
}
/**
 * Represents the current readableState pipe targets for this Logger instance.
 * @type {Array|Object}
 */ Object.defineProperty($c47c88f046966586$var$Logger.prototype, "transports", {
    configurable: false,
    enumerable: true,
    get () {
        const { pipes: pipes  } = this._readableState;
        return !Array.isArray(pipes) ? [
            pipes
        ].filter(Boolean) : pipes;
    }
});
module.exports = $c47c88f046966586$var$Logger;

});
parcelRequire.register("lC7MF", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

var $9vqns = parcelRequire("9vqns");
var $fbc32f4adac51a1f$var$_eachOf2 = $fbc32f4adac51a1f$var$_interopRequireDefault($9vqns);

var $fbb7K = parcelRequire("fbb7K");
var $fbc32f4adac51a1f$var$_withoutIndex2 = $fbc32f4adac51a1f$var$_interopRequireDefault($fbb7K);

var $48jUl = parcelRequire("48jUl");
var $fbc32f4adac51a1f$var$_wrapAsync2 = $fbc32f4adac51a1f$var$_interopRequireDefault($48jUl);

var $h0nmz = parcelRequire("h0nmz");
var $fbc32f4adac51a1f$var$_awaitify2 = $fbc32f4adac51a1f$var$_interopRequireDefault($h0nmz);
function $fbc32f4adac51a1f$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/**
 * Applies the function `iteratee` to each item in `coll`, in parallel.
 * The `iteratee` is called with an item from the list, and a callback for when
 * it has finished. If the `iteratee` passes an error to its `callback`, the
 * main `callback` (for the `each` function) is immediately called with the
 * error.
 *
 * Note, that since this function applies `iteratee` to each item in parallel,
 * there is no guarantee that the iteratee functions will complete in order.
 *
 * @name each
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEach
 * @category Collection
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - An async function to apply to
 * each item in `coll`. Invoked with (item, callback).
 * The array index is not passed to the iteratee.
 * If you need the index, use `eachOf`.
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 * @example
 *
 * // dir1 is a directory that contains file1.txt, file2.txt
 * // dir2 is a directory that contains file3.txt, file4.txt
 * // dir3 is a directory that contains file5.txt
 * // dir4 does not exist
 *
 * const fileList = [ 'dir1/file2.txt', 'dir2/file3.txt', 'dir/file5.txt'];
 * const withMissingFileList = ['dir1/file1.txt', 'dir4/file2.txt'];
 *
 * // asynchronous function that deletes a file
 * const deleteFile = function(file, callback) {
 *     fs.unlink(file, callback);
 * };
 *
 * // Using callbacks
 * async.each(fileList, deleteFile, function(err) {
 *     if( err ) {
 *         console.log(err);
 *     } else {
 *         console.log('All files have been deleted successfully');
 *     }
 * });
 *
 * // Error Handling
 * async.each(withMissingFileList, deleteFile, function(err){
 *     console.log(err);
 *     // [ Error: ENOENT: no such file or directory ]
 *     // since dir4/file2.txt does not exist
 *     // dir1/file1.txt could have been deleted
 * });
 *
 * // Using Promises
 * async.each(fileList, deleteFile)
 * .then( () => {
 *     console.log('All files have been deleted successfully');
 * }).catch( err => {
 *     console.log(err);
 * });
 *
 * // Error Handling
 * async.each(fileList, deleteFile)
 * .then( () => {
 *     console.log('All files have been deleted successfully');
 * }).catch( err => {
 *     console.log(err);
 *     // [ Error: ENOENT: no such file or directory ]
 *     // since dir4/file2.txt does not exist
 *     // dir1/file1.txt could have been deleted
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         await async.each(files, deleteFile);
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * // Error Handling
 * async () => {
 *     try {
 *         await async.each(withMissingFileList, deleteFile);
 *     }
 *     catch (err) {
 *         console.log(err);
 *         // [ Error: ENOENT: no such file or directory ]
 *         // since dir4/file2.txt does not exist
 *         // dir1/file1.txt could have been deleted
 *     }
 * }
 *
 */ function $fbc32f4adac51a1f$var$eachLimit(coll, iteratee, callback) {
    return (0, $fbc32f4adac51a1f$var$_eachOf2.default)(coll, (0, $fbc32f4adac51a1f$var$_withoutIndex2.default)((0, $fbc32f4adac51a1f$var$_wrapAsync2.default)(iteratee)), callback);
}
module.exports.default = (0, $fbc32f4adac51a1f$var$_awaitify2.default)($fbc32f4adac51a1f$var$eachLimit, 3);
module.exports = module.exports["default"];

});
parcelRequire.register("9vqns", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

var $eN7vK = parcelRequire("eN7vK");
var $6ebb78516ab4055a$var$_isArrayLike2 = $6ebb78516ab4055a$var$_interopRequireDefault($eN7vK);

var $hf5KC = parcelRequire("hf5KC");
var $6ebb78516ab4055a$var$_breakLoop2 = $6ebb78516ab4055a$var$_interopRequireDefault($hf5KC);

var $a9GrO = parcelRequire("a9GrO");
var $6ebb78516ab4055a$var$_eachOfLimit2 = $6ebb78516ab4055a$var$_interopRequireDefault($a9GrO);

var $fQRVj = parcelRequire("fQRVj");
var $6ebb78516ab4055a$var$_once2 = $6ebb78516ab4055a$var$_interopRequireDefault($fQRVj);

var $4449u = parcelRequire("4449u");
var $6ebb78516ab4055a$var$_onlyOnce2 = $6ebb78516ab4055a$var$_interopRequireDefault($4449u);

var $48jUl = parcelRequire("48jUl");
var $6ebb78516ab4055a$var$_wrapAsync2 = $6ebb78516ab4055a$var$_interopRequireDefault($48jUl);

var $h0nmz = parcelRequire("h0nmz");
var $6ebb78516ab4055a$var$_awaitify2 = $6ebb78516ab4055a$var$_interopRequireDefault($h0nmz);
function $6ebb78516ab4055a$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// eachOf implementation optimized for array-likes
function $6ebb78516ab4055a$var$eachOfArrayLike(coll, iteratee, callback) {
    callback = (0, $6ebb78516ab4055a$var$_once2.default)(callback);
    var index = 0, completed = 0, { length: length  } = coll, canceled = false;
    if (length === 0) callback(null);
    function iteratorCallback(err, value) {
        if (err === false) canceled = true;
        if (canceled === true) return;
        if (err) callback(err);
        else if (++completed === length || value === $6ebb78516ab4055a$var$_breakLoop2.default) callback(null);
    }
    for(; index < length; index++)iteratee(coll[index], index, (0, $6ebb78516ab4055a$var$_onlyOnce2.default)(iteratorCallback));
}
// a generic version of eachOf which can handle array, object, and iterator cases.
function $6ebb78516ab4055a$var$eachOfGeneric(coll, iteratee, callback) {
    return (0, $6ebb78516ab4055a$var$_eachOfLimit2.default)(coll, Infinity, iteratee, callback);
}
/**
 * Like [`each`]{@link module:Collections.each}, except that it passes the key (or index) as the second argument
 * to the iteratee.
 *
 * @name eachOf
 * @static
 * @memberOf module:Collections
 * @method
 * @alias forEachOf
 * @category Collection
 * @see [async.each]{@link module:Collections.each}
 * @param {Array|Iterable|AsyncIterable|Object} coll - A collection to iterate over.
 * @param {AsyncFunction} iteratee - A function to apply to each
 * item in `coll`.
 * The `key` is the item's key, or index in the case of an array.
 * Invoked with (item, key, callback).
 * @param {Function} [callback] - A callback which is called when all
 * `iteratee` functions have finished, or an error occurs. Invoked with (err).
 * @returns {Promise} a promise, if a callback is omitted
 * @example
 *
 * // dev.json is a file containing a valid json object config for dev environment
 * // dev.json is a file containing a valid json object config for test environment
 * // prod.json is a file containing a valid json object config for prod environment
 * // invalid.json is a file with a malformed json object
 *
 * let configs = {}; //global variable
 * let validConfigFileMap = {dev: 'dev.json', test: 'test.json', prod: 'prod.json'};
 * let invalidConfigFileMap = {dev: 'dev.json', test: 'test.json', invalid: 'invalid.json'};
 *
 * // asynchronous function that reads a json file and parses the contents as json object
 * function parseFile(file, key, callback) {
 *     fs.readFile(file, "utf8", function(err, data) {
 *         if (err) return calback(err);
 *         try {
 *             configs[key] = JSON.parse(data);
 *         } catch (e) {
 *             return callback(e);
 *         }
 *         callback();
 *     });
 * }
 *
 * // Using callbacks
 * async.forEachOf(validConfigFileMap, parseFile, function (err) {
 *     if (err) {
 *         console.error(err);
 *     } else {
 *         console.log(configs);
 *         // configs is now a map of JSON data, e.g.
 *         // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
 *     }
 * });
 *
 * //Error handing
 * async.forEachOf(invalidConfigFileMap, parseFile, function (err) {
 *     if (err) {
 *         console.error(err);
 *         // JSON parse error exception
 *     } else {
 *         console.log(configs);
 *     }
 * });
 *
 * // Using Promises
 * async.forEachOf(validConfigFileMap, parseFile)
 * .then( () => {
 *     console.log(configs);
 *     // configs is now a map of JSON data, e.g.
 *     // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
 * }).catch( err => {
 *     console.error(err);
 * });
 *
 * //Error handing
 * async.forEachOf(invalidConfigFileMap, parseFile)
 * .then( () => {
 *     console.log(configs);
 * }).catch( err => {
 *     console.error(err);
 *     // JSON parse error exception
 * });
 *
 * // Using async/await
 * async () => {
 *     try {
 *         let result = await async.forEachOf(validConfigFileMap, parseFile);
 *         console.log(configs);
 *         // configs is now a map of JSON data, e.g.
 *         // { dev: //parsed dev.json, test: //parsed test.json, prod: //parsed prod.json}
 *     }
 *     catch (err) {
 *         console.log(err);
 *     }
 * }
 *
 * //Error handing
 * async () => {
 *     try {
 *         let result = await async.forEachOf(invalidConfigFileMap, parseFile);
 *         console.log(configs);
 *     }
 *     catch (err) {
 *         console.log(err);
 *         // JSON parse error exception
 *     }
 * }
 *
 */ function $6ebb78516ab4055a$var$eachOf(coll, iteratee, callback) {
    var eachOfImplementation = (0, $6ebb78516ab4055a$var$_isArrayLike2.default)(coll) ? $6ebb78516ab4055a$var$eachOfArrayLike : $6ebb78516ab4055a$var$eachOfGeneric;
    return eachOfImplementation(coll, (0, $6ebb78516ab4055a$var$_wrapAsync2.default)(iteratee), callback);
}
module.exports.default = (0, $6ebb78516ab4055a$var$_awaitify2.default)($6ebb78516ab4055a$var$eachOf, 3);
module.exports = module.exports["default"];

});

parcelRequire.register("fbb7K", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = $b0d08313d5b54206$var$_withoutIndex;
function $b0d08313d5b54206$var$_withoutIndex(iteratee) {
    return (value, index, callback)=>iteratee(value, callback);
}
module.exports = module.exports["default"];

});


parcelRequire.register("6Z8WK", function(module, exports) {
/**
 * exception-handler.js: Object for handling uncaughtException events.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";


var $lC7MF = parcelRequire("lC7MF");

const $515f61330ae52e40$var$debug = (parcelRequire("dJEkP"))("winston:exception");

var $9E3Bw = parcelRequire("9E3Bw");

var $6kcsG = parcelRequire("6kcsG");

var $64eIH = parcelRequire("64eIH");
/**
 * Object for handling uncaughtException events.
 * @type {ExceptionHandler}
 */ module.exports = class ExceptionHandler {
    /**
   * TODO: add contructor description
   * @param {!Logger} logger - TODO: add param description
   */ constructor(logger){
        if (!logger) throw new Error("Logger is required to handle exceptions");
        this.logger = logger;
        this.handlers = new Map();
    }
    /**
   * Handles `uncaughtException` events for the current process by adding any
   * handlers passed in.
   * @returns {undefined}
   */ handle(...args) {
        args.forEach((arg)=>{
            if (Array.isArray(arg)) return arg.forEach((handler)=>this._addHandler(handler));
            this._addHandler(arg);
        });
        if (!this.catcher) {
            this.catcher = this._uncaughtException.bind(this);
            process.on("uncaughtException", this.catcher);
        }
    }
    /**
   * Removes any handlers to `uncaughtException` events for the current
   * process. This does not modify the state of the `this.handlers` set.
   * @returns {undefined}
   */ unhandle() {
        if (this.catcher) {
            process.removeListener("uncaughtException", this.catcher);
            this.catcher = false;
            Array.from(this.handlers.values()).forEach((wrapper)=>this.logger.unpipe(wrapper));
        }
    }
    /**
   * TODO: add method description
   * @param {Error} err - Error to get information about.
   * @returns {mixed} - TODO: add return description.
   */ getAllInfo(err) {
        let { message: message  } = err;
        if (!message && typeof err === "string") message = err;
        return {
            error: err,
            // TODO (indexzero): how do we configure this?
            level: "error",
            message: [
                `uncaughtException: ${message || "(no error message)"}`,
                err.stack || "  No stack trace"
            ].join("\n"),
            stack: err.stack,
            exception: true,
            date: new Date().toString(),
            process: this.getProcessInfo(),
            os: this.getOsInfo(),
            trace: this.getTrace(err)
        };
    }
    /**
   * Gets all relevant process information for the currently running process.
   * @returns {mixed} - TODO: add return description.
   */ getProcessInfo() {
        return {
            pid: process.pid,
            uid: process.getuid ? process.getuid() : null,
            gid: process.getgid ? process.getgid() : null,
            cwd: process.cwd(),
            execPath: process.execPath,
            version: process.version,
            argv: process.argv,
            memoryUsage: process.memoryUsage()
        };
    }
    /**
   * Gets all relevant OS information for the currently running process.
   * @returns {mixed} - TODO: add return description.
   */ getOsInfo() {
        return {
            loadavg: $9xlVa$os.loadavg(),
            uptime: $9xlVa$os.uptime()
        };
    }
    /**
   * Gets a stack trace for the specified error.
   * @param {mixed} err - TODO: add param description.
   * @returns {mixed} - TODO: add return description.
   */ getTrace(err) {
        const trace = err ? $6kcsG.parse(err) : $6kcsG.get();
        return trace.map((site)=>{
            return {
                column: site.getColumnNumber(),
                file: site.getFileName(),
                function: site.getFunctionName(),
                line: site.getLineNumber(),
                method: site.getMethodName(),
                native: site.isNative()
            };
        });
    }
    /**
   * Helper method to add a transport as an exception handler.
   * @param {Transport} handler - The transport to add as an exception handler.
   * @returns {void}
   */ _addHandler(handler) {
        if (!this.handlers.has(handler)) {
            handler.handleExceptions = true;
            const wrapper = new $64eIH(handler);
            this.handlers.set(handler, wrapper);
            this.logger.pipe(wrapper);
        }
    }
    /**
   * Logs all relevant information around the `err` and exits the current
   * process.
   * @param {Error} err - Error to handle
   * @returns {mixed} - TODO: add return description.
   * @private
   */ _uncaughtException(err) {
        const info = this.getAllInfo(err);
        const handlers = this._getExceptionHandlers();
        // Calculate if we should exit on this error
        let doExit = typeof this.logger.exitOnError === "function" ? this.logger.exitOnError(err) : this.logger.exitOnError;
        let timeout;
        if (!handlers.length && doExit) {
            // eslint-disable-next-line no-console
            console.warn("winston: exitOnError cannot be true with no exception handlers.");
            // eslint-disable-next-line no-console
            console.warn("winston: not exiting process.");
            doExit = false;
        }
        function gracefulExit() {
            $515f61330ae52e40$var$debug("doExit", doExit);
            $515f61330ae52e40$var$debug("process._exiting", process._exiting);
            if (doExit && !process._exiting) {
                // Remark: Currently ignoring any exceptions from transports when
                // catching uncaught exceptions.
                if (timeout) clearTimeout(timeout);
                // eslint-disable-next-line no-process-exit
                process.exit(1);
            }
        }
        if (!handlers || handlers.length === 0) return process.nextTick(gracefulExit);
        // Log to all transports attempting to listen for when they are completed.
        $lC7MF(handlers, (handler, next)=>{
            const done = $9E3Bw(next);
            const transport = handler.transport || handler;
            // Debug wrapping so that we can inspect what's going on under the covers.
            function onDone(event) {
                return ()=>{
                    $515f61330ae52e40$var$debug(event);
                    done();
                };
            }
            transport._ending = true;
            transport.once("finish", onDone("finished"));
            transport.once("error", onDone("error"));
        }, ()=>doExit && gracefulExit());
        this.logger.log(info);
        // If exitOnError is true, then only allow the logging of exceptions to
        // take up to `3000ms`.
        if (doExit) timeout = setTimeout(gracefulExit, 3000);
    }
    /**
   * Returns the list of transports and exceptionHandlers for this instance.
   * @returns {Array} - List of transports and exceptionHandlers for this
   * instance.
   * @private
   */ _getExceptionHandlers() {
        // Remark (indexzero): since `logger.transports` returns all of the pipes
        // from the _readableState of the stream we actually get the join of the
        // explicit handlers and the implicit transports with
        // `handleExceptions: true`
        return this.logger.transports.filter((wrap)=>{
            const transport = wrap.transport || wrap;
            return transport.handleExceptions;
        });
    }
};

});
parcelRequire.register("9E3Bw", function(module, exports) {
"use strict";

var $cenOk = parcelRequire("cenOk");
/**
 * Wrap callbacks to prevent double execution.
 *
 * @param {Function} fn Function that should only be called once.
 * @returns {Function} A wrapped callback which prevents multiple executions.
 * @public
 */ module.exports = function one(fn) {
    var called = 0, value;
    /**
   * The function that prevents double execution.
   *
   * @private
   */ function onetime() {
        if (called) return value;
        called = 1;
        value = fn.apply(this, arguments);
        fn = null;
        return value;
    }
    //
    // To make debugging more easy we want to use the name of the supplied
    // function. So when you look at the functions that are assigned to event
    // listeners you don't see a load of `onetime` functions but actually the
    // names of the functions that this module will call.
    //
    // NOTE: We cannot override the `name` property, as that is `readOnly`
    // property, so displayName will have to do.
    //
    onetime.displayName = $cenOk(fn);
    return onetime;
};

});
parcelRequire.register("cenOk", function(module, exports) {
"use strict";
var $8e79432c6af862e8$var$toString = Object.prototype.toString;
/**
 * Extract names from functions.
 *
 * @param {Function} fn The function who's name we need to extract.
 * @returns {String} The name of the function.
 * @public
 */ module.exports = function name(fn) {
    if ("string" === typeof fn.displayName && fn.constructor.name) return fn.displayName;
    else if ("string" === typeof fn.name && fn.name) return fn.name;
    //
    // Check to see if the constructor has a name.
    //
    if ("object" === typeof fn && fn.constructor && "string" === typeof fn.constructor.name) return fn.constructor.name;
    //
    // toString the given function and attempt to parse it out of it, or determine
    // the class.
    //
    var named = fn.toString(), type = $8e79432c6af862e8$var$toString.call(fn).slice(8, -1);
    if ("Function" === type) named = named.substring(named.indexOf("(") + 1, named.indexOf(")"));
    else named = type;
    return named || "anonymous";
};

});


parcelRequire.register("6kcsG", function(module, exports) {

$parcel$export(module.exports, "get", () => $49ae46f59162a921$export$3988ae62b71be9a3, (v) => $49ae46f59162a921$export$3988ae62b71be9a3 = v);
$parcel$export(module.exports, "parse", () => $49ae46f59162a921$export$98e6a39c04603d36, (v) => $49ae46f59162a921$export$98e6a39c04603d36 = v);
var $49ae46f59162a921$export$3988ae62b71be9a3;
var $49ae46f59162a921$export$98e6a39c04603d36;
var $49ae46f59162a921$export$c59be0fbb9a5b330;
$49ae46f59162a921$export$3988ae62b71be9a3 = function(belowFn) {
    var oldLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = Infinity;
    var dummyObject = {};
    var v8Handler = Error.prepareStackTrace;
    Error.prepareStackTrace = function(dummyObject, v8StackTrace) {
        return v8StackTrace;
    };
    Error.captureStackTrace(dummyObject, belowFn || $49ae46f59162a921$export$3988ae62b71be9a3);
    var v8StackTrace1 = dummyObject.stack;
    Error.prepareStackTrace = v8Handler;
    Error.stackTraceLimit = oldLimit;
    return v8StackTrace1;
};
$49ae46f59162a921$export$98e6a39c04603d36 = function(err) {
    if (!err.stack) return [];
    var self = this;
    var lines = err.stack.split("\n").slice(1);
    return lines.map(function(line) {
        if (line.match(/^\s*[-]{4,}$/)) return self._createParsedCallSite({
            fileName: line,
            lineNumber: null,
            functionName: null,
            typeName: null,
            methodName: null,
            columnNumber: null,
            "native": null
        });
        var lineMatch = line.match(/at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/);
        if (!lineMatch) return;
        var object = null;
        var method = null;
        var functionName = null;
        var typeName = null;
        var methodName = null;
        var isNative = lineMatch[5] === "native";
        if (lineMatch[1]) {
            functionName = lineMatch[1];
            var methodStart = functionName.lastIndexOf(".");
            if (functionName[methodStart - 1] == ".") methodStart--;
            if (methodStart > 0) {
                object = functionName.substr(0, methodStart);
                method = functionName.substr(methodStart + 1);
                var objectEnd = object.indexOf(".Module");
                if (objectEnd > 0) {
                    functionName = functionName.substr(objectEnd + 1);
                    object = object.substr(0, objectEnd);
                }
            }
            typeName = null;
        }
        if (method) {
            typeName = object;
            methodName = method;
        }
        if (method === "<anonymous>") {
            methodName = null;
            functionName = null;
        }
        var properties = {
            fileName: lineMatch[2] || null,
            lineNumber: parseInt(lineMatch[3], 10) || null,
            functionName: functionName,
            typeName: typeName,
            methodName: methodName,
            columnNumber: parseInt(lineMatch[4], 10) || null,
            "native": isNative
        };
        return self._createParsedCallSite(properties);
    }).filter(function(callSite) {
        return !!callSite;
    });
};
function $49ae46f59162a921$var$CallSite(properties) {
    for(var property in properties)this[property] = properties[property];
}
var $49ae46f59162a921$var$strProperties = [
    "this",
    "typeName",
    "functionName",
    "methodName",
    "fileName",
    "lineNumber",
    "columnNumber",
    "function",
    "evalOrigin"
];
var $49ae46f59162a921$var$boolProperties = [
    "topLevel",
    "eval",
    "native",
    "constructor"
];
$49ae46f59162a921$var$strProperties.forEach(function(property) {
    $49ae46f59162a921$var$CallSite.prototype[property] = null;
    $49ae46f59162a921$var$CallSite.prototype["get" + property[0].toUpperCase() + property.substr(1)] = function() {
        return this[property];
    };
});
$49ae46f59162a921$var$boolProperties.forEach(function(property) {
    $49ae46f59162a921$var$CallSite.prototype[property] = false;
    $49ae46f59162a921$var$CallSite.prototype["is" + property[0].toUpperCase() + property.substr(1)] = function() {
        return this[property];
    };
});
$49ae46f59162a921$export$c59be0fbb9a5b330 = function(properties) {
    return new $49ae46f59162a921$var$CallSite(properties);
};

});

parcelRequire.register("64eIH", function(module, exports) {
/**
 * exception-stream.js: TODO: add file header handler.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

var $cOGCw = parcelRequire("cOGCw");
var $46ae88def58c3e87$require$Writable = $cOGCw.Writable;
/**
 * TODO: add class description.
 * @type {ExceptionStream}
 * @extends {Writable}
 */ module.exports = class ExceptionStream extends $46ae88def58c3e87$require$Writable {
    /**
   * Constructor function for the ExceptionStream responsible for wrapping a
   * TransportStream; only allowing writes of `info` objects with
   * `info.exception` set to true.
   * @param {!TransportStream} transport - Stream to filter to exceptions
   */ constructor(transport){
        super({
            objectMode: true
        });
        if (!transport) throw new Error("ExceptionStream requires a TransportStream instance.");
        // Remark (indexzero): we set `handleExceptions` here because it's the
        // predicate checked in ExceptionHandler.prototype.__getExceptionHandlers
        this.handleExceptions = true;
        this.transport = transport;
    }
    /**
   * Writes the info object to our transport instance if (and only if) the
   * `exception` property is set on the info.
   * @param {mixed} info - TODO: add param description.
   * @param {mixed} enc - TODO: add param description.
   * @param {mixed} callback - TODO: add param description.
   * @returns {mixed} - TODO: add return description.
   * @private
   */ _write(info, enc, callback) {
        if (info.exception) return this.transport.log(info, callback);
        callback();
        return true;
    }
};

});


parcelRequire.register("g7qlT", function(module, exports) {
/**
 * exception-handler.js: Object for handling uncaughtException events.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";


var $lC7MF = parcelRequire("lC7MF");

const $bbc1bdc6555b2484$var$debug = (parcelRequire("dJEkP"))("winston:rejection");

var $9E3Bw = parcelRequire("9E3Bw");

var $6kcsG = parcelRequire("6kcsG");

var $64eIH = parcelRequire("64eIH");
/**
 * Object for handling unhandledRejection events.
 * @type {RejectionHandler}
 */ module.exports = class RejectionHandler {
    /**
   * TODO: add contructor description
   * @param {!Logger} logger - TODO: add param description
   */ constructor(logger){
        if (!logger) throw new Error("Logger is required to handle rejections");
        this.logger = logger;
        this.handlers = new Map();
    }
    /**
   * Handles `unhandledRejection` events for the current process by adding any
   * handlers passed in.
   * @returns {undefined}
   */ handle(...args) {
        args.forEach((arg)=>{
            if (Array.isArray(arg)) return arg.forEach((handler)=>this._addHandler(handler));
            this._addHandler(arg);
        });
        if (!this.catcher) {
            this.catcher = this._unhandledRejection.bind(this);
            process.on("unhandledRejection", this.catcher);
        }
    }
    /**
   * Removes any handlers to `unhandledRejection` events for the current
   * process. This does not modify the state of the `this.handlers` set.
   * @returns {undefined}
   */ unhandle() {
        if (this.catcher) {
            process.removeListener("unhandledRejection", this.catcher);
            this.catcher = false;
            Array.from(this.handlers.values()).forEach((wrapper)=>this.logger.unpipe(wrapper));
        }
    }
    /**
   * TODO: add method description
   * @param {Error} err - Error to get information about.
   * @returns {mixed} - TODO: add return description.
   */ getAllInfo(err) {
        let message = null;
        if (err) message = typeof err === "string" ? err : err.message;
        return {
            error: err,
            // TODO (indexzero): how do we configure this?
            level: "error",
            message: [
                `unhandledRejection: ${message || "(no error message)"}`,
                err && err.stack || "  No stack trace"
            ].join("\n"),
            stack: err && err.stack,
            exception: true,
            date: new Date().toString(),
            process: this.getProcessInfo(),
            os: this.getOsInfo(),
            trace: this.getTrace(err)
        };
    }
    /**
   * Gets all relevant process information for the currently running process.
   * @returns {mixed} - TODO: add return description.
   */ getProcessInfo() {
        return {
            pid: process.pid,
            uid: process.getuid ? process.getuid() : null,
            gid: process.getgid ? process.getgid() : null,
            cwd: process.cwd(),
            execPath: process.execPath,
            version: process.version,
            argv: process.argv,
            memoryUsage: process.memoryUsage()
        };
    }
    /**
   * Gets all relevant OS information for the currently running process.
   * @returns {mixed} - TODO: add return description.
   */ getOsInfo() {
        return {
            loadavg: $9xlVa$os.loadavg(),
            uptime: $9xlVa$os.uptime()
        };
    }
    /**
   * Gets a stack trace for the specified error.
   * @param {mixed} err - TODO: add param description.
   * @returns {mixed} - TODO: add return description.
   */ getTrace(err) {
        const trace = err ? $6kcsG.parse(err) : $6kcsG.get();
        return trace.map((site)=>{
            return {
                column: site.getColumnNumber(),
                file: site.getFileName(),
                function: site.getFunctionName(),
                line: site.getLineNumber(),
                method: site.getMethodName(),
                native: site.isNative()
            };
        });
    }
    /**
   * Helper method to add a transport as an exception handler.
   * @param {Transport} handler - The transport to add as an exception handler.
   * @returns {void}
   */ _addHandler(handler) {
        if (!this.handlers.has(handler)) {
            handler.handleRejections = true;
            const wrapper = new $64eIH(handler);
            this.handlers.set(handler, wrapper);
            this.logger.pipe(wrapper);
        }
    }
    /**
   * Logs all relevant information around the `err` and exits the current
   * process.
   * @param {Error} err - Error to handle
   * @returns {mixed} - TODO: add return description.
   * @private
   */ _unhandledRejection(err) {
        const info = this.getAllInfo(err);
        const handlers = this._getRejectionHandlers();
        // Calculate if we should exit on this error
        let doExit = typeof this.logger.exitOnError === "function" ? this.logger.exitOnError(err) : this.logger.exitOnError;
        let timeout;
        if (!handlers.length && doExit) {
            // eslint-disable-next-line no-console
            console.warn("winston: exitOnError cannot be true with no rejection handlers.");
            // eslint-disable-next-line no-console
            console.warn("winston: not exiting process.");
            doExit = false;
        }
        function gracefulExit() {
            $bbc1bdc6555b2484$var$debug("doExit", doExit);
            $bbc1bdc6555b2484$var$debug("process._exiting", process._exiting);
            if (doExit && !process._exiting) {
                // Remark: Currently ignoring any rejections from transports when
                // catching unhandled rejections.
                if (timeout) clearTimeout(timeout);
                // eslint-disable-next-line no-process-exit
                process.exit(1);
            }
        }
        if (!handlers || handlers.length === 0) return process.nextTick(gracefulExit);
        // Log to all transports attempting to listen for when they are completed.
        $lC7MF(handlers, (handler, next)=>{
            const done = $9E3Bw(next);
            const transport = handler.transport || handler;
            // Debug wrapping so that we can inspect what's going on under the covers.
            function onDone(event) {
                return ()=>{
                    $bbc1bdc6555b2484$var$debug(event);
                    done();
                };
            }
            transport._ending = true;
            transport.once("finish", onDone("finished"));
            transport.once("error", onDone("error"));
        }, ()=>doExit && gracefulExit());
        this.logger.log(info);
        // If exitOnError is true, then only allow the logging of exceptions to
        // take up to `3000ms`.
        if (doExit) timeout = setTimeout(gracefulExit, 3000);
    }
    /**
   * Returns the list of transports and exceptionHandlers for this instance.
   * @returns {Array} - List of transports and exceptionHandlers for this
   * instance.
   * @private
   */ _getRejectionHandlers() {
        // Remark (indexzero): since `logger.transports` returns all of the pipes
        // from the _readableState of the stream we actually get the join of the
        // explicit handlers and the implicit transports with
        // `handleRejections: true`
        return this.logger.transports.filter((wrap)=>{
            const transport = wrap.transport || wrap;
            return transport.handleRejections;
        });
    }
};

});

parcelRequire.register("kwsWr", function(module, exports) {
/**
 * profiler.js: TODO: add file header description.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";
/**
 * TODO: add class description.
 * @type {Profiler}
 * @private
 */ module.exports = class Profiler {
    /**
   * Constructor function for the Profiler instance used by
   * `Logger.prototype.startTimer`. When done is called the timer will finish
   * and log the duration.
   * @param {!Logger} logger - TODO: add param description.
   * @private
   */ constructor(logger){
        if (!logger) throw new Error("Logger is required for profiling.");
        this.logger = logger;
        this.start = Date.now();
    }
    /**
   * Ends the current timer (i.e. Profiler) instance and logs the `msg` along
   * with the duration since creation.
   * @returns {mixed} - TODO: add return description.
   * @private
   */ done(...args) {
        if (typeof args[args.length - 1] === "function") {
            // eslint-disable-next-line no-console
            console.warn("Callback function no longer supported as of winston@3.0.0");
            args.pop();
        }
        const info = typeof args[args.length - 1] === "object" ? args.pop() : {};
        info.level = info.level || "info";
        info.durationMs = Date.now() - this.start;
        return this.logger.write(info);
    }
};

});

parcelRequire.register("gCsvX", function(module, exports) {

$parcel$export(module.exports, "warn", () => $c1965053a1da4b00$export$c106dd0671a0fc2d, (v) => $c1965053a1da4b00$export$c106dd0671a0fc2d = v);
/**
 * Set of simple deprecation notices and a way to expose them for a set of
 * properties.
 * @type {Object}
 * @private
 */ var $c1965053a1da4b00$export$c106dd0671a0fc2d;
/**
 * common.js: Internal helper and utility functions for winston.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

var $c1965053a1da4b00$require$format = $9xlVa$util.format;
$c1965053a1da4b00$export$c106dd0671a0fc2d = {
    deprecated (prop) {
        return ()=>{
            throw new Error($c1965053a1da4b00$require$format("{ %s } was removed in winston@3.0.0.", prop));
        };
    },
    useFormat (prop) {
        return ()=>{
            throw new Error([
                $c1965053a1da4b00$require$format("{ %s } was removed in winston@3.0.0.", prop),
                "Use a custom winston.format = winston.format(function) instead."
            ].join("\n"));
        };
    },
    forFunctions (obj, type, props) {
        props.forEach((prop)=>{
            obj[prop] = $c1965053a1da4b00$export$c106dd0671a0fc2d[type](prop);
        });
    },
    moved (obj, movedTo, prop) {
        function movedNotice() {
            return ()=>{
                throw new Error([
                    $c1965053a1da4b00$require$format("winston.%s was moved in winston@3.0.0.", prop),
                    $c1965053a1da4b00$require$format("Use a winston.%s instead.", movedTo)
                ].join("\n"));
            };
        }
        Object.defineProperty(obj, prop, {
            get: movedNotice,
            set: movedNotice
        });
    },
    forProperties (obj, type, props) {
        props.forEach((prop)=>{
            const notice = $c1965053a1da4b00$export$c106dd0671a0fc2d[type](prop);
            Object.defineProperty(obj, prop, {
                get: notice,
                set: notice
            });
        });
    }
};

});



parcelRequire.register("4Woi9", function(module, exports) {
/**
 * container.js: Inversion of control container for winston logger instances.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

var $3jY7l = parcelRequire("3jY7l");
/**
 * Inversion of control container for winston logger instances.
 * @type {Container}
 */ module.exports = class Container {
    /**
   * Constructor function for the Container object responsible for managing a
   * set of `winston.Logger` instances based on string ids.
   * @param {!Object} [options={}] - Default pass-thru options for Loggers.
   */ constructor(options = {}){
        this.loggers = new Map();
        this.options = options;
    }
    /**
   * Retrieves a `winston.Logger` instance for the specified `id`. If an
   * instance does not exist, one is created.
   * @param {!string} id - The id of the Logger to get.
   * @param {?Object} [options] - Options for the Logger instance.
   * @returns {Logger} - A configured Logger instance with a specified id.
   */ add(id, options) {
        if (!this.loggers.has(id)) {
            // Remark: Simple shallow clone for configuration options in case we pass
            // in instantiated protoypal objects
            options = Object.assign({}, options || this.options);
            const existing = options.transports || this.options.transports;
            // Remark: Make sure if we have an array of transports we slice it to
            // make copies of those references.
            options.transports = existing ? existing.slice() : [];
            const logger = $3jY7l(options);
            logger.on("close", ()=>this._delete(id));
            this.loggers.set(id, logger);
        }
        return this.loggers.get(id);
    }
    /**
   * Retreives a `winston.Logger` instance for the specified `id`. If
   * an instance does not exist, one is created.
   * @param {!string} id - The id of the Logger to get.
   * @param {?Object} [options] - Options for the Logger instance.
   * @returns {Logger} - A configured Logger instance with a specified id.
   */ get(id, options) {
        return this.add(id, options);
    }
    /**
   * Check if the container has a logger with the id.
   * @param {?string} id - The id of the Logger instance to find.
   * @returns {boolean} - Boolean value indicating if this instance has a
   * logger with the specified `id`.
   */ has(id) {
        return !!this.loggers.has(id);
    }
    /**
   * Closes a `Logger` instance with the specified `id` if it exists.
   * If no `id` is supplied then all Loggers are closed.
   * @param {?string} id - The id of the Logger instance to close.
   * @returns {undefined}
   */ close(id) {
        if (id) return this._removeLogger(id);
        this.loggers.forEach((val, key)=>this._removeLogger(key));
    }
    /**
   * Remove a logger based on the id.
   * @param {!string} id - The id of the logger to remove.
   * @returns {undefined}
   * @private
   */ _removeLogger(id) {
        if (!this.loggers.has(id)) return;
        const logger = this.loggers.get(id);
        logger.close();
        this._delete(id);
    }
    /**
   * Deletes a `Logger` instance with the specified `id`.
   * @param {!string} id - The id of the Logger instance to delete from
   * container.
   * @returns {undefined}
   * @private
   */ _delete(id) {
        this.loggers.delete(id);
    }
};

});




var $ad7a895ad20e2112$exports = {};
/**
 * winston.js: Top-level include defining Winston.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */ "use strict";

var $2hjEK = parcelRequire("2hjEK");

var $gCsvX = parcelRequire("gCsvX");
var $ad7a895ad20e2112$require$warn = $gCsvX.warn;

/**
 * Expose version. Use `require` method for `webpack` support.
 * @type {string}
 */ $ad7a895ad20e2112$exports.version = (parcelRequire("63S0x")).version;

/**
 * Include transports defined by default by winston
 * @type {Array}
 */ $ad7a895ad20e2112$exports.transports = (parcelRequire("4rSU0"));

/**
 * Expose utility methods
 * @type {Object}
 */ $ad7a895ad20e2112$exports.config = (parcelRequire("Vm3ka"));
/**
 * Hoist format-related functionality from logform.
 * @type {Object}
 */ $ad7a895ad20e2112$exports.addColors = $2hjEK.levels;
/**
 * Hoist format-related functionality from logform.
 * @type {Object}
 */ $ad7a895ad20e2112$exports.format = $2hjEK.format;

/**
 * Expose core Logging-related prototypes.
 * @type {function}
 */ $ad7a895ad20e2112$exports.createLogger = (parcelRequire("3jY7l"));

/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */ $ad7a895ad20e2112$exports.ExceptionHandler = (parcelRequire("6Z8WK"));

/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */ $ad7a895ad20e2112$exports.RejectionHandler = (parcelRequire("g7qlT"));

/**
 * Expose core Logging-related prototypes.
 * @type {Container}
 */ $ad7a895ad20e2112$exports.Container = (parcelRequire("4Woi9"));

/**
 * Expose core Logging-related prototypes.
 * @type {Object}
 */ $ad7a895ad20e2112$exports.Transport = (parcelRequire("72KRt"));
/**
 * We create and expose a default `Container` to `winston.loggers` so that the
 * programmer may manage multiple `winston.Logger` instances without any
 * additional overhead.
 * @example
 *   // some-file1.js
 *   const logger = require('winston').loggers.get('something');
 *
 *   // some-file2.js
 *   const logger = require('winston').loggers.get('something');
 */ $ad7a895ad20e2112$exports.loggers = new $ad7a895ad20e2112$exports.Container();
/**
 * We create and expose a 'defaultLogger' so that the programmer may do the
 * following without the need to create an instance of winston.Logger directly:
 * @example
 *   const winston = require('winston');
 *   winston.log('info', 'some message');
 *   winston.error('some error');
 */ const $ad7a895ad20e2112$var$defaultLogger = $ad7a895ad20e2112$exports.createLogger();
// Pass through the target methods onto `winston.
Object.keys($ad7a895ad20e2112$exports.config.npm.levels).concat([
    "log",
    "query",
    "stream",
    "add",
    "remove",
    "clear",
    "profile",
    "startTimer",
    "handleExceptions",
    "unhandleExceptions",
    "handleRejections",
    "unhandleRejections",
    "configure",
    "child"
]).forEach((method)=>$ad7a895ad20e2112$exports[method] = (...args)=>$ad7a895ad20e2112$var$defaultLogger[method](...args));
/**
 * Define getter / setter for the default logger level which need to be exposed
 * by winston.
 * @type {string}
 */ Object.defineProperty($ad7a895ad20e2112$exports, "level", {
    get () {
        return $ad7a895ad20e2112$var$defaultLogger.level;
    },
    set (val) {
        $ad7a895ad20e2112$var$defaultLogger.level = val;
    }
});
/**
 * Define getter for `exceptions` which replaces `handleExceptions` and
 * `unhandleExceptions`.
 * @type {Object}
 */ Object.defineProperty($ad7a895ad20e2112$exports, "exceptions", {
    get () {
        return $ad7a895ad20e2112$var$defaultLogger.exceptions;
    }
});
/**
 * Define getters / setters for appropriate properties of the default logger
 * which need to be exposed by winston.
 * @type {Logger}
 */ [
    "exitOnError"
].forEach((prop)=>{
    Object.defineProperty($ad7a895ad20e2112$exports, prop, {
        get () {
            return $ad7a895ad20e2112$var$defaultLogger[prop];
        },
        set (val) {
            $ad7a895ad20e2112$var$defaultLogger[prop] = val;
        }
    });
});
/**
 * The default transports and exceptionHandlers for the default winston logger.
 * @type {Object}
 */ Object.defineProperty($ad7a895ad20e2112$exports, "default", {
    get () {
        return {
            exceptionHandlers: $ad7a895ad20e2112$var$defaultLogger.exceptionHandlers,
            rejectionHandlers: $ad7a895ad20e2112$var$defaultLogger.rejectionHandlers,
            transports: $ad7a895ad20e2112$var$defaultLogger.transports
        };
    }
});
// Have friendlier breakage notices for properties that were exposed by default
// on winston < 3.0.
$ad7a895ad20e2112$require$warn.deprecated($ad7a895ad20e2112$exports, "setLevels");
$ad7a895ad20e2112$require$warn.forFunctions($ad7a895ad20e2112$exports, "useFormat", [
    "cli"
]);
$ad7a895ad20e2112$require$warn.forProperties($ad7a895ad20e2112$exports, "useFormat", [
    "padLevels",
    "stripColors"
]);
$ad7a895ad20e2112$require$warn.forFunctions($ad7a895ad20e2112$exports, "deprecated", [
    "addRewriter",
    "addFilter",
    "clone",
    "extend"
]);
$ad7a895ad20e2112$require$warn.forProperties($ad7a895ad20e2112$exports, "deprecated", [
    "emitErrs",
    "levelLength"
]);
// Throw a useful error when users attempt to run `new winston.Logger`.
$ad7a895ad20e2112$require$warn.moved($ad7a895ad20e2112$exports, "createLogger", "Logger");


const $b5e357eacdca0db3$var$logger = (0, (/*@__PURE__*/$parcel$interopDefault($ad7a895ad20e2112$exports))).createLogger({
    level: "info",
    transports: [
        new (0, (/*@__PURE__*/$parcel$interopDefault($ad7a895ad20e2112$exports))).transports.Console({
            format: (0, (/*@__PURE__*/$parcel$interopDefault($ad7a895ad20e2112$exports))).format.combine((0, (/*@__PURE__*/$parcel$interopDefault($ad7a895ad20e2112$exports))).format.colorize(), (0, (/*@__PURE__*/$parcel$interopDefault($ad7a895ad20e2112$exports))).format.simple())
        }), 
    ],
    handleExceptions: true
});
const $b5e357eacdca0db3$var$startTime = process.hrtime();
const $b5e357eacdca0db3$var$projectFileEnv = process.env["TSCONFIG"];
if (!$b5e357eacdca0db3$var$projectFileEnv) throw new Error(`TSCONFIG env not found.`);
const $b5e357eacdca0db3$var$projectFile = $9xlVa$path.resolve($b5e357eacdca0db3$var$projectFileEnv);
if (!$9xlVa$fs.existsSync($b5e357eacdca0db3$var$projectFile)) throw new Error(`Project file not found: ${$b5e357eacdca0db3$var$projectFile}`);
$b5e357eacdca0db3$var$logger.info(`Using project file: ${$b5e357eacdca0db3$var$projectFile}`);
let $b5e357eacdca0db3$var$extraConfig = {};
const $b5e357eacdca0db3$var$extraConfigEnv = process.env["EXTRA_CONFIG"];
if ($b5e357eacdca0db3$var$extraConfigEnv) $b5e357eacdca0db3$var$extraConfig = JSON.parse($b5e357eacdca0db3$var$extraConfigEnv);
$b5e357eacdca0db3$var$logger.info(`Using extra config: ${JSON.stringify($b5e357eacdca0db3$var$extraConfig)}`);
const $b5e357eacdca0db3$var$outputFileEnv = process.env["OUTPUT"];
if (!$b5e357eacdca0db3$var$outputFileEnv) throw new Error(`OUTPUT env not found.`);
const $b5e357eacdca0db3$var$outputFile = $9xlVa$path.resolve($b5e357eacdca0db3$var$outputFileEnv);
$b5e357eacdca0db3$var$logger.info(`Using output file: ${$b5e357eacdca0db3$var$outputFile}`);
const $b5e357eacdca0db3$var$projectBase = $9xlVa$path.dirname($b5e357eacdca0db3$var$projectFile);
const $b5e357eacdca0db3$var$ts = (0, $9xlVa$module.createRequire)($b5e357eacdca0db3$var$projectFile)("typescript");
$b5e357eacdca0db3$var$logger.info(`Using project base: ${$b5e357eacdca0db3$var$projectBase}`);
$b5e357eacdca0db3$var$logger.info(`Using TS version: ${$b5e357eacdca0db3$var$ts.version}`);
const $b5e357eacdca0db3$var$throwOnError = process.env["THROW_ON_ERROR"] == "true";
if ($b5e357eacdca0db3$var$throwOnError) $b5e357eacdca0db3$var$logger.info(`THROW_ON_ERROR is true. Execution will fail if there are any errors.`);
const $b5e357eacdca0db3$var$config = $b5e357eacdca0db3$var$ts.parseJsonConfigFileContent($b5e357eacdca0db3$var$ts.readConfigFile($b5e357eacdca0db3$var$projectFile, $b5e357eacdca0db3$var$ts.sys.readFile).config, $b5e357eacdca0db3$var$ts.sys, $9xlVa$path.dirname($b5e357eacdca0db3$var$projectFile), undefined, $9xlVa$path.basename($b5e357eacdca0db3$var$projectFile));
$b5e357eacdca0db3$var$config.options = {
    ...$b5e357eacdca0db3$var$config.options,
    sourceMap: false,
    emitDecoratorMetadata: false,
    skipLibCheck: true,
    skipDefaultLibCheck: true,
    ...$b5e357eacdca0db3$var$extraConfig
};
const $b5e357eacdca0db3$var$host = $b5e357eacdca0db3$var$ts.createCompilerHost($b5e357eacdca0db3$var$config.options);
$b5e357eacdca0db3$var$logger.info(`Using in-memory compilation`);
// do absolutely nothing with the file
$b5e357eacdca0db3$var$host.writeFile = (_fileName, _ignoredResult)=>{};
const $b5e357eacdca0db3$var$program = $b5e357eacdca0db3$var$ts.createProgram({
    rootNames: $b5e357eacdca0db3$var$config.fileNames,
    options: $b5e357eacdca0db3$var$config.options,
    projectReferences: $b5e357eacdca0db3$var$config.projectReferences,
    configFileParsingDiagnostics: $b5e357eacdca0db3$var$ts.getConfigFileParsingDiagnostics($b5e357eacdca0db3$var$config),
    host: $b5e357eacdca0db3$var$host
});
$b5e357eacdca0db3$var$logger.info(`Compiling...`);
const $b5e357eacdca0db3$var$emitResult = $b5e357eacdca0db3$var$program.emit();
$b5e357eacdca0db3$var$logger.info(`Compile finished.`);
const $b5e357eacdca0db3$var$allDiagnostics = $b5e357eacdca0db3$var$ts.getPreEmitDiagnostics($b5e357eacdca0db3$var$program).concat($b5e357eacdca0db3$var$emitResult.diagnostics);
const $b5e357eacdca0db3$var$relevantDiagnostics = $b5e357eacdca0db3$var$allDiagnostics.filter(({ file: file  })=>{
    return file && file.fileName.includes($b5e357eacdca0db3$var$projectBase);
});
$b5e357eacdca0db3$var$logger.info(`Parsing diagnostics`);
const $b5e357eacdca0db3$var$diagnostics = $b5e357eacdca0db3$var$relevantDiagnostics.map((diagnostic)=>{
    if (diagnostic.file) {
        const { fileName: fileName  } = diagnostic.file;
        let { line: line , character: character  } = $b5e357eacdca0db3$var$ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
        line += 1;
        character += 1;
        const message = $b5e357eacdca0db3$var$ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
        return {
            fileName: fileName,
            line: line,
            character: character,
            message: message
        };
    }
});
const $b5e357eacdca0db3$var$json = {};
$b5e357eacdca0db3$var$diagnostics.forEach((diag)=>{
    if (diag) {
        const relativeFileName = diag.fileName.replace(`${$b5e357eacdca0db3$var$projectBase}/`, "");
        const link = `${relativeFileName}:${diag.line}:${diag.character}`;
        $b5e357eacdca0db3$var$json[link] = diag.message;
    }
});
$b5e357eacdca0db3$var$logger.info(`Writing output file: ${$b5e357eacdca0db3$var$outputFile}`);
$9xlVa$fs.writeFileSync($b5e357eacdca0db3$var$outputFile, JSON.stringify($b5e357eacdca0db3$var$json, null, 2));
const [$b5e357eacdca0db3$var$seconds, $b5e357eacdca0db3$var$nanoSeconds] = process.hrtime($b5e357eacdca0db3$var$startTime);
const $b5e357eacdca0db3$var$milliseconds = Math.round($b5e357eacdca0db3$var$nanoSeconds / 1000000);
$b5e357eacdca0db3$var$logger.info(`Took ${$b5e357eacdca0db3$var$seconds}.${$b5e357eacdca0db3$var$milliseconds} seconds`);
if ($b5e357eacdca0db3$var$throwOnError && Object.keys($b5e357eacdca0db3$var$json).length > 0) throw new Error(`There were errors in the compilation, and THROW_ON_ERROR was true.`);


//# sourceMappingURL=index.js.map
