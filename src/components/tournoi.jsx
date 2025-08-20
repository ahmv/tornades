import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import TournoiALaRonde from './TournoiALaRonde';
import { Container } from '@mui/material';
import  Paper  from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import '../style/tournoi.css';

function Tournoi() {


    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [navHeight, setNavHeight] = useState(0);
  
    //let navRef = useRef(null);
  
    const isMobile =  size.height > size.width;
 

    const stylePaper={
      opacity:0.8,
      marginTop:'5rem'
    }
  
    useEffect(() => {
      handleWindowSizeChange();
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      }
    }, []);
  /*
    useLayoutEffect(() => {
      setNavHeight(navRef? navRef.getBoundingClientRect().height : 0)
    }, [navRef]);
  */
    const handleWindowSizeChange = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
  

    return (
      <Container className={isMobile?"conteneur-tournoi-mobile":"conteneur-tournoi"}>

<Paper style={stylePaper}>
           <Typography variant="h2">Tournoi M13 / M15 2025 d'AHMV</Typography>
<p>L'édition 2025 de notre tournoi M13 / M15 est en cours de préparation.
Elle se déroulera du 24 au 30 novembre 2025 pour le M13 et du 1er au 7 décembre 2025 pour le M15</p>


<p>Nous aurons cette année M13 A-B-C et M15 A-B-C. Nouveauté! Le tournoi se tiendra à l'aréna St-Michel, le plus bel aréna à Montréal (à égalité avec le Centre Bell)</p>

<TournoiALaRonde></TournoiALaRonde>

<p>Encore une fois cette année, vos jeunes partiront non seulement avec la tête pleine de souvenir, mais aussi avec de beaux souvenir en vidéos ;-)</p>

<p>Ça vous intéresse? Contactez-nous via <a href="mailto: ahmvtornade@hotmail.com">ce lien</a></p>



<p>Merci,
La direction d'AHM Villeray. </p>  
</Paper>
        	 <Paper style={stylePaper}>
           <Typography variant="h2">Tournoi M13 / M15 d'AHMV, éditions antérieures</Typography>
<p>À chaque année depuis près de 20 ans, L'AHM Villeray organise son traditionnel tournoi M13 / M15.</p>


<h4>Depuis quelques années, nous offrons les reprises des beaux jeux comme "cadeau" à nos athlètes et à leurs parents</h4>

<p>Pour voir les faits saillants de vos cliquer sur <a href="https://syncstats.live/home/calendar/119">ce lien</a></p>

<p>Pour plus d'informations, veuillez entrer en communication avec nous.</p>

</Paper>

        </Container>
      );

    }



export default Tournoi;
