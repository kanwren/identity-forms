import { useState } from 'react';
import { FormControl, Select, MenuItem, InputLabel, TextField, FormGroup, FormControlLabel, Checkbox, FormHelperText, FormLabel, RadioGroup, Radio, Link } from '@material-ui/core';
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
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"male"}>Male</MenuItem>
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

                <p>Many important services use a form like this. If you were not able to input your correct gender, for which services would you be willing to input inaccurate information? Which services would you stop using?</p>

                <i>Note: the email validation in this form is for demonstration only, and is not suitable for a real-life application. Remember, the only reliable way to validate an email is to send the user an email!</i>

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

function BinaryDropdownWithOptOut() {
    const [submitted, setSubmitted] = useState(false);
    const [gender, setGender] = useState('');

    const isDisabled = gender === '';

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control" style={{ display: "block", marginBottom: "10px" }}>
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={gender}
                            onChange={(event) => setGender(event.target.value as string)}
                            style={{ minWidth: "10em" }}
                        >
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"other"}>Other</MenuItem>
                            <MenuItem value={"opt-out"}>Prefer not to say</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <p>This is an example of othering nonbinary individuals and limiting their flexibility.</p>
                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setGender('');
                }} />
            </>
        );
    }
}

function BinaryDropdownWithOptOutAndField() {
    const [submitted, setSubmitted] = useState(false);
    const [gender, setGender] = useState('');
    const [explanationEnabled, setExplanationEnabled] = useState(false);
    const [explanation, setExplanation] = useState<string | undefined>(undefined);

    const explanationErr = validate(requireNonempty, explanation);
    const isDisabled = gender === '' || (explanationEnabled && anyMissing([explanation, explanationErr]));

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            value={gender}
                            onChange={(event) => {
                                let val = event.target.value as string;
                                setGender(val)
                                if (val === 'other') {
                                    setExplanationEnabled(true);
                                } else {
                                    setExplanation(undefined);
                                    setExplanationEnabled(false);
                                }
                            }}
                            style={{ minWidth: "10em" }}
                        >
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"other"}>Other</MenuItem>
                            <MenuItem value={"opt-out"}>Prefer not to say</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="form-control">
                        <TextField
                            required={explanationEnabled}
                            disabled={!explanationEnabled}
                            error={explanationEnabled && explanationErr !== undefined}
                            label="Explain (if other)"
                            helperText={explanationErr}
                            onChange={(event) => setExplanation(event.target.value as string)}
                            style={{ minWidth: "10em" }}
                        />
                    </FormControl>
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <p>This is an attempt to expand the flexibility of the form above.</p>
                <p>What are the limitations of this form? What are some ideas you have to increase the flexibility and multiplicity of this form?</p>
                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setGender('');
                    setExplanationEnabled(false);
                    setExplanation(undefined);
                }} />
            </>
        );
    }
}

