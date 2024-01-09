import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import PollList from './pages/PollList';
import Poll from './pages/Poll';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<PollList />} />
                    <Route path="poll/:id" element={<Poll />} />
                    <Route path="404" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
