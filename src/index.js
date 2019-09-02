import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Select2 } from "./select";

import "./select.css";
import "./demo.css";

function App() {
  const [singleValue, setSingleValue] = useState("two");
  const [multiValue, setMultiValue] = useState("two");
  return (
    <div className="App">
      <h1>Select 2</h1>
      <h3>single select value: {singleValue}</h3>
      <h3>multi select value: {multiValue}</h3>
      <div style={{ width: "400px", margin: "0 auto" }}>
        <hr />
        <h4>Single Select Demo</h4>
        <Select2
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
        <hr />
        <h4>Multi Select Demo</h4>
        <Select2
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
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
