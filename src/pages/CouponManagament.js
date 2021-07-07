import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router';
import { loadCoupons } from '../actions/couponsActions';
import {
  openModal,
  setActive,
  setCoupon,
  setCouponId,
  setDiscount,
  setEditMode,
  setModule
} from '../actions/modalActions';
import NewAddCouponModal from '../components/AddCouponModal';
import { useAuthContext } from '../contexts/AuthContext';
import { useCouponsContext } from '../contexts/CouponsContext';
import { ModalContext } from '../contexts/ModalContext';
import { api } from '../utils/constants';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'coupon', label: 'Coupon' },
  { id: 'discount', label: 'Cost %' },
  { id: 'active', label: 'Active' },
  { id: 'module', label: 'Module' },
  { id: 'actions', label: 'Actions' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function CouponManagament() {
  const classes = useStyles();
  const { modalDispatch } = useContext(ModalContext);
  const { couponsState, couponsDispatch } = useCouponsContext();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('coupon');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {
    loginState: { userToken },
  } = useAuthContext();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditCoupon = (row) => {
    const { active, coupon, discount, module, id } = row;
    openModal(modalDispatch);
    setActive(modalDispatch, active);
    setCoupon(modalDispatch, coupon);
    setDiscount(modalDispatch, discount);
    setModule(modalDispatch, module);
    setEditMode(modalDispatch);
    setCouponId(modalDispatch, id);
  };

  const handleDeleteCoupon = async (id) => {
    try {
      await api.delete('/deleteCoupon', { data: {id} });
      let updatedCoupons = couponsState.filter(x => x.id !== id)
      loadCoupons(couponsDispatch, updatedCoupons)
    } catch (error) {
      console.log('error', error.response.data.error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await api.get('/allCoupons', {
          // headers: {
          //   Authorization: `Bearer ${loginState.userToken}`,
          // },
        });
        loadCoupons(couponsDispatch, res.data.result);
      } catch (error) {
        console.log('error', error.response.data.error);
      }
    }
    fetchData();
  }, [couponsDispatch]);

  if(!userToken) return <Redirect to="/" />

  return (
    <div className={classes.root}>
      <NewAddCouponModal />
      <Paper>
        <Box display="flex" justifyContent="space-between" mb={2} p={2}>
          <Typography variant="h5" component="div">
            Coupon Management
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => openModal(modalDispatch)}>
            Add Coupon
          </Button>
        </Box>
      </Paper>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(couponsState, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const { id, coupon, discount, active, module } = row;
                  return (
                    <TableRow hover tabIndex={-1} key={id}>
                      <TableCell>{coupon}</TableCell>
                      <TableCell>{discount}</TableCell>
                      <TableCell>
                        {active === 1 ? (
                          <DoneIcon style={{ color: 'green' }} />
                        ) : (
                          <CloseIcon color="error" />
                        )}
                      </TableCell>
                      <TableCell>{module}</TableCell>
                      <TableCell>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center">
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEditCoupon(row)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteCoupon(id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          component="div"
          count={couponsState.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
