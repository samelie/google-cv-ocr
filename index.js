require("dotenv").config()
// Imports the Google Cloud client libraries
const vision = require("@google-cloud/vision")

if (process.argv.length <= 2) {
 console.log("Usage: " + __filename + " SOME_PARAM")
 process.exit(-1)
}

var param = process.argv[2]

// Creates a client
const client = new vision.ImageAnnotatorClient()

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// Bucket where the file resides
const bucketName = "samrad-samelie"
// Path to PDF file within bucket
const file = "000ViolaTranscriptSummerlin"
const fileName = `cloud-vision-text/input/${param}.pdf`
console.log(`processing: ${fileName}`);
// The folder to store the results
const outputPrefix = `cloud-vision-text/output/${param}`

const gcsSourceUri = `gs://${bucketName}/${fileName}`
const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/`

const inputConfig = {
  // Supported mime_types are: 'application/pdf' and 'image/tiff'
  mimeType: "application/pdf",
  gcsSource: {
    uri: gcsSourceUri,
  },
}
const outputConfig = {
  gcsDestination: {
    uri: gcsDestinationUri,
  },
}
const features = [{ type: "DOCUMENT_TEXT_DETECTION" }]
const request = {
  requests: [
    {
      inputConfig: inputConfig,
      features: features,
      outputConfig: outputConfig,
      imageContext: {
        languageHints: ["en"],
      },
    },
  ],
}

async function run() {
  const [operation] = await client.asyncBatchAnnotateFiles(request)
  const [filesResponse] = await operation.promise()
  const destinationUri =
    filesResponse.responses[0].outputConfig.gcsDestination.uri
  console.log("Json saved to: " + destinationUri)
}

run()
