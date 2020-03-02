import API from '../../api';
import React, { useState, useMemo } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

const KeyInputBox = ({ messagesApi, user }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [newMessage, setNewMessage] = useState([ { children: [ { text: '' } ] } ]);

  /**
   * Parse the text provided by the input and send to the Firestore. Once the message has been sent, we can reset 
   * the message state so it's unlikely the users can repeat sending the same message.
   * 
   * @param {Event} e 
   */
  const onSubmit = (e) => {
    e.preventDefault();

    const userdata = API.firestore().collection("userdata");

    const text = parseText(newMessage);

    // Add the message to the database
    userdata.doc(user.uid).set({ pushOverKey: text });

    // ... then we can reset state
    setNewMessage([ { children: [ { text: '' } ] } ]);
  }

  /**
   * Since messages can have multiple paragraphs, return a joined string.
   * 
   * @param nodes 
   */
  const parseText = (nodes) => {
    return nodes.map(n => Node.string(n)).join('\n')
  }

  return (
    <div className={`textInput`}>
      <Slate editor={editor} value={newMessage} onChange={value => {
          setNewMessage(value);
        }}>
        <Editable placeholder="Paste your Pushover key here." />
      </Slate>
      <button onClick={onSubmit}>Update</button>
    </div>
  );
}

export default KeyInputBox;