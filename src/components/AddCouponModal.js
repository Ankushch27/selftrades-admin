import { Checkbox, FormControlLabel, MenuItem, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { Field, Form, Formik, useField } from 'formik';
import React, { useContext } from 'react';
import { addCoupon, updateCoupon } from '../actions/couponsActions';
import { closeModal } from '../actions/modalActions';
import { useCouponsContext } from '../contexts/CouponsContext';
import { ModalContext } from '../contexts/ModalContext';
import { CouponSchema } from '../utils/ValidationSchema';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const FormikCheckBox = (props) => {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
  });
  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
      labelPlacement="start"
    />
  );
};

const AddCouponModal = () => {
  const { modalState, modalDispatch } = useContext(ModalContext);
  const {couponsDispatch} = useCouponsContext()
  const classes = useStyles();

  const initialValues = {
    active: modalState.active,
    coupon: modalState.coupon,
    discount: modalState.discount,
    module: modalState.module,
  };

  const addOrEditCoupon = (values) => {
    modalState.isEditMode ? editCoupon(values) : addNewCoupon(values);
  };

  const addNewCoupon = async ({ active, coupon, discount, module }) => {
    try {
      let res = await axios.post('/addCoupon', {
        active,
        coupon,
        discount,
        module,
      });
      console.log(res.data.result);
      addCoupon(couponsDispatch, res.data.result)
      closeModal(modalDispatch);
    } catch (error) {
      console.log('error', error.response.data.error);
    }
  };

  const editCoupon = async ({ active, coupon, discount, module }) => {
    console.log(active, coupon, discount, module)
    try {
      let res = await axios.patch('/updateCoupon', {
        active,
        coupon,
        discount,
        module,
        id: modalState.id
      });
      console.log(res.data.result);
      updateCoupon(couponsDispatch, res.data.result)
      closeModal(modalDispatch);
    } catch (error) {
      console.log('error', error.response.data.error);
    }
  };

  return (
    <div>
      <Dialog onClose={() => closeModal(modalDispatch)} open={modalState.isModalOpen}>
        <DialogTitle onClose={() => closeModal(modalDispatch)}>
          {modalState.isEditMode ? `Edit` : `Add`} Coupon
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={CouponSchema}
          onSubmit={(values) => addOrEditCoupon(values)}>
          {(values) => (
            <Form>
              <DialogContent className={classes.root} dividers>
                <Field
                  error={values.errors.coupon ? true : false}
                  name="coupon"
                  as={TextField}
                  label="Coupon Name"
                />
                <Field
                  error={values.errors.discount ? true : false}
                  name="discount"
                  type="number"
                  as={TextField}
                  label="Discount %"
                />
                <Field
                  error={values.errors.module ? true : false}
                  name="module"
                  as={TextField}
                  label="Choose Module"
                  select>
                  <MenuItem value="Select">Select</MenuItem>
                  <MenuItem value="Intraday">Intraday</MenuItem>
                  <MenuItem value="Positional">Positional</MenuItem>
                </Field>
                <FormikCheckBox name="active" label="Active" color="primary" />
                {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
              </DialogContent>
              <DialogActions>
                <Button type="submit" color="primary">
                  {modalState.isEditMode ? `Save changes` : `Save`}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default AddCouponModal;
