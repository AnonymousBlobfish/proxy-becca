import restaurant from '../../../restaurants_data_small.js';
import { App } from '../../../client/src/App.jsx';
import { InfoList } from '../../../client/src/InfoList.jsx';
import MapContainer from '../../../client/src/MapContainer.jsx';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

var restaurantId = 'ChIJP5PrLYSAhYARBcWhJXs55P4';

enzyme.configure({ adapter: new Adapter() });


describe('<App />', () => {
  it('exists', () => {
    const wrapper = enzyme.mount(<App restaurantId={restaurantId} restaurant={restaurant.result}/>);
    expect(wrapper.find(App).length).toBe(1);
  });

  it('has a prop called restaurant which is an object', () => {
    const wrapper = enzyme.mount(<App restaurantId={restaurantId} restaurant={restaurant.result}/>);
    expect(typeof wrapper.props().restaurant).toBe('object');
  });

  it('has a <InfoList /> child', () => {
    const wrapper = enzyme.shallow(<App restaurantId={restaurantId} restaurant={restaurant.result}/>);
    expect(wrapper.find(InfoList).length).toBe(1);
  });

  it('has a <MapContainer /> child', () => {
    const wrapper = enzyme.shallow(<App restaurantId={restaurantId} restaurant={restaurant.result}/>);
    expect(wrapper.find(MapContainer).length).toBe(1);
  });
});
