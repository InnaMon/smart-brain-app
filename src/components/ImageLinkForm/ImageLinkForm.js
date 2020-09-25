import React from 'react';
import './ImageLinkForm.css';
import InformationIcon from '../../assets/information.svg';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
              <p className='f3'>
              {'This Magic Brain will detect faces in your pictures. Give it a try'}
              </p>
              <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                  <input 
                    className='f4 pa2 w-70 center'
                    style={{paddingLeft: '30px'}} 
                    type='text' 
                    placeholder="Image URL goes here..."
                    onChange={onInputChange}
                  />
                  <div className="information-icon">
                      <div className="tooltip">
                      <img className="information-icon-img" src={InformationIcon} alt="information icon" />
                          <span className="tooltiptext">Make sure your URL ends with an image extension like jpeg or png</span>
                      </div>
                  </div>
                  <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonSubmit}
                  >Detect</button>       
                </div>
              </div>
        </div>
    );
}

export default ImageLinkForm;