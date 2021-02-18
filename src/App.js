import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import Amplify, { Storage } from 'aws-amplify';

import './App.css';

// Configure Amplify
Amplify.configure({
  Auth: {
    identityPoolId: 'eu-west-1:31a9ed78-b2a6-4c3c-b10b-7faf7b90e0ca', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'eu-west-1', // REQUIRED - Amazon Cognito Region
  },
  Storage: {
    AWSS3: {
      bucket: 'biomage-agi-test-bucket', //REQUIRED -  Amazon S3 bucket
      region: 'eu-west-1', //OPTIONAL -  Amazon service region
    }
  }
});

// Configure Amplify to not use prefix when uploading to public folder, instead of '/'
Storage.configure({
  customPrefix: {
    public: '',
  },
})

function App() {


  // Handle on Drop
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {

      // First character of file.path === '/' means a directory is uploaded
      // Remove initial slash so that it does not create an empty directory in S3
      const filePath = file.path[0] === '/' ? file.path.slice(1) : file.path

      // Upload to AWS Amplify
      Storage.put(filePath, file)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    })

  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <main className="App">
      <h1>Amplify Drag and Drop Upload</h1>
      <div {...getRootProps({ className: 'dropzone' })} id="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div>
    </main>
  )
}

export default App;
