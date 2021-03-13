import React from "react";
import { connect } from "react-redux";
import { history } from "../../store/history";
import { ConnectedButtonFavorite } from "./clients/clientfunctions/ButtonFavorite/ButtonFavorite";
import { Link } from "react-router-dom";
import { ConnectedContentHeader } from "../template/contentholders/ContentHeader";

export const MyFavorites = ({ client }) => (
  <>
    <ConnectedContentHeader pagename={"My Favorites"} />

    <section className="content">
      <div className="card card-solid">
        <div className="card-body pb-0">
          <div className="row d-flex align-items-stretch">
            {client.length > 0 ? (
              <>
                {client.map((myfave) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
                    key={myfave.id}
                  >
                    <div className="card card-outline card-red card-client">
                      <div className="card-header text-muted border-bottom-0">
                        {myfave.name}
                        <span className="float-right">
                          <ConnectedButtonFavorite client={myfave} />
                        </span>
                      </div>
                      <div className="card-body pt-0">
                        <div className="row">
                          <div className="col-12">
                            <ul className="ml-4 mb-0 fa-ul text-muted">
                              <li className="small">
                                <span className="fa-li">
                                  <i className="fas fa-lg fa-envelope"></i>
                                </span>
                                {myfave.email}
                              </li>
                              <li className="small">
                                <span className="fa-li">
                                  <i className="fas fa-lg fa-building"></i>
                                </span>
                                {myfave.address}
                              </li>
                              <li className="small">
                                <span className="fa-li">
                                  <i className="fas fa-lg fa-phone"></i>
                                </span>
                                {myfave.phone}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="text-right">
                          <Link
                            to={`/client/${myfave.id}`}
                            id={myfave.id}
                            className="btn btn-primary btn-sm mr-1"
                          >
                            <i className="fas fa-folder"></i>
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="alert alert-warning">
                <h5>
                  <i className="icon fas fa-exclamation-triangle"></i>
                  No favorites found.
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  </>
);
function mapStateToProps(state, ownProps) {
  const { clients } = state;

  var myfaveclients = clients.filter((client) => {
    return client.myfave ? client : null;
  });
  return {
    client: myfaveclients,
  };
}

export const ConnectedMyFavorites = connect(mapStateToProps)(MyFavorites);
