import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../App.css';
import Inscription from './Inscription';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
const NavTabsWidth = 100;

function Informations() {


    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  
    useEffect(() => {
      handleWindowSizeChange();
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      }
    }, []);

    const useFetch = url => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
    
      async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false)  }
    
      useEffect(() => {
        fetchData()
      }, []);
    
      return {loading,data};
    };
  /*
    useLayoutEffect(() => {
      setNavHeight(navRef? navRef.getBoundingClientRect().height : 0)
    }, [navRef]);
  */
    const handleWindowSizeChange = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    const divPrincipale= {
      marginTop: 80
    }
    const {loading,data} = useFetch("/fichiers");
    return (
<Container>

         
{loading ? <div>Loading...</div> :
  
  <Paper style={divPrincipale}>
    <Inscription></Inscription>
  <Typography variant="h2">Fichiers Importants</Typography>
  <Table  size="small">
    <TableHead>
      <TableRow>
        <TableCell onClick={()=>{data.sort((a,b)=>{return ((data.id+"").localeCompare(data.id))});}}>No</TableCell>
        <TableCell align="center" >fichier</TableCell>
      </TableRow>

    </TableHead>
    <TableBody>

      {data.map(fichiers => 
      (

        <TableRow key={fichiers.id} >
          <TableCell component="th" scope="row">
            {fichiers.id}
          </TableCell>
          <TableCell onClick={()=>{fetch(fichiers.fic.url)}} align="center"><a href={fichiers.fic.url} target="_blank">{fichiers.Titre}</a></TableCell>
        </TableRow>
    
          ))}
    </TableBody>
  </Table>
  </Paper>
  }


</Container>
      );

    }



export default Informations;
