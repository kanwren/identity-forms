import { useState } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { FormCard, SubmitButton, ResetButton } from './Common';
import { anyMissing, allMissing, all, validate, requireNonempty, requireNoSpace, requireLength, requireLetters, requireAscii } from './Validators';

function FirstAndLastForm() {
    const [submitted, setSubmitted] = useState(false);
    const [firstName, setFirstName] = useState<string | undefined>(undefined);
    const [middleName, setMiddleName] = useState<string>("");
    const [lastName, setLastName] = useState<string | undefined>(undefined);

    const firstNameErr = validate(all([requireNonempty, requireNoSpace]), firstName);
    const middleNameErr = validate(all([requireNoSpace]), middleName);
    const lastNameErr = validate(all([requireNonempty, requireNoSpace]), lastName);
    const isDisabled = anyMissing([[firstName, firstNameErr], [middleName, middleNameErr], [lastName, lastNameErr]]);

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control">
                        <TextField
                            required
                            error={firstNameErr !== undefined}
                            label="First name"
                            variant="filled"
                            helperText={firstNameErr}
                            onChange={(event) => setFirstName(event.target.value as string)}
                        />
                    </FormControl>
                    <FormControl className="form-control">
                        <TextField
                            error={middleNameErr !== undefined}
                            label="Middle name"
                            variant="filled"
                            helperText={middleNameErr}
                            onChange={(event) => setMiddleName(event.target.value as string)}
                        />
                    </FormControl>
                    <FormControl className="form-control">
                        <TextField
                            required
                            error={lastNameErr !== undefined}
                            label="Last name"
                            variant="filled"
                            helperText={lastNameErr}
                            onChange={(event) => setLastName(event.target.value as string)}
                        />
                    </FormControl>
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => {
                    setSubmitted(true);
                }} />
            </>
        );
    } else {
        let name = "";
        if (firstName !== undefined) {
            name += firstName;
        }
        if (middleName !== "") {
            name += " " + middleName;
        }
        if (lastName !== undefined && lastName !== "") {
            name += " " + lastName;
        }
        return (
            <>
                <p>The name you entered was: <b>{name}</b></p>

                <p>Is the above name shown in the right order? What if you entered a Chinese name?</p>

                <p>What do the terms "first name" and "last name" mean to you?</p>
                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setFirstName(undefined);
                    setMiddleName("");
                    setLastName(undefined);
                }} />
            </>
        );
    }
}

function GivenAndSurnameForm() {
    const [submitted, setSubmitted] = useState(false);
    const [givenName, setGivenName] = useState<string | undefined>(undefined);
    const [middleName, setMiddleName] = useState<string>("");
    const [surname, setSurname] = useState<string | undefined>(undefined);

    const givenNameErr = validate(all([requireNonempty, requireNoSpace]), givenName);
    const middleNameErr = validate(all([requireNoSpace]), middleName);
    const surnameErr = validate(all([requireNonempty, requireNoSpace]), surname);
    const isDisabled = anyMissing([[givenName, givenNameErr], [middleName, middleNameErr], [surname, surnameErr]]);

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control">
                        <TextField
                            required
                            error={givenNameErr !== undefined}
                            label="Given name"
                            variant="filled"
                            helperText={givenNameErr}
                            onChange={(event) => setGivenName(event.target.value as string)}
                        />
                    </FormControl>
                    <FormControl className="form-control">
                        <TextField
                            error={middleNameErr !== undefined}
                            label="Middle name"
                            variant="filled"
                            helperText={middleNameErr}
                            onChange={(event) => setMiddleName(event.target.value as string)}
                        />
                    </FormControl>
                    <FormControl className="form-control">
                        <TextField
                            required
                            error={surnameErr !== undefined}
                            label="Family name/surname"
                            variant="filled"
                            helperText={surnameErr}
                            onChange={(event) => setSurname(event.target.value as string)}
                        />
                    </FormControl>
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => {
                    setSubmitted(true);
                }} />
            </>
        );
    } else {
        let name = "";
        if (givenName !== undefined) {
            name += givenName;
        }
        if (middleName !== "") {
            name += " " + middleName;
        }
        if (surname !== undefined && surname !== "") {
            name += " " + surname;
        }
        return (
            <>
                <p>The name you entered was: <b>{name}</b></p>

                <p>Now more of our users will know which of their names go in which box!</p>

                <p>However, we still have a problem. Did the name above show up in the correct order?</p>

                <p>In Chinese, the surname is usually presented first, opposite of the norm in English. For example, the name of the famous cellist Yo-Yo Ma is written 马友友 (mǎ yǒu yǒu) in Chinese, where the surname is 马 and the given name is 友友. Does his name show up in the correct order when entered in English? What about in Chinese? Was the name correctly formatted?</p>
                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setGivenName(undefined);
                    setMiddleName("");
                    setSurname(undefined);
                }} />
            </>
        );
    }
}

