import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useCookies } from "react-cookie";

const jeton = 'mJeton';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://ahmvtornade.com/">
        AHMV
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function useInput(initialValue){
    const [value,setValue] = useState(initialValue);
     function handleChange(e){        setValue(e.target.value);    }
    return [value,handleChange];
  }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {
  const [cookies, setCookie] = useCookies(["jeton","user"]);
  const classes = useStyles();
  const [courriel, setCourriel] = useInput('')
  const [mdp, setMDP] = useInput('')



  function handleSubmit() {
// Request API.
axios
  .post('/auth/local', {
    identifier: courriel,
    password: mdp,
  })
  .then(response => {

    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    jeton=response.data.jwt
    setCookie("jeton", response.data.jwt, {      path: "/"    });  
    setCookie("user", response.data.user.username, {      path: "/"    });  
    console.log('User token', jeton);

  })
  .catch(error => {
    // Handle error..

    console.log('An error occurred:', error.response);

  });


}

function logOut() {

  setCookie("jeton", "", {      path: "/"    });  
  setCookie("user", "", {      path: "/"    });  

}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate   onSubmit={(e)=>{e.preventDefault();handleSubmit();}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={setCourriel}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={setMDP}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={()=>{logOut();}}>
                {"Log Out"}
              </Link>
            </Grid>

          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}