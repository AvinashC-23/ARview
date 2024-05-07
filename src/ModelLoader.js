import React, { useEffect, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelLoader = ({ file }) => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(file, (gltf) => {
      setModel(gltf.scene);
    });
  }, [file]);

  return model? <primitive object={model} /> : null;
};

export default ModelLoader;
