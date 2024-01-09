import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPolls } from '../actions';
import { EntityStatus, Poll } from '../models';
import { PollState } from '../reducers/state';
import { blue } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { PollAddDialog } from '../components';

const StyledList = styled(List)({
    // hover states
    '& .MuiListItemButton-root:hover': {
      backgroundColor: blue[50]
    },
});

const PollList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const polls = useSelector(state => ((state as any).polls as PollState)).entities;
    const pollsStatus = useSelector(state => ((state as any).polls as PollState)).status;

    const [addPollDialogOpen, setAddPollDialogOpen] = React.useState(false);

    useEffect(() => {
        if(pollsStatus === EntityStatus.Init) {
            loadAllPolls(dispatch);
        }
    }, [pollsStatus]);

    const onAddPollButtonClick = () => {
        setAddPollDialogOpen(true);
    };

    const onAddPollDialogClose = () => {
        setAddPollDialogOpen(false);
    };

    const onPollClick = (id: number) => {
        navigate(`/poll/${id}`);
    };

    const renderPoll = (poll: Poll) => {
        return (
            <ListItemButton
                key={poll.id}
                sx={{
                    border: 1,
                    borderColor: 'rgba(25, 118, 210, 0.5)',
                    borderRadius: 1,
                    mb: 1
                }}
                onClick={() => onPollClick(poll.id)}
            >
                <ListItemText primary={poll.title} />
            </ListItemButton>
        );
    };

    return (
        <Box
            sx={{ 
                width: '70%', 
                my: 5,
                mx: 'auto' 
            }}
        >
            <Box
                sx={{ mt: 3 }}
            >
                <Button variant="contained" startIcon={<AddIcon />} onClick={onAddPollButtonClick}>
                    Add new poll
                </Button>
            </Box>
            <Paper
                style={{ minHeight: '150px' }}
                sx={{
                    mt: 1,
                    p: 2
                }}
            >
                {
                    polls.length > 0 ?
                        <StyledList>
                            {polls.map(renderPoll)}
                        </StyledList>: 
                        'Add a poll using "+" button.'
                }
            </Paper>
            <PollAddDialog open={addPollDialogOpen} onClose={onAddPollDialogClose} />
        </Box>
    );
};

export default PollList;