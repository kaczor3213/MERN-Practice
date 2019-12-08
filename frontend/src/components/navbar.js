import React, {Component} from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBTooltip,
  MDBIcon,
  MDBDropdownMenu,
  MDBDropdown,
  MDBDropdownToggle,
  MDBBtn,
  MDBRow,
} from 'mdbreact';
import "./navbar.css"
import {Redirect} from "react-router-dom";
import axios from 'axios';


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: this.makeLoginModal(),
            collapseID: ''
        };
    }

    handleLogout(event) {
        event.preventDefault();
        document.cookie = 'loginToken' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.location.reload();
    }

    makeLoginModal() {
        return(
            <div>
                <MDBRow >
                    <div className="p-1 mx-auto">
                        <MDBBtn href='/login' style={{'font-size': '70%', 'font-weight': '400'}} className="m-0 white-text" color="primary">Logowanie</MDBBtn>
                    </div>
                    <div className="p-1 mx-auto">
                        <MDBBtn href='/register' style={{'font-size': '70%', 'font-weight': '400'}} className="m-0  white-text" color="indigo">Rejestracja</MDBBtn>
                    </div>
                </MDBRow>
            </div>
        );
    }

    makeProfileModal() {
        return (
            <div>
                <MDBRow >
                    <div className="p-1 mx-auto">
                        <MDBBtn href='/myprofile' style={{'font-size': '70%', 'font-weight': '400'}} className="m-0  white-text" color="success">Mój profil</MDBBtn>
                    </div>
                    <div className="p-1 mx-auto">
                        <MDBBtn href='/login' onClick={e => this.handleLogout(e)} style={{'font-size': '70%', 'font-weight': '400'}} className="m-0 white-text" color="danger">Wyloguj</MDBBtn>
                    </div>
                </MDBRow>
            </div>
        );
    }

    componentDidMount() {
        axios.post('http://localhost:4000/myprofile', null ,  {withCredentials: true, crossDomain: true, 'Content-Type': 'application/json' }).then(response => {
            if(response.data.IS_VALID === false) {
                this.setState({
                    redirectToLogin: true,
                });
            } else {  
            this.setState(
                {
                    modal: this.makeProfileModal()
                }
            );
            }
        });
    }

    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));

    closeCollapse = collapseID => () => {
        window.scrollTo(0, 0);
        this.state.collapseID === collapseID && this.setState({ collapseID: '' });
    };

    render() {
        return (
            <MDBNavbar color="bg-success" dark expand='md' fixed='top' scrolling transparent>
                <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
                    <img src={require('../assets/logo.png')} style={{ height: '2.5rem', width: '2.5rem' }} alt=""/>
                    <strong className='align-middle'>RolPol</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    onClick={this.toggleCollapse('mainNavbarCollapse')}
                />
                <MDBCollapse
                    id='mainNavbarCollapse'
                    isOpen={this.state.collapseID}
                    navbar
                >
                    <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBNavLink
                        exact
                        to='/'
                        onClick={this.closeCollapse('mainNavbarCollapse')}
                        >
                        <strong>Strona Główna</strong>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink
                        onClick={this.closeCollapse('mainNavbarCollapse')}
                        to='/brands'
                        >
                        <strong>Marki</strong>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink
                        onClick={this.closeCollapse('mainNavbarCollapse')}
                        to='/category'
                        >
                        <strong>Kategorie</strong>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink
                        onClick={this.closeCollapse('mainNavbarCollapse')}
                        to='/equipment'
                        >
                        <strong>Sprzęt rolniczy</strong>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                    
                        <MDBTooltip placement='bottom' domElement style={{ display: "block" }}>
                        <a 
                            className='nav-link Ripple-parent' 
                            href='/login'
                            rel="noopener noreferrer" 
                        >
                        </a>
                        <span>Profil</span>
                        </MDBTooltip>                   
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                            <strong><MDBIcon icon="user" /></strong>
                            </MDBDropdownToggle>
                            <MDBDropdownMenu style={{'width':'200px'}} className="p-1 profile-dropdown">
                                    {this.state.modal}
                            </MDBDropdownMenu>
                        </MDBDropdown>
                        </MDBNavItem>
                    
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>            
        );
    }
}
        
export default NavBar;

