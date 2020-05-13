import React from 'react';
import * as colors from '../constants/color_scheme.js';

const userNameStyle = {
  lineHeight: '30px',
  fontSize: '18px',
  float: 'left',
  paddingLeft: '20px',
  color: colors.GRAY
};

const userImgStyle = {
  borderRadius: '50%'
};

const mediaImgStyle = {
  float: 'left',
  marginRight: '10px'
};

const userListItem = {
  padding: '5px',
  height: 'auto',
  alignItems: 'center',
  overflow: 'auto',
  borderRadius: '10px'
};

const continerStyle = {
  width: '100%',
  alignItems: 'center',
  padding: 0
};

export default ({ items }) => {
  return (
    <div>
      <style jsx>{`
        .userListItem:hover {
          background-color: #eee;
        }
      `}</style>
      <ul style={continerStyle}>
        {items.map((i, index) => {
          const userName = i.display_name || i.id;
          return (
            <li key={index} style={userListItem} className="userListItem">
              <div style={mediaImgStyle}>
                <img
                  style={userImgStyle}
                  src={(i.images && i.images.length && i.images[0].url) || '../static/user-icon.png'}
                  width="40"
                  height="40"
                  alt={userName}
                  title={userName}
                />
              </div>
              <div style={userNameStyle}>{userName}</div>
            </li>
          );
        })}
      </ul>
      <div style={{ clear: 'both' }} />
    </div>
  );
};