function BadCheckboxes() {
    const boxes = ['male', 'female', 'transgender', 'nonbinary', 'other', 'opt-out'] as const;
    type Box = typeof boxes[number];
    type Options = { [k in Box]: boolean };
    const [submitted, setSubmitted] = useState(false);
    const [isChecked, setIsChecked] = useState<Options>({
        'male': false,
        'female': false,
        'transgender': false,
        'nonbinary': false,
        'other': false,
        'opt-out': false,
    });
    const [explanationEnabled, setExplanationEnabled] = useState(false);
    const [explanation, setExplanation] = useState<string | undefined>(undefined);
    const [changed, setChanged] = useState(false);

    function check(option: Box, checked: boolean) {
        setChanged(true);
        setIsChecked((cur: Options) => ({ ...cur, [option]: checked }));
    }

    function reset() {
        setChanged(false);
        setExplanationEnabled(false);
        setExplanation(undefined);
        setSubmitted(false);
        setIsChecked({
            'male': false,
            'female': false,
            'transgender': false,
            'nonbinary': false,
            'other': false,
            'opt-out': false,
        })
    }

    const noneChecked = boxes.every(k => !isChecked[k]);
    const checkboxErr = noneChecked && changed ? "Check at least one" : undefined;
    const explanationErr = validate(requireNonempty, explanation);
    const isDisabled = noneChecked || (explanationEnabled && anyMissing([explanation, explanationErr]));

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl required error={checkboxErr !== undefined} className="form-control" style={{ display: "block", marginBottom: "10px" }}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <FormGroup className="form-control">
                            <FormControlLabel label="Female/woman" control={<Checkbox onChange={(event) => {
                                check("female", event.target.checked);
                            }} />} />
                            <FormControlLabel label="Male/man" control={<Checkbox onChange={(event) => {
                                check("male", event.target.checked);
                            }} />} />
                            <FormControlLabel label="Nonbinary" control={<Checkbox onChange={(event) => {
                                check("nonbinary", event.target.checked);
                            }} />} />
                            <FormControlLabel label="Transgender" control={<Checkbox onChange={(event) => {
                                check("transgender", event.target.checked);
                            }} />} />
                            <FormControlLabel label="Not listed above" control={<Checkbox onChange={(event) => {
                                let checked = event.target.checked;
                                check("other", checked);
                                if (checked) {
                                    setExplanationEnabled(true);
                                } else {
                                    setExplanationEnabled(false);
                                    setExplanation(undefined);
                                }
                            }} />} />
                            {
                                !explanationEnabled
                                    ? undefined
                                    : <FormControl className="form-control">
                                        <TextField
                                            required={explanationEnabled}
                                            disabled={!explanationEnabled}
                                            error={explanationEnabled && explanationErr !== undefined}
                                            label="Explain (if not listed)"
                                            helperText={explanationErr}
                                            onChange={(event) => setExplanation(event.target.value as string)}
                                            style={{ minWidth: "10em" }}
                                        />
                                    </FormControl>
                            }
                            <FormControlLabel label="Prefer not to answer" control={<Checkbox onChange={(event) => {
                                check("opt-out", event.target.checked);
                            }} />} />
                        </FormGroup>
                    </FormControl>
                    {checkboxErr !== undefined ? <FormHelperText error>{checkboxErr}</FormHelperText> : undefined}
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <p>Try this form from the perspective of a cis person, a nonbinary person, and a binary trans person. Is the form still flexible? Is it othering?</p>
                <p>How would the answer of a trans man differ from that of a cis man? Is this desirable?</p>
                <ResetButton onClick={() => reset()} />
            </>
        );
    }
}

function BetterCheckboxes() {
    const genders = ['male', 'female', 'nonbinary', 'other', 'questioning', 'opt-out'] as const;
    type GenderBox = typeof genders[number];
    type GenderOptions = { [k in GenderBox]: boolean };
    const [submitted, setSubmitted] = useState(false);
    const [isGenderChecked, setIsGenderChecked] = useState<GenderOptions>({
        'male': false,
        'female': false,
        'nonbinary': false,
        'other': false,
        'questioning': false,
        'opt-out': false,
    });
    const [explanationEnabled, setExplanationEnabled] = useState(false);
    const [explanation, setExplanation] = useState<string | undefined>(undefined);
    const [genderChanged, setGenderChanged] = useState(false);

    type Alignment = 'cis' | 'trans' | 'questioning' | 'opt-out';
    const [alignment, setAlignment] = useState<Alignment | undefined>(undefined);

    function setGender(option: GenderBox, checked: boolean) {
        setGenderChanged(true);
        setIsGenderChecked(cur => ({ ...cur, [option]: checked }));
    }

    function reset() {
        setGenderChanged(false);
        setExplanationEnabled(false);
        setExplanation(undefined);
        setSubmitted(false);
        setIsGenderChecked({
            'male': false,
            'female': false,
            'nonbinary': false,
            'other': false,
            'questioning': false,
            'opt-out': false,
        })
        setAlignment(undefined);
    }

    const noGenderChecked = genders.every(k => !isGenderChecked[k]);
    const noAlignmentChecked = alignment === undefined;
    const genderCheckboxErr = noGenderChecked && genderChanged ? "Check at least one" : undefined;
    const explanationErr = validate(requireNonempty, explanation);
    const isDisabled = noGenderChecked || noAlignmentChecked || (explanationEnabled && anyMissing([explanation, explanationErr]));

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl required error={genderCheckboxErr !== undefined} className="form-control" style={{ display: "block", marginBottom: "10px" }}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <FormGroup className="form-control">
                            <FormControlLabel label="Female/woman" control={<Checkbox onChange={(event) => {
                                setGender("female", event.target.checked);
                            }} />} />
                            <FormControlLabel label="Male/man" control={<Checkbox onChange={(event) => {
                                setGender("male", event.target.checked);
                            }} />} />
                            <FormControlLabel label="Nonbinary" control={<Checkbox onChange={(event) => {
                                setGender("nonbinary", event.target.checked);
                            }} />} />
                            <FormControlLabel label="Not listed above" control={<Checkbox onChange={(event) => {
                                let checked = event.target.checked;
                                setGender("other", checked);
                                if (checked) {
                                    setExplanationEnabled(true);
                                } else {
                                    setExplanationEnabled(false);
                                    setExplanation(undefined);
                                }
                            }} />} />
                            {
                                !explanationEnabled
                                    ? undefined
                                    : <FormControl className="form-control">
                                        <TextField
                                            required={explanationEnabled}
                                            disabled={!explanationEnabled}
                                            error={explanationEnabled && explanationErr !== undefined}
                                            label="Explain (if not listed)"
                                            helperText={explanationErr}
                                            onChange={(event) => setExplanation(event.target.value as string)}
                                            style={{ minWidth: "10em" }}
                                        />
                                    </FormControl>
                            }
                            <FormControlLabel label="Unsure/questioning" control={<Checkbox onChange={(event) => {
                                setGender("questioning", event.target.checked);
                            }} />} />
                            <FormControlLabel label="Prefer not to answer" control={<Checkbox onChange={(event) => {
                                setGender("opt-out", event.target.checked);
                            }} />} />
                        </FormGroup>
                    </FormControl>
                    {genderCheckboxErr !== undefined ? <FormHelperText error>{genderCheckboxErr}</FormHelperText> : undefined}
                </div>

                <div>
                    <FormControl required component="fieldset" className="form-control" style={{ display: "block", marginBottom: "10px" }}>
                        <FormLabel component="legend">Gender Alignment</FormLabel>
                        <RadioGroup className="form-control" onChange={(event) => setAlignment(event.target.value as Alignment)}>
                            <FormControlLabel label="Cisgender" value="cis" control={<Radio />} />
                            <FormControlLabel label="Transgender" value="trans" control={<Radio />} />
                            <FormControlLabel label="Unsure/questioning" value="questioning" control={<Radio />} />
                            <FormControlLabel label="Prefer not to answer" value="opt-out" control={<Radio />} />
                        </RadioGroup>
                    </FormControl>
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <ResetButton onClick={() => reset()} />
            </>
        );
    }
}

