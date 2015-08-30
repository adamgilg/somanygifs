var React = require('react');

var Gif = React.createClass({
  componentDidMount: function() {
    console.log('mounted!')
  },

  render: function() {
    return (
      <div>
        <img src={this.props.url} />
      </div>
    )
  }
});

module.exports = Gif;