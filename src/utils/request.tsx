import { setResults } from '../redux/slices/images';
import { store } from '../redux/store';

import { axiosClient } from '../utils/axios/axiosClient';
import tasks from '../data/tasks';
import image from './image';

const request = {

  image: async () => {

    const formData = new FormData();

    let originals = store.getState().images.originals;
    let current = store.getState().images.current;
    let model = store.getState().settings.model;
    let task = store.getState().settings.task;

    //convert back to blob
    const blob: Blob = image.createBlob(originals![current!].base64, 'binary');

    formData.append('image', blob);
    //formData.append('mask', current); 

    let models = tasks[task].models;

    let url: string;

    for (let i = 0; i < models.length; i++) {
      if (models[i].name === model){
        url = models[i].url;
      }
    }
    
    try {
      const response = await axiosClient.post(url!, formData);
      store.dispatch(setResults(response.data));
    } catch (error) {
      console.log(error);
    }
  }

}

export default request;