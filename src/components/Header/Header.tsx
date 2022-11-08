import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
    return (
        <div className="header">
            <h1 className="header__title">Curr€nc¥ &nbsp;$tatus</h1>
            <ul className="header__list">
                <li className="header__item">
                    <Link to="/" className="header__link">
                        🌐 Global Conv€rsion
                    </Link>
                </li>
                <li className="header__item">
                    <Link to="/specificConversion" className="header__link">
                        📍 $pecific Conv€rsion
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
