import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactMapGL, { Marker } from 'react-map-gl';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as UserModalActions } from '../../store/ducks/userModal';

import './styles.css';

class Map extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    users: PropTypes.shape({
      cordinates: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      ]),
      id: PropTypes.number,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
  };

  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -22.907104,
      longitude: -47.06324,
      zoom: 13,
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleLocationChoice = async (e) => {
    const [longitude, latitude] = e.lngLat;
    const { showModal } = this.props;

    await showModal({ longitude, latitude });
  };

  render() {
    const { viewport: viewState } = this.state;
    const { users } = this.props;
    return (
      <ReactMapGL
        {...viewState}
        onClick={this.handleLocationChoice}
        mapStyle="mapbox://styles/mapbox/streets-v10"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {users.data.map(user => (
          <Marker
            longitude={user.coordinates.longitude}
            latitude={user.coordinates.latitude}
            key={user.id}
          >
            <img className="avatar-map" src={user.avatar} alt={`${user.name} Avatar`} />
          </Marker>
        ))}
      </ReactMapGL>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
