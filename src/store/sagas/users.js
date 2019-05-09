import { call, put, select } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '../../services/api';

import { Creators as UsersActions } from '../ducks/users';
import { Creators as UserModalActions } from '../ducks/userModal';

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.user}`);

    const isDuplicated = yield select(state => state.users.data.find(user => user.id === data.id));

    if (isDuplicated) {
      yield put(UsersActions.addUserFailure('Usuário Duplicado!'));
      toast.warn('Usuário Duplicado!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const userData = {
        id: data.id,
        name: data.name,
        login: data.login,
        avatar: data.avatar_url,
        coordinates: action.payload.coordinates,
      };

      yield put(UsersActions.addUserSuccess(userData));
      toast.success('Usuário Adicionado com Sucesso', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (err) {
    yield put(UsersActions.addUserFailure('Erro ao adicionar Usuário!'));
    toast.error('Erro ao adicionar Usuário!', {
      position: toast.POSITION.TOP_RIGHT,
    });
  } finally {
    yield put(UserModalActions.hideModal());
  }
}
