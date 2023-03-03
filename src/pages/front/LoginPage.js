import { useState, useEffect } from 'react';
import { useNavigate,NavLink as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, IconButton, InputAdornment, 
  TextField, Alert,CircularProgress} from '@mui/material';
import axios from "axios";
import { ApiUrl } from "../../components/Axiosconfig"
import Iconify from '../../components/iconify/Iconify';
import "../style.css";



const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));


const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));






// ----------------------------------------------------------------------

export default function LoginPage() {


  const [isLoading, setIsLoading] = useState(false); // Loading when submit button click
  const [formvalue, setFormvalue] = useState({ email: '', password: '' });
  const [showalert, setShowalert] = useState(false);
  const [errormsg, setErrormsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const fieldChange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    document.getElementById(e.target.name).innerHTML = '';
  }

  useEffect(() => {
    setTimeout(() => {
      setShowalert(false);
    }, 20000)
  })

  const navigate = useNavigate();

  const submitSignin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.post(`${ApiUrl}auth/login`, formvalue)
      .then(response => {
        if (response.data.statusCode === 400) {
          Object.entries(response.data.message).forEach(([key, value]) => {
            // console.log(`${key} ${value}`);
            document.getElementById(key).innerHTML = value;
          });
        }

        else if (response.data.statusCode === 401) {

          setShowalert(true);
          setErrormsg(response.data.message);
        }
        else if (response.data.statusCode === 200) {

          localStorage.setItem('userdetails', JSON.stringify(response.data));
        
          setFormvalue({ email: '', password: '' });
          navigate('/admin/home', { replace: true });
        }

        setIsLoading(false);

      })
      .catch(error => {
        console.log(error);

      });

  }




  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        Logo

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Kaarmy
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {''}
              <Link component={RouterLink} to="/register">Sign up</Link>
            </Typography>
            <form>
              {showalert ?
                <Alert severity="error">{errormsg}</Alert>
                : ('')
              }

              <Stack spacing={3}>
                <TextField name="email" label="Email address" autoComplete='off' onChange={fieldChange}
                  value={formvalue.email} />
                <span className="validation-error" id="email" />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={fieldChange}
                  value={formvalue.password}
                  autoComplete='off'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="validation-error" id="password" />
              </Stack>

              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                {/* <Checkbox name="remember" label="Remember me" /> */}
                <Link variant="subtitle2" underline="hover">
                  Forgot password?
                </Link>
              </Stack>

             

              <Button fullWidth size="large" type="submit" variant="contained"
               onClick={submitSignin} disabled={isLoading}>
                {isLoading ? <CircularProgress size={14} />
                  : ('Sign in')
                }
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>




            </Stack>




          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
