import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@mui/styles';

import '../App.css';
import Button from '@mui/material/Button';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import logoTimBits from '../shared/AW_TH TimBits Hockey_110718.png'
import logoTim from '../shared/th-logo2018.png'



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) { setValue(e.target.value); }
  return [value, handleChange];
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    textAlign: 'center',
    color: '#00FF00',
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1rem',
    justifyContent: 'flex-start'
  },
  rootMobile: {
    maxWidth: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem',
    justifyContent: 'flex-start'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginTop: '50px'
  },
  modal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `$50%`,
    left: `$50%`,
    transform: `translate(-$50%, -$50%)`,

  },

  btnSuccess: {
    backgroundColor: theme.palette.success,
  },
  texteErreur: {
    color: theme.palette.error,
    },

    logoTH: {
        height: '10rem',
        width: '100%',
    }
}));



function Inscription(props) {


  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const theme = useTheme(props.theme);
  const { t, i18n } = useTranslation('Inscription');
  useEffect(() => {
  }, []);

  const classes = useStyles();

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


 
  const handleWindowSizeChange = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  };
  const divPrincipale = {
    marginTop: 80,
    marginBottom: 80,
    margin: 'auto'

  }

  const titreSection = {
    textAlign: 'center',
    }

    const logoTH = {
      backgroundSize:'contain',
      height:'10rem',
      width: '100%',
    }

  function changeLangue(lang) {
    var cookie = new Cookies();
    cookie.set("langue", lang);
    location.reload();
  }


return (
  <div style={divPrincipale}>
    <Container >
      <Grid container spacing={8}>
        <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} >
        <h4>  Les inscriptions 2025-2026 sont ouvertes! </h4>
            <Card >

              <CardActionArea>

                <CardContent>
                  <div>{"Les inscriptions se font directement sur le site de Hockey Canada. Cliquez sur ce lien pour aller directement au bon endroit:"}</div>
                  <Link href="https://page.hockeycanada.ca/page/hc/hq/hockey-quebec-region-montreal/ahm-de-villeray/participant"><h3 style={titreSection}> Page d'inscription</h3></Link>

                </CardContent>
              </CardActionArea>
            </Card >
            
            
          </Grid>
          <Grid item xs={12} >
          <h4> Utile à savoir pour l'inscription... </h4>
            <Card >

              <CardActionArea>

                <CardContent>
                <List dense>


                <ListItem>
                  <ListItemText
                    primary="Contactez-nous si vous éprouvez des problèmes" secondary={<Link href="mailto:ahmvtornade@hotmail.com">ahmvtornade@hotmail.com</Link>}
                  />
  

                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Si votre enfant a déjà joué avec nous (ou une autre équipe), vous devrez rechercher son nom dans la base de données." secondary="Vous devrez aussi indiquer sa date de naissance dans le cadre de la recherche."
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Une fois démarré, terminez le processus car la session n'est pas enregistrée si vous interrompez."
                  />
                </ListItem>
                <ListItem>
                 <ListItemText
                    primary="Vous n'avez pas à payer immédiatement, vous pourrez régler les frais d'inscription au début de la prochaine saison. " secondary="Comme à l'habitude"
                  />
 
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Si vous avez plusieurs enfants, inscrivez-les en même temps pour profiter du rabais multi-enfants." secondary="Sinon, on pourra toujours le faire après coup."
                  />
                </ListItem>


                </List>

                </CardContent>
              </CardActionArea>
            </Card >
            
            
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={2}>
        <Grid item xs={12} >
        <h4 style={titreSection}> Inclusions </h4>


            <Card >

              <CardActionArea>

                <CardContent>


                  <List dense>


                    <ListItem>
                      <ListItemText
                        primary="Saison régulière" secondary="18 à 26 parties"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Entraînements"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Séries éliminatoires"
                      />
                    </ListItem>
                    <ListItem>
                     <ListItemText
                        primary="Tournoi" secondary="Novice à Midget, Selon la disponibilité"
                      />
                     
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Paire de bas"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Ensemble de chandails de parties"
                      />
                    </ListItem>

                  </List>

                </CardContent>
              </CardActionArea>

            </Card>

          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} spacing={(5, 2)}>
          <Grid item xs={12}>
            <h4 style={titreSection}>Prix</h4> 

            <Card >

              <CardActionArea>

                <CardContent>
                  <List dense>


                    <ListItem>
                      <ListItemText
                        primary="Timbits M7: 190$" secondary="2019-2020-2021-2022"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M9 : 380$" secondary="2017-2018"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M11 : 450$" secondary="2015-2016"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M13 : 450$" secondary="2013-2014"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M15 : 475$" secondary="2011-2012"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M18 : 525$" secondary="2008-2009-2010"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Junior: 590$" secondary="2004-2005-2006-2007"
                      />
                    </ListItem>

                  </List>

                </CardContent>
              </CardActionArea>

            </Card>

           </Grid>
        </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h4> Merci à Tim Hortons pour leur support auprès des tout-petits! </h4>
                    </Grid>
                            <Grid item xs={12} md={ 6}>
                        <Card >

                            <CardMedia
                                style={logoTH}
                                image={logoTim}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardMedia
                                image={logoTimBits}
                                alt="TimBitsHouckey"
                                style={logoTH}
                            />
                        </Card>


                    </Grid>
                </Grid>
       </Grid>

    </Container>

  </div >
);

}



export default Inscription;
