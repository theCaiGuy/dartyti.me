import React from 'react';

export default ({ items }) => {
  return (
    <div>
      <style jsx>{`
        .user-list__item {
          padding: 5px 0 5px 5px;
          background-color: #fff;
          height: 40px;
          align-items: center;
        }
        .user-image {
          border-radius: 50%;
        }
        .user-name {
          line-height: 30px;
          font-size: 16;
          float: left;
        }
        .media,
        .media__bd {
          overflow: hidden;
          _overflow: visible;
          zoom: 1;
        }
        .media .media__img {
          float: left;
          margin-right: 10px;
        }
        .header-2 {
          color: #999;
          font-size: 20px;
          text-transform: uppercase;
        }
      `}</style>
      <h2 className="header-2">Online Users</h2>
      <ul className="user-list">
        {items.map((i, index) => {
          const userName = i.display_name || i.id;
          return (
            <li key={index} className="user-list__item media">
              <div className="media__img">
                <img
                  className="user-image"
                  src={(i.images && i.images.length && i.images[0].url) || '/static/user-icon.png'}
                  width="30"
                  height="30"
                  alt={userName}
                  title={userName}
                />
              </div>
              <div className="user-name media__bd" style={{ paddingLeft: '20px', fontSize: 16 }}>
                {userName}
              </div>
            </li>
          );
        })}
      </ul>
      <div style={{ clear: 'both' }} />
    </div>
  );
};
