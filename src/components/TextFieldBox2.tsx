import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

export default function TextFieldBox2() {

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

            <FormControl fullWidth sx={{ m: 1 }} >
                <OutlinedInput
                    style={{ height: '40px' }}
                />
            </FormControl>
        </Box>
    );
}
