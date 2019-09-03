## React Select2 Component

### Demo

https://codesandbox.io/s/new-ruyxe

### Installation

`npm install @joenied/select2 --save`

### How To Use

First import this component where you want to use it

`import { Select2 } from "@joenied/select2";`
`import "@joenied/select2/dist/select.css";`

Then just render it

```
    <Select2 
        selected={e => doThingsWithValue(e)} 
        options={[ 
            { label: "one", value: "one" },
            { label: "two", value: "two" }
        ]}
    />
```

### Props

| _Prop_      |                    _Description_                    | _Default value_ |
| ----------- | :-------------------------------------------------: | :-------------: |
| options     | an array of objects with label and value properties |   empty array   |
| multiSelect |         Allow selecting of multiple options         |      false      |
| selected    |         Get the value and do stuff with it          |      null       |

### Example

```
import React, { Component } from "react";
import { Select2 } from "@joenied/select2";
import "@joenied/select2/dist/select.css";

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
