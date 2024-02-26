import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField"


export default function TextFieldBox() {

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

            <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                    size='small'
                //endAdornment={<InputAdornment position="end">XAF</InputAdornment>}
                // style={{ width: '450px' }}
                //helperText="Ce champs est important"
                />
            </FormControl>
        </Box>
    );
}
