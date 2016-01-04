import map from 'lodash/collection/map';
import filter from 'lodash/collection/filter';
import includes from 'lodash/collection/includes';
import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Loader from 'react-loader';
import moment from 'moment';

import TimeSlot from 'components/reservation/TimeSlot';

function filterSlot(slot) {
  if (moment(slot.end) < moment()) return false;
  else if (slot.reserved) return false;
  else return true;
}

class TimeSlots extends Component {
  constructor(props) {
    super(props);
    this.renderTimeSlot = this.renderTimeSlot.bind(this);
  }

  renderTimeSlot(slot) {
    const {
      addNotification,
      isEditing,
      onClick,
      openReservationDeleteModal,
      updatePath,
      resource,
      selected,
      selectReservationToDelete,
      selectReservationToEdit,
      time,
    } = this.props;
    const scrollTo = time && time === slot.start;

    return (
      <TimeSlot
        addNotification={addNotification}
        isEditing={isEditing}
        key={slot.start}
        onClick={onClick}
        openReservationDeleteModal={openReservationDeleteModal}
        updatePath={updatePath}
        resource={resource}
        scrollTo={scrollTo}
        selected={includes(selected, slot.asISOString)}
        selectReservationToEdit={selectReservationToEdit}
        selectReservationToDelete={selectReservationToDelete}
        slot={slot}
      />
    );
  }

  render() {
    const {
      resource,
      isFetching,
      slots,
    } = this.props;

    let filtered_slots;
    if (this.context.red) {
      filtered_slots = filter(slots, filterSlot);
    } else {
      filtered_slots = slots;
    }

    const isAdmin = resource.userPermissions.isAdmin;

    return (
      <Loader loaded={!isFetching}>
        {slots.length ? (
          <Table
            className="time-slots lined"
            hover
          >
            <thead>
              <tr>
                <th />
                <th>Aika</th>
                <th>Varaustilanne</th>
                {isAdmin && <th>Varaaja</th>}
                {isAdmin && <th>Kommentit</th>}
                {isAdmin && <th>Toiminnot</th>}
              </tr>
            </thead>
            <tbody>
              {map(filtered_slots, this.renderTimeSlot)}
            </tbody>
          </Table>
        ) : (
          <p>Tila ei ole varattavissa tänä päivänä.</p>
        )}
      </Loader>
    );
  }
}

TimeSlots.contextTypes = {
  store: PropTypes.object,
  red: PropTypes.object
};

TimeSlots.propTypes = {
  addNotification: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  openReservationDeleteModal: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
  selectReservationToDelete: PropTypes.func.isRequired,
  selectReservationToEdit: PropTypes.func.isRequired,
  slots: PropTypes.array.isRequired,
  time: PropTypes.string,
};

export default TimeSlots;
