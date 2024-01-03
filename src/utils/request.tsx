import { setResults } from '../redux/slices/images';
import { store } from '../redux/store';

import { axiosClient } from '../utils/axios/axiosClient';
import models from '../data/models';
import imageUtil from './image';

const request = {

  image: async () => {

    const formData = new FormData();

    let originals = store.getState().images.originals;
    let current = store.getState().images.current;
    let model = store.getState().settings.model;
    let task = store.getState().settings.task;

    //convert back to blob
    const blob: Blob = imageUtil.create.blob(originals![current!].base64, 'binary');

    formData.append('image', blob);
    //formData.append('mask', current); 

    let modelsForTask = models[task].models;

    let path: string;

    for (let i = 0; i < modelsForTask.length; i++) {
      if (modelsForTask[i].name === model){
        path = modelsForTask[i].path;
      }
    }
    
    try {
      const response = await axiosClient.post(path!, formData);
      store.dispatch(setResults(response.data));
    } catch (error) {
      return;
    }
  }

}

export default request;