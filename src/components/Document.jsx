import React from 'react';
import {docTypeToImageConfig} from '../utils/utils';

const Document = ({docEntity}) => {
    // console.log(docEntity);

  return (
    <div className="document-item">
        <div>{docEntity.title}</div>
        <div className='image-container'>
            <img src={docTypeToImageConfig[docEntity.type]} alt={docEntity.title} />
        </div>
    </div>
  )
}

export default Document;