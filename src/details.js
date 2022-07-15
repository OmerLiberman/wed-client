import React from 'react';
import {Typography} from '@mui/material'

export const Details = () => {
  return (
    <>
      <div>
      <Typography variant="h4" fontFamily="Heebo">
        עינב ועומר
      </Typography>
      <Typography variant="h4" fontFamily="Heebo">
        <b> מתחתנים </b>
      </Typography>
      <div style={{marginTop: '10px'}}> 
        התרגשות גדולה להמזינכם לחגוג עמנו את היום המאושר שלנו
      </div>
    </div>

    <div>
      <div> יום שני, י״ח באב התשפ״ב </div>
      <div> 
        <Typography variant="h5" fontFamily="Heebo">
          22 | 8 | 15 
        </Typography>
      </div>
    </div>

    <div>
      <Typography variant="h6" fontFamily="Heebo">
          מתחם האירועים ״לוקא״, משמר השרון
      </Typography>
    </div>

    <div style={{fontFamily: "Heebo"}}>
      <div> קבלת פנים - 19:15 </div>
      <div> חופה וקידושין - 20:00 </div>
    </div>

    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontFamily: "Heebo"}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div> <b> הורי הכלה</b> </div>
        <div> רותי ועופר</div>
        <div> דביר </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div> <b> הורי החתן</b> </div>
        <div> טילי ואיל</div>
        <div> ליברמן</div>
      </div>
    </div>
  </>
  );
}