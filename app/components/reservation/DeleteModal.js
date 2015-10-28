import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';

import TimeRange from 'components/common/TimeRange';
import { getName } from 'utils/DataUtils';

class DeleteModal extends Component {
  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.renderReservation = this.renderReservation.bind(this);
  }

  handleConfirm() {
    this.props.onConfirm();
    this.props.onClose();
  }

  renderReservation(reservation) {
    const resource = this.props.resources[reservation.resource] || {};

    return (
      <li key={reservation.begin}>
        {getName(resource)}
        {': '}
        <TimeRange begin={reservation.begin} end={reservation.end} />
      </li>
    );
  }

  render() {
    const {
      isDeleting,
      onClose,
      reservationsToDelete,
      show,
    } = this.props;

    return (
      <Modal
        onHide={onClose}
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title>Poistamisen varmistus</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Oletko varma että haluat poistaa seuraavat varaukset?</p>
          <ul>
            {_.map(reservationsToDelete, this.renderReservation)}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button
            bsStyle="default"
            onClick={onClose}
          >
            Peruuta
          </Button>
          <Button
            bsStyle="danger"
            disabled={isDeleting}
            onClick={this.handleConfirm}
          >
            {isDeleting ? 'Poistetaan...' : 'Poista'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

DeleteModal.propTypes = {
  isDeleting: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  reservationsToDelete: PropTypes.array.isRequired,
  resources: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
};

export default DeleteModal;