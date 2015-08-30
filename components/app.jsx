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
    console.log(this.state.gifs);
    return this.state.gifs.map(function(gif, index) {
      console.log('rendering another gif')
      return <Gif url={gif} key={index}/>
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