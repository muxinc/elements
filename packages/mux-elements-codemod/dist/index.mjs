#!/usr/bin/env node
var _a;
import { argv } from "node:process";
import path from "path";
import shell from "shelljs";
import minimist from "minimist";
import chalk from "chalk";
const sh = shell;
const args = minimist(argv.slice(2), {
  string: ["extensions", "npm-client"],
  boolean: ["imports"],
  default: {
    extensions: "js ts jsx tsx html mjs cjs",
    imports: false,
    force: false,
    package: false
  },
  alias: {
    e: "extensions",
    i: "imports",
    f: "force",
    n: "npm-client",
    p: "package"
  }
});
const paths = args._;
const ignoresArray = args.ignore ? [].concat(args.ignore) : [];
const exts = args.extensions.split(" ").map((ext) => ext.startsWith(".") ? ext : "." + ext);
const force = args.force;
let npmClient = (_a = args["npm-client"]) != null ? _a : "npm";
if (!args["npm-client"] && sh.test("-f", "./yarn.lock")) {
  npmClient = "yarn";
}
if (paths.length === 0) {
  paths.push("./");
}
const printHelp = () => {
  sh.echo(
    `
$ mux-elements-codemod [OPTIONS] [paths ...]
$ mux-elements-codemod [--help|-h]

paths can be regular globbed items or a list of folders
The default path is ./

Examples:
$ mux-elements-codemod -i ./packages ./examples
$ mux-elements-codemod --imports ./packages
$ mux-elements-codemod --imports ./examples/**/*.tsx
$ mux-elements-codemod --extensions="tsx jsx" --imports ./examples/
$ mux-elements-codemod -e="tsx jsx" --imports ./examples/ --ignore .next --ignore dist

Options:
  -i --imports      update imports/requires scope from @mux-elements to @mux
     --ignore       Add a name to ignore in the files, multiples can be provided
  -e --extensions   specifiy the specific file extensions to use as a space separated string
                    default is "js ts jsx tsx html mjs cjs"
  -f --force        by default, this does a dry run, run with --force to apply changes
  -h --help         show this help
  -p --package      Update the package.json in the current working directory to:
                    - remove existing dependencies and dev dependencies of @mux-elements/ scope
                    - add the packages with the new @mux/ scope
  -n --npm-client   set an npm client. By default it is npm unless a yarn.lock file is present, in which case it is yarn.
`
  );
};
const getFiles = (folders, ignores, extensions, predicate) => {
  return sh.find(folders).filter((file) => {
    if (!file.includes("node_modules") && !ignores.some((ignore) => file.includes(ignore)) && extensions.includes(path.extname(file))) {
      if (predicate) {
        return predicate(file);
      } else {
        return true;
      }
    }
    return false;
  });
};
const imports = () => {
  const linesFileMap = /* @__PURE__ */ new Map();
  const files = getFiles(paths, ignoresArray, exts, (file) => {
    const fileText = sh.cat(file);
    const includesMuxElements = fileText.includes("@mux-elements");
    if (!force && includesMuxElements) {
      const lineNumbers = [];
      const lines = fileText.split("\n").filter((line, i) => {
        const included = line.includes("@mux-elements");
        if (included) {
          lineNumbers.push(i);
        }
        return included;
      });
      linesFileMap.set(file, [lineNumbers, lines]);
    }
    return includesMuxElements;
  });
  if (force) {
    sh.echo("Modifying the following files to replace `@mux-elements/` scope with `@mux/`:");
  } else {
    sh.echo("Running in dry run mode. The following files will be modified:");
  }
  files.forEach((file) => {
    const sedOptions = [/@mux-elements\//g, "@mux/", file];
    if (force) {
      sedOptions.unshift("-i");
    }
    const sedFile = sh.sed(...sedOptions);
    sh.echo(`${chalk.green(file)}`);
    if (!force) {
      const [lineNumbers, beforeLines] = linesFileMap.get(file);
      const lines = sedFile.split("\n");
      sh.echo("Before:");
      beforeLines.forEach((beforeLine, i) => {
        sh.echo(`	${chalk.yellow(lineNumbers[i])}:${beforeLine}`);
      });
      sh.echo("After:");
      lineNumbers.forEach((lineNumber) => {
        sh.echo(`	${chalk.yellow(lineNumber)}:${lines[lineNumber]}`);
      });
    }
  });
};
const updatePackage = () => {
  var _a2, _b;
  if (!sh.test("-f", "./package.json")) {
    sh.echo(chalk.red("This folder isn't a module an doesn't include a package.json file."));
    sh.exit(1);
    return;
  }
  const pkg = JSON.parse(sh.cat("./package.json").toString());
  const muxElDeps = Object.keys((_a2 = pkg.dependencies) != null ? _a2 : {}).filter((dep) => dep.startsWith("@mux-elements/"));
  const muxElDevDeps = Object.keys((_b = pkg.devDependencies) != null ? _b : {}).filter(
    (dep) => dep.startsWith("@mux-elements/")
  );
  const getExec = (type, command, deps) => {
    const execOptions = [npmClient, "--color=always", command];
    if (command === "add") {
      if (type === "dev") {
        if (npmClient === "yarn") {
          execOptions.push("--dev");
        } else {
          execOptions.push("--save-dev");
        }
      } else if (type === "dep" && npmClient === "npm") {
        execOptions.push("--save");
      }
    }
    return execOptions.concat(deps);
  };
  const errors = [];
  let code, stdout, stderr;
  if (muxElDeps.length) {
    if (force) {
      sh.echo(`Running ${npmClient} remove on ${muxElDeps.join(" ")}`);
      ({ code, stdout, stderr } = sh.exec(getExec("dep", "remove", muxElDeps).join(" ")));
      errors.push(["remove dependencies", code, stdout, stderr]);
      sh.echo(`Running ${npmClient} add on ${muxElDeps.join(" ")}`);
      ({ code, stdout, stderr } = sh.exec(
        getExec(
          "dep",
          "add",
          muxElDeps.map((dep) => dep.replace("@mux-elements/", "@mux/"))
        ).join(" ")
      ));
      errors.push(["add dependencies", code, stdout, stderr]);
    } else {
      sh.echo("The following dependencies will be removed and re-added with the updated @mux/ scope:");
      muxElDeps.forEach((dep) => {
        sh.echo("	", chalk.yellow(dep));
      });
    }
  }
  if (muxElDevDeps.length) {
    if (force) {
      sh.echo(`Running ${npmClient} remove on ${muxElDevDeps.join(" ")}`);
      ({ code, stdout, stderr } = sh.exec(getExec("dev", "remove", muxElDevDeps).join(" ")));
      errors.push(["remove dev dependencies", code, stdout, stderr]);
      sh.echo(`Running ${npmClient} add on ${muxElDevDeps.join(" ")}`);
      ({ code, stdout, stderr } = sh.exec(
        getExec(
          "dev",
          "add",
          muxElDevDeps.map((dep) => dep.replace("@mux-elements/", "@mux/"))
        ).join(" ")
      ));
      errors.push(["add dev dependencies", code, stdout, stderr]);
    } else {
      sh.echo("The following dev dependencies will be removed and re-added with the updated @mux/ scope:");
      muxElDevDeps.forEach((dep) => {
        sh.echo("	", chalk.yellow(dep));
      });
    }
  }
  sh.echo();
  let err = false;
  errors.forEach(([scenario, _code, _stdout, _stderr]) => {
    if (_code !== 0) {
      sh.echo(chalk.red(`scenario ${chalk.bold(scenario)} exited with code`), String(_code));
      sh.echo(chalk.dim(chalk.red(_stdout)));
      sh.echo(chalk.dim(chalk.red(_stderr)));
      err = true;
    }
  });
  if (err) {
    sh.exit(1);
  } else {
    if (force) {
      sh.echo(chalk.green("Replacing @mux-elements scope to @mux in package succeeded successfully! \u{1F389}"));
    }
  }
};
if (args.help) {
  printHelp();
} else if (args.imports) {
  imports();
} else if (args.package) {
  updatePackage();
} else {
  printHelp();
}
