import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
    return (
        <div>
            <h1>Curr€nc¥ &nbsp;$tatus</h1>
            <ul>
                <li>
                    <Link to="/">Global Conversion</Link>
                </li>
                <li>
                    <Link to="/specificConversion">Specific Conversion</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header;
