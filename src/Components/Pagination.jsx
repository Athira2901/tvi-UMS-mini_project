import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination(props) {
    const  page=Math.ceil(props.total/5)
  return (
    <Stack spacing={2}>
     
      <Pagination count={page} color="primary" onChange={(e)=>props.cpage(e.target.textContent)} />
      
    </Stack>
  );
}