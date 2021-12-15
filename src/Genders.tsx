import { useState } from 'react';
import { FormControl, Select, MenuItem, InputLabel, TextField } from '@material-ui/core';
import { FormCard, SubmitButton, ResetButton } from './Common';
import { all, anyMissing, requireEmail, requireNonempty, requirePred, validate } from './Validators';

function SampleForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [gender, setGender] = useState('');

    const nameErr = validate(requireNonempty, name);
    const usernameErr = validate(all([requireNonempty, requirePred((c) => /[a-zA-Z0-9_-]/.test(c))]), username);
    const emailErr = validate(all([requireNonempty, requireEmail]), email);
    const isDisabled = gender === '' || anyMissing([name, nameErr], [email, emailErr]);

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control" style={{ display: "block", marginBottom: "10px" }}>
                        <TextField
                            required
                            error={nameErr !== undefined}
                            label="Full name"
                            variant="filled"
                            helperText={nameErr}
                            onChange={(event) => setName(event.target.value as string)}
                            style={{ minWidth: "20em" }}
                        />
                    </FormControl>
                    <FormControl className="form-control" style={{ display: "block", marginBottom: "10px" }}>
                        <TextField
                            required
                            error={usernameErr !== undefined}
                            label="Username"
                            variant="filled"
                            helperText={usernameErr}
                            onChange={(event) => setUsername(event.target.value as string)}
                            style={{ minWidth: "20em" }}
                        />
                    </FormControl>
                    <FormControl className="form-control" style={{ display: "block", marginBottom: "10px" }}>
                        <TextField
                            required
                            error={emailErr !== undefined}
                            label="Email"
                            variant="filled"
                            helperText={emailErr}
                            onChange={(event) => setEmail(event.target.value as string)}
                            style={{ minWidth: "20em" }}
                        />
                    </FormControl>
                    <FormControl className="form-control" style={{ display: "block", marginBottom: "10px" }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={gender}
                            onChange={(event) => setGender(event.target.value as string)}
                            style={{ minWidth: "10em" }}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <p>This is a typical form that might be used during registration for a website or other service.</p>

                <p>How was the gender information collected? How might this impact users of different gender identities?</p>

                <p>What problems do you notice with the binary gender dropdown, and what would be your first approach to addressing them?</p>

                {/* <p>What sorts of applications do and do not require gender?</p> */}

                <i>As a side note, the email validation in this form is for demonstration only, and is not suitable for a real-life application. Remember, the only reliable way to validate an email is to send the user an email!</i>
                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setName(undefined);
                    setUsername(undefined);
                    setEmail(undefined);
                    setGender('');
                }} />
            </>
        );
    }
}

function BinaryDropdownForm() {
    const [submitted, setSubmitted] = useState(false);
    const [gender, setGender] = useState('');

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl style={{ minWidth: "120px" }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={gender}
                            onChange={(event) => setGender(event.target.value as string)}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <SubmitButton disabled={gender === ''} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <p>An explanation</p>
                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setGender('');
                }} />
            </>
        );
    }
}

