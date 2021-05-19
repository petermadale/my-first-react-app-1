import React from "react";
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";
import { connect } from "react-redux";

const handleForce = (data, fileInfo) => console.log(data, fileInfo);

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};

export const CSVImportExport = () => (
  <div className="container">
    <CSVReader
      cssClass="btn bg-gradient-success"
      onFileLoaded={handleForce}
      parserOptions={papaparseOptions}
    />
  </div>
);

const mapStateToProps = (state, ownProps) => {
  return state;
};
export const ConnectedCSVImportExport = connect(mapStateToProps)(CSVImportExport);
