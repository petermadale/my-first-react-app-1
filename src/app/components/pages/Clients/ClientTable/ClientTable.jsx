import React from "react";
import { ConnectedButtonFavorite } from "../clientfunctions/ButtonFavorite/ButtonFavorite";
import styles from "./ClientTable.module.css";

const ClientTable = ({ clients }) => (
  <>
    <div className="card card-solid">
      <div className="card-body table-responsive p-0">
        <table className="table table-striped table-hover text-nowrap">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Office Phone No.</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className={styles.colname}>
                  {client.isVerified &&
                  !(
                    client.clientsDeleteRequest &&
                    client.clientsDeleteRequest.length > 0
                  ) &&
                  client.clientAddressOption === "Has Address" ? (
                    <ConnectedButtonFavorite
                      floatRight={false}
                      client={client}
                    />
                  ) : null}
                  {!client.isVerified ? (
                    <>
                      <small className="badge badge-warning">
                        Not Yet Verified
                      </small>
                      <br />
                    </>
                  ) : null}
                  {client.name}
                </td>
                <td>
                  {Array.isArray(client.email) && client.email.length > 1 ? (
                    client.email.map((e, index) => (
                      <span key={e}>
                        <a href={`mailto:${e}`}>{e}</a>
                        {index + 1 === client.email.length ? null : "; "}
                      </span>
                    ))
                  ) : (
                    <a href={`mailto:${client.email}`}>{client.email}</a>
                  )}
                </td>
                <td>
                  {client.clientContactDetails.length > 0 ? (
                    <>
                      {client.clientContactDetails[0].address1 ? (
                        <>{client.clientContactDetails[0].address1}, </>
                      ) : null}{" "}
                      {client.clientContactDetails[0].address2 ? (
                        <>{client.clientContactDetails[0].address2}, </>
                      ) : null}{" "}
                      {client.clientContactDetails[0].city ? (
                        <>{client.clientContactDetails[0].city}, </>
                      ) : null}{" "}
                      {client.clientContactDetails[0].state ? (
                        <>{client.clientContactDetails[0].state}, </>
                      ) : null}{" "}
                      {client.clientContactDetails[0].zip ? (
                        <>{client.clientContactDetails[0].zip}</>
                      ) : null}
                    </>
                  ) : null}
                </td>
                <td>
                  <a
                    href={`tel:+${client.clientContactDetails[0].officePhoneNumber}`}
                  >
                    {client.clientContactDetails[0].officePhoneNumber}
                  </a>
                </td>
                <td>
                  {client.assignedLocations != null &&
                  client.assignedLocations.length > 0 ? (
                    <>
                      {client.assignedLocations.map((loc, index) => (
                        <span key={loc}>
                          {loc === "Others" ? client.otherLocation : loc}
                          {index + 1 === client.assignedLocations.length
                            ? null
                            : "; "}
                        </span>
                      ))}
                    </>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);
export default ClientTable;