export default function Genders() {
    return (
        <>
            <h2 className="page-header">Genders</h2>

            <p className="page-text">It goes without question that gender is present in many aspects of society. It influences our identities, social groups, and interactions. In Western culture, the traditional Western binary view of gender identities is deeply integrated into society, culture, and infrastructure, despite increasing visibility of marginalized gender identities, such as nonbinary people. As a result, transgender, nonbinary, and intersex individuals often face many difficulties when interacting with systems working under traditional expectations of binary gender and sex.</p>
            <p className="page-text">Furthermore, even with increasing visibility of marginalized gender identities, those with marginalized gender identities are often grouped together. In reality, nonbinary individuals often have different needs than binary transgender individuals, who are often not entirely barred by systems expecting a binary gender.</p>
            <p className="page-text">As much of our infrastructure is coupled to gender, it is no surprise that this coupling is also present on the internet. Due to the importance of the internet in accessing services, inclusive design is especially important in web and software design; exclusive design can act as a gate preventing users from accessing important information and services. As designers and developers, we must be aware of the needs of those of marginalized gender identities, analyze how and why our data is collected, and be careful to not exclude or alienate users from accessing important services.</p>

            <p className="page-text">If you've registered for an account on the internet before, you've likely seen a form like this before:</p>

            <FormCard title="Example Form" subheader="A sample website registration form">
                <SampleForm />
            </FormCard>

            <p className="page-text">This is an example of a form that demonstrates how a nonbinary individual might be barred from a service by poor form design. In this case, there is no option for those who are neither male nor female. In this case, nonbinary individuals are left with one of two options:</p>
            <ul className="page-text">
                <li>Intentionally provide inaccurate information &mdash; self-misgendering in this manner is more than a mere social inconvenience. Aside from social and emotional stress, this can expose the individual to unnecessary harm in some contexts, and will likely require them to later clarify if the user does not align with the service's expectation of the selected gender.</li>
                <li>Opt out of the service entirely &mdash; while this may be an option for a service such as a social media site, it may be a greater issue for essential services, such as healthcare-related services.</li>
            </ul>

            <FormCard title="Title" subheader="Subheader">
                <BinaryDropdownForm />
            </FormCard>
        </>
    );
    // - binary dropdown
    // - only "male/female/prefer not to say" options
    // - nonbinary dropdown with no "prefer not to say" option
    // - dropdown that attempts to list every option
    //   - Attempting to enumerate identities will inevitably end up inexplicably
    //     excluding some people's identities; unless you constantly want to add new
    //     options and make political stances on what is or is not a valid identity,
    //     this approach is not practical
    // - trans man and trans woman separate from man and woman
    //   - separating trans from cis in general, or any form that equates gender
    //     alignment (transgender, cisgender) with gender identity (male, female, etc.)
    // - solutions:
    //   - Ideally, gender would be a text box, allowing for free expressivity.
    //     However, this has a few issues in practice. For one, not everyone has the
    //     appropriate context to know what sort of answer is acceptable. Giving a list
    //     of example responses may be appropriate: "e.g. 'Male', 'Female',
    //     'Non-binary', etc."
    //     - However, this makes partitioning your users by gender extremely
    //       impractical; although this would not be necessary in an ideal world, in
    //       practice this is still necessary for some official purposes.
    //   - The most practical and acceptable form of dropdown is simply "male, female,
    //     nonbinary, prefer not to say". This covers the majority of the cases, and
    //     although some will object to the concession of "nonbinary" being used as a
    //     catch-all umbrella in this way, this is the most reasonable solution that
    //     more or less aligns with our current understanding of gender identity.
    // - "sex" is also difficult to ask for
    //   - contrary to most people's expectations, this is not a medically easy
    //     question to answer for most people, no matter how much this is narrowed down
    //   - for some medical purposes, a trans woman has a physiology closer to that of
    //     a cis woman, but not for others
    //   - especially for intersex people
    //   - this does not yet have a clear solution

    // options (ranked in descending order by nonbinary misgendering)
    // - binary dropdown
    // - dropdown with male/female/other
    // - radio with male/female/something else with text box
    // - checkbox with male/female/mtf/ftm/non-binary/intersex/other with text box (second-least misgendered and inclusive, but less uncomfortable than 5)
    //   - why does this have transgender options but not cisgender options?
    //   - don't use the terms mtf and ftm
    //   - better revision: woman/female, man/male, non-binary, not listed above (open text box), unsure/questioning, prefer not to answer
    //     - if being trans is relevant, have a separate question for cis, trans, unsure/questioning, prefer not to answer
    // - open text box (least misgendered and most inclusive, but more uncomfortable)

    // flexibility and multiplicity
    // normalizing: option 3 classifies non-binary genders as "weird"

    // include note that these vary across different contexts; the ideal form might be different in a healthcare context versus in a social media context (something about violence), as indicated in the study
    //   - categorization may be more helpful in a dating context

    // solutions:
    //   - alternatives: pronouns, anatomical information rather than gender, report trans/cis/intersex/opt out separately, omitting entirely
    //   - consider the questions:
    //     - by collecting this data, what are you expecting your users to communicate?
    //     - what is the best way for the users to communicate this information?
    //     - what is the purpose of the data when engaging with the system?
    //     - how would the data be used?
}