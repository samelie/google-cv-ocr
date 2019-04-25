## Running

`git clone <repo>`

 `cd <repo>`

Create a 

[GoogleCloud credentials]: https://console.cloud.google.com/apis/credentials

file and modify the `.env`

  ####Steps

1. Upload pdf to bucket `gsutil cp 000ViolaTranscriptPardon.pdf  gs://<bucket_name>/cloud-vision-text/input/000ViolaTranscriptPardon.pdf`
2. `node index.js 000ViolaTranscriptPardon`
   1. Make sure to modify `export.js` file for correct bucket
3. Pull down the directory: `gsutil cp -r  gs://<bucket_name>/cloud-vision-text/output/000ViolaTranscriptPardon output`

4. `node export.js output/000ViolaTranscriptPardon`