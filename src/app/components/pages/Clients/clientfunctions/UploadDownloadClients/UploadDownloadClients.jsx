import React, { Component } from "react";
import DownloadClientsModal from "./DownloadClientsModal/DownloadClientsModal";
import UploadClientsModal from "./UploadClientsModal/UploadClientsModal";

class UploadDownloadClients extends Component {
  constructor(props) {
    super();
    const { locations, clients } = props;
    this.state = {
      locations,
      clients,
      showUploadModal: false,
      showDownloadModal: false,
    };

    this.toggleUploadModal = this.toggleUploadModal.bind(this);
    this.toggleDownloadModal = this.toggleDownloadModal.bind(this);
  }

  toggleUploadModal = (e) => {
    this.setState({
      showUploadModal: !this.state.showUploadModal,
    });
  };

  toggleDownloadModal = (e) => {
    this.setState({
      showDownloadModal: !this.state.showDownloadModal,
    });
  };

  render() {
    const { locations, clients, showUploadModal, showDownloadModal } =
      this.state;
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
              onClick={this.toggleUploadModal}
              // data-toggle="modal"
              // data-target="#modal-upload-client"
            >
              <i className="fas fa-upload"></i> Upload Clients
            </button>
            <button
              type="button"
              className="dropdown-item btn btn-link text-dark"
              onClick={this.toggleDownloadModal}
            >
              <i className="fas fa-download"></i> Download Clients
            </button>
          </div>
        </div>
        <UploadClientsModal
          showUploadModal={showUploadModal}
          onClose={this.toggleUploadModal}
        />
        <DownloadClientsModal
          showDownloadModal={showDownloadModal}
          onClose={this.toggleDownloadModal}
          locations={locations}
          clients={clients}
        />
      </>
    );
  }
}

export default UploadDownloadClients;
