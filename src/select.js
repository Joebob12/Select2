import React, { useState } from "react";
import ReactDOM from "react-dom";

export class Select2 extends React.Component {
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
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
        />
        <ul
          className={`value-list ${!this.state.isOpen ? "none" : ""}`}
          onClick={e => {
            const selectedValue = e.target.getAttribute("data-value");
            const selectionIntoArray = this.inputEl.current.value.split(", ");
            const isAlreadySelected = selectionIntoArray.findIndex(
              item => item === selectedValue
            );
            if (
              this.inputEl.current.value === "" ||
              (!this.props.multiSelect &&
                this.inputEl.current.value !== selectedValue)
            )
              this.inputEl.current.value = selectedValue;
            else if (
              !this.props.multiSelect &&
              this.inputEl.current.value === selectedValue
            )
              this.inputEl.current.value = "";
            else if (isAlreadySelected < 0)
              this.inputEl.current.value =
                this.inputEl.current.value + ", " + selectedValue;
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
                <li
                  className={`${isSelected}`}
                  key={option.value}
                  data-value={option.value}
                >
                  {option.label}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
