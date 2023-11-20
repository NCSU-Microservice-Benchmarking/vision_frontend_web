import './Settings.css';
import React , { useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { RootState } from '../../../redux/store';

import tasks from '../../../data/tasks';
import { resetModel, setModel, setTask } from '../../../redux/slices/settings';

const Settings = () => {

  const dispatch = useDispatch();

  const { originals, current } = useSelector((state: RootState) => state.images);
  const { task, model } = useSelector((state: RootState) => state.settings);

  //reset model variable when task is changed
  useEffect(() => {
    dispatch(resetModel());
  }, [task, dispatch]);

  const changeTask = (task: string) => {
    dispatch(setTask(task));
  }

  const changeModel = (model: string) => {
    dispatch(setModel(model));
  }

  return ( 
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
  ); 
}

export default Settings;



