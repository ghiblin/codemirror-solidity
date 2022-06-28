import { solidity } from "@replit/codemirror-lang-solidity";
import CodeMirror from '@uiw/react-codemirror'
import { useState } from "react";

const doc = `
pragma solidity ^0.8.10;

contract EtherWallet {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint _amount) external {
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}
`

function App() {
  const [theme, setTheme] = useState('dark')

  return (
    <div>
      <h1 style={{ position: 'relative' }}>
        CodeMirror with solidity
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          {theme === 'dark' ? <button onClick={() => setTheme('light')}>Light</button> : <button onClick={() => setTheme('dark')}>Dark</button>}
        </div>
      </h1>
      <CodeMirror
        value={doc}
        extensions={[solidity]}
        height={'100%'}
        theme={theme}
      />
    </div>
  );
}

export default App;
