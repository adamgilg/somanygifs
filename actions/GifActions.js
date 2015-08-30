var Dispatcher = require('../dispatcher/Dispatcher');
var Constants  = require('../constants/Constants');

var GifActions = {
  get: function() {
    console.log('getting')
    Dispatcher.dispatch({
      actionType: Constants.GET
    })
  }
};

module.exports = GifActions;