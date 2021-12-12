import { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography, Container } from '@material-ui/core';
import About from './About';
import Names from './Names';
import Genders from './Genders';
import Sources from './Sources';

type PageState = 'about' | 'names' | 'genders' | 'sources';

function Bar(props: { onChangePage: (state: PageState) => void }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" style={{ flexGrow: 1 }}>
                    Identity Forms
                </Typography>
                <IconButton color="inherit" onClick={() => props.onChangePage('about')}>About</IconButton>
                <IconButton color="inherit" onClick={() => props.onChangePage('names')}>Names</IconButton>
                <IconButton color="inherit" onClick={() => props.onChangePage('genders')}>Genders</IconButton>
                <IconButton color="inherit" onClick={() => props.onChangePage('sources')}>Sources</IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default function App(props: {}) {
    const [pageState, setPageState] = useState<PageState>('genders'); // TODO: change to 'about'

    const currentPage = {
        'about': About,
        'names': Names,
        'genders': Genders,
        'sources': Sources,
    }[pageState]();

    return (
        <>
            <Bar onChangePage={(newPageState) => setPageState(newPageState)} />
            <Container maxWidth="md">
                {currentPage}
            </Container>
        </>
    );
}