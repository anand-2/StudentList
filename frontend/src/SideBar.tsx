'use client'
import { useState,useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Group, Code,Divider, DrawerBody, Image, Box } from '@mantine/core';
import { Drawer, Button } from '@mantine/core';
import "./sidebar.css"

import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLayoutDashboardFilled,
  IconLogout,
  IconCalculatorFilled,
  IconLayoutSidebarRightCollapse
} from '@tabler/icons-react';

type Props = {
  setButtonShow: any;
  opened : boolean;
  setOpened : any;
  buttonShow : boolean;
}

 function SideBar(props: Props) {
  const [isSmallScreen, setIsSmallScreen] = useState(props.opened);


  

  const handleClose = () => {
    props.setOpened(false);
  };


  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 992;
      setIsSmallScreen(isSmall);
      
      if (!isSmall && !props.opened) {
        props.setOpened(true);    
        props.setButtonShow(false)    
      }
      
      if (isSmall && props.opened && !props.buttonShow) {
        props.setOpened(false);
        props.setButtonShow(true)   
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [props.opened]);

  return (
  
 <>
    <Drawer
    opened={props.opened}
    size='16rem'            
    closeOnEscape={false}
    lockScroll={false}
    onClose={handleClose}    
    padding="0px"
    withCloseButton={false} 
    withOverlay={false}
    closeOnClickOutside={true}
 >
    <nav className='navbar'>
    <div className='navbarMain'>
      <Group className='header'>
      <Image src='https://www.yellowowl.app/static/media/owl-landing-page.b75b16e8c5bbaba7f094e9c3b464e3a5.svg' className='headerIcon' />
      <h1 style={{color:'white'}}>Yellow Owl</h1>                 

      {props.opened && <Box hiddenFrom='md'>
      <IconLayoutSidebarRightCollapse onClick={()=>{props.setOpened(!props.opened)}} style={{alignSelf:'center',cursor:'pointer'}}  color='#fff' size='30px'/>
      </Box>}

      </Group>

      
      <div  className='footer'>
             <a href="/" className='link' onClick={(event) => event.preventDefault()}>
        <IconLogout className='linkIcon' stroke={1.5} />
        <span>Admin</span>
      </a>
    </div>
    </div>

  
  </nav>
  </Drawer>
    </>
    
  );
}


export default SideBar