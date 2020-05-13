import React from 'react';
import { connect } from 'react-redux';

import QueueItem from './QueueItem';
import { queueRemoveTrack } from '../actions/queueActions';
import { voteUp, voteDown } from '../actions/voteActions';
import * as colors from '../constants/color_scheme';

const queueStyle = {
  paddingBottom: '10px'
};

const queueColors = [colors.BLUE, colors.PINK, colors.ORANGE, colors.YELLOW];

class Queue extends React.PureComponent {
  render() {
    const { items, session } = this.props;
    return (
      <div style={queueStyle}>
        {items.length === 0 ? (
          <p>The queue is empty...for now</p>
        ) : (
          <table style={{ width: '100%' }}>
            <tbody>
              {items.map((i, index) => (
                <QueueItem
                  item={i}
                  session={session}
                  index={index}
                  key={index}
                  onVoteUp={() => this.props.voteUp(i.id)}
                  onVoteDown={() => this.props.voteDown(i.id)}
                  onRemoveItem={() => this.props.queueRemoveTrack(i.id)}
                  bgColor={queueColors[index % queueColors.length]}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  voteUp: id => dispatch(voteUp(id)),
  voteDown: id => dispatch(voteDown(id)),
  queueRemoveTrack: id => dispatch(queueRemoveTrack(id))
});

const mapStateToProps = state => ({
  queue: state.queue
});

export default connect(mapStateToProps, mapDispatchToProps)(Queue);
