import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/common/HomePage";
import BrandsPage from "./pages/common/BrandsPage";
import CategoryPage from "./pages/common/CategoryPage";
import EquipmentPage from "./pages/common/EquipmentPage";
import UserLoginPage from "./pages/user/LoginPage";
import UserRegisterPage from "./pages/user/RegisterPage";
import UserProfilePage from "./pages/user/ProfilePage";
class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  isLoggedOn: false,
                          hasRegistered: false,
                  };
  }

  render() {
    return (
      <Switch>

        {/* COMMON_ACCESS ROUTES */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/brands" component={BrandsPage} />
        <Route exact path="/category" component={CategoryPage} />
        <Route exact path="/equipment" component={EquipmentPage} />
        <Route exact path="/login" component={UserLoginPage} />
        <Route exact path="/register" component={UserRegisterPage} />
        {/* <Route exact path="/myprofile" component={UserProfilePage} /> */}
        {/* 
        <Route exact path="/admin" component={AdminLoginPage} />
        <Route path="/admin/logout" component={AdminLogoutPage} />
        <Route path="/admin/panel" component={AdminPanelPage} />
        <Route path="/admin/users" component={AdminUsersPage} />
        <Route path="/admin/orders" component={AdminOrdersPage} />
        <Route path="/admin/equipment" component={AdminEquipmentPage} />
        <Route path="/admin/equipment/add" component={AdminEquipmentAddPage} />
        <Route path="/myprofile/orders" component={UserOrdersPage} />
        <Route path="/myprofile/settings" component={UserOrdersPage} /> */}

        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
