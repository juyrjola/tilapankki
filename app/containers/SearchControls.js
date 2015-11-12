import React, { Component, PropTypes } from 'react';
import { Button, Panel } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushState } from 'redux-router';

import { fetchPurposes } from 'actions/purposeActions';
import { getTypeaheadSuggestions, searchResources } from 'actions/searchActions';
import DateHeader from 'components/common/DateHeader';
import SearchFilters from 'components/search/SearchFilters';
import SearchInput from 'components/search/SearchInput';
import searchControlsSelector from 'selectors/containers/searchControlsSelector';
import { getFetchParamsFromFilters } from 'utils/SearchUtils';

export class UnconnectedSearchControls extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.filters;
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.onFiltersChange = this.onFiltersChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchPurposes();
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState(nextProps.filters);
  // }

  onFiltersChange(newFilters) {
    this.setState(newFilters);
  }

  handleSearch(newFilters) {
    const { actions } = this.props;
    let filters;
    if (newFilters) {
      filters = Object.assign({}, this.state, newFilters);
    } else {
      filters = this.state;
    }
    const fetchParams = getFetchParamsFromFilters(filters);

    actions.pushState(null, '/search', filters);
    actions.searchResources(fetchParams);
  }

  handleSearchInputChange(value) {
    // this.setState({ search: value });
    this.onFiltersChange({ search: value });
    this.props.actions.getTypeaheadSuggestions({ full: true, input: value });
  }

  render() {
    const {
      actions,
      filters,
      isFetchingPurposes,
      purposeOptions,
      typeaheadOptions,
    } = this.props;

    return (
      <div>
        <SearchInput
          autoFocus={!Boolean(filters.purpose)}
          onChange={(value) => this.handleSearchInputChange(value)}
          onSubmit={this.handleSearch}
          pushState={actions.pushState}
          typeaheadOptions={typeaheadOptions}
          value={this.state.search}
        />
        <Panel
          collapsible
          defaultExpanded={Boolean(filters.purpose)}
          header="Tarkennettu haku"
        >
          <SearchFilters
            isFetchingPurposes={isFetchingPurposes}
            onFiltersChange={this.onFiltersChange}
            purposeOptions={purposeOptions}
            filters={this.state}
          />
        </Panel>
        <Button
          block
          bsStyle="primary"
          className="search-button"
          onClick={() => this.handleSearch()}
          type="submit"
        >
          Hae
        </Button>
        <DatePicker
          date={this.state.date}
          hideFooter
          gotoSelectedText="Mene valittuun"
          onChange={(newDate) => this.handleSearch({ date: newDate })}
          todayText="Tänään"
        />
        <DateHeader
          date={this.state.date}
          onChange={(newDate) => this.handleSearch({ date: newDate })}
        />
      </div>
    );
  }
}

UnconnectedSearchControls.propTypes = {
  actions: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  isFetchingPurposes: PropTypes.bool.isRequired,
  purposeOptions: PropTypes.array.isRequired,
  typeaheadOptions: PropTypes.array.isRequired,
};

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    fetchPurposes,
    getTypeaheadSuggestions,
    pushState,
    searchResources,
  };

  return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default connect(searchControlsSelector, mapDispatchToProps)(UnconnectedSearchControls);
