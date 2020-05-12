import React from 'react';
import { connect } from 'react-redux';

import QueueItem from './QueueItem';
import { queueRemoveTrack } from '../actions/queueActions';
import { voteUp, voteDown } from '../actions/voteActions';

class Queue extends React.PureComponent {
  render() {
    const { items, session } = this.props;
    return (
      <div style={{ paddingBottom: '10px' }}>
        {items.length === 0 ? (
          <p>The queue is empty...for now</p>
        ) : (
          <table className="queue">
            <style jsx>{`
              .queue {
                width: 100%;
              }
            `}</style>
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
