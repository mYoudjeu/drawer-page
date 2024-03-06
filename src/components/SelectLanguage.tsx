import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

export default function SelectSmall() {
  //const [language, setLanguage] = React.useState("EN");
  const { i18n } = useTranslation();
  const { t } = useTranslation()

  const handleChange = (event: SelectChangeEvent) => {
    // setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{t('header.language')}</InputLabel>
      <Select
        className="select"
        size="small"
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={i18n.language}
        label="language"
        sx={{ height: '35px' }}
        onChange={handleChange}
      >
        <MenuItem value={'en'} >EN</MenuItem>
        <MenuItem value={'fr'}>FR</MenuItem>
      </Select>
    </FormControl>
  );
}
