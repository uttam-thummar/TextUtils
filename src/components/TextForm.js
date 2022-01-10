import React, { useState } from 'react'

export default function TextForm(props) {
    document.title = "TextUtils - Word counter | character counter | lowercase to uppercase | uppercase to lowercase";
    const [text, setText] = useState("");
    const [copyText, setCopyText] = useState('Copy Text')
    const [copyBtnClass, setCopyBtnClass] = useState('btn btn-primary');

    const handleUcClick = () => {
        let textUc = text.toUpperCase();
        setText(textUc);
        props.configAlert("Converted to Uppercase!", "success");
    }
    const handleLcClick = () => {
        let textUc = text.toLowerCase();
        setText(textUc);
        props.configAlert("Converted to Lowercase!", "success");
    }
    const handleOnChange = (event) => {
        setText(event.target.value);
    }
    const handleClearClick = () => {
        setText("");
        props.configAlert("Textbox Cleared!", "success");
    }
    const handlecopy = () => {
        let textarea = document.getElementById('myBox');
        navigator.clipboard.writeText(textarea.value);
        setCopyText('Copied');
        setCopyBtnClass('btn-secondary');
        setTimeout(() => {
            setCopyText('Copy Text');
            setCopyBtnClass('btn-primary');
        }, 1500);
        props.configAlert("Copied to Clipboard!", "success");
    }
    const handleExtraSpaces = () => {
        let filteredText = text.split(/[ ]+/);
        setText(filteredText.join(" "));
        props.configAlert("Extra Space Removed!", "success");
    }
    const handleCapitalized = () => {
        let words = text.split(/[ ]+/);
        let capitalizedWords = words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        setText(capitalizedWords.join(" "));
        props.configAlert("Converted First Letter to Uppercase!", "success");
    }
    const wordCount = (string) => {
        let words = string.match(/(\w+)/g);
        return words !== null ? words.length : 0;
    }

    return (
        <>
            <div className={`container text-${props.mode==='light'?'dark':'light'}`}>
                <h1 className={`text-${props.mode==='light'?'dark':'light'} mb-4`}>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" style={{backgroundColor: props.mode==='light'?'#fff':'#072136', color: props.mode==='light'?'#000':'#fff'}} value={text} onChange={handleOnChange} id="myBox" rows="10" placeholder="Enter text here."></textarea>
                </div>
                <button className="btn btn-primary mx-1 my-1" onClick={handleUcClick} disabled={text.length===0}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleLcClick} disabled={text.length===0}>Convert to Lowercase</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleClearClick} disabled={text.length===0}>Clear Text</button>
                <button className={`btn ${copyBtnClass} mx-1 my-1`} onClick={handlecopy} disabled={text.length===0}>{copyText}</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces} disabled={text.length===0}>Remove Extra Spaces</button>
                <button className="btn btn-primary mx-1 my-1" onClick={handleCapitalized} disabled={text.length===0}>Capitalized</button>
            </div>
            <div className={`container my-3 text-${props.mode==='light'?'dark':'light'}`}>
                <h2>Your Text Summary</h2>
                <p><strong>{text !== "" ? wordCount(text) : 0}</strong> Words and <strong>{text.length}</strong> Characters</p>
                <p><strong>{text !== "" ? (0.008 * wordCount(text)).toFixed(2) : 0 }</strong> Minutes required to Read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : 'Nothing to Preview!'}</p>
            </div>
        </>
    )
}
