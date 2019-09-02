## React Select2 Component

### Demo

https://codesandbox.io/s/new-fdlc2

### Installation

`import { Select2 } from "@joebob12/select2"`

### How To Use

First import this component where you want to use it

`import { Select2 } from "@joebob12/select2"`

Then just render it

`<Select2 selected={e => doThingsWithValue(e)} options={[ { label: "one", value: "one" }, { label: "two", value: "two" }]} />`

### Props

| _Prop_      |                    _Description_                    | _Default value_ |
| ----------- | :-------------------------------------------------: | :-------------: |
| options     | an array of objects with label and value properties |   empty array   |
| multiSelect |         Allow selecting of multiple options         |      false      |
| selected    |         Get the value and do stuff with it          |      null       |

### Example

```
import React, { Component } from "react";
import { Select2 } from "@joebob12/select2";

class App extends Component {
  render() {
    return (
        <Select2
          selected={e => doThingsWithValue(e)}
          options={[
            { label: "one", value: "one", optgroup: "numbers" },
            { label: "two", value: "two", optgroup: "numbers" },
            { label: "three", value: "three", optgroup: "numbers" },
            { label: "A", value: "A", optgroup: "letters" },
            { label: "B", value: "B", optgroup: "letters" },
            { label: "C", value: "C", optgroup: "letters" }
          ]}
        />
    );
  }
}

export default App;
```
