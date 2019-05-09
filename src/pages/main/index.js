import React, { Fragment } from 'react';

import Map from '../../components/Map';
import UserBar from '../../components/UserBar';
import SearchModal from '../../components/SearchModal';

const Main = () => (
  <Fragment>
    <Map />
    <UserBar />
    <SearchModal />
  </Fragment>
);

export default Main;
