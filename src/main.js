import React, {useState, useEffect} from 'react';
import { Button, TextField, ThemeProvider, Typography } from '@mui/material'
import { createTheme } from '@mui/material/styles';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import axios from 'axios';

import ourImage from "./einav_and_omer.jpeg";

const theme = createTheme({
  direction: 'rtl',
});

const Main = () => {
  const { width, height } = useWindowSize();
  
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('id');

  const [attenderKnownName, setAttenderKnownName] = useState('');
  const [hasSavedAnswer, setHasSavedAnswer] = useState(undefined);
  useEffect(() => {
    axios.get(`http://142.93.161.46:3001/api/attendies/${id}`)
    .then(res => {
      if (res.status === 200) {
        const {name, attendies} = res.data;
        setAttenderKnownName(name);
        setIsRecognized(true);
        setHasSavedAnswer(attendies !== -1);
      } else {
        setIsRecognized(false);
      }
    })
    .catch(err => {
        setIsRecognized(false);
    });
  }, [id]);

  const [isRecognized, setIsRecognized] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [invitees, setInvitees] = useState(0);
  const [come, setCome] = useState(undefined);
  const [saved, setSaved] = useState(undefined);

  const knownUserClickHandler = (status) => {
    axios.put('http://142.93.161.46:3001/api/attendies', {
        id,
        name: attenderKnownName,
        phone,
        attendies: invitees,
        recognized: isRecognized,
        status,
      })
      .then(res => {
        if (res.status === 200) {
          setSaved(true);
        }
      })
      .catch(err => {
        setSaved(false);
      });
  }

  const unknownUserClickHandler = (status) => {
    axios.post('http://142.93.161.46:3001/api/attendies', {
        name,
        phone,
        attendies: invitees,
        recognized: isRecognized,
        status,
      })
      .then(res => {
        if (res.status === 200) {
          setSaved(true);
        }
      })
      .catch(err => {
        setSaved(false);
      });

  }

  const onClick = (status) => {
    setCome(status === 'Yes');
    if (isRecognized) {
        knownUserClickHandler(status);
    } else {
        unknownUserClickHandler(status);
    }
  }

  const onDeletePrevResponseClick = () => {
    setHasSavedAnswer(false);
    axios.put('http://142.93.161.46:3001/api/attendies', {
      id,
      name: attenderKnownName,
      phone,
      attendies: -1,
      recognized: isRecognized,
      status: '',
    })
  }

  return (
    <ThemeProvider theme={theme}>
    <Confetti width={width} height={height} />
    <div style={{backgroundColor: '#f6f6f6', height: '100%', width: '100%', color: 'black', fontFamily: 'Heebo, sans-serif'}}>
      <div style={{backgroundColor: '#f7f9ec', textAlign: 'center', direction: 'rtl', display: 'flex', flexDirection: 'column', rowGap: 20, maxWidth: 420, margin: '0 auto', padding: 50}}>

        <div>
          <img alt="omer & einav" src={ourImage} width={200} height={250} style={{borderRadius: 10}} />
        </div>

        {
          attenderKnownName &&
            <div>
              <Typography variant="h5">
                היי {attenderKnownName} שמחים להזמינך !
              </Typography>
            </div>
        }
        
        <div>
          <Typography variant="h4">
            עינב & עומר
          </Typography>
          <Typography variant="h4" color='red'>
            <b> מתחתנים </b>
          </Typography>
          <div> אנו שמחים ונרגשים להזמין אתכם לחגוג עמנו את יום נישואינו </div>
        </div>

        <div>
          <Typography variant="h5">
              מתי?
            </Typography>
          <div> יום שני - י״ח באב התשפ״ב </div>
          <div> 
            <Typography variant="h5">
              22 | 8 | 15 
            </Typography>
          </div>
        </div>

        <div>
          <Typography variant="h5">
              איפה?
            </Typography>
          <div> ״לוקא״ </div>
          <div> משמר השרון, ישראל </div>
        </div>

        <div>
          <Typography variant="h5">
              לוח זמנים
          </Typography>
          <div> קבלת פנים - 19:00 </div>
          <div> חופה וקידושין - 20:00 </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div> <b> הורי הכלה</b> </div>
            <div> רותי ועופר</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div> <b> הורי החתן</b> </div>
            <div> טילי ואיל</div>
          </div>
        </div>

        {
          saved && come ? 
            <div>
              <Typography variant="h5">
                {
                    invitees > 1 ?
                    "מחכים לראותכם!"
                    :
                      "מחכים לראותך!"
                }
              </Typography>
            </div>
          : saved && !come ?
              <div>
                <Typography variant="h5">
                    תשובתך נשמרה!
                </Typography>
              </div>
          : hasSavedAnswer ?
            <div>
              <Typography variant="h5">
                תשובה רשומה במערכת!
              </Typography>
              <Typography variant="h6">
                תרצה לשנות אותה?
              </Typography>
              <div style={{padding: 20}}>
                <Button variant="contained" color="success" style={{marginLeft: 10}} onClick={() => onDeletePrevResponseClick()}>
                  מחק תשובה קודמת
                </Button>
              </div>
            </div>
          :
            <div>
              <Typography variant="h5">
                    אישור הגעה
              </Typography>
              <div> נשמח לראותכם בין אורחינו </div>
              <div>
                {
                  isRecognized === false &&
                      <TextField id="standard-basic" placeholder="שם מלא" variant="standard" style={{maxWidth: '120px'}} InputProps={{dir: 'rtl'}} onChange={(e) => setName(e.currentTarget.value)} />
                }
              </div>
              <div>
                <TextField id="standard-basic" placeholder="מספר טלפון" variant="standard" style={{direction: 'rtl'}} onChange={(e) => setPhone(e.currentTarget.value)}/>
              </div>
              <div>
                <TextField id="standard-basic" placeholder="מספר אנשים" variant="standard" onChange={(e) => setInvitees(Number(e.currentTarget.value))}/>
              </div>
              <div style={{padding: 20}}>
                <Button variant="contained" color="success" style={{marginLeft: 10}} onClick={() => onClick('Yes')}>
                  מגיעים
                </Button>
                <Button variant="contained" color="error" onClick={() => onClick('No')}>
                  לא מגיעים
                </Button>
              </div>
            </div>
        }
      </div>
    </div>
  </ThemeProvider>
  );
}

export default Main;
