import React from 'react';
import axios from 'axios';
import { InfoList } from './InfoList.jsx';
//import MapContainer from './MapContainer.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: props.restaurant
    };
    // this.getRestaurantData(1);
  }

  componentDidMount() {
    var that = this;
    const id = window.location.href.split('/')[4];
    axios.get(`/api/restaurants/${id}/sidebar`)
      .then((response) => {
        that.setState({
          restaurant: response.data.result
        });
        console.log('client received data from id: ', id);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (!this.state.restaurant) {
      return <div> Loading Sidebar... </div>;
    } else {
      return (
        <div className="sidebar-flexbox-col sidebar-app">
          <InfoList restaurant={this.state.restaurant} />

        </div>
      );
    }
  }
}

// insert the line below back in on line 32 when done testing
// <MapContainer geometry={this.state.restaurant.geometry} />
