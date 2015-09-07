var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('lodash/object/assign');
var $ = require('jquery');

var CHANGE_EVENT = 'change';

var gifs = null;

function get(url) {
  // TODO: Get the most recent 25? or the highest rated?
  $.getJSON('https://www.reddit.com/r/gifs/hot.json', function(res) {
    var returnedGifs;
    returnedGifs = res.data.children.map(function(gif) { return gif.data.url });

    gifs = formatGifs(returnedGifs);

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

function formatGifs(gifs) {
  var formattedGifs = {};

  // Remove the reddit link
  gifs.shift();
  gifs.forEach(function(gif) {
    if (!!gif.match('imgur') && gif.slice(-1) === 'v') {
      // Turn imgur html5 videos into gifs (sadly)
      gif = gif.slice(0, -1);
    } else if (gif.match('gfycat')) {
      // Turn gfycat html5 videos (ie every gfycat gif) into their gif format
      gif = gif.split('//');
      // insert giant into the url
      gif.splice(1, 0, '//giant.');
      // return our url plus the format
      gif = gif.join('') + '.gif';
    }

    formattedGifs[gif] = false;
  })

  return formattedGifs;
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
    case Constants.GIF_LOADED:
      gifs[action.url] = true;
      GifStore.emitChange();
      break;
  }
});

module.exports = GifStore;