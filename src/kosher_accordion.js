import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const KosherAccordion = ({onAddKosher}) => {

  const handleGlatChecked = (event) => {
    if (event.target.checked) {
      onAddKosher('גלאט');
    }
  }

  const handleMahposChecked = (event) => {
    if (event.target.checked) {
      onAddKosher('מחפוד');
    }
  }

  return (
    <Accordion style={{ marginTop: '20px', backgroundColor: 'rgb(247, 249, 236)' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography> שנה סוג כשרות </Typography>
      </AccordionSummary>
      <AccordionDetails>

      <FormGroup>
        <FormControlLabel control={<Checkbox onChange={handleGlatChecked} />} label="גלאט" />
        <FormControlLabel control={<Checkbox onChange={handleMahposChecked} />} label="מחפוד" />
      </FormGroup>

      </AccordionDetails>
    </Accordion>
  );
}