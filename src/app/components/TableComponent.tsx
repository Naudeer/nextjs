'use client';

import { useState, useEffect } from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface RowData {
  id: number;
  name: string;
  age: number;
}

const TableComponent = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        console.log(process.env)
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/people`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: RowData[] = await response.json();
        setRows(data.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddClick = () => {
    router.push('/create-person');
  };

  const handleEditClick = (id: number) => {
    router.push(`/edit-person/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    if (id) {
      setSelectedId(id);
      setOpen(true);
    } else {
      console.error('Cannot delete person: Missing ID');
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/person/${selectedId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete person');
      }

      setRows((prevRows) => prevRows.filter((row) => row.id !== selectedId));

      handleCloseDialog();
    } catch (error) {
      console.error('Error deleting person:', error);
      setError('Failed to delete person');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
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
                    <Button variant="contained" color="primary" onClick={() => handleEditClick(row.id)}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteClick(row.id)}>
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

      <Dialog open={open} onClose={handleCloseDialog} sx={{ '& .MuiDialog-paper': { marginTop: '-25vh' } }}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this person?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableComponent;
