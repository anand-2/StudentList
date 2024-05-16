import { Box } from '@mantine/core'
import { IconLayoutSidebarLeftCollapse,IconLayoutSidebarRightCollapse } from '@tabler/icons-react'
import React from 'react'

type Props = {
  opened : boolean;
  setOpened : any;
}

function Navbar(props : Props) {
  return (
    <Box display='flex' style={{alignItems:'center'}}  w={{xs:'125%'}} p='1rem 0rem 1rem 2rem'  bg='linear-gradient(90deg, rgba(74,222,128,1) 0%, rgba(59,130,246,1) 100%)'>
       <Box hiddenFrom='md' onClick={()=>{props.setOpened(!props.opened)}}>
              {
                !props.opened ? <IconLayoutSidebarLeftCollapse  style={{alignSelf:'center',marginTop:'5px',cursor:'pointer'}}  color='#fff' size='30px'/> :
                <IconLayoutSidebarRightCollapse style={{alignSelf:'center',marginTop:'5px',cursor:'pointer'}}  color='#fff' size='30px'/>
              }
              </Box>

        <span style={{ color:'#fff',paddingLeft:'0.5rem',fontSize:'15px',fontWeight:'600'}}>Students</span>
    </Box>
  )
}

export default Navbar