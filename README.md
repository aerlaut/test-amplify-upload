# This is a Proof of Concept for multiple file upload

## Setup

Clone this repo and then run

```
npm install
```

Once the dependencies are installed, you can run 

```
npm start
```

Files are uploaded to S3 bucket under `biomage-agi-test-bucket`. On upload success, Amplify will return the S3 object keys of the uploaded files, which you can see in console.