import React, { useState, useEffect, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import '../App.css';
import { Button } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core'
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
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';



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

const listeErreurs = [
  "Le numéro civique doit être un nombre",
  "Le Code Postal est invalide",
  "L'adresse courriel est invalide",
  "Le nom ne peut être nul",
  "Le prénom ne peut être nul",
  "La date de naissance est obligatoire",

]

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

}));



function Inscription(props) {


  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const theme = useTheme(props.theme);
  const { t, i18n } = useTranslation('Inscription');
  useEffect(() => {
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [Prenom, setPrenom] = useInput('');
  const [Nom, setNom] = useInput('');
  const [Sexe, setSexe] = useInput('');
  const [AdresseNo, setAdresseNo] = useInput('');
  const [Rue, setRue] = useInput('');
  const [CodePostal, setCodePostal] = useInput('');
  const [DateDeNaissance, setDateDeNaissance] = useInput('');
  const [PrenomParent1, setPrenomParent1] = useInput('');
  const [PremiereFois, setPremiereFois] =  React.useState(false);
  const [NomParent1, setNomParent1] = useInput('');
  const [TelephoneParent1, setTelephoneParent1] = useInput('');
  const [CourrielParent1, setCourrielParent1] = useInput('');
  const [ImpliqueParent1, setImpliqueParent1] = React.useState(false);
  const [PrenomParent2, setPrenomParent2] = useInput('');
  const [NomParent2, setNomParent2] = useInput('');
  const [TelephoneParent2, setTelephoneParent2] = useInput('');
  const [CourrielParent2, setCourrielParent2] = useInput('');
  const [ImpliqueParent2, setImpliqueParent2] =  React.useState(false);
  const [PrenomUrgence, setPrenomUrgence] = React.useState('');
  const [NomUrgence, setNomUrgence] = React.useState('');
  const [TelephoneUrgence, setTelephoneUrgence] = React.useState('');
  const [CourrielImpots, setCourrielImpots] = useInput('');
  const [Commentaires, setCommentaires] = useInput('');
  const [JouerAutreEquipe, setJouerAutreEquipe] = React.useState(false);
  const [DerniereEquipe, setDerniereEquipe] =  useInput('');
  const [AnneeDerniereEquipe, setAnneeDerniereEquipe] = useInput('');
  const [copieParent, setCopieParent] = React.useState('0');
  const [estConfirme, setEstConfirme] = React.useState(false);
  const [estErreurConfirme, setEstErreurConfirme] = React.useState(false);
  const [erreurs, setErreurs] = React.useState([]);



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
  const styleForme = {
    marginTop: 80,
    paddingTop: 80,
    textAlign: "left",
  }
  const inputBox = {
    textAlign: 'right',
    float: 'right',

  }

  const titreSection = {
    textAlign: 'center',
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
        <h4>  Les inscriptions 2024-2025 sont ouvertes! </h4>
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
                        primary="M7 (Pré-novice): 99$" secondary="2018-2019-2020-2021"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M9 (Novice): 325$" secondary="2016-2017"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M11 (Atome): 325$" secondary="2014-2015"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M13 (Peewee): 325$" secondary="2012-2013"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M15 (Bantam): 325$" secondary="2010-2011"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="M18 (Midget): 375$" secondary="2007-2008-2009"
                      />
                    </ListItem>

                  </List>

                </CardContent>
              </CardActionArea>

            </Card>

            </Grid>
          </Grid>
        </Grid>

    </Container>

  </div >
);

}



export default Inscription;
