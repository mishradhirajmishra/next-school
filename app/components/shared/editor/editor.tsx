"use client"
import React, { useState } from 'react';
 

function RichTextEditor() {
  const [content, setContent] = useState('<p>test</p>');

  const handleInputChange = (e:any) => {
    console.log(e.target)
  setContent(e.target);

  };

  const handleBoldClick = () => {
    console.log(content)
    // setContent((prevContent) => prevContent + "<strong></strong>");
  };

  const handleItalicClick = () => {
    setContent((prevContent) => prevContent + "<em></em>");
  };

  const handleUnderlineClick = () => {
    setContent((prevContent) => prevContent + "<u></u>");
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button className='btn-outline-light' onClick={handleBoldClick}>Bold</button>
        <button className='btn-outline-light' onClick={handleItalicClick}>Italic</button>
        <button className='btn-outline-light' onClick={handleUnderlineClick}>Underline</button>
      </div>
      <div
        className="editor c-input"
        contentEditable
        dangerouslySetInnerHTML={{ __html: content }}
        onInput={handleInputChange}
      ></div>
    </div>
  );
}

export default RichTextEditor;
