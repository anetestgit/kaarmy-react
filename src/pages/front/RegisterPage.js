import { useState, useEffect } from 'react';
import { useNavigate, NavLink as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {
  Link, Container, Typography, Divider, Stack, Button, IconButton, InputAdornment,
  TextField, Alert, CircularProgress, Select, MenuItem
} from '@mui/material';
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

export default function RegisterPage() {


  const [errormsg, setErrormsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading when submit button click
  const [formvalue, setFormvalue] = useState({ first_name: '', last_name: '', email: '', phone: '', password: '', password_confirmation: '', userType: '' });
  const [showalert, setShowalert] = useState(false);
  const [sucessmsg, setSucessmsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showuserrole, setShowuserrole] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    axios.get(`${ApiUrl}allUserRoleRegister`)
      .then(response => {

        if (response.data.statusCode === 200) {
          setShowuserrole(response.data.userType);
        }
        setIsLoading(false);

      })
      .catch(error => {
        console.log(error);

      });
  }, []);

  const fieldChange = (e) => {
    setFormvalue({ ...formvalue, [e.target.name]: e.target.value });
    console.log(e.target.value);
    document.getElementById(e.target.name).innerHTML = '';
  }


  const submitSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios.post(`${ApiUrl}auth/register`, formvalue)
      .then(response => {
        if (response.data.statusCode === 400) {
          Object.entries(response.data.message).forEach(([key, value]) => {
            // console.log(`${key} ${value}`);
            document.getElementById(key).innerHTML = value;
          });
        }
        else if (response.data.statusCode === 200) {
          setShowalert(true);
          setSucessmsg(response.data.message);
          localStorage.setItem('userdetails', JSON.stringify(response.data));
          setFormvalue({ first_name: '', last_name: '', email: '', phone: '', password: '', password_confirmation: '', userType: '' });

          navigate('/dashboard/home', { replace: true });


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
        <title> Register</title>
      </Helmet>

      <StyledRoot>
        Logo

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign up to Kaarmy
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account?

              {
                showuserrole ? showuserrole.map((item) => (

                  <span className="errorText" key={item.id} >
                    {item.name}
                  </span>



                )) : ('nooooo')
              }


              <Link to="/login" component={RouterLink}>Sign in</Link>
            </Typography>
            <form>
              {showalert ?
                <Alert severity="success">{sucessmsg}</Alert>
                : ('')
              }

              <Stack spacing={3}>
                <TextField name='first_name'
                  onChange={fieldChange}
                  value={formvalue.first_name}
                  autoComplete='off'
                  label="Firt name"
                />
                <span className="validation-error" id="first_name" />

                <TextField name='last_name'
                  onChange={fieldChange}
                  value={formvalue.last_name}
                  autoComplete='off'
                  label="Last name"
                />
                <span className="validation-error" id="last_name" />

                <TextField name='email'
                  onChange={fieldChange}
                  value={formvalue.email}
                  autoComplete='off'
                  label="Email address"
                />
                <span className="validation-error" id="email" />

                <TextField name='phone'
                  onChange={fieldChange}
                  value={formvalue.phone}
                  autoComplete='off'
                  label="Phone number"
                />
                <span className="validation-error" id="phone" />

                <Select name="userType" value={formvalue.userType} onChange={fieldChange} displayEmpty>
                  <MenuItem key="nt" value="" selected>Select User Type</MenuItem>
                  {showuserrole ? showuserrole.map((item) => (
                    <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                  )) : (<MenuItem key="nt" value="">Not Found</MenuItem>)

                  }

                </Select>

                <span className="validation-error" id="userType" />



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

                <TextField
                  name="password_confirmation"
                  label="Confirm password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  onChange={fieldChange}
                  value={formvalue.password_confirmation}
                  autoComplete='off'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                          <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <span className="validation-error" id="password_confirmation" />


              </Stack>


              <Button fullWidth size="large" type="submit" variant="contained"
                onClick={submitSignup} disabled={isLoading}>
                {isLoading ? <CircularProgress size={14} />
                  : ('Sign up')
                }
              </Button>
            </form>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
