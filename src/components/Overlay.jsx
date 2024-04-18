import React from 'react';
import { docTypeToImageConfig } from '../utils/utils';


const Overlay = ({selectedItemType}) => {
    
let imgUrl = docTypeToImageConfig[selectedItemType];  

  return (
    <div className='overlay-container'>
        <div className="overlay">
            <img src={imgUrl} alt={selectedItemType} />
        </div>
    </div>
  )
}

export default Overlay;