import React, { useState, useEffect, useRef, useLayoutEffect, Suspense } from 'react';
//import { useForm } from "react-hook-form";
import logo from './shared/tornades.png';
import './App.css';
import Helmet from "react-helmet";
import NavTabs from './shared/NavTabs';
import Box from '@mui/material/Box';
//import { Route, Switch} from 'react-router-dom';
import SwitchRoutes from './components/SwitchRoutes';
import { createTheme, responsiveFontSizes ,ThemeProvider} from '@mui/material/styles';
import 'typeface-roboto';
import Typography from '@mui/material/Typography';
import Cookies from 'universal-cookie';

//import red from '@mui/material/colors/red';
//import yellow from '@mui/material/colors/yellow';


const theme = createTheme({
  palette: {
    primary: { main:  '#e00024'}, 
    secondary: { main: '#f5c71a' }, 
    tertiary: { main: '#000000' }, 
    error: { main: '#ff0000'},
    success: { main: '#00ff00'},
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Indie Flower"',
      '"Dosis"'
    ].join(','),
  },
});

theme.typography.h1 = {
  fontFamily:'Lalezar',
  fontSize: '3rem',
  
  [theme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '5rem',  },
  alignCenter:true,
  noWrap:true


};

theme.typography.h2 = {
  fontFamily:'Dosis',
  fontSize: '1rem',
  
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2rem',
  },
  alignCenter:true,
  noWrap:true


};
theme.typography.button = {
  fontFamily:'Indie Flower',
  fontWeight:'900',
  fontSize:'1.5rem'
};


  //theme = responsiveFontSizes(theme);


function App() {


  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [navHeight, setNavHeight] = useState(0);
  const [navWidth, setNavWidth] = useState(0);

  let navRef = useRef(null);

  let isMobile =size.height > size.width;


  const handleWindowSizeChange = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
    isMobile = parseInt(size.height) > parseInt(size.width) ?true:false;
  };


  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  useLayoutEffect(() => {

    setNavHeight(navRef? navRef.getBoundingClientRect().height :0);
    setNavWidth(navRef? navRef.getBoundingClientRect().width :0);
    //mainStyle.marginLeft= isMobile ? 0 : size-navWidth/2;


  }, [navRef]);



  const mainStyle = {
    width:'100vw',
    display: 'flex',
    flexDirection: 'row',
   // marginLeft: isMobile ? 0 : (size.width-navWidth)/2,
   // backgroundColor:"#ffffff"
  }

  const bgStyle = {
  
    backgroundColor:"#fffafa",
    width:'min-content'
  }




  const navStyle = {
    position: isMobile ? 'fixed' : 'static',
    backgroundColor: theme.palette.primary.main,
    textColor: isMobile ? '' : '#000000',
    bottom: isMobile ? 0 : '',
    width: 'auto', // Utilisez auto au lieu de 100vw
    minWidth: 'max-content', // Étend la largeur au contenu
    overflowX: 'auto', // Permet de scroller horizontalement si nécessaire
    zIndex: 1,
  };
  

  
const styleTitre= {
height:isMobile?'3rem':'0',
width:isMobile?'auto':'0',
minWidth: 'max-content',
overflowX:'auto',
visibility:isMobile?'visible':'hidden',
backgroundColor:isMobile?'#e00024':'#000000',
color:'#000000',

}


    return (
      <div  className='App' style={bgStyle} >
      
        <Helmet title="Tornades AHMV" />
        <ThemeProvider  theme={theme}>
      <img className={!isMobile?'logo-tornades':'logo-tornades-mobile'} src={logo}/>
       
       {/*<Typography variant="h1" style={styleTitre}>Association du Hockey Mineur de Villeray</Typography>*/}
 
  <Box style={styleTitre}> <Typography variant="h2">Association de Hockey mineur de Villeray</Typography></Box>

       <div style={navStyle} ref={divElement => { navRef = divElement }}>
         
            <NavTabs   isMobile={isMobile} theme={theme} />
          </div> 

        
  <Box style={{ width: 'auto', minWidth: 'max-content', overflowX: 'auto' }} component="span">
    <SwitchRoutes
      style={bgStyle}
      isMobile={isMobile}
      navHeight={navHeight}
    >
    </SwitchRoutes>
</Box>
       
        </ThemeProvider>
      </div>
    );
  }



  export default App;
  //          <Container style={mainStyle}  className="conteneur">
  // </Container>