import React from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import {FiLogIn} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecollect" />
                </header>
                <main>
                    <h1>Your waste collection marketplace</h1>
                    <p>Helping people and finding point to collect waste.</p>
                    <Link to="/register">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>
                            Register a new point
                        </strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}
export default Home;