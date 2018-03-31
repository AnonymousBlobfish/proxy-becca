import React from 'react';
import _ from 'underscore';

class OpeningHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPeriods: false
    };
  }

  clickHandler(event) {
    this.setState({ showPeriods: !this.state.showPeriods });
  }

  getOpenNow() {
    var now = new Date(Date.now());
    var weekdayNow = now.getDay() - 1;
    if (weekdayNow === -1) {
      weekdayNow = 6;
    }

    var hours = now.getHours().toString();
    var minutes = now.getMinutes().toString();
    if (minutes.length === 1) {
      minutes = '0' + minutes;
    }
    var timeNow = Number(hours + minutes);

    var openNow = _.some(this.props.info.data.periods, (period) => {
      var timeOpen = Number(period.open.time);
      var timeClose = Number(period.close.time);
      if (period.open.day !== weekdayNow && period.close.day !== weekdayNow) {
        return false;
      } else if (period.open.day === weekdayNow && period.close.day === weekdayNow) {
        return timeNow >= timeOpen && timeNow <= timeClose;
      } else if (period.open.day === weekdayNow) {
        return timeNow >= timeOpen;
      } else if (period.close.day === weekdayNow) {
        return timeNow <= timeClose;
      }
    });

    if (openNow) {
      return 'Open';
    } else {
      return 'Closed';
    }
  }

  getTimeRange() {
    var now = new Date(Date.now());
    var weekdayNow = now.getDay() - 1;
    if (weekdayNow === -1) {
      weekdayNow = 6;
    }
    var range = this.props.info.data.weekday_text[weekdayNow].split(': ')[1];
    var time1;
    var time2;
    if (range.includes(', ')) {
      time1 = range.split(', ')[0];
      time2 = range.split(', ')[1];
    } else {
      time1 = range;
      time2 = null;
    }

    return { time1: time1, time2: time2 };
  }

  render() {
    try {
      var testPropData = this.props.info.data.periods[0].close;
    } catch(error) {
      return <div></div>;
    }
    var openNow = this.getOpenNow();
    var timeRange = this.getTimeRange();

    return (
      <div className="sidebar-flexbox-col sidebar-info-list-element">
        <div onClick={this.clickHandler.bind(this)} className="sidebar-flexbox-row sidebar-opening-hours-title">
          <div className="sidebar-info-list-element-icon">
            <i className={this.props.info.icon} />
          </div>
          <div className="sidebar-flexbox-row sidebar-info-list-text sidebar-opening-hours-title">
            <div>
              <div className="sidebar-periods-element-day sidebar-open-now-text">{openNow}</div>
            </div>
            <div>
              <div className="sidebar-periods-element-time">{timeRange.time1}</div>
              <div className="sidebar-periods-element-time">{timeRange.time2}</div>
            </div>
          </div>
          <div className="sidebar-expand-arrow" style={ this.state.showPeriods ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' }}>
            <i className="fas fa-angle-down fa-lg"/>
          </div>
        </div>
        <div className="sidebar-flexbox-col sidebar-periods" style={ this.state.showPeriods ? {display: 'flex'} : {'display': 'none'}}>
          <Periods weekdayText={this.props.info.data.weekday_text}/>
        </div>
      </div>
    );
  }
}

  var Periods = (props) => {
    var periodDivs = _.map(props.weekdayText, (period, index) => {
      var weekday = period.split(': ')[0];
      var time1;
      var time2;
      if (period.includes(', ')) {
        time1 = period.split(': ')[1].split(', ')[0];
        time2 = period.split(': ')[1].split(', ')[1];
      } else {
        time1 = period.split(': ')[1];
        time2 = null;
      }

      var periodObj = {
        weekday: weekday,
        time1: time1,
        time2: time2
      }

      var weekdayNum = new Date(Date.now()).getDay() - 1;
      if (weekdayNum === -1) {
        weekdayNum = 6;
      }

      return (
        <div key={index} className="sidebar-flexbox-col sidebar-periods-element"
          style={{'fontWeight': weekdayNum === index ? 'bold' : 'normal'}} >
          <div className="sidebar-flexbox-row sidebar-periods-element-info">
            <div className="sidebar-periods-element-day" >{periodObj.weekday}</div>
            <div className="sidebar-periods-element-time">{periodObj.time1}</div>
          </div>
          <div className="sidebar-periods-element-info-additional">
            <div className="sidebar-periods-element-time">{periodObj.time2}</div>
          </div>
        </div>
      )
    });

  return (
      <div className="sidebar-flexbox-col sidebar-periods">
        {periodDivs}
      </div>
  )
};

export { OpeningHours, Periods};
