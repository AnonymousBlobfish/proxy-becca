import React from 'react';
import _ from 'underscore';
import { OpeningHours } from './OpeningHours.jsx';

var InfoList = (props) => {
  var info = {
    openingHours: {
      data: props.restaurant.opening_hours,
      icon: 'fas fa-clock fa-lg',
      link: {url: null, newTab: false}
    },
    address: {
      text: props.restaurant.formatted_address,
      icon: 'fas fa-map-marker-alt fa-lg',
      link: {url: null, newTab: false}
    },
    phone: {
      text: props.restaurant.international_phone_number,
      icon: 'fas fa-phone fa-lg',
      link: {url: 'tel:' + props.restaurant.international_phone_number, newTab: false}
    },
    website: {
      text: (new URL(props.restaurant.website)).hostname,
      icon: 'fas fa-globe fa-lg',
      link: {url: props.restaurant.website, newTab: true}
    },
    directions: {
      text: 'Get Directions',
      icon: 'fas fa-compass fa-lg',
      link: {url: props.restaurant.url, newTab: true}
    }
  };

  return (
    <div className="sidebar-flexbox-col sidebar-info-list">
      <OpeningHours info={info.openingHours} />
      <InfoListElement info={info.address} />
      <InfoListElement info={info.phone} />
      <InfoListElement info={info.website} />
      <InfoListElement info={info.directions} />
    </div>
  );
};

var InfoListElement = (props) => {
  if (!props.info.text) {
    return <div></div>;
  } else {
    return (
      <div className="sidebar-flexbox-row sidebar-info-list-element">
        <div className="sidebar-info-list-element-icon">
          <i className={props.info.icon} />
        </div>
        <div className="sidebar-info-list-text">
          <a className="sidebar-anchor" href={props.info.link.url}
            target={props.info.link.newTab ? '_blank' : ''}>
            {props.info.text}
          </a>
        </div>
      </div>
    );
  }
}

export {InfoList, InfoListElement, OpeningHours};
