import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Films.css';

class Films extends Component {
    render () {
        let films = null;

        switch ( this.props.type ) {
            case ( 'box-bottom' ):
                films = <div className={classes.BoxBottom}></div>;
                break;
            case ( 'meat' ):
                films = <div> <img src={'https://firebasestorage.googleapis.com/v0/b/zuikoshop.appspot.com/o/delta3200.jpg?alt=media&token=2a698775-7007-451b-8e2a-28e161758c02'}/>
                        </div>;
                break;
            case ( 'cheese' ):
                films = <div> <img src={'https://firebasestorage.googleapis.com/v0/b/zuikoshop.appspot.com/o/delta100.jpg?alt=media&token=6f493cce-abc0-42c3-8664-12aec2c12034'}/>
                        </div>;
                break;
            case ( 'bacon' ):
                films = <div> <img src = {'https://firebasestorage.googleapis.com/v0/b/zuikoshop.appspot.com/o/panf.jpg?alt=media&token=0d96e704-c8e2-471d-847c-3ae51383804b'}/>
                        </div>;
                break;
            case ( 'salad' ):
                films = <div> <img src = {'https://firebasestorage.googleapis.com/v0/b/zuikoshop.appspot.com/o/delta100.jpg?alt=media&token=6f493cce-abc0-42c3-8664-12aec2c12034'}/>
                        </div>;
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
