import './Main.css';
import Settings from './Settings';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setOriginals, setCurrent } from '../../../redux/slices/images';

import MountDisplay from '../../interface/tools/MountDisplay';
import ModalOverlay from '../../interface/ModalOverlay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faPlus } from '@fortawesome/free-solid-svg-icons'

import request from '../../../utils/request';
import imageUtil from '../../../utils/image';
import { image } from '../../../types/image';
import { createId } from '../../../tools/createID';
import { setResponse } from '../../../redux/slices/general';

const Main = () => {

  const dispatch = useDispatch();

  const { originals, results, current } = useSelector((state: RootState) => state.images);
  const { task } = useSelector((state: RootState) => state.settings);
  const { response } = useSelector((state: RootState) => state.general);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    MountDisplay(undefined, undefined);
  }, []);

  const handleFileSelect = (event: any) => {
    const files = event.target.files;
  
    if (files[0]) {
      const images: image[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          const image: image = {
            id: createId(20),
            name: files[i].name,
            type: files[i].type,
            url: imageUtil.create.blob(files[i], 'file', true)!,
            base64: base64,
          };
  
          images.push(image);
  
          // If all images are processed, dispatch the results
          if (images.length === files.length) {
            dispatch(setOriginals(images));
            dispatch(setCurrent(0));
          }
        };
  
        // Read the file as a data URL (Base64)
        reader.readAsDataURL(files[i]);
      }
    }
  };
  

  const submitRequest = async () => {
    try {
      setIsLoading(true);
      await request.image();
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  }

  const clearRequest = () => {
    dispatch(setOriginals(null));
    dispatch(setCurrent(null));
    dispatch(setResponse(null));
  }

  return ( 
    <div id="page-content">
      
      <div className="main-pg fade-in-quickest">

          {originals && current !== null ?

            (results ? 
              <div className='results-display'>
                <h1> Results </h1>
                <img src={imageUtil.create.blob(results, 'binary', true)} height={400} alt="Results"/>
              </div>
            :
              <div className="originals-display">

                {isLoading && 
                  <ModalOverlay color="white" loader={true}/>
                }

                <div className='originals-display-more' style={{display: originals.length > 1 ? 'flex' : 'none'}}>
                  {originals.map((img) => {
                    if (img !== originals[current]) {
                      return (
                        <img src={img.url} id="queued-img" alt={img.name}/>
                      )
                    }
                    return null;
                  })} 
                  <div id="queued-img-add">
                    <input type="file" name="file" accept="image/*" id="image-input" multiple onChange={handleFileSelect}/>
                    <label htmlFor="image-input" className="image-input-label">
                      <FontAwesomeIcon icon={faPlus}/>
                    </label>
                    </div>
                </div> 

                <div className='original-display-current'>
                  <img src={originals[current].url} id="current-img" alt={originals[current].name}/>
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
                  {/*<h1>Drag here</h1>
                  <h1>--- or ---</h1>*/}
                  <h1>Click to upload</h1>
                </label>
              </div>
            )
          }       

        <Settings/>

      </div>


      {response && 
        <div className='response'>
          <h1 style={{color: response.type === 'error' ? 'red' : 'black'}}>
            {response.code ? response.code + ": " : ""} {response.message}
          </h1>
        </div>
      }

      <div className='main-options' style={{visibility: originals && !isLoading ? 'visible' : 'hidden', marginTop: !response ? '20px' : '0px'}}>
        <button className="main-options-btn" onClick={submitRequest}>
          Submit
        </button>
        <button className="main-options-btn" onClick={clearRequest}>
          Clear
        </button>
      </div>
      
    </div>
  ); 
}

export default Main;