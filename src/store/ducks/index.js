import { combineReducers } from 'redux';

import users from './users';
import userModal from './userModal';

const reducers = combineReducers({ users, userModal });

export default reducers;
