import React from 'react';
import PropTypes from 'prop-types';

import { connect } from './react-redux';

class Header extends React.Component {

    static contextTypes = {
        store: PropTypes.object
    }

    render () {
        return (
            <h1 style={{ color: this.props.themeColor }}>Header Title</h1>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor,
    }
}

Header = connect(mapStateToProps)(Header);



export default Header;