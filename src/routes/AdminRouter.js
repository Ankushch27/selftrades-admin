import React from 'react'
import { Route, Switch } from 'react-router'
import CouponManagament from '../pages/CouponManagament'
import UserDetails from '../pages/UserDetails'

const AdminRouter = () => {
  return (
    <Switch>
      <Route path="/admin/user_details" component={UserDetails} />
      <Route path="/admin/coupon_mgmt" component={CouponManagament} />
    </Switch>
  )
}

export default AdminRouter
