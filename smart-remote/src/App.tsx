import React ,{useState, useEffect} from 'react';
import { useTheme } from '@mui/material/styles';
import { Button,IconButton,Box,Card,CardContent,Grid,CardMedia,Paper,Slide,MobileStepper,Typography} from '@mui/material';
import {ChevronRight,ChevronLeft} from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel'

function App() {
  const theme = useTheme();
  var items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!"
    },
    {
        name: "Random Name #2",
        description: "Hello World!"
    }
  ]
  return (
    <Grid container justifyContent="center">
      <Carousel>
        {
           
        }
      </Carousel>
      <Box sx={{ flexDirection: "column" }}>
        <Card sx={{ display: "inline-flex", width: "auto", bgcolor: 'black' }}>
          <Box sx={{ display: "flex", flexDirection: "column"}}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <IconButton>
                <ChevronRight />
              </IconButton>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <IconButton>
                <ChevronRight />
              </IconButton>
            </CardContent>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <IconButton>
                <ChevronRight sx={{color: 'white'}}/>
              </IconButton>
            </CardContent>
          </Box>
        </Card>
        <Card>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <IconButton>
                <ChevronRight />
              </IconButton>
            </CardContent>
          </Box>
        </Card>
      </Box>
    </Grid>
  );
}

export default App;