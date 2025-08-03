import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import 'typeface-dosis';
import { useCookies } from "react-cookie";
const NavTabsWidth = 100;



const useFetch = url => {
  const [cookies, setCookie] = useCookies(["jeton","user"]);
  const [data, setData] = useState(null);
  const [loadingP, setLoadingP] = useState(true);
  const [loadingE, setLoadingE] = useState(true);
  const [equipes, setEquipes] = useState(null);
  async function fetchData() {
   // const response = await fetch("/joueurs");
    ///const json = await response.json();
    //setData(json);
    // Request API.
axios
.get('/joueurs', {
  headers: {
    Authorization: `Bearer ${cookies.jeton}`,
  },
})
.then(response => {
  // Handle success.
  console.log('Data: ', response.data);
  //const json = await response.data;
  response.data.sort((a,b)=>{return ((a.DateDeNaissance).localeCompare(b.DateDeNaissance))});
  setData( response.data);
  setLoadingP(false);  
})
.catch(error => {
  // Handle error.
  console.log('An error occurred:', error.response);
});
   
  }


    async function fetchDataEquipes() {
      const response = await fetch("/equipes");
      const json = await response.json();
      setEquipes(json);
      setLoadingE(false);  
    }

  useEffect(() => {
    fetchData()
    fetchDataEquipes()
  }, []);

  return {loadingP,loadingE,data,equipes};
};
const useStyles = makeStyles({

});


function Joueurs() {
    
    const divPrincipale= {
      paddingTop:'1rem'
      
      }

 const {loadingP,loadingE,data,equipes} = useFetch();
 //const {equipes} = useFetchEquipes("/equipes");
 const selectRef = useRef(0);
 const [selEquipe, setSelEquipe] = useState(0);

 const options = {
  timeZone:"America/Toronto",
  hour12 : false,
  hour:  "2-digit",
  minute: "2-digit"
}

new Date().toLocaleTimeString("en-US",options);
    return (
<Container>
        
          {loadingP||loadingE? <div>Loading...</div> :
            <Paper style={divPrincipale}>
           
            <Typography variant="h2">Joueurs</Typography>
            
            <Table  size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" >Nom</TableCell>
                  <TableCell align="center">Prenom</TableCell>
                  <TableCell onClick={()=>{data.sort((a,b)=>{return ((a.DateDeNaissance).localeCompare(b.DateDeNaissance))});}} align="center">Date de Naissance</TableCell>
                </TableRow>

              </TableHead>
              <TableBody>
              {data.map(joueurs => 
                      (
      
                        <TableRow key={joueurs.Id} >
                          <TableCell align="center">{joueurs.Nom}</TableCell>
                          <TableCell align="center">{joueurs.Prenom}</TableCell>
                          <TableCell align="center">{joueurs.DateDeNaissance.split('-')[0]}</TableCell>
                        </TableRow>
                    
                          ))}
              </TableBody>
            </Table>
            </Paper>
            }
          

        </Container>
      );

    }



export default Joueurs;
