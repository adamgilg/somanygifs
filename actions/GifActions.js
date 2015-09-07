var Dispatcher = require('../dispatcher/Dispatcher');
var Constants  = require('../constants/Constants');

var GifActions = {
  get: function() {
    Dispatcher.dispatch({
      actionType: Constants.GET
    })
  }
};

module.exports = GifActions;