import React from 'react';

import Aux from '../../hoc/Aux';

// const style = {
//   marginTop: '16px'
// };

const layout = ( props ) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;
