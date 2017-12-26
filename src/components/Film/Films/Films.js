import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Films.css';

class Films extends Component {
    render () {
        let films = null;

        switch ( this.props.type ) {
            case ( 'bread-bottom' ):
                films = <div className={classes.BreadBottom}></div>;
                break;
            case ( 'bread-top' ):
                films = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case ( 'meat' ):
                films = <div className={classes.Meat}></div>;
                break;
            case ( 'cheese' ):
                films = <div className={classes.Cheese}></div>;
                break;
            case ( 'bacon' ):
                films = <div className={classes.Bacon}></div>;
                break;
            case ( 'salad' ):
                films = <div className={classes.Salad}></div>;
                break;
            default:
                films = null;
        }

        return films;
    }
}

Films.propTypes = {
    type: PropTypes.string.isRequired
};

export default Films;
