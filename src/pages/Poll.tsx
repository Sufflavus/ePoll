import * as React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { PollState } from '../reducers/state';
import { EntityStatus } from '../models';
import { addPollVote, loadPoll } from '../actions';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import { 
    Alert, Box, Button, Collapse, IconButton, FormControl, FormControlLabel, Paper, 
    Radio, RadioGroup, Typography
} from '@mui/material';
import { PollVotes } from '../components';

const Poll = () => {
    const dispatch = useDispatch();

    const id = useParams().id;
    const pollId = id ? +id : 0;
    const polls = useSelector(state => ((state as any).polls as PollState)).entities;
    const poll = polls.find(p => p.id === pollId);

    const [selectedPollOptionId, setSelectedPollOptionId] = React.useState(0);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [votesVisible, setVotesVisible] = React.useState(false);

    useEffect(() => {
        if(!poll || poll.userData.status === EntityStatus.Init) {
            loadPoll(pollId, dispatch);
        }
    }, [poll]);

    const onPollOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value as string;
        setSelectedPollOptionId(+value);
    };

    const onVoteClick = () => {
        addPollVote(pollId, selectedPollOptionId, dispatch);
        setAlertOpen(true);
    };

    const onShowVotesClick = () => {
        setVotesVisible(true);
    };

    const renderNotFoundPoll = () => {
        return (
            <Box
                sx={{ 
                    width: '70%', 
                    my: 5,
                    mx: 'auto' 
                }}
            >
                <Paper
                    style={{ minHeight: '150px' }}
                    sx={{
                        mt: 1,
                        p: 2
                    }}
                >
                    Poll not found
                </Paper>
            </Box>
        );
    };

    if(!poll) {
        return renderNotFoundPoll();
    }

    return (
        <Box
            sx={{ 
                width: '70%', 
                my: 5,
                mx: 'auto' 
            }}
        >
            <Box>
            <Button 
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
            >
                Go back to polls
            </Button>
            </Box>
            <Paper
                sx={{
                    mt: 1,
                    p: 2
                }}
            >
                <Typography gutterBottom variant='h6' fontWeight={600}>
                    {poll.title}
                </Typography>
                <FormControl>
                    <RadioGroup onChange={onPollOptionChange}>
                        {
                            poll.options.map(option => 
                                <FormControlLabel
                                    key={option.id}
                                    value={option.id}
                                    control={<Radio />}
                                    label={option.title}
                                />)
                        }
                    </RadioGroup>
                </FormControl>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 3
                    }}
                >
                    <Button 
                        onClick={onShowVotesClick}
                        sx={{
                            mr: 2
                        }}
                    >
                        Show votes
                    </Button>
                    <Button 
                        disabled={!selectedPollOptionId}
                        onClick={onVoteClick}
                        variant="contained"
                    >
                        Vote
                    </Button>
                </Box>
            </Paper>
            <Collapse in={alertOpen}>
                <Alert
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ my: 2 }}
                >
                    Your vote has been saved
                </Alert>
            </Collapse>

            {
                votesVisible ? 
                <Paper
                    sx={{
                        mt: 2,
                        p: 2
                    }}
                >
                    <PollVotes pollId={pollId} />
                </Paper> : 
                null
            }


        </Box>
      );
};

export default Poll;