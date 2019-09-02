import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  createRef
} from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const [selectedValue, setSelectedValue] = useState("two");
  return (
    <div className="App">
      <h1>Select 2</h1>
      <h3>{selectedValue}</h3>
      <Select2
        handleChange={value => {
          setSelectedValue(value);
        }}
        value={selectedValue}
        options={[
          { label: "one", value: "one", optgroup: "numbers" },
          { label: "two", value: "two", optgroup: "numbers" },
          { label: "three", value: "three", optgroup: "numbers" },
          { label: "A", value: "A", optgroup: "letters" },
          { label: "B", value: "B", optgroup: "letters" },
          { label: "C", value: "C", optgroup: "letters" }
        ]}
      />
      <BetterSelect
        options={[
          { label: "one", value: "one", optgroup: "numbers" },
          { label: "two", value: "two", optgroup: "numbers" },
          { label: "three", value: "three", optgroup: "numbers" },
          { label: "A", value: "A", optgroup: "letters" },
          { label: "B", value: "B", optgroup: "letters" },
          { label: "C", value: "C", optgroup: "letters" }
        ]}
      />
    </div>
  );
}

export const Select2 = props => {
  const { options, name, value, handleChange } = props;
  // const [selectedValue, setSelectedValue] = useState(null);

  return (
    <select
      name={name}
      value={value}
      onChange={val => handleChange(val.target.value)}
    >
      {options &&
        options.map(option => {
          return <option value={option.value}>{option.label}</option>;
        })}
    </select>
  );
};

export const Menu = props => {
  // const [dropdownOpen, toggleDropdownOpen] = useState(true);
  return (
    <ul
      className={`value-list ${!props.dropdownOpen ? "none" : ""}`}
      onClick={props.handleClick}
    >
      <li key="1"> Alabama</li>
      <li key="2">Alaska</li>
    </ul>
  );
};

export class BetterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.inputEl = React.createRef();
  }
  state = {
    isOpen: false,
    options: this.props.options
  };
  render() {
    return (
      <form>
        <input
          className="chosen-value"
          type="text"
          placeholder="Select..."
          ref={this.inputEl}
          onFocus={() => this.setState({ isOpen: true })}
        />
        <ul
          className={`value-list ${!this.state.isOpen ? "none" : ""}`}
          onClick={e => {
            this.inputEl.current.value = e.target.innerText;
            this.setState({ isOpen: false });
          }}
        >
          <li onClick={e => e.stopPropagation()}>
            <input
              className="chosen-value"
              type="text"
              placeholder="Filter..."
              onChange={e => {
                console.log(e.target.value);
                if (e.target.value === "")
                  this.setState({ options: this.props.options });
                else
                  this.setState({
                    options: this.props.options.filter(option =>
                      option.value
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  });
              }}
            />
          </li>
          {this.state.options &&
            this.state.options.map(option => {
              const isSelected =
                this.inputEl.current &&
                option.value === this.inputEl.current.value
                  ? "selected"
                  : "";
              return (
                <li className={`${isSelected}`} key={option.value}>
                  {option.label}
                </li>
              );
            })}
        </ul>
      </form>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
