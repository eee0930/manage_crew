import React from 'react';

interface IButton {
  children: React.ReactNode;
  callback: () => void;
}
function Button({ children, callback }: IButton) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <button onClick={callback}>{children}</button>
    </div>
  );
}

export default Button;
