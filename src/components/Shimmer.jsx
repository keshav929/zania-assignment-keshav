import React from 'react'

const Shimmer = () => {
    let arr = [1,2,3,4,5,6,7,8,9];
  return (
    
    <div className='items-container'>{arr.map((item)=>{
        return (<div className='document-item'>
            <div className='image-container'>
            </div>
        </div>);
    })}</div>
  )
}

export default Shimmer