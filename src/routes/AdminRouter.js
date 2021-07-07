import React from 'react'
import { Route, Switch } from 'react-router'
import CouponManagament from '../pages/CouponManagament'
import Login from '../pages/Login'
import UserDetails from '../pages/UserDetails'

const AdminRouter = () => {
  return (
    <Switch>
      <Route path="/" component={Login} exact />
      <Route path="/user_details" component={UserDetails} />
      <Route path="/coupon_mgmt" component={CouponManagament} />
    </Switch>
  )
}

export default AdminRouter
