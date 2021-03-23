import React from 'react';
import Cards from './Cards';

import './Centre.css';

export class ClientCentre extends React.Component {

  render() {
    return (
      <div className="client-centre">
        <h1 className="section-head"><i className="far fa-address-card head-sign"></i>住客中心</h1>
        <div className="client-area">
          <Cards />
        </div>
      </div>
    );
  }
}

// export default connect(mapStateToProps,mapDispatchToProps)(Counter);
