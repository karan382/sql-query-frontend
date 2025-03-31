# SQL Query Code Editor

## Overview
This repository contains a SQL Query Code Editor web application built with React. It allows users to:

* Edit and Run SQL queries in a CodeMirror‐based text editor.

* Maintain a Saved Queries list, including inline renaming, deletion, and creation of new queries.

* Toggle between light and dark themes with separate header and editor styling.

* Toggle between top-down and left-right layout for the editor and results.

* Dynamically resize panels (editor vs. results) with min/max constraints.

* View query results with optional lazy loading to handle large datasets.

* Display toast notifications for feedback (e.g., “Query Copied to Clipboard”).

## Tech Stack & Dependencies
### Framework
* React – primary library for building the UI.

### Major Libraries
1. @uiw/react-codemirror: Integrates the CodeMirror 6 editor into React.
2. react-icons: Provides lightweight icon sets (Play, Copy, Save, Edit, Delete, Theme, Layout, etc.).
3. react-toastify: Provides toast notifications ("Copied to Clipboard").

## Page Load Time & Measurement
* Load Time: ~1s on a typical broadband connection for the production build.
* Measured Using: Chrome DevTools (Performance tab) to measure TTI (Time to Interactive).

## Performance Optimizations
1. **Lazy Loading:** For large query results (thousands of rows), data is rendered in chunks or pages, preventing the DOM from having too many elements at once.
   
2. **Memoization & useCallback:** Minimizes unnecessary re‐renders by memoizing heavy computations.

3. **Lightweight Libraries:** Opted for react-icons and minimal additional dependencies to keep bundle size small.

## Getting Started
1. Clone & Install
```
git clone https://github.com/karan382/sql-query-frontend.git
cd sql-query-frontend
npm install
```

2. Run in Development
```
npm start
```

3. Build for Production
```
npm run build
```

Thank you for checking out this SQL Query Code Editor.

Feel free to open issues or create pull requests for improvements!
