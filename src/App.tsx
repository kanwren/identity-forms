import { AppBar, IconButton, Toolbar, Typography, Container } from '@material-ui/core';
import About from './About';
import Names from './Names';
import Genders from './Genders';
import Sources from './Sources';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';

function Bar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" style={{ flexGrow: 1 }}>
                    Identity Forms
                </Typography>
                <IconButton color="inherit" component={Link} to="/about">About</IconButton>
                <IconButton color="inherit" component={Link} to="/names">Names</IconButton>
                <IconButton color="inherit" component={Link} to="/genders">Genders</IconButton>
                <IconButton color="inherit" component={Link} to="/sources">Sources</IconButton>
            </Toolbar>
        </AppBar>
    );
}

function Page(props: { children: JSX.Element }) {
    return (
        <>
            <Bar />
            <Container maxWidth="md">
                {props.children}
            </Container>
        </>
    );
}

export default function App() {
    const url = `${process.env.PUBLIC_URL}`;
    return (
        <>
            <BrowserRouter basename={url}>
                <Routes>
                    <Route path="/" element={<Navigate to="/about"/>} />
                    <Route path="/about" element={<Page><About/></Page>} />
                    <Route path="/names" element={<Page><Names/></Page>} />
                    <Route path="/genders" element={<Page><Genders/></Page>} />
                    <Route path="/sources" element={<Page><Sources/></Page>} />
                    <Route path="*" element={<Navigate to="/about"/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}