function PrefixesForm() {
    const [submitted, setSubmitted] = useState(false);
    const [givenName, setGivenName] = useState<string | undefined>(undefined);
    const [middleName, setMiddleName] = useState<string>("");
    const [surname, setSurname] = useState<string | undefined>(undefined);

    const givenNameErr = validate(all([requireNonempty]), givenName);
    const surnameErr = validate(all([requireNonempty]), surname);
    const isDisabled = anyMissing([[givenName, givenNameErr], [surname, surnameErr]]);

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control">
                        <TextField
                            required
                            error={givenNameErr !== undefined}
                            label="Given name"
                            variant="filled"
                            helperText={givenNameErr}
                            onChange={(event) => setGivenName(event.target.value as string)}
                        />
                    </FormControl>
                    <FormControl className="form-control">
                        <TextField
                            label="Middle name"
                            variant="filled"
                            onChange={(event) => setMiddleName(event.target.value as string)}
                        />
                    </FormControl>
                    <FormControl className="form-control">
                        <TextField
                            required
                            error={surnameErr !== undefined}
                            label="Family name/surname"
                            variant="filled"
                            helperText={surnameErr}
                            onChange={(event) => setSurname(event.target.value as string)}
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
                <p>The given name you entered was: <b>{givenName}</b></p>
                {
                    middleName === ""
                        ? <p>You did not give a middle name</p>
                        : <p>The middle name you entered was: <b>{middleName}</b></p>
                }
                <p>The family name you entered was: <b>{surname}</b></p>

                <p>Find a famous person whose name contains an affix (Spanish, Brazilian, and Dutch names are a few examples of names that often contain prefixes). Is their name accepted by the form?</p>

                <p>Consider which name an affix should be associated with. Is it obvious which box the affix(es) should be placed in?</p>

                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setGivenName(undefined);
                    setMiddleName("");
                    setSurname(undefined);
                }} />
            </>
        );
    }
}

function MultipleNamesForm() {
    const [submitted, setSubmitted] = useState(false);
    const [givenName, setGivenName] = useState<string | undefined>(undefined);
    const [surname, setSurname] = useState<string | undefined>(undefined);

    const givenNameErr = validate(all([requireNonempty]), givenName);
    const surnameErr = validate(all([requireNonempty]), surname);
    const isDisabled = allMissing([[givenName, givenNameErr], [surname, surnameErr]]);

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control" style={{ display: "block", marginBottom: "10px" }}>
                        <TextField
                            label="Family names/surnames"
                            variant="filled"
                            onChange={(event) => setSurname(event.target.value as string)}
                            style={{ minWidth: "20em" }}
                        />
                    </FormControl>
                    <FormControl className="form-control" style={{ display: "block" }}>
                        <TextField
                            label="Other/given names"
                            variant="filled"
                            onChange={(event) => setGivenName(event.target.value as string)}
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
                <p>The family name(s) you entered were: <b>{surname}</b></p>
                <p>The given name(s) you entered were: <b>{givenName}</b></p>

                <p>Does this handle all of the cases discussed above? When might this still be confusing to those who have multiple surnames or given names?</p>

                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setGivenName(undefined);
                    setSurname(undefined);
                }} />
            </>
        );
    }
}

function SingleFieldNameForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);

    const nameErr = validate(all([requireNonempty]), name);
    const isDisabled = anyMissing([[name, nameErr]]);

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control">
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
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => {
                    setSubmitted(true);
                }} />
            </>
        );
    } else {
        return (
            <>
                <p>The name you entered was: <b>{name}</b></p>

                <p>TODO</p>

                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setName(undefined);
                }} />
            </>
        );
    }
}

function NoUnicodeForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);

    const nameErr = validate(all([requireNonempty, requireAscii]), name);
    const isDisabled = anyMissing([[name, nameErr]])

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control">
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
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <p>The name you entered was: <b>{name}</b></p>

                <p>This form is programmed to disallow any character that is outside of ASCII, a very restrictive character set optimized for the Latin alphabet.</p>

                <p>This disallows any names with characters outside of ASCII, such as names containing Chinese characters, Korean hangul, any of the three Japanese character sets, Arabic, Devanagari, and more!</p>

                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setName(undefined);
                }} />
            </>
        );
    }
}

function CharacterValidationForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);

    const nameErr = validate(all([requireNonempty, requireLetters]), name);
    const isDisabled = anyMissing([[name, nameErr]])

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control">
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
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <p>The name you entered was: <b>{name}</b></p>

                <p>Did you find the character restriction? What kinds of characters are disallowed?</p>

                <p>Some punctuation characters can appear in names, like apostrophes and hyphens. These are the only two punctuation marks a name may <em>officially</em> contain in the United States. Are there any punctuation characters that do not appear in any names?</p>

                <p>If you answered yes, are you <em>sure</em>?</p>

                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setName(undefined);
                }} />
            </>
        );
    }
}

function LengthValidationForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);

    const nameErr = validate(all([requireNonempty, requireLength(3, 30)]), name);
    const isDisabled = anyMissing([[name, nameErr]])

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl className="form-control">
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
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <p>The name you entered was: <b>{name}</b></p>

                <p>This form places restrictions on the length of names. Can you think of anyone with a very short name (even just a short given name or surname)? What about a very long name?</p>

                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setName(undefined);
                }} />
            </>
        );
    }
}

function IdealForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);
    const [preferred, setPreferred] = useState<string | undefined>(undefined);

    const nameErr = validate(all([requireNonempty]), name);
    const preferredErr = validate(all([requireNonempty]), preferred);
    const isDisabled = anyMissing([[name, nameErr], [preferred, preferredErr]])

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
                            helperText={nameErr ?? "Your full legal name"}
                            onChange={(event) => setName(event.target.value as string)}
                            style={{ minWidth: "20em" }}
                        />
                    </FormControl>
                    <FormControl className="form-control" style={{ display: "block" }}>
                        <TextField
                            required
                            error={preferredErr !== undefined}
                            label="What should we call you?"
                            variant="filled"
                            helperText={preferredErr ?? "How you'd like us to refer to you in communications"}
                            onChange={(event) => setPreferred(event.target.value as string)}
                            style={{ minWidth: "20em" }}
                        />
                    </FormControl>
                </div>
                <SubmitButton disabled={isDisabled} onClick={() => setSubmitted(true)} />
            </>
        );
    } else {
        return (
            <>
                <p>Thanks, {preferred}!</p>

                <p>When possible, examples or clarification should be given next to inputs, in case someone isn't sure what kind of answer is expected.</p>

                <ResetButton onClick={() => {
                    setSubmitted(false);
                    setName(undefined);
                }} />
            </>
        );
    }
}

