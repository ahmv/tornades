import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import logo from '../shared/tornades.png';
import '../App.css';
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const NavTabsWidth = 100;

const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch("/api/equipes");
    let json = await response.json();
    json = Array.isArray(json) ? json : Object.values(json);
    // Remove any null/undefined entries before setting state
    json = json.filter(Boolean);
    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data };
};

function Matchs() {


    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  //
    const isMobile = true;// size.height > size.width;
  
  
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
    const divPrincipale= {
      marginTop:80
    }
    const {loading,data} = useFetch();
    //const {equipes} = useFetchEquipes("/equipes");
    const selectRef = useRef(0);
    const [selEquipe, setSelEquipe] = useState(0);
    return (
<Container>
        
        {loading||loading? <div>Loading...</div> :
          <Paper style={divPrincipale}>
         
          <Typography variant="h2">Matchs</Typography>

          <Table  size="small">
            <TableHead>
              <TableRow>
                <TableCell >No</TableCell>
                <TableCell align="right">Équipes</TableCell>

              </TableRow>

            </TableHead>
            <TableBody>

             {  data
                .filter(Boolean)
                .map(equipe => (
                  equipe?.PageMatchHM == null ? null : (
                    <TableRow key={equipe.id} >
                      <TableCell component="th" scope="row">
                        {equipe.id}
                      </TableCell>
                      <TableCell onChange={()=>{fetch(equipe.PageMatchHM)}} align="right"><a href={equipe.PageMatchHM} target="_blank">{equipe.Nom}</a></TableCell>
                    </TableRow>
                  )
                ))}
            </TableBody>
          </Table>
          </Paper>
          }
        

      </Container>
      );

    }



export default Matchs;
