import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography, Grid, Card, Box, Link } from '@mui/material';
// components
import { styled } from '@mui/material/styles';
// mock



// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  });

  return (
    <>
      <Helmet>
        <title> Dashboard: Products  </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3} >
            <Card>
              <Box sx={{ pt: '100%', position: 'relative' }}>
                <StyledProductImg alt="okkkkk" src="http://localhost:3000/assets/images/products/product_5.jpg" />
              </Box>

              <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover">
                  <Typography variant="subtitle2" noWrap>
                    fffffffffff
                  </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">

                  <Typography variant="subtitle1">
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{
                        color: 'text.disabled',
                        textDecoration: 'line-through',
                      }}
                    >
                      125645454
                    </Typography>
                    &nbsp;
                    $30
                  </Typography>
                </Stack>
              </Stack>
            </Card>
            
          </Grid>

          <Grid item xs={12} sm={6} md={3} >
            <Card>
              <Box sx={{ pt: '100%', position: 'relative' }}>
                <StyledProductImg alt="okkkkk" src="http://localhost:3000/assets/images/products/product_5.jpg" />
              </Box>

              <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover">
                  <Typography variant="subtitle2" noWrap>
                    fffffffffff
                  </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">

                  <Typography variant="subtitle1">
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{
                        color: 'text.disabled',
                        textDecoration: 'line-through',
                      }}
                    >
                      125645454
                    </Typography>
                    &nbsp;
                    $30
                  </Typography>
                </Stack>
              </Stack>
            </Card>
            
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
