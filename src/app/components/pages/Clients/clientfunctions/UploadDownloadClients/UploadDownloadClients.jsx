import React, { Component } from "react";
import { ConnectedCSVDownloadClients } from "../CSVDownloadClients/CSVDownloadClients";
import { ConnectedCSVImportExport } from "../CSVImportExport/CSVImportExport";

class UploadDownloadClients extends Component {
  constructor(props) {
    super();
    const { locations, clients } = props;
    this.state = {
      locations,
      clients,
      showUploadModal: false,
    };

    this.toggleUploadModal = this.toggleUploadModal.bind(this);
  }

  toggleUploadModal = (e) => {
    this.setState({
      showUploadModal: !this.state.showUploadModal,
    });
  };

  render() {
    const { locations, clients, showUploadModal } = this.state;
    return (
      <>
        <div className="dropdown float-right">
          <a
            className="btn btn-link text-dark dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i
              className="fas fa-ellipsis-v"
              data-toggle="tooltip"
              title="Actions"
            ></i>
          </a>

          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuLink"
          >
            <button
              type="button"
              className="dropdown-item btn btn-link text-dark"
              data-toggle="modal"
              data-target="#modal-upload-client"
            >
              <i className="fas fa-upload"></i> Upload Clients
            </button>
            <button
              type="button"
              className="dropdown-item btn btn-link text-dark"
              data-toggle="modal"
              data-target="#modal-download-client"
            >
              <i className="fas fa-download"></i> Download Clients
            </button>
          </div>
        </div>

        <div className="modal fade" id="modal-upload-client">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Upload Clients</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <ConnectedCSVImportExport />
            </div>
          </div>
        </div>

        <div className="modal fade" id="modal-download-client">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Download Clients</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <ConnectedCSVDownloadClients
                locations={locations}
                clients={clients}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UploadDownloadClients;
