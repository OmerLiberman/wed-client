import React from 'react';

import image from "./einav_and_omer.jpeg";

export const OurImage = () => {
  return (
    <div>
      <img alt="omer & einav" src={image} width={200} height={250} style={{borderRadius: 10}} />
    </div>
  )
}