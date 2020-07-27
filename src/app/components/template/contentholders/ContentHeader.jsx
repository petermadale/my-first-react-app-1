import React from "react";
import { connect } from "react-redux";

export const ContentHeader = ({ pagename }) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>{pagename}</h1>
          </div>
        </div>
      </div>
    </section>
  </>
);

const mapStateToProps = (state, ownProps) => {
  return {
    pagename: ownProps.pagename,
  };
};
export const ConnectedContentHeader = connect(mapStateToProps)(ContentHeader);
