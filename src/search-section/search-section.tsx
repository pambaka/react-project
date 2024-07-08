import './search-section.css';
import { Component, ReactNode, createRef } from 'react';
import Button from '../button/button';
import { SEARCH_VALUE } from '../consts';

class SearchSection extends Component<{ fetchData: (value: string | undefined) => Promise<void> }> {
  inputRef = createRef<HTMLInputElement>();

  handleClick = async () => {
    const value: string | undefined = this.inputRef.current?.value;

    if (value) {
      localStorage.setItem(SEARCH_VALUE, value);
    } else {
      localStorage.removeItem(SEARCH_VALUE);
    }

    await this.props.fetchData(value);
  };

  componentDidMount(): void {
    const searchValue: string | null = localStorage.getItem(SEARCH_VALUE);
    if (searchValue && this.inputRef.current) this.inputRef.current.value = searchValue;
  }

  render(): ReactNode {
    return (
      <>
        <section className="search-section">
          <input className="search-input" type="text" ref={this.inputRef} />
          <Button
            buttonText={'Search'}
            callback={() => {
              this.handleClick().catch(() => {});
            }}
          />
        </section>
      </>
    );
  }
}

export default SearchSection;
