import { Helmet } from 'react-helmet-async';
// import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,Card } from '@mui/material';
// components


export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} >
            <Card >
            <Typography variant="h3">123</Typography>

              <Typography variant="subtitle2" sx={{ opacity: 0.72 }} >
              Products
              </Typography>
              </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <Card >
            <Typography variant="h3">123</Typography>

              <Typography variant="subtitle2" sx={{ opacity: 0.72 }} >
              Products
              </Typography>
              </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <Card >
            <Typography variant="h3">123</Typography>

              <Typography variant="subtitle2" sx={{ opacity: 0.72 }} >
              Products
              </Typography>
              </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <Card >
            <Typography variant="h3">123</Typography>

              <Typography variant="subtitle2" sx={{ opacity: 0.72 }} >
              Products
              </Typography>
              </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
