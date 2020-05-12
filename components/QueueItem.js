import React from 'react';

export default ({ index, item, session, onRemoveItem, onVoteUp, onVoteDown }) => {
  const voteBtn =
    item.voters && session.user && item.voters.filter(v => v.id === session.user.id).length === 0 ? (
      <button onClick={onVoteUp}>▲</button>
    ) : (
      <button onClick={onVoteDown}>▼</button>
    );
  return (
    <tr>
      <style jsx>
        {`
          .track_title {
            float: left;
            text-align: left;
          }
        `}
      </style>
      <td style={{ paddingRight: '10px' }}>
        <img src={item.track.album.images[2].url} width="60" height="60" />
      </td>
      <td style={{ paddingRight: '10px', fontSize: 16 }}>
        <p className="track_title">
          <b>{item.track.name}</b>
          {' - ' + item.track.artists.map(a => a.name).join(', ')}
        </p>
      </td>
      <td style={{ paddingRight: '10px', fontSize: 16 }}>{item.user && (item.user.display_name || item.user.id)}</td>
      <td style={{ paddingRight: '10px', fontSize: 16 }}>
        {item.voters.length === 1 ? item.voters.length + ' vote' : item.voters.length + ' votes'}
      </td>
      <td style={{ paddingRight: '10px', fontSize: 16 }}>{voteBtn}</td>
      <td style={{ paddingRight: '10px', fontSize: 16 }}>
        {item.user && session.user && item.user.id === session.user.id ? (
          <button
            onClick={() => {
              onRemoveItem(item.id);
            }}
          >
            X
          </button>
        ) : (
          <button disabled>X</button>
        )}
      </td>
    </tr>
  );
};
