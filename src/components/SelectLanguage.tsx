import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectSmall() {
  const [language, setLanguage] = React.useState("EN");

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Language</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={language}
        label="language"
        onChange={handleChange}
      >
        <MenuItem value={'EN'} >EN</MenuItem>
        <MenuItem value={'FR'}>FR</MenuItem>
      </Select>
    </FormControl>
  );
}
