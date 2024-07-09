import React from 'react';

function Header() {
  return (
    <div>
      <div className="loginFormHeaderDiv">
        <div>
          <h1>FRIENDS DATABASE</h1>
        </div>
        <div className="loginFormHeaderButtonDiv">
          <button>FRIENDS LIST</button>
          <button>ADD FRIEND</button>
          <button>LOGOUT</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
