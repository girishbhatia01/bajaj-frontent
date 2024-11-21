import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    { value: "highest_lowercase_alphabet", label: "Highest Lowercase Alphabet" },
  ];

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post("https://backend-bajaj-final-1.onrender.com/bfhl", parsedInput);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or server error.");
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = selectedOptions.reduce((acc, option) => {
      acc[option.value] = response[option.value];
      return acc;
    }, {});

    return <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ABCD123</h1>
      <textarea
        rows="10"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON like: { "data": ["A", "1"] }'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      {response && (
        <div>
          <Select
            options={options}
            isMulti
            onChange={(selected) => setSelectedOptions(selected)}
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
