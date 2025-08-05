import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../App.css';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import logo from '../shared/tornades.png';
import 'typeface-dosis';
//import { MarkdownPreview } from 'react-marked-markdown'
import parse from "html-react-parser";
import {marked} from 'marked';

const NavTabsWidth = 100;


const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    let json = await response.json();
    // Normalize JSON to an array before sorting
    json = Array.isArray(json) ? json : Object.values(json);
    // Filter out null/undefined entries then safely sort by creation date
    json = json.filter(Boolean);
    json.sort((a, b) => (b?.created_at || '').localeCompare(a?.created_at || ''));
    setData(json);
    setLoading(false)  }

  useEffect(() => {
    fetchData()
  }, []);

  return {loading,data};
};

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    textAlign:'center',
    display: 'flex',
    flexDirection: 'row',
    marginTop:'1rem',
    justifyContent: 'flex-start'
  },
  rootMobile: {
    maxWidth: '100%',
    textAlign:'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop:'1rem',
    justifyContent: 'flex-start'
  },

  media: {
    height:320,
    maxWidth:480,
    textAlign:'center',
    flex: '1 0 auto',
  },
  mediaMobile: {
    textAlign:'center',
    height: 320,
    width: '100%' ,
    flex:"1 0 auto",
  },
  cardView:{
    textAlign:'left',
    flex:"1 0 auto",
  },
  contentList: {
    flex: '1',
  },
});

export default function Nouvelles() {

  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [navHeight, setNavHeight] = useState(0);

  const [, forceUpdate] = React.useState(0);
    const isMobile =  size.height > size.width;
  
 
const divPrincipale= {
paddingTop:'1rem'

}

 let {loading,data} = useFetch("/api/nouvelles");
 const classes = useStyles();

 function handleClick(nouvelle){
 /* nouvelle.viewMode =nouvelle.viewMode?0:1;
   forceUpdate(n => !n)
  *///
 }

    return (<Container maxWidth={false}>
<div>
{loading ? <div>Loading...</div> :

          <Paper 
          elevation={2}
          style={divPrincipale}>
            <Typography variant="h2">Les Nouvelles des Tornades</Typography>

              <Container>
                
      
                {data.map(nouvelle => 
                (

                 
                    <Card key={nouvelle.id}>
                    
                      <CardActionArea className={isMobile?classes.rootMobile:classes.root}>
                        <CardMedia
                          className={isMobile?classes.mediaMobile:classes.media}
                          image={(Array.isArray(nouvelle.Visuel) ? nouvelle.Visuel[0]?.url : nouvelle.Visuel?.url) || logo}
                          title={nouvelle.Titre}
                        />
                        <CardContent
                        className={isMobile?classes.cardView:classes.contentList} >
                          <Typography gutterBottom variant="h5" component="h2">
                          {nouvelle.Titre}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                           {parse(marked(nouvelle.Description || ''))}

                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                        <Button size="small"  color="primary" onClick={()=>{handleClick(nouvelle)}}>
                           {nouvelle.viewMode ? " --- Moins ---" : "+++ Plus +++"}
                        </Button>
                      </CardActions>
                    </Card>
              
                  
              
                    ))}
                                  </Container>


          </Paper>
       
}
        </div>
        </Container>
      );

    }



