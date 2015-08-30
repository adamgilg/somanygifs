var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('lodash/object/assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';

var gifs = null;

function get(url) {
  // TODO: Get the most recent 25? or the highest rated?
  $.getJSON('https://www.reddit.com/r/gifs/new.json', function(res) {
    var returnedGifs;
    returnedGifs = res.data.children.map(function(gif) { return gif.data.url });

    console.log(cleanGifs(returnedGifs));

    gifs = cleanGifs(returnedGifs);

    GifStore.emitChange();
  });

  // do this instead if it will work eventually
  // var req = new XMLHttpRequest();

  // req.open('GET', 'https://www.reddit.com/r/gifs/new.json', true);
  // req.withCredentials = 'true';
  // req.setRequestHeader('Content-Type', 'application/json');
  // req.onload = function(res) {
  //   debugger
  // }
  // req.send(null);
};

function cleanGifs(gifs) {
  return gifs.map(function(gif) {
    if (gif.slice(-1) === 'v') {
      return gif.slice(0, -1);
    }

    return gif;
  })
}

var GifStore = assign({}, EventEmitter.prototype, {
  fetchGifs: function() {
    return gifs;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case Constants.GET:
      get();
      break;
  }
});

module.exports = GifStore;