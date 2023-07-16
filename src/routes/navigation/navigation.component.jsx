import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom"

import './navigation.styles.scss';

import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";

import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext); 
    return (
      <Fragment>
        <div className="navigation">
            <div>
              <Link className="logo-container" to='/'>
                <CrownLogo className='logo'/>
              </Link>
            </div>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {
                  currentUser ? (
                    <Link className="nav-link">
                     <span onClick={signOutUser}>SIGN OUT</span>
                     </Link> 
                  ) : (
                    <Link className="nav-link" to='/auth'>
                      <span >SIGN IN</span>
                    </Link> 
                )}
                <CartIcon/>
            </div>
            { isCartOpen && <CartDropdown/>}
        </div>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation;