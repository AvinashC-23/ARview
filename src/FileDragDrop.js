import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const FileDragDrop = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Files uploaded successfully!');
    } catch (error) {
      console.error('Error uploading files:', error);
    }

    const fileList = acceptedFiles.map(file => ({
      name: file.name,
      path: URL.createObjectURL(file)
    }));
    setFiles(fileList);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`drop-container ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
      <h2>Uploaded Files</h2>
      {files.map((file, index) => (
        <div key={index}>
          <p>Name: {file.name}</p>
          <p>Path: {file.path}</p>
        </div>
      ))}
    </div>
  );
};

export default FileDragDrop;
