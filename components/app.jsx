var React = require('react');
var GifActions = require('../actions/GifActions');
var GifStore = require('../stores/GifStore');
var Gif = require('./gif.jsx');

var App = React.createClass({
  componentWillMount: function() {
    GifActions.get();
  },

  componentDidMount: function() {
    GifStore.addChangeListener(this.gifsUpdate);
  },

  gifsUpdate: function() {
    var newGifs = GifStore.fetchGifs();
    this.setState({ gifs: newGifs });
  },

  getInitialState: function() {
    return {
      gifs: []
    }
  },

  renderGifs: function() {
    return this.state.gifs.map(function(gif, index) {
      return <Gif url={gif.url} key={index}/>
    });
  },

  render: function() {
    return (
      <div>
        {
          this.renderGifs()
        }
      </div>
    )
  }
});

module.exports = App;