function TextboxGender() {
    const [submitted, setSubmitted] = useState(false);
    const [gender, setGender] = useState<string | undefined>(undefined);

    const genderErr = validate(requireNonempty, gender);
    const isDisabled = anyMissing([gender, genderErr]);

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control">
                        <TextField
                            required
                            error={genderErr !== undefined}
                            label="Gender"
                            variant="filled"
                            helperText={genderErr}
                            onChange={(event) => setGender(event.target.value as string)}
                            style={{ minWidth: "20em" }}
                        />
                    </FormControl>
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => {
                    setSubmitted(true);
                }} />
            </>
        );
    } else {
        return (
            <>
                <p><Link href="https://dl.acm.org/doi/10.1145/3411764.3445742">A study found</Link> that both binary and nonbinary participants rated this kind of form to be the most inclusive, least misgendering, and most comfortable to fill out. The second most well-received form was one similar to the one above.</p>

                <p>However, the agreement was not unanimous. Which form do you prefer? Would you personally prefer to have discrete categories, or an open text box?</p>

                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setGender(undefined);
                }} />
            </>
        );
    }
}

export default function Genders() {
    return (
        <>
            <h2 className="page-header" id="genders">Genders</h2>

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

            <p className="page-text">The most common approach is not significantly better:</p>

            <FormCard title="Example Gender Input" subheader='"Other" and opting out'>
                <BinaryDropdownWithOptOut />
            </FormCard>

            <p className="page-text">First, the good parts:</p> 

            <ul className="page-text">
                <li>This form is less <em>limiting</em>, in that individuals are not forced to provide inaccurate information due to limitations of the form.</li>
                <li>It provides an opt-out, which is important for individuals who are concerned with the data usage, with their safety, or are unsure of or questioning their identity.</li>
            </ul>

            <p className="page-text">However, this form still lacks <em>flexibility</em>. "Other" may include many different cases; "nonbinary" is a rather large umbrella term, for example, and individuals may wish to distinguish whether they are genderfluid, agender, etc. A . If possible, space should be given for elaboration if one's gender is not listed explicitly on the form, for example:</p> 

            <FormCard title="Example Gender Input" subheader='Allowing elaboration'>
                <BinaryDropdownWithOptOutAndField />
            </FormCard>

            <p className="page-text">However, these forms raise the question: why are nonbinary individuals "other"? This is an example of <em>othering</em>, and considers nonbinary people to be not "normal". By placing traditional genders in the position of normalcy and everything else as "other", this hurts the normalization of marginalized gender identities.</p> 

            <p className="page-text">With gender input on forms, we should aim for the following:</p>

            <ul className="page-text">
                <li>Be <em>inclusive</em> &mdash; users should have a way to accurately express their gender</li>
                <li>Be <em>flexible</em> &mdash; users should not be limited to a set of restricted options, but should have a way to elaborate</li>
                <li><em>Normalize</em> and avoid <em>othering</em> &mdash; users should not feel as though they are not "normal"</li>
            </ul>

            <p className="page-text">It is clearly not possible to accurately enumerate every gender identity in a dropdown (though some social media sites, such as Facebook, have attempted to do this to some degree in the past); to do so will inevitably exclude some identities, require the maintainers to constantly update the list, and force developers and designers to take political stances on what should or should not be considered a valid identity. This is not a practical approach. Instead, we must aim for a balance between detail and ease of use, while maintaining flexibility.</p>

            <p className="page-text">Here is one such attempt at inclusion:</p>

            <FormCard title="Example Gender Input" subheader="Multiple-select checkboxes">
                <BadCheckboxes />
            </FormCard>

            <p className="page-text">Note that a box is still provided in the case of "Not listed above"; it simply does not appear until the box is checked.</p>

            <p className="page-text">This is clearly a better attempt at inclusion, but still has several areas for improvement. Perhaps the biggest is a failure to distinguish <em>gender</em> from <em>gender alignment</em>; i.e., whether an individual is cisgender, transgender, nonbinary, etc. A cisgender woman filling out this form would check "woman", but a transgender woman filling out this form would check both "woman" and "transgender". Both people are women and have the same gender, so why do they have different answers to the question about gender? This is a subtle case of othering &mdash; cis people are positioned as more "normal" than trans people.</p>

            <p className="page-text">Note also that terms such as "male-to-female" or "assigned female at birth" should generally be avoided, as they are generally contentious and outdated terms, and are regarded differently by different individuals.</p>

            <p className="page-text">Instead, these two concepts should be separated into different questions entirely. Here is a better version, appropriately separating the two concepts:</p>

            <FormCard title="Example Gender Input" subheader="Better multiple-select checkboxes">
                <BetterCheckboxes />
            </FormCard>

            <p className="page-text">Alternatively, if possible, an ideal solution may be to simply provide a text box, and permit an individual to freely describe their gender:</p>

            <FormCard title="Example Gender Input" subheader="Freeform text input">
                <TextboxGender />
            </FormCard>

            <h3 className="page-header" id="solutions">Solutions</h3>

            <p className="page-text">There is no single best solution to collecting information on a user's gender. For example, on a dating site, having categories in a form may be preferable to a free-form text input, so that users may filter according to their preferences. In comparison, on a social media site, it may be more desirable for users to express their gender with fewer limitations.</p>

            <p className="page-text"></p>

            <div style={{ margin: "auto", justifyContent: "center", alignItems: "center" }}>
                <figure style={{ margin: "auto", textAlign: "center" }}>
                    <img src={`${process.env.PUBLIC_URL}/fb.gif`} alt="A demonstration of changing your gender with Facebook. The cursor selects a dropdown with options 'Female', 'Male', or 'Custom', selects 'Custom', and enters 'Gender Fluid' in a typeahead dialogue." />
                    <figcaption><i>Instead of an open text box, Facebook's gender input system includes a tag-based system with a multitude of options, which can be selected via an alphabetically-sorted typeahead box.</i></figcaption>
                </figure>
            </div>

            <p className="page-text">Instead, when designing forms for inputting gender (and user data in general), we should ask ourselves the following questions:</p>

            <ul className="page-text">
                <li>Why do we need this data; what will it be used for?</li>
                <li>What are you trying to get the user to communicate about themself by collecting this data?</li>
                <li>Who will this data be shared with (other users on a website, only healthcare providers, etc.), and how will they react to the data? Could it be used to help and/or harm the user?</li>
            </ul>

            <p className="page-text">For example, a hospital may ask for a patient's gender on their input form, with the expectation that this will provide medically-relevant information. However, the underlying issue here is the assumption that gender implies a person's anatomy or sex, which is not necessarily the case.</p>

            <p className="page-text">If a form is attempting to use gender to seek medical information about a person's anatomy, it would be preferable to ask for anatomical information directly. If a form is asking for gender to know how to address someone, it would be preferable to instead prompt for someone's pronouns and/or preferred title.</p>

            <p className="page-text">Finally, if gender is not actually necessary for an application or service, then the easiest and most effective solution is simply to not ask for it in the first place.</p>
        </>
    );
}
