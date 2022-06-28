import { EditorState } from "@codemirror/state";
import { solidity } from "@replit/codemirror-lang-solidity";
import { basicSetup, EditorView } from "codemirror";
import { useEffect, useRef } from "react";

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
  const editor = useRef();

  useEffect(() => {
    console.log('create new EditorView...')
    const view = new EditorView({
      state: EditorState.create({
        doc,
        extensions: [
          basicSetup,
          solidity
        ]
      }),
      parent: editor.current
    })
    return () => {
      view.destroy();
    }
  }, []);

  return (
    <div>
      <h1>CodeMirror with solidity</h1>
      <div ref={editor}></div>
    </div>
  );
}

export default App;
