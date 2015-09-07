var React = require('react');
var GifActions = require('../actions/GifActions');
require('./gif.css');

var Gif = React.createClass({
  componentDidMount: function() {
    // Register change listener with GifStore for all loaded
  },

  getInitialState: function() {
    return {
      displayImg: false
    }
  },

  imgLoaded: function() {
    this.setState({
      displayImg: true
    });

    GifActions.gifLoaded(this.props.url);
  },

  render: function() {
    return (
      <div>
        <div className="hello">Why, here I am</div>
        <img onLoad={this.imgLoaded} style={{display: this.state.displayImg ? 'inline' : 'none' }} src={this.props.url} />
      </div>
    )
  }
});

module.exports = Gif;