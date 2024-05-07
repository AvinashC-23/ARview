// import React from 'react';
// import { useDropzone } from 'react-dropzone';

// const Dropzone = ({ onDrop }) => {
//   const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
//     onDrop,
//     accept: 'application/zip',
//   });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       <p>Drag 'n' drop some files here, or click to select files</p>
//     </div>
//   );
// };

// export default Dropzone;
import React from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: 'model/gltf-binary,model/obj,application/octet-stream', // Adjusted to accept OBJ and GLB files
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default Dropzone;
