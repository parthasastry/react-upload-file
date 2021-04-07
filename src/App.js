import React, { useState } from "react";
import { Form, Table, Container } from "react-bootstrap";

const App = () => {
  const [files, setFiles] = useState("");

  const createObject = (data) => {
    const lines = data.split("\n");
    const headers = lines[0].split(",");

    const result = [];
    for (let i = 1; i < lines.length; i++) {
      let obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }

    return result;
  };

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setFiles(e.target.result);
    };
  };

  const data = createObject(files);
  let headers = data.length > 0 ? Object.keys(data[0]) : [];

  const tableHeader = (
    <thead>
      <tr>
        {headers.map((h) => (
          <th key={h}>{h}</th>
        ))}
      </tr>
    </thead>
  );

  const tableData = data.map((d, i) => {
    return (
      <tr key={i}>
        {headers.map((h) => (
          <td key={d[h]}>{d[h]}</td>
        ))}
      </tr>
    );
  });

  const T = (
    <Table striped bordered hover>
      {tableHeader}
      <tbody>{tableData}</tbody>
    </Table>
  );

  return (
    <Container>
      <h1>Example File Upload</h1>

      <Form>
        <Form.File
          id="custom-file"
          label="Custom file input"
          custom
          onChange={handleChange}
        />
      </Form>
      <hr />
      <h3>Data uploaded</h3>
      {T}
    </Container>
  );
};

export default App;
