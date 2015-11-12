import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Typeahead } from 'react-typeahead';

import TypeaheadList from 'components/search/TypeaheadList';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleTypeaheadSuggestionSelect = this.handleTypeaheadSuggestionSelect.bind(this);
  }

  handleKeyUp(event) {
    console.log('handle key up');
    const value = event.target.value;
    if (value !== this.state.value) {
      console.log('chaaaneg');
      this.setState({ value });
      this.props.onChange(value);
    }
  }

  handleTypeaheadSuggestionSelect(suggestion) {
    this.props.pushState(null, `/resources/${suggestion.id}`);
  }

  render() {
    const {
      autoFocus,
      onSubmit,
      typeaheadOptions,
      value,
    } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="form-group">
          <Typeahead
            customClasses={{ input: 'form-control' }}
            customListComponent={TypeaheadList}
            displayOption="name"
            filterOption="name"
            inputProps={{ autoFocus }}
            maxVisible={10}
            onKeyUp={_.throttle(this.handleKeyUp, 1050)}
            onOptionSelected={this.handleTypeaheadSuggestionSelect}
            options={typeaheadOptions}
            placeholder="Etsi tilan nimellä"
            value={value}
          />
        </div>
      </form>
    );
  }
}

SearchInput.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pushState: PropTypes.func.isRequired,
  typeaheadOptions: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchInput;
