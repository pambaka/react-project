import { Component } from 'react';
import './search-section.css';
import Button from '../button/button';

class SearchSection extends Component {
  render() {
    return (
      <>
        <section className="search-section">
          <input className="search-input" type="text" />
          <Button buttonText={'Search'} callback={() => console.log('click')} />
        </section>
      </>
    );
  }
}

export default SearchSection;
