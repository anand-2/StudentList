import { Autocomplete, Button,Table,ScrollArea, Group, Avatar, Text, Modal, TextInput, Skeleton, Card } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

import axios from 'axios';

import React, { useEffect, useState } from 'react'
import SkeletonComp from './Skeleton';



function MainBody() {

  const [isOpenEdit, { open: onOpenEdit, close: oncloseEdit }] = useDisclosure();
  const [isOpenDelete, { open: onOpenDelete, close: onCloseDelete }] = useDisclosure();
  const [title,setTitle]=useState("")  
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [tempDate,setTempDate] = useState<string|undefined>(selectedDate?.toISOString())
  const [search, setSearch] = useState('');


  const [data,setData] = useState<Array<[]>>();

  const [tempName,setTempName] = useState("");
  const [tempPhone,setTempPhone] = useState("");



  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', phone: tempPhone ? tempPhone : '' , enrollNumber :'',dateOfAdmission : selectedDate},

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: (value) => (tempPhone ? null : value.length !== 10 ? 'Enter a 10 digit number' : null),
      enrollNumber : (value) => (null),     
   },
  });



  useEffect(()=>{
    fetchStudents()
    },[])


    function fetchStudents()
    {
      axios.get("http://localhost:5000/student")
      .then((res)=>{
          return setData(res.data.data);
      })
    }   

    console.log(tempDate)

  function handleClick(name : string,phone? : string,date? : string){
    if(name === 'edit')
      {
        setTitle('Edit Student')
        setTempPhone(phone? phone : '')
        onOpenEdit()
      }
      else{
        setTitle('Add New Student')
        onOpenEdit()  
      } 
  }

  

  function handleAddEditStudent(event: any){
    if(title === 'Edit Student')
      {
        //To EDIT EXISTING STUDENT
        axios.post("http://localhost:5000/editStudent",{
          name : event.name,
          email : event.email,
          phone : tempPhone,
          enrollNumber : event.enrollNumber,
          dateOfAdmission : tempDate
          })
      .then(res=>{
        console.log(res)
        fetchStudents()          
        form.reset()
        setSelectedDate(null)    
        oncloseEdit()
      })
      .catch(error=>{
        console.log(error)
      })
      }
      
      else{

        //To ADD STUDENT
        axios.post("http://localhost:5000/addStudent",{
          name : event.name,
          email : event.email,
          phone : event.phone,
          enrollNumber : event.enrollNumber,
          dateOfAdmission : tempDate
          })
      .then(res=>{
        console.log(res)
        fetchStudents()          
        form.reset()
        setSelectedDate(null)    
        oncloseEdit()
      })
      .catch(error=>{
        console.log(error)
      })
      }
 
  }

