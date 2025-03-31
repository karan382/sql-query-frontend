import React, { useState } from "react";
import "./SavedQueries.css";

import { FiEdit3, FiTrash2 } from "react-icons/fi";

function SavedQueries({
    queriesList,
    selectedQueryId,
    onSelectQuery,
    onCreateNewQuery,
    onDeleteQuery,
    onUpdateQueryTitle,
}) {
    const [editingId, setEditingId] = useState(null);
    const [tempTitle, setTempTitle] = useState("");

    const startEditing = (query) => {
        setEditingId(query.id);
        setTempTitle(query.title);
    };

    const finishEditing = (id) => {
        onUpdateQueryTitle(id, tempTitle.trim() || "Untitled Query");
        setEditingId(null);
        setTempTitle("");
    };

    const handleChangeTitle = (e) => {
        setTempTitle(e.target.value);
    };

    return (
        <div className="saved-queries-section">
            {/* Header */}
            <div className="saved-queries-header">
                <h2>Saved Queries</h2>
            </div>

            {/* Query List */}
            <ul className="saved-queries-list">
                {queriesList.map((q) => {
                    const isSelected = q.id === selectedQueryId;
                    const isEditing = editingId === q.id;

                    return (
                        <li
                            key={q.id}
                            className={
                                isSelected ? "saved-queries-item selected" : "saved-queries-item"
                            }
                            onClick={() => {
                                if (!isEditing) {
                                    onSelectQuery(q.id);
                                }
                            }}
                        >
                            {isEditing ? (
                                // Edit Query Name
                                <input
                                    type="text"
                                    value={tempTitle}
                                    onChange={handleChangeTitle}
                                    onClick={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            finishEditing(q.id);
                                        }
                                    }}
                                    onBlur={() => finishEditing(q.id)}
                                    autoFocus
                                />
                            ) : (
                                // Display Truncated Name (max 20 chars)
                                <div className="query-name-label">
                                    <span className="query-title-truncate">{q.title}</span>
                                </div>
                            )}

                            {/* Edit & Delete Icons */}
                            <div className="action-icons">
                                {!isEditing && (
                                    <button
                                        className="edit-query-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startEditing(q);
                                        }}
                                    >
                                        <FiEdit3 />
                                    </button>
                                )}
                                <button
                                    className="delete-query-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteQuery(q.id);
                                    }}
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Create New Query button */}
            <button className="create-query-btn" onClick={onCreateNewQuery}>
                + Create New Query
            </button>
        </div>
    );
}

export default SavedQueries;
