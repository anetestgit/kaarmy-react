
import React, { useEffect, useState } from 'react';
import { Container, Stack, Typography, Grid, Card, Box, Link, CircularProgress, Button, TextField } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
// import InfiniteScroll from 'react-infinite-scroller';

import InfiniteScroll from 'react-infinite-scroll-component';


import axios from 'axios';

import { ApiUrl } from '../../../components/Axiosconfig';

export default function UserList() {

  const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
  });

  const UserAuhenticated = JSON.parse(localStorage.getItem('userdetails'));
  const [listdata, setListdata] = useState({ fetchItems: [] });
  const { fetchItems } = listdata;
  const [limit, setLimit] = useState(0);
  const [trueVal, setTrueVal] = useState(true);
  const [allListCount, setAllListCount] = useState(1);
  const [paginateCount, setPaginateCount] = useState(0);
  const [searchapply, setSearchapply] = useState(false);
  const [searchkeyword, setSearchkeyword] = useState({ searchData: '' });

  const tokenAuthenticate =
  {
    headers: { Authorization: `Bearer ${UserAuhenticated.token}` }
  }




  function firstResult() {
    axios.post(`${ApiUrl}userList`,
      {
        loadlimit: limit,
        serKey: searchkeyword

      },
      tokenAuthenticate
    )

      .then(response => {
        setListdata({ ...listdata, fetchItems: response.data.userList });
        //  console.log("initialData", response.data.userList);
        setAllListCount(response.data.allUserCount);
        setPaginateCount(response.data.paginateCount);
        setLimit(limit + response.data.paginateCount);

      });
  }

// Firt time page load //
  useEffect(() => {
    firstResult();
  }, []);


// Page scroll //
  const fetchData = () => {
    axios.post(`${ApiUrl}userList`,
      {
        loadlimit: limit,
        serKey: searchkeyword

      },
      tokenAuthenticate

    )
      .then(response => {
        setListdata({ ...listdata, fetchItems: listdata.fetchItems.concat(response.data.userList) });
        setAllListCount(response.data.allUserCount);
        setPaginateCount(response.data.paginateCount);
        setLimit(limit + response.data.paginateCount);
      });
  };



// Search data //
  const searchData = (e) => {
    setListdata({ fetchItems: [] });
    setLimit(0);
    setAllListCount(1);
    setPaginateCount(0);
    setSearchapply(true);
    setSearchkeyword({ ...searchkeyword, [e.target.name]: e.target.value })

  }

// Search data get details //
  if (searchapply) {
    setTimeout(() => {
      firstResult();
      setSearchapply(false);

    });
  }
  return (

    <>
      <Helmet>
        <title> Dashboard: User List  </title>
      </Helmet>

      <Container >


        <Typography variant="h4" sx={{ mb: 5 }}>
          User List
        </Typography>

        <Typography variant="h4" sx={{ mb: 5 }}>
          <TextField name='searchData'
            autoComplete='off'
            label="Search"
            onChange={searchData}
            value={searchkeyword.searchData}
          />
        </Typography>

        <Typography />
        <InfiniteScroll
          dataLength={listdata.fetchItems.length}
          next={fetchData}
          hasMore={trueVal}
        //  loader={<div>loader</div>}


        >
          <Grid container spacing={3}>


            {fetchItems.map((loopItems, index) => (

              <Grid item xs={12} sm={6} md={3} key={loopItems.id}>


                <Card>
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    <StyledProductImg alt="okkkkk" src="http://localhost:3000/assets/images/products/product_5.jpg" />
                  </Box>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Link color="inherit" underline="hover">
                      <Typography variant="subtitle2" noWrap>
                        {loopItems.first_name} {loopItems.last_name}
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
            ))};
          </Grid>


        </InfiniteScroll >
        {allListCount > paginateCount ?
          <Stack alignItems="center" status="loading" top={10}>
            <CircularProgress status="loading" size={30} top={10} />
          </Stack> :

          <Stack alignItems="center" status="loading" top={10}>
            <Typography style={{ margin: 22 }} className="pageLoadMore"> No more result found! </Typography>
          </Stack>

        }


      </Container>
    </>
  );

}










