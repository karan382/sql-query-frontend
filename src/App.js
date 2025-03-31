import React, { useState, useEffect } from "react";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { queries as initialQueries } from "./data/dummyData";
import SavedQueries from "./components/SavedQueries";
import QueryEditor from "./components/QueryEditor";
import ResultsTable from "./components/ResultsTable";
import SplitView from "./components/SplitView";

import { FiSun, FiMoon, FiLayout } from "react-icons/fi";
import { RiLayoutRightLine, RiLayoutBottomLine } from "react-icons/ri";

function App() {
  // Dark or Light mode?
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Orientation for SplitView: "horizontal" or "vertical"
  const [orientation, setOrientation] = useState("horizontal");

  // List of saved queries
  const [queriesList, setQueriesList] = useState(initialQueries);
  // Which query is selected? (null => no selected query => blank editor)
  const [selectedQueryId, setSelectedQueryId] = useState(initialQueries[0]?.id || null);

  // Editor text
  const [queryText, setQueryText] = useState(initialQueries[0]?.queryText || "");
  // Show/Hide results
  const [showResults, setShowResults] = useState(false);
  // Result data
  const [tableData, setTableData] = useState(initialQueries[0]?.data || []);

  // When selectedQueryId changes, load that query (or blank if null)
  useEffect(() => {
    if (selectedQueryId == null) {
      // No selection => blank editor
      setQueryText("");
      setTableData([]);
      setShowResults(false);
      return;
    }
    // Load the selected query
    const currentQuery = queriesList.find((q) => q.id === Number(selectedQueryId));
    if (currentQuery) {
      setQueryText(currentQuery.queryText);
      setTableData(currentQuery.data);
      setShowResults(false);
    }
  }, [selectedQueryId, queriesList]);

  // Select an existing query => load into editor
  const handleQueryChange = (id) => {
    setSelectedQueryId(id);
  };

  // Run => show results
  const runQuery = () => {
    setShowResults(true);
  };

  // Copy => clipboard
  const copyQuery = () => {
    navigator.clipboard.writeText(queryText);
    toast("Copied to Clipboard", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: isDarkMode ? "dark" : "light",
    });
  };

  // Save current editor text as a new query
  const saveQuery = () => {
    const newId = Date.now();
    const newQuery = {
      id: newId,
      title: `Query ${newId}`,
      queryText,
      data: [],
    };
    setQueriesList((prev) => [...prev, newQuery]);
    setSelectedQueryId(newId);
  };

  // Create new query
  const createNewQuery = () => {
    setSelectedQueryId(null);
    setQueryText("");
    setTableData([]);
    setShowResults(false);
  };

  // Delete a query
  const deleteQuery = (id) => {
    setQueriesList((prev) => prev.filter((q) => q.id !== id));
    if (selectedQueryId === id) {
      setSelectedQueryId(null);
    }
  };

  // Rename a query
  const updateQueryTitle = (id, newTitle) => {
    setQueriesList((prev) =>
      prev.map((q) => (q.id === id ? { ...q, title: newTitle } : q))
    );
  };

  // Toggle theme
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Toggle orientation
  const toggleOrientation = () => {
    setOrientation((prev) =>
      prev === "horizontal" ? "vertical" : "horizontal"
    );
  };

  // Determine header classes & logo
  const headerClassName = isDarkMode ? "app-header header-dark" : "app-header header-light";
  const logoSrc = isDarkMode ? "/logo_dark.png" : "/logo_light.png";

  // CodeEditor theme
  const editorTheme = isDarkMode ? "dracula" : "githubLight";

  return (
    <div className={isDarkMode ? "app dark-mode" : "app light-mode"}>
      {/* Toast container */}
      <ToastContainer />

      {/* Header */}
      <header className={headerClassName}>
        <img src={logoSrc} alt="Logo" className="app-logo" />

        {/* Right side of header => Theme & Layout toggles */}
        <div className="header-right">
          <button onClick={toggleDarkMode}>
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button onClick={toggleOrientation}>
            {orientation === "vertical" ? <RiLayoutRightLine /> : <RiLayoutBottomLine />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-container">
        {/* Saved Queries */}
        <SavedQueries
          queriesList={queriesList}
          selectedQueryId={selectedQueryId}
          onSelectQuery={handleQueryChange}
          onCreateNewQuery={createNewQuery}
          onDeleteQuery={deleteQuery}
          onUpdateQueryTitle={updateQueryTitle}
        />

        {/* SplitView => Editor + Results Table */}
        <div className="split-view-section">
          <SplitView
            orientation={orientation}
            initialSize={orientation === "horizontal" ? 300 : 500}
            minSize={orientation === "horizontal" ? 200 : 400}
            maxSize={orientation === "horizontal" ? 400 : 600}
            topOrLeftPanel={
              <QueryEditor
                queryText={queryText}
                onTextChange={setQueryText}
                codeMirrorTheme={editorTheme}
                onRunQuery={runQuery}
                onCopyQuery={copyQuery}
                onSaveQuery={saveQuery}
              />
            }
            bottomOrRightPanel={
              <ResultsTable
                data={tableData}
                showTable={showResults}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
