import React from 'react';

const queueElem = {
  marginLeft: '10px',
  marginRight: '10px',
  fontSize: '18px',
  borderRadius: '10px',
  color: 'white',
  height: '100%'
};

const trackTitle = {
  textAlign: 'left',
  marginRight: '20px'
};

const imgStyle = {
  float: 'left',
  marginRight: '20px',
  borderRadius: '10px'
};

export default ({ index, item, session, onRemoveItem, onVoteUp, onVoteDown, bgColor }) => {
  const queueElemColor = {
    backgroundColor: bgColor
  };
  const btnStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    border: 0,
    borderRadius: '50%',
    backgroundColor: bgColor,
    color: 'white',
    width: '100%',
    height: '100%'
  };

  return (
    <tr style={queueElemColor}>
      <style jsx>{`
        .btn:hover {
          cursor: pointer;
        }
      `}</style>
      <td style={queueElem}>
        <img style={imgStyle} src={item.track.album.images[2].url} width="60" height="60" />
        <p style={trackTitle}>
          <b>{item.track.name}</b>
          {' - ' + item.track.artists.map(a => a.name).join(', ')}
        </p>
      </td>
      <td style={queueElem}>{item.user && (item.user.display_name || item.user.id)}</td>
      <td style={queueElem}>
        {item.voters.length === 1 ? item.voters.length + ' vote' : item.voters.length + ' votes'}
      </td>
      <td style={queueElem}>
        <div>
          {item.voters && session.user && item.voters.filter(v => v.id === session.user.id).length === 0 ? (
            <button onClick={onVoteUp} className="btn" style={btnStyle}>
              ▲
            </button>
          ) : (
            <button onClick={onVoteDown} className="btn" style={btnStyle}>
              ▼
            </button>
          )}
        </div>
      </td>
      <td style={queueElem}>
        <div>
          {item.user && session.user && item.user.id === session.user.id ? (
            <button
              onClick={() => {
                onRemoveItem(item.id);
              }}
              style={btnStyle}
              className="btn"
            >
              X
            </button>
          ) : (
            <button disabled style={btnStyle}>
              X
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
