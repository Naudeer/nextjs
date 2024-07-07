'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface RowData {
  id: number;
  name: string;
  age: number;
}

const rows: RowData[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Person ${index + 1}`,
  age: 20 + (index % 10),
}));

const TableComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddClick = () => {
    router.push('/create-person'); // Replace '/new-page' with your target path
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell align="right">
                <Box display="flex" gap={1} justifyContent="flex-end">
                  <Button variant="contained" color="primary" onClick={() => alert(`Edit row with id: ${row.id}`)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => alert(`Delete row with id: ${row.id}`)}>
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box display="flex" justifyContent="flex-end" padding="16px">
        <IconButton color="primary" onClick={handleAddClick} sx={{ fontSize: 50 }}>
          <AddCircleOutlineIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </TableContainer>
  );
};

export default TableComponent;
