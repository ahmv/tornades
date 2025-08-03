import React, { useState, useEffect, useRef } from 'react';
import '../style/arenas.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import LocationIcon from '@mui/icons-material/LocationOn';

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

function Arenas() {

    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [navHeight, setNavHeight] = useState(0);
  
    let navRef = useRef(null);
  
    const isMobile =  size.height > size.width;

    const {loading,data} = useFetch("/api/arenas");

    return (
      <Container className={isMobile?"conteneur-arena-mobile":"conteneur-arena"}>
        {loading ? <div>Loading...</div> :
                <Paper className="paper">
                  <Typography variant="h2">Arenas</Typography>
                  <Table  size="small">
                    <TableHead>
                      <TableRow>
                      <TableCell align="center" ></TableCell>
                        <TableCell align="center">Nom</TableCell>
                        <TableCell align="center" >Coordonnées</TableCell>
                      </TableRow>
      
                    </TableHead>
                    <TableBody>
            
                      {data.map(arenas => 
                      (
      
                        <TableRow key={arenas.id} >
                          <TableCell align="center"><a href={arenas.lienGoogle}><LocationIcon></LocationIcon></a></TableCell>
                          <TableCell align="center">{arenas.Nom}</TableCell>
                          <TableCell align="center">{arenas.Adresse}<br/>{arenas.telephone}</TableCell>
                        </TableRow>
                    
                          ))}
                    </TableBody>
                  </Table>
                </Paper>
                }
              </Container>
            );
      
          }
      


export default Arenas;
