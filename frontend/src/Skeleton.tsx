import React from 'react'
import { Table, Group, Skeleton } from '@mantine/core'


function SkeletonComp() {
  return (
    <>
  <Table.Tr>       
        <Table.Td >
          <Group gap="sm" display='flex' style={{flexDirection:'row',alignItems:'center'}}>
            <Skeleton height={30}  circle mb="xl"></Skeleton>
            <Skeleton height={30} mt='-30px' w='130px'/>
                      </Group>
        </Table.Td>
        <Table.Td visibleFrom='sm'><Skeleton height={30}  mt='-30px' radius="xl" /></Table.Td>        
        <Table.Td visibleFrom='sm' ><Skeleton height={30}  mt='-30px' radius="xl" /></Table.Td>
        <Table.Td visibleFrom='sm'><Skeleton height={30}  mt='-30px' radius="xl" /></Table.Td>     


        <Table.Td style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Skeleton height={30}  radius="xl" />
       
        </Table.Td>

      </Table.Tr>
      <Table.Tr>       
        <Table.Td >
          <Group gap="sm" display='flex' style={{flexDirection:'row',alignItems:'center'}}>
            <Skeleton height={30}  circle mb="xl"></Skeleton>
            <Skeleton height={30} mt='-30px' w='130px'/>
                      </Group>
        </Table.Td>
        <Table.Td visibleFrom='sm'><Skeleton height={30}  mt='-30px' radius="xl" /></Table.Td>        
        <Table.Td visibleFrom='sm' ><Skeleton height={30}  mt='-30px' radius="xl" /></Table.Td>
        <Table.Td visibleFrom='sm'><Skeleton height={30}  mt='-30px' radius="xl" /></Table.Td>     


        <Table.Td style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}><Skeleton height={30}  radius="xl" />
       
        </Table.Td>

      </Table.Tr>

 </>
   
  )
}

export default SkeletonComp