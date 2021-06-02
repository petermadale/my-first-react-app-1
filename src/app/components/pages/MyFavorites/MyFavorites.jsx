import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./MyFavorites.module.css";
import { history } from "../../../store/history";
import { ConnectedButtonFavorite } from "../Clients/clientfunctions/ButtonFavorite/ButtonFavorite";
import { ConnectedContentHeader } from "../../template/contentholders/ContentHeader/ContentHeader";

export const MyFavorites = ({ client }) => (
  <>
    <ConnectedContentHeader pagename={"My Favorites"} />

    <section className="content">
      <div className="card card-solid">
        <div className="card-body p-0">
          {client.length > 0 ? (
            <div className="row d-flex align-items-stretch">
              {client.map((client) => (
                <div
                  className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
                  key={client.id}
                >
                  <div
                    className={`card card-red card-outline ${styles.MyFavorites}`}
                  >
                    <div className="card-body box-profile">
                      <ConnectedButtonFavorite client={client} />
                      <h3 className="profile-username text-center">
                        {client.name}
                        {client.postNominalLetters ? (
                          <span className="post-nominal-letters">
                            , {client.postNominalLetters}
                          </span>
                        ) : null}
                      </h3>

                      <ul className="list-group list-group-unbordered mb-3">
                        <li className="list-group-item">
                          <b>
                            <i className="fas fa-lg fa-envelope"></i> Email
                          </b>{" "}
                          <a
                            className="float-right"
                            href={`mailto:${client.email}`}
                          >
                            {client.email}
                          </a>
                        </li>
                        {client.clientContactDetails.length > 0 ?
                        <>
                        {client.clientContactDetails.map((contact, index) => 
                            <ul className="list-group list-group-unbordered mb-0" key={contact.id}>
                                {contact.isFavorite ? <>
                            <li className="list-group-item">
                                <b>{client.clientContactDetails.length > 1 ? <>{index + 1}.{" "}</> : null}
                                    <i className="fas fa-lg fa-phone"></i> Office Phone
                                    Number
                                </b>
                                <a
                                    className="float-right"
                                    href={`tel:+${contact.officePhoneNumber}`}
                                >
                                    {contact.officePhoneNumber}
                                </a>
                                </li>
                                
                                <li className="list-group-item">
                                    <b>
                                    <i className="fas fa-map-marker-alt mr-1"></i>{" "}
                                    Address{" "}
                                    </b>
    
                                    <p className="text-muted">
                                    {contact.address1 ? (
                                        <>{contact.address1}, </>
                                    ) : null}{" "}
                                    {contact.address2 ? (
                                        <>{contact.address2}, </>
                                    ) : null}{" "}
                                    {contact.city ? (
                                        <>{contact.city}, </>
                                    ) : null}{" "}
                                    {contact.state ? (
                                        <>{contact.state}, </>
                                    ) : null}{" "}
                                    {contact.zip ? (
                                        <>{contact.zip}</>
                                    ) : null}
                                    </p>
                                </li></>
                             : null}</ul>
                        )}                        
                        </> : null
                        }
                      </ul>
                    </div>
                    <div className="card-footer">
                      <div className="text-right">
                        <Link
                          to={`/client/${client.id}`}
                          id={client.id}
                          className="btn bg-gradient-primary btn-sm"
                        >
                          <i className="fas fa-user-nurse"></i>
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-warning mb-0">
              <h5>
                <i className="icon fas fa-exclamation-triangle"></i>
                No favorites found.
              </h5>
            </div>
          )}
        </div>
      </div>
    </section>
  </>
);
function mapStateToProps(state, ownProps) {
  const { clients, myfavorites } = state;

  var myfaveclients = clients.filter((client) => {
    return client.myfave.length > 0 ? client : null;
  });

// const myfaveclients = myfavorites.map((fave) => {
//     return clients.find((client) => {
//         return client.id === fave.client 
//   });
// });
// const myfaveclients = myfavorites.map((fave) => {
//     return clients.map((client) => {
//         return client.id === fave.client ? {...client, id: fave.id} : client
//   });
// });
// const newClient = myfaveclients.map((myfave) => {
//     return {
//         ...myfave,
//         clientContactDetails: myfave.clientContactDetails.filter((contact) => {
//             return myfavorites.find((fave) => {
//                 return contact.id === fave.clientContactDetailsID 
//             });
//         })
//     }
// })
  return {
    client: myfaveclients,
  };
}

export const ConnectedMyFavorites = connect(mapStateToProps)(MyFavorites);
