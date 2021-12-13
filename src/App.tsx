import { AppBar, IconButton, Toolbar, Typography, Container } from '@material-ui/core';
import { redirectToPage, Page } from './Page';
import About from './About';
import Names from './Names';
import Genders from './Genders';
import Sources from './Sources';

function Bar(props: { changePage: (page: Page) => void }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" style={{ flexGrow: 1 }}>
                    Identity Forms
                </Typography>
                <IconButton color="inherit" onClick={() => props.changePage('about')}>About</IconButton>
                <IconButton color="inherit" onClick={() => props.changePage('names')}>Names</IconButton>
                <IconButton color="inherit" onClick={() => props.changePage('genders')}>Genders</IconButton>
                <IconButton color="inherit" onClick={() => props.changePage('sources')}>Sources</IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default function App(props: { page: Page | undefined; }) {
    const changePage: (state: Page) => void = (newPage) => redirectToPage(newPage);

    const page = props.page ?? 'about';

    const currentPage = {
        'about': About,
        'names': Names,
        'genders': Genders,
        'sources': Sources,
    }[page]({ changePage });

    return (
        <>
            <Bar changePage={changePage} />
            <Container maxWidth="md">
                {currentPage}
            </Container>
        </>
    );
}