function searchStudent()
    {
      if(search !== "")
        {
           const filteredData =  data?.filter((item :any)=>{return item.name.toLowerCase().includes(search.toLowerCase())})
            setData(filteredData)
        }
        else{
            fetchStudents()
        }
      
    }

  useEffect(()=>{
      searchStudent()
  },[search])

  function handleDelete(name :string){
    setTempName(name)
    onOpenDelete()
  }

  function deleteStudent(){
    axios.post("http://localhost:5000/deleteStudent",{
        name : tempName
    })
    .then(res=>{
      console.log(res)
      fetchStudents()
      onCloseDelete()
    })
    .catch(error=>{
      console.log(error)
    })
  }
   const rows = data ? data.map((item:any) => {
    return (
      <>
      <Table.Tr key={item.id}>       
        <Table.Td >
          <Group gap="sm">
            <Avatar visibleFrom='xs' size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td visibleFrom='sm'>{item.email}</Table.Td>        
        <Table.Td visibleFrom='sm' >{item.phone}</Table.Td>
        <Table.Td visibleFrom='sm'>{item.enrollnumber}</Table.Td>     


        <Table.Td style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>{item.dateofadmission.split("T")[0]}
        <div style={{display:'flex',flexDirection:'row',gap:'1rem'}}>
          <IconEdit onClick={()=>handleClick('edit' ,item.phone,item.dateOfAdmission)}  cursor='pointer' color='#2563EB' size='20px'/>
          <IconTrash onClick={()=>handleDelete(item.name)} cursor='pointer' color='#C55D22' size='20px'/>
          </div>     
         
        </Table.Td>

      </Table.Tr>



      </>
    );
  })
 : <SkeletonComp></SkeletonComp>



  return (
    <>

<div style={{ padding: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:'space-between'  }}>
    <div className='subHeading'>Students</div>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',gap:'0.5rem'}}>
      <Autocomplete
        placeholder="Search..."
        value={search}
        onChange={setSearch}
        data={data?.map((item : any)=>{return  item.name} )}
        size='sm'
        w={{lg:'25rem',sm:'15rem',md:'25rem',xl:'25rem',xs:'15rem',base:'10rem'}}
      />
      <div style={{ marginLeft: 'auto' }}>
      <Button onClick={()=>handleClick('add')}  color='green' w='300px' visibleFrom='sm'>ADD NEW STUDENT</Button>
      <Button color='green' ml={{base:'5px'}}  w={{sm:'15rem',xs:'15rem',base:'70px'}} hiddenFrom='sm'>ADD</Button>

    </div>
    </div>
  
    
  </div>
  


  <ScrollArea dir='rtl' scrollbarSize={20}   type='hover' h='77vh' p='2rem' style={{borderRadius:'20px'}}>
    <div style={{direction:'ltr'}}>
      <Table miw={300} verticalSpacing="sm" withRowBorders={false} >
        <Table.Thead   ta='center' bg='#F9FAFB'>
          <Table.Tr >           
            <Table.Th  style={{color:'#6B7280',textAlign:'left',paddingLeft:'3rem'}}>NAME</Table.Th>
            <Table.Th style={{color:'#6B7280',textAlign:'left'}}>EMAIL</Table.Th>
            <Table.Th visibleFrom='sm' style={{color:'#6B7280',textAlign:'left'}}>PHONE</Table.Th>
            <Table.Th visibleFrom='sm' style={{color:'#6B7280',textAlign:'left'}}>Enroll Number</Table.Th>
            <Table.Th visibleFrom='sm' style={{color:'#6B7280',textAlign:'left'}}>Date Of Admission</Table.Th>


          </Table.Tr>
        </Table.Thead>
        <Table.Tbody bg='#fff'>{rows}</Table.Tbody>
      </Table>
      </div>
    </ScrollArea>


    
    <Modal opened={isOpenDelete} onClose={onCloseDelete} 

          title='Are you sure you want to delete the student ?'
           overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3
        }} centered>
        <div></div>
        <div style={{display:'flex',gap:'2rem'}}>
        <Button w='200px' color='green' onClick={deleteStudent}>Yes</Button>
        <Button w='200px' color='#C55D22'>No</Button>
        </div>
        
      </Modal>

      <Modal opened={isOpenEdit} onClose={oncloseEdit} 
      
        title={title}     
        overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3
        }} >
 <form style={{padding:'1rem'}} onSubmit={form.onSubmit((values) => handleAddEditStudent(values))}>
      <TextInput
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
        
      />
      <TextInput
        mt="sm"
        placeholder="Email" 
        key={form.key('email')}
        {...form.getInputProps('email')}      
      />
       {title === 'Edit Student' && <TextInput
        mt="sm"
        placeholder="Phone"           
        value= {tempPhone}
        key={form.key('phone')}
        {...form.getInputProps('phone')}   
      />}

      {title === 'Add New Student' && <TextInput
        mt="sm"
        placeholder="Phone"           
        key={form.key('phone')}
        {...form.getInputProps('phone')}   
      />}

       <TextInput
        mt="sm"
        placeholder="Enroll Number"    
        key={form.key('enrollNumber')}
        {...form.getInputProps('enrollNumber')}   
      />
       <DatePickerInput
          placeholder="Date of Admission"
          mt='sm'       
          value={selectedDate}
          required={true}                        
          onChange={setSelectedDate}
    />
      
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',margin:'1rem'}}>
        <Button type='submit' w='300px' color='green'>{title === 'Edit Student' ? "Update" : 'Submit'}</Button>
        <Button w='300px' color='#C55D22' onClick={()=>form.reset()}>Reset</Button>
        </div>
    </form>        

        </Modal>
    </>
    
  
  )
}

export default MainBody