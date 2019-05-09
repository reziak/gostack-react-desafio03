import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as UsersActions } from '../../store/ducks/users';

import 'font-awesome/css/font-awesome.css';
import './styles.css';

const UserBar = ({ users, removeUser }) => (
  <div id="user-bar">
    {!users.data.length && <p>Listagem vazia</p>}
    {users.data.map(user => (
      <div className="user" key={user.id}>
        <div className="user-info">
          <img src={user.avatar} alt={user.id} className="avatar" />
          <p>
            <strong>{user.name}</strong>
            <small>{user.login}</small>
          </p>
        </div>
        <div className="user-actions">
          <button className="remove" type="button" onClick={removeUser(user)}>
            <i className="fa fa-times-circle" />
          </button>
          <a
            className="visit"
            href={`https://github.com/${user.login}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <i className="fa fa-chevron-right" />
          </a>
        </div>
      </div>
    ))}
  </div>
);

UserBar.propTypes = {
  users: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    name: PropTypes.string,
    login: PropTypes.string,
  }).isRequired,
  removeUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserBar);
