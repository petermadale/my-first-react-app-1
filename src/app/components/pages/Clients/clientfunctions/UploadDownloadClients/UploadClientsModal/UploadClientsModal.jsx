import React from "react";
import ReactDom from "react-dom";
import { ConnectedCSVImportExport } from "../../CSVImportExport/CSVImportExport";

function UploadClientsModal({ showUploadModal, onClose }) {
  return ReactDom.createPortal(
    <>
      {showUploadModal && (
        <>
          <div
            className="modal fade show"
            id="modal-upload-client"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Upload Clients</h4>
                  <button
                    type="button"
                    className="close"
                    onClick={onClose}
                    // data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <ConnectedCSVImportExport onClose={onClose} />
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>,
    document.getElementById("portal")
  );
}

export default UploadClientsModal;
