import React from "react";
import ReactDom from "react-dom";
import { ConnectedCSVDownloadClients } from "../../CSVDownloadClients/CSVDownloadClients";

function DownloadClientsModal({
  showDownloadModal,
  onClose,
  locations,
  clients,
}) {
  return ReactDom.createPortal(
    <>
      {showDownloadModal && (
        <>
          <div
            className="modal fade show"
            id="modal-upload-client"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Download Clients</h4>
                  <button
                    type="button"
                    className="close"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <ConnectedCSVDownloadClients
                  locations={locations}
                  clients={clients}
                  onClose={onClose}
                />
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

export default DownloadClientsModal;
