import React, { Component } from 'react';
import brace from 'brace'; //eslint-disable-line
import AceEditor from 'react-ace';
import { Typography, TextField, AppBar, } from '@material-ui/core';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools';
import './App.css';

import SnippetArea from './SnippetArea';

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      prefix: '',
      snippet: [],
      currentEditor: '',
    };

    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updatePrefix = this.updatePrefix.bind(this);
    this.updateSnippet = this.updateSnippet.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
  }

  copyToClipboard() {
    const selection = window.getSelection(); // Save the selection.
    const range = document.createRange();
    range.selectNodeContents(document.getElementById('snippetOutput'));
    selection.removeAllRanges(); // Remove all ranges from the selection.
    selection.addRange(range); // Add the new range.
    document.execCommand('copy');
    alert('copied to clipboard');
  }

  updateSnippet(currentEditor) {
    const snippet = currentEditor.split('\n').map((item) => JSON.stringify(item));
    this.setState({ currentEditor, snippet });
  }

  updateName(e) {
    const { value: name } = e.target;
    this.setState({ name });
  }

  updateDescription(e) {
    const { value: description } = e.target;
    this.setState({ description });
  }

  updatePrefix(e) {
    const { value: prefix } = e.target;
    this.setState({ prefix });
  }

  render() {
    return (
      <div className="App">
        <AppBar className="App-header">
          <Typography variant="title" color="inherit">
            VSCode Snippet Creator
          </Typography>
        </AppBar>
        <div>
          <div className="input-field">
            <span className="textField">
              <TextField
                type="text"
                helperText="Name for your snippet"
                label="Snippet Name"
                id="snippet_name"
                onChange={this.updateName}
              />
            </span>
            <span className="textField">
              <TextField
                type="text"
                id="snippet_description"
                label="Snippet Description"
                helperText="Description of your snippet"
                onChange={this.updateDescription}
              />
            </span>
            <span className="textField">
              <TextField
                type="text"
                id="snippet_prefix"
                label="Snippet Prefix"
                helperText="Shorthand for your snippet"
                onChange={this.updatePrefix}
              />
            </span>
          </div>
          <div className="editor">
            <Typography variant="display1">Snippet</Typography>
            <AceEditor
              mode={'javascript'}
              theme={'monokai'}
              onChange={this.updateSnippet}
              value={this.state.currentEditor}
              name="editor"
              editorProps={{
                $blockScrolling: true,
              }}
              fontSize={21}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 4,
              }}
              height="40vh"
              width="100%"
            />
          </div>
          <SnippetArea
            className="snippet"
            name={this.state.name}
            description={this.state.description}
            prefix={this.state.prefix}
            snippet={this.state.snippet}
            copyToClipboard={this.copyToClipboard}
          />
        </div>
      </div>
    );
  }
}

export default App;
