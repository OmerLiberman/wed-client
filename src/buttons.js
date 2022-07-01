import React from 'react';

import {Button} from '@mui/material';

export const Buttons = ({onClick}) => {
  return (
    <div style={{padding: 20}}>
      <Button variant="contained" color="success" style={{marginLeft: 10, borderRadius: 28}} onClick={() => onClick('Yes')}>
        מגיעים
      </Button>
      <Button variant="contained" color="error" style={{borderRadius: 28}} onClick={() => onClick('No')}>
        לא מגיעים
      </Button>
    </div>
  )
}