import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/common/HomePage";
import BrandsPage from "./pages/common/BrandsPage";
import CategoryPage from "./pages/common/CategoryPage";
import EquipmentPage from "./pages/common/EquipmentPage";
import EquipmentSpecificPage from "./pages/common/EquipmentSpecificPage";

import UserLoginPage from "./pages/user/LoginPage";
import UserRegisterPage from "./pages/user/RegisterPage";
import UserProfilePage from "./pages/user/ProfilePage";


import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminPanelPage from "./pages/admin/AdminPanelPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage"
import AdminEquipmentPage from "./pages/admin/AdminEquipmentPage";
import AdminEquipmentAddPage from "./pages/admin/AdminEquipmentAddPage";
import AdminEquipmentDetailsPage from "./pages/admin/AdminEquipmentDetailsPage";
import AdminEquipmentEditPage from "./pages/admin/AdminEquipmentEditPage";

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
        <Route path="/equipment/category/:category" component={EquipmentPage} />
        <Route path="/equipment/brand/:brand" component={EquipmentPage} />
        <Route path="/equipment/:id" component={EquipmentSpecificPage} />

        <Route exact path="/login" component={UserLoginPage} />
        <Route exact path="/register" component={UserRegisterPage} />
        <Route exact path="/myprofile" component={UserProfilePage} />
        
        <Route exact path="/admin" component={AdminLoginPage} />
        <Route exact path="/admin/panel" component={AdminPanelPage} />
        <Route exact path="/admin/panel/equipment" component={AdminEquipmentPage} />
        <Route path="/admin/panel/equipment/details/:id" component={AdminEquipmentDetailsPage} />
        <Route path="/admin/panel/equipment/edit/:id" component={AdminEquipmentEditPage} />

        <Route exact path="/admin/panel/users" component={AdminUsersPage} />

        {/* 
        <Route path="/admin/panel/equipment/add" component={AdminEquipmentAddPage} />
        <Route path="/myprofile/settings" component={UserOrdersPage} />
        <Route path="/admin/orders" component={AdminOrdersPage} />
        <Route path="/myprofile/orders" component={UserOrdersPage} />
         */}

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
