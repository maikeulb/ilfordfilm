import React, { Component } from 'react';

import panfImg from '../../../assets/panf.jpg';
import delta100Img from '../../../assets/delta100.jpg';
import hp5Img from '../../../assets/hp5.jpg';
import delta3200Img from '../../../assets/delta3200.jpg';

class Films extends Component {
  render () {
    let films = null;

      switch ( this.props.type ) {
        case ( 'panf' ):
          films = <div> 
                    <img src = { panfImg } alt ="panf" />
                  </div>;
          break;
        case ( 'delta100' ):
          films = <div> 
                    <img src = { delta100Img } alt ="delta100" />
                  </div>;
          break;
        case ( 'hp5' ):
          films = <div> 
                    <img src = { hp5Img } alt ="hp5" />
                  </div>;
          break;
        case ( 'delta3200' ):
          films = <div>
                    <img src = { delta3200Img } alt ="delta3200" />
                  </div>;
          break;
        default:
          films = null;
        }

        return films;
    }
}

export default Films;
