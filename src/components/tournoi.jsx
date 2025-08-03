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
           <Typography variant="h2">Tournoi Peewee / Bantam 2024 d'AHMV</Typography>
<p>L'édition 2024 de notre tournoi Peewee / Bantam est en cours de préparation.
Elle se déroulera du 2 décembre au 15 décembre 2024</p>


<p>Nouveauté cette année, nous incluons du M15C! Cependant, par manque de temps de glace, nous ne pourrons pas acceuillir le M13C.</p>

<TournoiALaRonde></TournoiALaRonde>

<p>Encore une fois cette année, vos jeunes partiront non seulement avec la tête pleine de souvenir, mais aussi avec de beaux souvenir en vidéos ;-)</p>

<p>Ça vous intéresse? Contactez-nous via <a href="mailto: ahmvtornade@hotmail.com">ce lien</a></p>



<p>Merci,
La direction d'AHM Villeray. </p>  
</Paper>
        	 <Paper style={stylePaper}>
           <Typography variant="h2">Tournoi Peewee / Bantam d'AHMV, éditions antérieures</Typography>
<p>À chaque année depuis près de 20 ans, L'AHM Villeray organise son traditionnel tournoi Peewee / Bantam.</p>


<h4>Depuis quelques années, nous offrons les reprises des beaux jeux comme "cadeau" à nos athlètes et à leurs parents</h4>

<p>Pour voir les faits saillants de vos cliquer sur <a href="https://syncstats.live/home/calendar/119">ce lien</a></p>

<p>Pour plus d'informations, veuillez entrer en communication avec nous.</p>

</Paper>

        </Container>
      );

    }



export default Tournoi;
