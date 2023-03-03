import { Card, Grid, Typography, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Blog
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
