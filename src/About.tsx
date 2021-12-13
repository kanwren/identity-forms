import { Link } from '@material-ui/core';
import { Page } from './Page';

export default function About(props: { changePage: (state: Page) => void }) {
    return (
        <>
            <h2 className="page-header">Background</h2>

            <p className="page-text">With the proliferation of the Internet and online services, we can reach more people than ever before. From government services to social media, we not only collect more data on our customers, users, and citizens than ever before, but many services find themselves tasked with the challenge of collecting data from an increasingly diverse and international userbase.</p>

            <p className="page-text">In this environment, our normal assumptions about personal information break down; if we expect a user to always have, for example, a single immutable first and last name or a binary gender, we will end up unintentionally excluding many potential users. The simple design of a form or a database could act as a gate blocking people from important information and services.</p>

            <p className="page-text">As programmers, developers, and designers, this means we have to challenge our usual assumptions, and be conscious of the intersectional impacts of our designs and decisions.</p>

            <h2 className="page-header">Navigation</h2>

            <p className="page-text">This website addresses the collection of two critical types of user data: names and genders. To get started, navigate to the <Link onClick={() => props.changePage('names')}>Names</Link> or <Link onClick={() => props.changePage('genders')}>Genders</Link> page in the bar above.</p>

            <p className="page-text"><b>NOTE</b>: the forms in each page are for demonstration only, and do not collect any information. At times, minimal validation is run over the contents for demonstrative purposes, but this is done locally; no service ever receives this information.</p>

            <h2 className="page-header">Reading</h2>

            <p className="page-text">This project was originally inspired by the excellent paper <Link href="https://dl.acm.org/doi/10.1145/3411764.3445742">Revisiting Gendered Web Forms: An Evaluation of Gender Inputs with (Non-)Binary People</Link>, as well as the <Link href="https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/">Falsehoods Programmers Believe About Names</Link> blog post.</p>

            <p className="page-text">For a complete list of sources, and for further reading on best practices around collecting and inputting user data, see the <Link onClick={() => props.changePage('sources')}>Sources page</Link>.</p>
        </>
    );
}