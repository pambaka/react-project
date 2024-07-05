import './search-section.css';
import { Component, createRef } from 'react';
import Button from '../button/button';
import { SEARCH_VALUE } from '../consts';

class SearchSection extends Component<{ fetchData: (value: string | undefined) => void }> {
  inputRef = createRef<HTMLInputElement>();

  handleClick = () => {
    const value: string | undefined = this.inputRef.current?.value;

    if (value) {
      localStorage.setItem(SEARCH_VALUE, value);
    } else {
      localStorage.removeItem(SEARCH_VALUE);
    }

    this.props.fetchData(value);
  };

  render() {
    return (
      <>
        <section className="search-section">
          <input className="search-input" type="text" ref={this.inputRef} />
          <Button buttonText={'Search'} callback={this.handleClick} />
        </section>
      </>
    );
  }
}

export default SearchSection;
