import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../style/Accueuil.css';
import logo from '../shared/tornades.png';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import 'typeface-dosis';
import 'typeface-lalezar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import parse from "html-react-parser";
import {marked} from 'marked';
import plainte1 from '../shared/logo_plainte_vert.png'
import plainte2 from '../shared/logo_plainte_orange.png'
const NavTabsWidth = 100;

function Accueil() {


    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [navHeight, setNavHeight] = useState(0);
  
const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    let json = await response.json();
    // Ensure we can sort even if the API returns an object instead of an array
    json = Array.isArray(json) ? json : Object.values(json);
    json.sort((a,b)=>{return ((b.created_at).localeCompare(a.created_at))});
/*    console.log("yo "+response.headers);*/
    setData(json);
   setLoading(false);  
  }

  useEffect(() => {
    console.log("test "+url);
    fetchData()
  }, []);

  return {loading,data};
};
    let navRef = useRef(null);
    const isMobile= size.height > size.width;
  
    const mainStyle = {
      marginLeft: isMobile ? 0 : NavTabsWidth,
      width: isMobile ? '100%' : window.innerWidth - NavTabsWidth,
    }
    const navStyle = {
      position: 'fixed',
      left: 0,
      bottom: isMobile ? 0 : '',
      height: isMobile ? "" : "100%",
      width: isMobile ? '100%' : NavTabsWidth,
      zIndex: 1, /* Stay on top */
    }
    const carteMedia = {
      height:'15rem'
    }

    const plainte = {
      width: '100%',
      height: '15rem',
      objectFit: 'contain',
    }

    const carte = {
      opacity:'0.8'
    }
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
    let {loading,data} = useFetch("/api/nouvelles");
    return (
        <Container maxWidth={false} className={isMobile?"conteneur-accueil-mobile":"conteneur-accueil"}> 
         <Grid container spacing={5} >
          <Grid item xs={12} md={3} ><Typography color="secondary" variant="h1">Allez Tornades!</Typography>
          </Grid>
          <Grid item xs={12} md={9} >
          </Grid>
          
          </Grid>

          

          <Grid container spacing={5}>
          <Grid item xs={12} md={3} >
          <Card style={carte} >
                      <CardActionArea >
                        <CardMedia style={carteMedia}
                         image={logo}  height='10px'
                        />
                        <CardContent
                        >
                          <Typography gutterBottom variant="h5" component="h2">
                          AHMV
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                          Pour tous renseignements supplémentaires, vous pouvez nous joindre par courriel à ahmvtornade@hotmail.com ou par téléphone au (514) 887-8429.
Merci et bonne saison !
La direction d’AHMV
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Contactez-nous!
                        </Button>
                      </CardActions>
                    </Card>
 </Grid>
 
 <Grid item xs={12} md={6} >
          </Grid>
          <Grid item xs={12} md={3} >
          {loading ? <div>Loading...</div> : <Card style={carte} >

                    
                    <CardActionArea >
                      <CardMedia
                      
                        image={""+data[0].Visuel.url}
                        title={data[0].Titre}
                      />
                      <CardContent
                     >
                        <Typography gutterBottom variant="h5" component="h2">
                        {data[0].Titre}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {parse(marked(data[0].Description))}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    </Card>}
 </Grid>

 </Grid>
 <Grid container spacing={5}>
          <Grid item xs={12} sm={6} md={3} lg={2}  xl={2} >
          <a href="https://alias-solution.com/contact/fr/ls41" target="_blank" rel="noopener noreferrer">
                      <CardMedia
                        style={carteMedia}
                        image={plainte1}
                      />
                    </a>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}  xl={2}>
                    <a href="https://alias-solution.com/contact/fr/af41" target="_blank" rel="noopener noreferrer">
                      <CardMedia
                        style={plainte}
                        image={plainte2}
                      />
                    </a>
          </Grid>
          </Grid>
        </Container>
      );

    }



export default Accueil;
