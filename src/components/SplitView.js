import React, { useState, useRef, useCallback } from "react";
import "./SplitView.css";

function SplitView({
    orientation,
    initialSize,
    topOrLeftPanel,
    bottomOrRightPanel,
    minSize,
    maxSize,
}) {
    const [splitSize, setSplitSize] = useState(initialSize);
    const isHorizontal = orientation === "horizontal";
    const containerRef = useRef(null);

    const handleMouseDown = (e) => {
        e.preventDefault();
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = useCallback(
        (e) => {
            if (!containerRef.current) return;

            // Container bounding rect
            const rect = containerRef.current.getBoundingClientRect();

            let newSize;
            if (isHorizontal) {
                // For horizontal => user drags vertically
                // Distance from top of container to mouse
                const offsetY = e.clientY - rect.top;
                newSize = offsetY; // top panel height
            } else {
                // For vertical => user drags horizontally
                // Distance from left of container to mouse
                const offsetX = e.clientX - rect.left;
                newSize = offsetX; // left panel width
            }

            // Clamp newSize to [minSize, maxSize]
            if (newSize < minSize) {
                newSize = minSize;
            } else if (newSize > maxSize) {
                newSize = maxSize;
            }

            setSplitSize(newSize);
        },
        [isHorizontal, minSize, maxSize]
    );

    const handleMouseUp = useCallback(() => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    return (
        <div
            className={`splitview-container ${isHorizontal ? "horizontal" : "vertical"}`}
            ref={containerRef}
        >
            {/* The topOrLeft panel */}
            <div
                className="panel panel-first"
                style={
                    isHorizontal
                        ? { height: `${splitSize}px` }
                        : { width: `${splitSize}px` }
                }
            >
                {topOrLeftPanel}
            </div>

            {/* The resizer */}
            <div
                className="resizer"
                onMouseDown={handleMouseDown}
            />

            {/* The bottomOrRight panel */}
            <div className="panel panel-second">
                {bottomOrRightPanel}
            </div>
        </div>
    );
}

export default SplitView;
