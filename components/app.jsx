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
    var loaded = this.loadingComplete(newGifs);
    this.setState({ gifs: newGifs, loaded: false });
  },

  loadingComplete: function(gifs) {
    // Test if all our returned gifs are set to true
    return Object.keys(gifs).every(function(gif) {
      return gifs[gif] === true;
    })
  },

  getInitialState: function() {
    return {
      gifs: [],
      loaded: false
    }
  },

  renderGifs: function() {

    return Object.keys(this.state.gifs).map(function(gif, index) {
      return <Gif url={gif} key={index}/>
    });
  },

  render: function() {
    return (
      <div>
        <div style={{display: this.state.loaded ? 'inline' : 'none' }}>
          {
            this.renderGifs()
          }
        </div>
        <div style={{display: this.state.loaded ? 'none' : 'inline' }}>
          <h1>LOADING</h1>
        </div>
      </div>
    )
  }
});

module.exports = App;