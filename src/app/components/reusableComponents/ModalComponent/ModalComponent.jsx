import React from "react";
import PropTypes from "prop-types";
import styles from "./ModalComponent.module.css";

const ModalComponent = ({ isOpen, toggleShowModal }) => (
  <div className={styles.ModalComponent}>ModalComponent Component</div>
);

ModalComponent.propTypes = {};

ModalComponent.defaultProps = {};

export default ModalComponent;
