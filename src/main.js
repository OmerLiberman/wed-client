import React, {useState, useEffect} from 'react';
import {Button, TextField, ThemeProvider, Typography} from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import {createTheme} from '@mui/material/styles';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import axios from 'axios';

import {Details} from './details';
import {OurImage} from './our_image';
import {Buttons} from './buttons';
import {InviteModal} from './modal';
import {KosherAccordion} from './kosher_accordion';


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
  const [invitees, setInvitees] = useState(1);
  const [come, setCome] = useState(undefined);
  const [saved, setSaved] = useState(undefined);
  const [modalOpen, setModalOpen] = useState(false);
  const [kosher, setKosher] = useState([]);
  const [error, setError] = useState(true);

  const knownUserClickHandler = (status) => {
    axios.put('http://142.93.161.46:3001/api/attendies', {
        id,
        name: attenderKnownName,
        attendies: status === 'No' ? 0 : invitees,
        recognized: isRecognized,
        status,
        kosher, 
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
        attendies: status === 'No' ? 0 : invitees,
        recognized: isRecognized,
        status,
        kosher,
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
  
  const handleAddKosher = (kosherType) => {
    const koshers = kosher;
    koshers.push(kosherType)
    setKosher(koshers);
  }

  return (
    <ThemeProvider theme={theme}>
    <Confetti 
      width={width} 
      height={height} 
      recycle={false} 
      colors={[
        '#83927B', '#97A08B', '#DCD0C4'
      ]}
    />
    <div style={{backgroundColor: '#f6f6f6', height: '100%', width: '100%', color: 'black', fontFamily: 'Heebo, sans-serif'}}>
      <div style={{backgroundColor: '#f7f9ec', textAlign: 'center', direction: 'rtl', display: 'flex', flexDirection: 'column', rowGap: 20, maxWidth: 420, margin: '0 auto', padding: 50}}>

        <OurImage />

        {
          attenderKnownName &&
            <div>
              <Typography variant="h5">
                היי {attenderKnownName} !
              </Typography>
            </div>
        }

        <Button onClick={() => setModalOpen(true)}>
          לצפיה בהזמנה המקורית
        </Button>
        <InviteModal 
          onOpen={() => setModalOpen(true)}
          onClose={() => setModalOpen(false)}
          isOpen={modalOpen}
        />

        <Details />

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
              {
                isRecognized === false &&
                  <> 
                    <div>
                      <TextField id="standard-basic" placeholder="שם מלא" variant="standard" style={{maxWidth: '120px'}} InputProps={{dir: 'rtl'}} onChange={(e) => setName(e.currentTarget.value)} />
                    </div>
                    <div>
                      <TextField id="standard-basic" placeholder="מספר טלפון" variant="standard" style={{direction: 'rtl'}} onChange={(e) => setPhone(e.currentTarget.value)}/>
                    </div>
                  </>
              }
              <div style={{marginTop: 8}}>
                <Typography variant="h6">
                  מספר מגיעים
                </Typography>
                <div style={{marginTop: 30, display: 'flex', justifyContent: 'space-between'}}>
                  <Fab color="warning">
                    <AddIcon onClick={() => setInvitees(prev => Math.min(prev + 1, 10))} />
                  </Fab>
                  <Typography variant='h5'> {invitees} </Typography>
                  <Fab color="warning">
                    <RemoveIcon onClick={() => setInvitees(prev => Math.max(prev - 1, 1))} />
                  </Fab>
                </div>
              </div>

              <KosherAccordion onAddKosher={handleAddKosher} />

              <Buttons onClick={onClick}/>
            </div>
        }
      </div>
    </div>
  </ThemeProvider>
  );
}

export default Main;
