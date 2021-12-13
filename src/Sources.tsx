import { Link } from '@material-ui/core';

export default function Sources() {
    return (
        <>
            <h2 className="page-header">Sources and Further Reading</h2>

            <h3 className="page-header">Gender</h3>
            <ul className="page-text">
                <li><Link href="https://dl.acm.org/doi/10.1145/3411764.3445742">Revisiting Gendered Web Forms: An Evaluation of Gender Inputs with (Non-)Binary People</Link> &mdash; TODO</li>
                <li><Link href="https://dl.acm.org/doi/10.1145/3461778.3462033">”Why are they all obsessed with Gender?” &mdash; (Non)binary Navigations through Technological Infrastructures</Link> &mdash; TODO</li>
                <li><Link href="https://journals.sagepub.com/doi/10.1177/2056305116672486">Baking Gender Into Social Media Design: How Platforms Shape Categories for Users and Advertisers</Link> &mdash; TODO</li>
                <li><Link href="https://learning.oreilly.com/library/view/designing-ux-forms/9781457199912/">Designing UX: Forms</Link> &mdash; not publicly available, but free with an institution account. TODO</li>
            </ul>

            <h3 className="page-header">Names</h3>
            <ul className="page-text">
                <li><Link href="https://shinesolutions.com/2018/01/08/falsehoods-programmers-believe-about-names-with-examples/">Falsehoods Programmers Believe About Names - With Examples</Link> &mdash; A version of the famous <Link href="https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/">Falsehoods Programmers Believe About Names</Link>, a blog post listing common misconceptions about the types of names one might encounter. This version has been annotated with explanations and examples demonstrating why each assumption does not hold.</li>
                <li><Link href="https://www.w3.org/International/questions/qa-personal-names">Personal names around the world</Link> &mdash; an article from the W3C discussing how names differ around the world and giving recommendations on how to best collect them.</li>
                <li><Link href="https://www.bbc.com/future/article/20160325-the-names-that-break-computer-systems">These unlucky people have names that break computers</Link> &mdash; examples of people who have been affected by poor name validation, and some common edge cases to watch out for.</li>
                <li><Link href="https://www.wired.com/2015/11/null/">Hello, I'm Mr. Null. My Name Makes Me Invisible to Computers</Link> &mdash; while not strictly related to false assumptions about names, this demonstrates the importance of being careful about how names are handled in any computer system.</li>
            </ul>
        </>
    );
}