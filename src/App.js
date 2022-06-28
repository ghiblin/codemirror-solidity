import { javascript } from "@codemirror/lang-javascript";
import { solidity } from "@replit/codemirror-lang-solidity";
import CodeMirror from '@uiw/react-codemirror'
import { useState } from "react";

const SOL_SNIPPET = `
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

const JS_SNIPPET = `
const sayHello = (name = 'world') => {
  return \`Hello $\{name}!\`;
}
console.log(sayHello());
`

const files = [
  {
    name: 'EtherWallet.sol',
    language: 'solidity',
    content: SOL_SNIPPET.toString()
  },
  {
    name: 'Javascript.js',
    language: 'javascript',
    content: JS_SNIPPET.toString()
  }
]

function App() {
  const [theme, setTheme] = useState('dark')
  const [currentFile, setCurrentFile] = useState(files[0])

  return (
    <div>
      <h1 style={{ position: 'relative' }}>
        CodeMirror with solidity
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          {theme === 'dark' ? <button onClick={() => setTheme('light')}>Light</button> : <button onClick={() => setTheme('dark')}>Dark</button>}
        </div>
      </h1>
      <div>
        {files.map((file, idx) => (
          <button key={idx} onClick={() => setCurrentFile(file)}>{file.name}</button>
        ))}
      </div>
      <CodeMirror
        value={currentFile.content}
        extensions={currentFile.language === 'solidity' ? [solidity] : [javascript({ jsx: false })]}
        height={'100%'}
        theme={theme}
      />
    </div>
  );
}

export default App;
