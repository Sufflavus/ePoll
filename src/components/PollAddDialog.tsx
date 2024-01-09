import * as React from 'react';
import { useDispatch } from 'react-redux';
import { addPoll } from '../actions';
import { DefaultPoll, DefaultPollOption, PollOption } from '../models';
import AddIcon from '@mui/icons-material/Add';
import { 
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    Typography
} from '@mui/material';

type Props = { 
    open: boolean;
    onClose?: () => void;
} & typeof defaultProps;

const defaultProps = {
    open: false
};

const PollAddDialog = (props: Props) => {
    const dispatch = useDispatch();
    const { open } = props;

    const [pollTitle, setPollTitle] = React.useState('');

    const [options, setOptions] = React.useState([{
        ...DefaultPollOption,
        id: 1
    }] as PollOption[]);

    const isValid = pollTitle.length > 0 && options.some(option => option.title.length > 0);

    const onPollTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPollTitle(event.target.value);
    };

    const onAddOptionClick = () => {
        const newId = options.length > 0 ?
            Math.max(...options.map(o => o.id)) + 1 :
            1;

        const newOption: PollOption = {
            ...DefaultPollOption,
            id: newId
        };

        setOptions([...options, newOption]);
    };

    const onOptionTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, optionId: number) => {
        const newOptions = options
            .map(option => 
                option.id === optionId ? {
                    ...option, 
                    title: event.target.value
                } : option);

        setOptions(newOptions);
    };

    const onDialogClose = () => {
        setPollTitle('');
        setOptions([]);

        if(props.onClose) {
            props.onClose();
        }
    };

    const onDialogSubmit = () => {
        const poll = {
            ...DefaultPoll,
            title: pollTitle,
            options: options.filter(option => option.title !== '')
        };

        addPoll(poll, dispatch);
        onDialogClose();
    };

    return (
        <Dialog open={open} onClose={onDialogClose} >
            <DialogTitle
                sx={{ 
                    width: '400px'
                }}
            >
                Add poll with options
            </DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Poll title"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputProps={{ maxLength: 1000 }}
                    value={pollTitle}
                    onChange={onPollTitleChange}
                />

                <Typography gutterBottom sx={{ mt: 3 }} variant='h6' fontWeight={600}>
                    Options
                </Typography>
                {
                    options.map(option => 
                        <Box
                            key={option.id}
                            sx={{
                                mb: 1
                            }}
                        >
                            <TextField
                                margin="dense"
                                label="Option text"
                                type="text"
                                fullWidth
                                variant="standard"
                                inputProps={{ maxLength: 1000 }}
                                value={option.title}
                                onChange={(e) => onOptionTitleChange(e, option.id)}
                            />
                        </Box>
                    )
                }

                <Button 
                    size="small" 
                    startIcon={<AddIcon />} 
                    onClick={onAddOptionClick}
                >
                    Add new option
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDialogClose}>Cancel</Button>
                <Button variant="contained" disabled={!isValid} onClick={onDialogSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

PollAddDialog.defaultProps = defaultProps;

export default PollAddDialog;
