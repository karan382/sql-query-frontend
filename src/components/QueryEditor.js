import React from "react";
import "./QueryEditor.css";

import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";

import { FaPlay } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { BiSave } from "react-icons/bi";

function QueryEditor({
    queryText,
    onTextChange,
    codeMirrorTheme,
    onRunQuery,
    onCopyQuery,
    onSaveQuery,
}) {
    const selectedTheme = codeMirrorTheme === "dracula" ? dracula : xcodeLight;

    const handleEditorChange = React.useCallback(
        (value) => {
            onTextChange(value);
        },
        [onTextChange]
    );

    const handleEditorKeyDown = React.useCallback(
        (event) => {
            if (event.ctrlKey && event.key === "Enter") {
                event.preventDefault();
                onRunQuery();
            }
        },
        [onRunQuery]
    );

    return (
        <div className="query-editor-container">
            {/* Sticky Header */}
            <div className="query-editor-header">
                <h2 className="query-editor-title">Input</h2>
                {/* Header Buttons */}
                <div className="header-buttons">
                    <button onClick={onSaveQuery} className="save-query-btn">
                        <BiSave />
                        <span>Save</span>
                    </button>
                    <button onClick={onCopyQuery} className="copy-query-btn">
                        <BsCopy />
                        <span>Copy</span>
                    </button>
                    <button onClick={onRunQuery} className="run-query-btn">
                        <FaPlay />
                        <span>Run</span>
                    </button>
                </div>
            </div>

            {/* Scrollable Editor */}
            <div className="query-editor-body">
                <CodeMirror
                    value={queryText}
                    extensions={[sql()]}
                    theme={selectedTheme}
                    onChange={handleEditorChange}
                    onKeyDown={handleEditorKeyDown}
                />
            </div>
        </div>
    );
}

export default QueryEditor;
