import './Main.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { RootState } from '../../../redux/store';

import MountDisplay from '../../interface/tools/MountDisplay';
import ModalOverlay from '../../interface/ModalOverlay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import tasks from '../../../data/tasks';
import { resetModel, setModel, setTask } from '../../../redux/slices/settings';
import { setOriginals, setCurrent } from '../../../redux/slices/images';
import request from '../../../utils/request';

import handleImg from '../../../utils/image';
import { createId } from '../../../tools/createID';
import sleep from '../../../tools/sleep';


const Main = () => {

  const dispatch = useDispatch();

  const { originals, results, current } = useSelector((state: RootState) => state.images);
  const { task, model } = useSelector((state: RootState) => state.settings);

  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    MountDisplay(undefined, undefined);
  }, []);

  useEffect(() => {
    dispatch(resetModel());
  }, [task, dispatch]);

  const changeTask = (task: string) => {
    dispatch(setTask(task));
  }

  const changeModel = (model: string) => {
    dispatch(setModel(model));
  }

  const handleFileSelect = (event: any) => {
    const files = event.target.files;

    if (files[0]) {
      const images = [];
      for (let i = 0; i < files.length; i++) {
        let image: image = {
          id: createId(20), 
          name: files[i].name,
          type: files[i].type,
          url: handleImg.createBlob(files[i], 'file', true)!,
          base64: btoa(files[i])
        }
        images.push(image);
      }
      dispatch(setOriginals(images));
      dispatch(setCurrent(0));
    }
   
  };

  const submitRequest = async () => {
    try {
      setIsLoading(true);
      await sleep(4000);
      await request.image();
      setIsLoading(false);
    } catch {
      //
    }
  }

  const clearRequest = async () => {
    dispatch(setOriginals(null));
    dispatch(setCurrent(null));
  }

  return ( 
    <div id="page-content">
      
      <div className="main-pg fade-in-quickest">

          {current !== null && originals ?

            (results ? 
              <div className='results-display'>
                <h1> Results </h1>
                <img src={handleImg.createBlob(results, 'binary', true)} height={400} alt="Results"/>
              </div>
            :
              <div className="originals-display">

                {isLoading && 
                  <>
                    <ModalOverlay color="white" loader={true}/>
                  </> 
                }

                <div className='originals-display-more' style={{display: originals.length > 1 ? 'flex' : 'none'}}>
                  {originals.map((img) => {
                    if (img !== originals[current]) {
                      return (
                        <img src={img.url} style={{height: 'calc(50px + 2vw'}} alt={img.name}/>
                      )
                    }
                    return null;
                  })} 
                </div> 

                <div className='original-display-current'>
                  <img src={originals[current].url} height={400} alt={originals[current].name}/>
                </div>
              </div>
            )

          :
            (task === 'image_inpainting' ?
              <div className='inpainting-input'>
                <div className="image-input-container">
                  <input type="file" name="file" accept="image/*" id="image-input" onChange={handleFileSelect}/>
                  <label htmlFor="image-input" className="image-input-label">
                    <h1><FontAwesomeIcon icon={faImage} color='gray'/></h1>
                    <h1>Drag here</h1>
                    <h1>--- or ---</h1>
                    <h1>Click to upload</h1>
                  </label>
                </div>

                <div className="image-input-container">
                  <input type="file" name="file" accept="image/*" id="image-input" onChange={handleFileSelect}/>
                  <label htmlFor="image-input" className="image-input-label">
                    <h1><FontAwesomeIcon icon={faImage} color='gray'/></h1>
                    <h1>Drag here</h1>
                    <h1>--- or ---</h1>
                    <h1>Click to upload</h1>
                  </label>
                </div>
              </div>
            
            :
              <div className="image-input-container">
                <input type="file" name="file" accept="image/*" id="image-input" multiple onChange={handleFileSelect}/>
                <label htmlFor="image-input" className="image-input-label">
                  <h1><FontAwesomeIcon icon={faImage} color='gray'/></h1>
                  <h1>Drag here</h1>
                  <h1>--- or ---</h1>
                  <h1>Click to upload</h1>
                </label>
              </div>
            )
          }       

        <div className="settings-container">
          <h2>
            <i className="fa-light fa-gear" style={{marginRight: '10px', color: 'black'}}></i>
            {current !== null && originals![current].name}
          </h2>
          <div className='seperator' style={{height: '2px', background: 'gray', marginBottom: '20px'}}></div>

          <div className='setting'>
            <div className='setting-header'>
              <h1>Task</h1>
            </div>
            <div className="task-options">
              {Object.values(tasks).map((key: any, index) => {
                return (
                  <h1 key={index} style={{background: Object.keys(tasks)[index] === task ? '#f19696' : 'inherit'}} onClick={() => changeTask(Object.keys(tasks)[index])}>
                    {key.short_name}
                  </h1>
                )
              })}
            </div>
          </div>

          <div className='setting'>
            <div className='setting-header'>
              <h1>Model</h1>
            </div>
            <div className="model-options">
              {task && tasks[task].models.map((taskModel, index) => {
                return (
                  <h1 key={index} style={{background: model === taskModel.name ? '#f19696' : 'inherit'}} onClick={() => changeModel(taskModel.name)}>
                    {taskModel.name}
                  </h1>
                )
              })}
            </div>
          </div>

          <div className='setting'>
            <div className='setting-header' style={{textAlign: 'right', background: 'whitesmoke'}}>
              <h1>Settings</h1>
            </div>
            <div className="slider-options">
              <div className="slidecontainer">
                <input type="range" min="1" max="100" className="slider" id="myRange"/>
              </div>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" className="slider" id="myRange"/>
              </div>
              <div className="slidecontainer">
                <input type="range" min="1" max="100" className="slider" id="myRange"/>
              </div>
            </div>
          </div>
          
        </div>

      </div>


      <div className='main-options' style={{visibility: originals && !isLoading ? 'visible' : 'hidden'}}>
        <button className="submit-btn" onClick={submitRequest}>
          Submit
        </button>
        <button className="submit-btn" onClick={clearRequest}>
          Clear
        </button>
      </div>
      
    </div>
  ); 
}

export default Main;



