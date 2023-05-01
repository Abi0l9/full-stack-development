import { useMutation } from "@apollo/client";
import React from "react";
import { EDIT_AUTHOR } from "../queries";
import { Box, Button, TextField, Select, MenuItem } from "@mui/material";

function EditAuthor({ authors }) {
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const [name, setName] = React.useState("");
  const [born, setBorn] = React.useState("");

  const handleChange = (e) => {
    e.target.name === "name"
      ? setName(e.target.value)
      : setBorn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    editAuthor({
      variables: { name, setBornTo: Number(born) },
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>EditAuthor</h3>
      <form onSubmit={handleSubmit}>
        <Box>
          <Select
            variant="standard"
            label="name"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
          >
            {authors.map((author) => (
              <MenuItem key={author.name} value={author.name}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <TextField
            variant="standard"
            label="born"
            name="born"
            id="born"
            value={born}
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="success" type="submit">
            save
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default EditAuthor;
