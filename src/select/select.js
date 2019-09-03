import React, { useState } from "react";
import ReactDOM from "react-dom";

export class Select2 extends React.Component {
  constructor(props) {
    super(props);
    this.inputEl = React.createRef();
    this.state = {
        isOpen: false,
        options: this.props.options
    };
  }
  selectValue = (e) => {
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
      if (this.props.selected)
          this.props.selected(this.inputEl.current.value);
      this.setState({ isOpen: false });
  }
  render() {
    return (
      <div className="better-select">
        <input
          className="chosen-value"
          type="text"
          placeholder="Select..."
          ref={this.inputEl}
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          onKeyDown={(e) => {
              if (e.key === 'Enter')
                this.setState({isOpen: !this.state.isOpen})
          }}
        />
        <ul
          className={`value-list ${!this.state.isOpen ? "none" : ""}`}
          onKeyDown={e => {
              if (e.key === 'Enter') {
                  this.selectValue(e)
              } else if (e.keyCode === 27)
                  this.setState({ isOpen: false });
          }}
          onClick={e => {
              this.selectValue(e)
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
                  tabIndex={0}
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
