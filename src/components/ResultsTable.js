import React, { useState, useRef, useEffect } from "react";
import "./ResultsTable.css";

function ResultsTable({ data, showTable }) {
    // How many rows to load per "lazy" chunk
    const CHUNK_SIZE = 20;

    // Rows we want to display so far
    const [displayData, setDisplayData] = useState([]);

    // How many rows have been loaded into displayData
    const [currentIndex, setCurrentIndex] = useState(0);

    // Ref for the scrollable area
    const resultsBodyRef = useRef(null);

    // Whenever data changes or showTable toggles on => Reset lazy loading to the beginning
    useEffect(() => {
        if (showTable) {
            // Reset
            setDisplayData([]);
            setCurrentIndex(0);
            // Load initial chunk
            loadMoreRows(0);
        }
    }, [data, showTable]);

    // Load next chunk of rows into displayData
    const loadMoreRows = (startIdx) => {
        // slice the data from startIdx to startIdx + CHUNK_SIZE
        const endIdx = startIdx + CHUNK_SIZE;
        const nextChunk = data.slice(startIdx, endIdx);

        setDisplayData((prev) => [...prev, ...nextChunk]);
        setCurrentIndex(endIdx);
    };

    // Handle scrolling in the .results-table-body div
    const handleScroll = (e) => {
        if (!resultsBodyRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = resultsBodyRef.current;
        // If we are near the bottom, load more (if available)
        if (scrollTop + clientHeight >= scrollHeight - 2) {
            // Only load if we still have more data
            if (currentIndex < data.length) {
                loadMoreRows(currentIndex);
            }
        }
    };

    return (
        <div className="results-table-container">
            {/* Header */}
            <div className="results-table-header">
                <h3 className="results-table-title">Output</h3>
            </div>

            {/* The table area or placeholder below the Header */}
            <div
                className="results-table-body"
                onScroll={handleScroll}
                ref={resultsBodyRef}
            >
                {showTable ? (
                    displayData.length > 0 ? (
                        <table>
                            <thead>
                                {/* Table column headers based on the first row keys, if any */}
                                {displayData[0] && (
                                    <tr>
                                        {Object.keys(displayData[0]).map((col) => (
                                            <th key={col}>{col}</th>
                                        ))}
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {displayData.map((row, idx) => (
                                    <tr key={idx}>
                                        {Object.entries(row).map(([key, val]) => (
                                            <td key={key}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                                {/* If we've loaded all rows, show a "No More Data" if you wish */}
                                {currentIndex >= data.length && (
                                    <tr>
                                        <td colSpan="100%" style={{ textAlign: "center" }}>
                                            No more rows to load.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        // showTable is true, but either data is empty or not loaded
                        <div className="results-placeholder">
                            {data.length > 0 ? "Loading rows..." : "No data"}
                        </div>
                    )
                ) : (
                    // If showTable=false => show placeholder
                    <div className="results-placeholder">
                        No results yet. Please run the query.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResultsTable;
