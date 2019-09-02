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
  const [singleValue, setSingleValue] = useState("two");
  const [multiValue, setMultiValue] = useState("two");
  return (
    <div className="App">
      <h1>Select 2</h1>
      <h3>{singleValue}</h3>
      <h3>{multiValue}</h3>
      <BetterSelect
        selected={e => setSingleValue(e)}
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
        selected={e => setMultiValue(e)}
        multiSelect={true}
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
      <div class="better-select">
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
            const selectedValue = e.target.innerText;
            const selectionIntoArray = this.inputEl.current.value.split(", ");
            const isAlreadySelected = selectionIntoArray.findIndex(
              item => item === e.target.innerText
            );
            if (
              this.inputEl.current.value === "" ||
              (!this.props.multiSelect &&
                this.inputEl.current.value !== e.target.innerText)
            )
              this.inputEl.current.value = e.target.innerText;
            else if (
              !this.props.multiSelect &&
              this.inputEl.current.value === e.target.innerText
            )
              this.inputEl.current.value = "";
            else if (isAlreadySelected < 0)
              this.inputEl.current.value =
                this.inputEl.current.value + ", " + e.target.innerText;
            else
              this.inputEl.current.value = [
                ...selectionIntoArray.slice(0, isAlreadySelected),
                ...selectionIntoArray.slice(isAlreadySelected + 1)
              ].join(", ");
            this.props.selected(this.inputEl.current.value);
            this.setState({ isOpen: false });
          }}
        >
          <li onClick={e => e.stopPropagation()}>
            <input
              className="chosen-value"
              type="text"
              placeholder="Filter..."
              onChange={e => {
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
                (this.inputEl.current &&
                  option.value === this.inputEl.current.value) ||
                (this.inputEl.current &&
                  this.inputEl.current.value
                    .split(", ")
                    .find(item => item === option.value))
                  ? "selected"
                  : "";
              return (
                <li className={`${isSelected}`} key={option.value}>
                  {option.label}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
