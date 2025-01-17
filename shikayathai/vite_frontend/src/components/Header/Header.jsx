import { useModal } from "../../context/ModalContext";
import RegistrationComponent from "../RegistrationComponent/RegistrationComponent.jsx";
import LoginComponent from "../LoginComponent/LoginComponent.jsx";
import "./Header.css";
import logo from "../../assets/logo.svg";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link } from "react-router-dom";

const Header = () => {
  const { auth } = useContext(AuthContext);
  const { showModal } = useModal();

  const handleRegisterClick = () => {
    showModal(<RegistrationComponent />);
  };

  const handleLoginClick = () => {
    showModal(<LoginComponent />);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} alt="Logo" style={{ width: '24px', marginRight: '10px' }} />
            <span className="text-white">Shikayathai</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/brands">All brands</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/complaints">All Complaints</Link>
              </li>
            </ul>
            {!auth.name ? (
              <div className="d-flex">
                <button onClick={handleRegisterClick} className="btn btn-primary me-2">
                  Register
                </button>
                <button onClick={handleLoginClick} className="btn btn-secondary">
                  Login
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Link className="btn btn-primary me-2" to="/profile">
                  {auth.name}
                </Link>
                <img className="navbar-brand rounded-circle" src={auth.userpic} width="30" height="30" alt="User" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
