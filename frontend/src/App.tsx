
import './App.css';
import { useState } from 'react';
import {Grid, GridCol, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import SideBar from './SideBar';
import Navbar from './Navbar';
import MainBody from './MainBody';


function App() {
  const [buttonShow,setButtonShow] =useState(false)
  const [opened, setOpened] = useState(false);

  return (
    <MantineProvider> 
      <div style={{height:'100vh',backgroundColor:'#E5E7EB',position:'relative',overflowY:'hidden',overflowX:'hidden'}}>   
      <Grid>
      <GridCol span={{ base: 12, xs: 2 }} style={{position:'fixed',display:'flex'}}> 
      <SideBar opened={opened} buttonShow={buttonShow} setOpened={setOpened} setButtonShow={setButtonShow}></SideBar>
      </GridCol>
      <GridCol h='10vh' span={{ base: 12 , xs: 10 }} ml={{lg:'255px',sm:'0px',md:'250px',xl:'250px',xs:'0px'}}>
        <Navbar opened={opened} setOpened = {setOpened}></Navbar>
        <MainBody></MainBody>
      </GridCol>

      
      
        </Grid>
   </div>
    </MantineProvider>
    
  );
}

export default App;
