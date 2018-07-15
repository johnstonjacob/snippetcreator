import React from 'react';
import { Button, } from '@material-ui/core';
import './App.css';

const SnippetArea = (props) => {
    return (
        <div>
            <div className='copyButton'>
                <Button color='primary' size='large'
                variant='contained' onClick={props.copyToClipboard}>Copy to clipboard</Button>
            </div>
            <div className='snippetOutput' id='snippetOutput'>
                "{props.name}": {'{'}
                <br />
                "prefix": "{props.prefix}",
                <br />
                "body": [
                <br /> 
                {props.snippet.map((item, ind) =><span key={ind}>{item},<br /></span>)}
                <br />
                ],
                "description": "{props.description}"
                }
            </div>
        </div>
        )
}

export default SnippetArea;
