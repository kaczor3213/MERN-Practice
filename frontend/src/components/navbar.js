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
  MDBCol
} from 'mdbreact';
import "./navbar.css"

class NavBar extends Component {

    state = {
        collapseID: ''
      };
    
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
                            <MDBDropdownMenu  className="p-1 profile-dropdown">
                                <MDBRow style={{  width: '24rem' }}>
                                    <MDBCol className="p-0">
                                    <MDBBtn color="primary">Logowanie</MDBBtn>
                                    </MDBCol>
                                    <MDBCol className="p-0">
                                    <MDBBtn color="indigo">Rejestracja</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
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