export default function Names(props: {}) {
    return (
        <>
            <h2 className="page-header">Names</h2>

            <p className="page-text">Names are beautiful, unique, complicated things. They can be used to identify and to show respect, to include and to exclude. With this in mind, it is important to keep in mind the different kinds of names we may encounter.</p>

            <p className="page-text">It's natural that programmers in a country such as the United States will be made up mostly of people with fairly "standard" "American" names. For most Americans, this means having a first and last name, as well as perhaps a middle name, and maybe a title. It's tempting to base user data off of this standard, and dismiss any names outside of this norm as being too "weird", or simply unlikely to occur in your use case. However, even within the United States, we can find plenty of scenarios that challenge these assumptions. Behind these edge cases are real people with real names, and being unable to input one's name can be an obstacle to accessing important services.</p>

            <h3 className="page-header">Internationalization</h3>

            <p className="page-text">In the United States, the most common name format is a first name and a last name, with potentially a middle name and title. One might expect to see a form like this:</p> 

            <FormCard title="Example Form" subheader="First and last name">
                <FirstAndLastForm />
            </FormCard>

            <p className="page-text">However, the first problem we run into is one with terminology. What do "first name" and "last name" mean? For many, the last name indicates a family name; in many cultures, however, names are not given in this order. For example, consider the famous Chinese basketball player Yao Ming. In Chinese, the surname is said first; his father, for example, is named Yao Zhiyuan.</p>

            <p className="page-text">Firstly, when discussing these name segments, we should prefer terms such as "surname"/"family name" and "given name":</p>

            <FormCard title="Example Form" subheader="Given name and family name">
                <GivenAndSurnameForm />
            </FormCard>

            <p className="page-text">However, the above form still contains an error! After the name is processed, the name displayed is still shown in our first/middle/last order, and still doesn't work with Chinese names!</p>

            <p className="page-text">It is tempting to try to somehow determine what order the names should go in. However, this is not possible in general, and there will always be exceptions. Instead, we should keep the different parts of the name separate, rather than trying to reassemble them; for example, we might refer to a user simply as "Mr. Smith" or "Ms. Chang".</p>

            <p className="page-text">Unfortunately, names are complicated, and cannot always be divided this cleanly. Depending on your input above, you may or may not have noticed that each of the name fields cannot contain spaces! What do you do if your surname has a prefix or suffix? This is common in Dutch names, such as in that of Guido van Rossum, the creator of the Python programming language. In Dutch, "van" is a prefix, but cannot be omitted from the name; should it be considered a part of the last name "van Rossum"? Either way, we must allow spaces:</p>

            <FormCard title="Example Form" subheader="Affixes">
                <PrefixesForm />
            </FormCard>

            <p className="page-text">In the above examples, the given name and the surname are both required, and there is only one field for each! Although most people in the United States have a single given name and surname, this is not the case for everyone.</p>

            <p className="page-text">Javanese, for example, usually only have a single given name, and no surname, such as Indonesian president Sukarno. Stage names are another well-known source of single names; some performers may even have passports under their stage names! On the other hand, some people may have more than three names! Portuguese names usually have one or two given names, and up to six surnames, each of which may be a phrase with multiple spaces; for example, consider Portuguese politician Marcelo Nuno Duarte Rebelo de Sousa.</p>

            <p className="page-text">If we must collect given names and family names, it is important to account for all of the above cases:</p>

            <FormCard title="Example Form" subheader="Multiple names with affixes">
                <MultipleNamesForm />
            </FormCard>

            <p className="page-text">However, if possible, a name should simply be collected via a single field:</p>

            <FormCard title="Example Form" subheader="Single input field">
                {/* revised, just needs to be nonempty, simply validation in place */}
                <SingleFieldNameForm />
            </FormCard>

            <h3 className="page-header">Validation</h3>

            <p className="page-text">Okay, so we've changed our first and last name boxes into a single textbox. We should be able to handle everyone's name now, right?</p>

            <p className="page-text">Next, we want to perform some simple name validation, to detect spam, profanity, and jokes. We should determine if the name the user types is a "valid" name or not.</p>

            <p className="page-text">One common form of validation is restricting the character set, making it impossible for some characters to appear in names. A common error is disallowing "weird" characters; in practice, unfortunately, this often means "characters outside of the English Latin alphabet".</p>

            <FormCard title="Example Form" subheader="Non-Unicode restrictions">
                <NoUnicodeForm />
            </FormCard>

            <p className="page-text">In order to ensure proper internationalization, all forms must be able to take Unicode input. While not everyone's name is mapped in Unicode, and not everyone's name may be written in one way or even written down at all, Unicode is the closest we can come in today's world.</p>

            <p className="page-text">Even when forms handle Unicode properly, some additional restrictions may still be placed on the characters that can appear. Can you find any problems with the form below?</p>

            <FormCard title="Example Form" subheader="Other character restrictions">
                <CharacterValidationForm />
            </FormCard>

            <p className="page-text">As a hint, here are a few names that would not be accepted:</p>

            <ul className="page-text">
                <li>Karine Jean-Pierre</li>
                <li>Dylan O'Brien</li>
                <li>Reneé Rapp</li>
                <li>Jennifer 8 Lee &mdash; yes, numbers may appear in names!</li>
            </ul>

            <p className="page-text">The following form now properly accepts arbitrary Unicode with no character restrictions, but still contains some overly-restrictive validation rules. Can you find a name that wouldn't be accepted in the form below?</p>

            <FormCard title="Example Form" subheader="Other input validation">
                <LengthValidationForm />
            </FormCard>

            <p className="page-text">This form validates based on the length of the input; the entered name must be between 3 and 30 characters long. To a programmer, this might seem like a reasonable restriction. After all, most people haven't heard of anyone with a single-letter name, and a programmer wants to set an upper bound on how long a field in their database will be.</p>

            <p className="page-text">Single-letter names are indeed rare, and found most often in surnames. For example, "O" is a Belgian surname, some Chinese surnames may be transliterated as "E", and who could forget Malcolm X?</p>

            <p className="page-text">Most established maximum character limits are major underestimations. For example, the form above accepts at names of at most 30 characters, but what about Janice Keihanaikukauakahihulihe'ekahaunaele, with her 36-character surname?</p>

            <p className="page-text">Okay, so we'll increase the upper bound. Surely 100 characters will be more than enough, right? What about the famous artist Picasso, whose full 122-character name is "Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso"?</p>

            <p className="page-text">To put maximum character limits into perspective, most names in Japanese consist of 4 or fewer kanji, and so forms in Japan are designed around this expectation. Meanwhile, most American surnames contain five to seven characters; imagine a Jordan Smith attempting to type in their name and encountering a limit of 10 characters!</p>

            <h3 className="page-header">Solutions</h3>

            <p className="page-text">The most practical solution is a single Unicode text field, or if collecting surnames is necessary, two fields for surnames and given names. However, because some may not want others to address them by their given name, it is best to ask directly:</p>

            <FormCard title="Example Form" subheader="The recommended approach">
                <IdealForm />
            </FormCard>

            <p className="page-text">This is not the solution to all name-related issues, however. It is important to remember that a person doesn't necessarily only have one full name, or even one full name at a time! Whether someone changes their name or uses multiple names, it is important to remain flexible and ensure that names are not immutable.</p>

            <p className="page-text">Where legal names are required, this fact should be detailed; some may use a different name in a legal context, and not knowing which to use can make completing a form much more difficult.</p>

            <p className="page-text">Finally, the best solution is to not collect names in the first place! More often than not, a username will suffice.</p>
        </>
    );
}