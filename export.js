const utf8 = require("utf8")
const mkdirp = require("mkdirp")
const { last, compact } = require("lodash")
const readDir = require("readdir")
const fs = require("fs")
const path = require("path")
if (process.argv.length <= 2) {
  console.log("Usage: " + __filename + " SOME_PARAM")
  process.exit(-1)
}

var param = process.argv[2]
const { name, ext, dir } = path.parse(param)
if (ext || ext.length) {
  console.log("Specify directory")
  process.exit(-1)
}

const inputDir = path.resolve(param)
console.log(inputDir)
readDir
  .readSync(inputDir, ["**.json"], readDir.ABSOLUTE_PATHS)
  .map(file => {
    console.log(file)
    const exported = path.join(
      "export",
      last(inputDir.split("/")),
      `${path.parse(file).name}.txt`
    )
    try {
      mkdirp(path.parse(exported).dir)
    } catch (e) {
      console.log(e)
    }
    fs.writeFileSync(
      exported,

      compact(
        JSON.parse(fs.readFileSync(file)).responses.map(
          ({ fullTextAnnotation }) =>
            !!fullTextAnnotation ? fullTextAnnotation.text : null
        )
      ).join("\n\n")
    )
    console.log("Exported", exported)
  })
