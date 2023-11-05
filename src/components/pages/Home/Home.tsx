import './Home.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { RootState } from '../../../redux/store';

import MountDisplay from '../../interface/tools/MountDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import tasks from '../../../data/tasks';
import { resetModel, setModel, setTask } from '../../../redux/slices/settings';
import { setOriginals, setResults } from '../../../redux/slices/images';
import axios from 'axios';

import handleImg from '../../../utils/image';


const Landing = () => {

  const dispatch = useDispatch();
  const { originals, results } = useSelector((state: RootState) => state.images);
  const { task, model } = useSelector((state: RootState) => state.settings);

  const [currentImage, setCurrentImage] = useState<any>();

  
  useEffect(() => {
    MountDisplay(undefined, undefined);
  }, []);

  useEffect(() => {
    dispatch(resetModel());
  }, [task, dispatch]);

  useEffect(() => {
    const testApp = async () => {
      const formData = new FormData();
      formData.append('image', currentImage);
      formData.append('mask', currentImage); 
      
      try {
        const response = await axios({
          method: 'POST',
          url: 'http://155.138.202.64:8008/vision/model-pix2pix2',
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: 'arraybuffer'
        });
        
        dispatch(setResults(response.data));
        console.log(typeof response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (currentImage) testApp();
  }, [currentImage, dispatch]);


  const changeTask = (task: string) => {
    dispatch(setTask(task));
  }

  const changeModel = (model: string) => {
    dispatch(setModel(model));
  }

  const handleFileSelect = (event: any) => {
    const files = event.target.files;
    console.log(event.target.files);

    if (files[0]) {
      for (let i = 0; i < files.length; i++) {
        let image: image = {
          id: 'id', 
          name: files[i].name,
          type: files[i].type,
          url: handleImg.createBlob(files[i], 'file', true)!
        }
        dispatch(setOriginals(image))
      }
    }
    setCurrentImage(files[0]);
  };



  return ( 
    <div id="page-content">
      
      <div className="home-pg fade-in-quickest">
          
          {currentImage && originals ?
            <>
            <div className="images-display">
              <div>
                {originals.map((img) => {
                  if (img !== currentImage) {
                    return (
                      <img src={img.url} style={{height: 'calc(50px + 2vw'}} alt={img.name}/>
                    )
                  }
                  return null;
                })} 
              </div> 
              <div>
                <img src={currentImage!.url} height={400} alt={currentImage.name}/>
              </div>
            </div>

            {results &&
              <div className='results-display'>
                Results
                <img src={handleImg.createBlob(results, 'binary', true)} height={400} alt="Results"/>
              </div>
            }
            </>
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
          }
        

        <div className="settings-container">
          {currentImage && <h2><i className="fa-light fa-gear"></i> {currentImage!.name}</h2>}
          <div className='seperator' style={{height: '2px', background: 'gray', marginBottom: '20px'}}></div>

          <div>
            <div>Tasks:</div>
            <div className="task-options">
              {Object.values(tasks).map((key: any, index) => {
                console.log(key, task);
                return (
                  <h1 key={index} style={{background: Object.keys(tasks)[index] === task ? '#f19696' : 'inherit'}} onClick={() => changeTask(Object.keys(tasks)[index])}>
                    {key.short_name}
                  </h1>
                )
              })}
            </div>
          </div>

          <div>
            <div>Model:</div>
            <div className="model-options">
              {task && tasks[task].models.map((name, index) => {
                return (
                  <h1 key={index} style={{background: model === name ? '#f19696' : 'inherit'}} onClick={() => changeModel(name)}>
                    {name}
                  </h1>
                )
              })}
            </div>
          </div>

          <div>
            <div>Settings:</div>
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

    </div>
  ); 
}

export default Landing;



