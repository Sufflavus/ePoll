import { useSelector } from 'react-redux';
import { PollState } from '../reducers/state';
import { Box } from '@mui/material';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

type Props = { 
    pollId: number;
};

interface ChartPoint {
    id: number;
    name: string;
    value: number;
}

// https://learnui.design/tools/data-color-picker.html#palette
const PALETTE = ['#003f5c', '#444e86', '#955196', "#dd5182", '#ff6e54', '#ffa600'];

const PollVotes = (props: Props) => {
    const { pollId } = props;

    const polls = useSelector(state => ((state as any).polls as PollState)).entities;
    const poll = polls.find(p => p.id === pollId);

    if(!poll) {
        return <Box>Poll not found</Box>;
    }

    const hasVotes = poll.options.some(option => option.votes > 0);

    if(!hasVotes) {
        return "There are no any votes yet";
    }

    const chartPoints: ChartPoint[] = poll.options.map(option => ({
        id: option.id, 
        name: option.title, 
        value: option.votes
    }));

    const renderPointLabel = (point: ChartPoint) => {
        return `${point.value}`;
    };

    return (
        <PieChart width={500} height={300}>
            <text x={150} y={20} textAnchor={"middle"}>
                {poll.title}
            </text>
            <Pie 
                isAnimationActive={false} 
                dataKey="value"
                nameKey="name"
                data={chartPoints} 
                cx={150} 
                cy={160} 
                outerRadius={80} 
                startAngle={90} 
                endAngle={-270}
                label={renderPointLabel} 
            >
            {
                chartPoints.map((point, index) => 
                    <Cell key={point.id} fill={PALETTE[index % PALETTE.length]}/>
                )
            }
            </Pie>
            <Tooltip/>
            <Legend 
                layout="vertical"
                verticalAlign="middle"
                align="right"
            />
       </PieChart>
    );
}

export default PollVotes;