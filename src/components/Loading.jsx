import React from 'react'

const Loading = () => {
const loaderItems = Array(10).fill().map(() => Math.round(Math.random() * 40));

  return (
    <div>
        <img src="https://media.tenor.com/TAqs38FFJiwAAAAi/loading.gif" alt="loader" />
    </div>
  )
}

export default Loading