var Dispatcher = require('../dispatcher/Dispatcher');
var Constants  = require('../constants/Constants');

var GifActions = {
  get: function() {
    Dispatcher.dispatch({
      actionType: Constants.GET
    })
  },
  gifLoaded: function(url) {
    console.log('in gifloaded')
    Dispatcher.dispatch({
      actionType: Constants.GIF_LOADED,
      url: url
    })
  }
};

module.exports = GifActions;