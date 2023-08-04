import React from 'react';
import Lottie from 'react-lottie-player';
import blogAnimation from './blogAnimation.json'

const BlogLottie = () => {
    return (
        <div className='blogAnimation'>
          <Lottie
            loop
            animationData={blogAnimation}
            play
          />
        </div>
      )
}

export default BlogLottie
