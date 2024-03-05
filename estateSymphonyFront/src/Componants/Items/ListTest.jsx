import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

  
export const ListTest = () => {

    const list = [{
        id: 1,
        name : 'Toto',
        mark : 'super'
      },
      {
        id: 2,
        name : 'Caca'
      },
      {
        id: 3,
        name : 'Tata'
      }]

  return (

    <TableContainer component={Paper}>
      <Table aria-label="simple table">

        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>mark</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {list.map((list) => (
            <TableRow key={list.name}>
              <TableCell> {list.id}</TableCell>
              <TableCell>{list.name}</TableCell>
              <TableCell>{list.mark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
