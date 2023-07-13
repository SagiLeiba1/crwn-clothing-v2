import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom"

import './navigation.styles.scss';

import {ReactComponent as CrownLogo} from '../../assets/crown.svg'
import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

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
                     <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                  ) : (
                    <Link className="nav-link" to='/auth'>
                      <span className="nav-link">SIGN IN</span>
                    </Link> 
                )}
            </div>
        </div>
        <Outlet/>
      </Fragment>
    )
  }

  export default Navigation;