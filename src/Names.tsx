import { useState } from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { FormCard, SubmitButton, ResetButton } from './Common';

function MinimumLengthNameForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState<string | undefined>(undefined);

    let helperText = undefined;

    const isError = name !== undefined && name.length < 3;
    const isDisabled = name === undefined || isError;

    if (isError) {
        if (name === "" || name === undefined) {
            helperText = "Required field";
        } else {
            helperText = "Must be at least 3 characters"
        }
    }

    if (!submitted) {
        return (
            <>
                <div>
                    <FormControl style={{ minWidth: "120px" }}>
                        <TextField
                            required
                            error={isError}
                            label="Full Name"
                            variant="filled"
                            helperText={helperText}
                            onChange={(event) => {
                                setName(event.target.value as string);
                            }}
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
                <p>
                    the explanation
                </p>
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

            <p className="page-text">In the United States, the most common name format is first name and last name, with potentially a middle name and title. One might expect to see a form like this:</p> 

            {/* form with a first/middle/last name, flip to present typed name concatenated, no spaces allowed in first or last name */}

            <p className="page-text">However, the first problem we run into is one with terminology. What do "first name" and "last name" mean? For many, the last name indicates a family name; in many cultures, however, names are not given in this order. For example, consider the famous Chinese basketball player Yao Ming. In Chinese, the surname is said first; his father, for example, is named Yao Zhiyuan.</p>

            <p className="page-text">First, when discussing these name segments, we should prefer terms such as "surname"/"family name" and "given name":</p>

            {/* same as above, but renamed terms
            Explanation: Now more of our users will know which of their names go in which box!
            */}

            <p className="page-text">However, the above form still contains an error! After the name is processed, the name displayed is still shown in our first/middle/last order, and still doesn't work with Chinese names!</p>

            <p className="page-text">It is tempting to try to somehow determine what order the names should go in. However, this is not possible in general, and there will always be exceptions. Instead, we should keep the different parts of the name separate, rather than trying to reassemble them; for example, we might refer to a user simply as "Mr. Smith" or "Ms. Chang".</p>

            <p className="page-text">Unfortunately, names are complicated, and cannot always be divided this cleanly. Depending on your input above, you may or may not have noticed that each of the name fields cannot contain spaces! What do you do if your surname has a prefix or suffix? This is common in Dutch names, such as in that of Guido van Rossum, the creator of the Python programming language. In Dutch, "van" is a prefix, but cannot be omitted from the name; should it be considered a part of the last name "van Rossum"? Either way, we must allow spaces:</p>

            {/* same as above, but allow spaces
            Explanation: something about some names to try with prefixes
            */}

            <p className="page-text">In the above examples, the given name and the surname are both required, and there is only one field for each! Although most people in the United States have a single given name and surname, this is not the case for everyone.</p>

            <p className="page-text">Javanese, for example, usually only have a single given name, and no surname, such as Indonesian president Sukarno. Stage names are another well-known source of single names; some performers may even have passports under their stage names! On the other hand, some people may have more than three names! Portuguese names usually have one or two given names, and up to six surnames, each of which may be a phrase with multiple spaces; for example, consider Portuguese politician Marcelo Nuno Duarte Rebelo de Sousa.</p>

            <p className="page-text">If we must collect given names and family names, it is important to account for all of the above cases:</p>

            {/* revised, having "surnames" and "other/given names", and at least one name */}

            <p className="page-text">However, if possible, a name should simply be collected via a single field:</p>

            {/* revised, just needs to be nonempty, simply validation in place */}

            <h3 className="page-header">Validation</h3>

            <p className="page-text">Okay, so we've changed our first and last name boxes into a single textbox. We should be able to handle everyone's name now, right?</p>

            <p className="page-text">Next, we want to perform some simple name validation, to detect spam, profanity, and jokes. We should determine if the name the user types is a "valid" name or not. Can you find any problems with the form below?</p>

            {/* single textbox, doesn't allow apostrophes, hyphens, numbers, only letters and spaces, show explanation on back */}

            <p className="page-text">This form places arbitrary and ill-thought-out restrictions on what characters are permitted to appear in names.</p>

            <p className="page-text">As a hint, here are a few names that would not be accepted:</p>

            <ul className="page-text">
                <li>Karine Jean-Pierre</li>
                <li>Dylan O'Brien</li>
                <li>Reneé Rapp</li>
                <li>Jennifer 8 Lee &mdash; yes, numbers may appear in names!</li>
                <li>Any names with characters outside of ASCII, such as names containing Chinese 汉字, Korean 한글, any of the three Japanese character sets, Arabic, Devanagari, and more!</li>
            </ul>

            <p className="page-text">In order to ensure proper internationalization, all forms must be able to take Unicode input, and not place arbitrary restrictions on character sets. While not everyone's name is mapped in Unicode, and not everyone's name may be written in one way or even written down at all, Unicode is the closest we can come in today's world.</p>

            {/* single box, arbitrary Unicode, length >= 3 and <= 30 */}

            <p className="page-text">Still, we haven't removed all of the problematic validation. Can you find a name that's not valid in the above form?</p>

            <p className="page-text">It is tempting to include minimum and maximum character limits in names. After all, the programmer needs to know how large to make the field in the database to fit a name, and surely there couldn't be any single-letter names, right?</p>

            <p className="page-text">Single-letter names are indeed rare, and found most often in surnames. For example, "O" is a Belgian surname, some Chinese surnames may be transliterated as "E", and who could forget Malcolm X?</p>

            <p className="page-text">With respect to maximum character limits, most "realistic" boundaries set may easily be broken. For example, the form above accepts at names of at most 30 characters, but what about Janice Keihanaikukauakahihulihe'ekahaunaele, with her 36-character surname?</p>

            <p className="page-text">Surely 100 characters is more than enough, right? What about the famous artist Picasso, whose full 122-character name is "Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso"?</p>

            <p className="page-text">To give a comparison, most names in Japanese consist of 4 or fewer kanji, and forms are designed around this. Meanwhile, most American surnames contain five to seven characters; imagine a Michael Smith attempting to type in his name and encountering a 10 character limit!</p>

            <h3 className="page-header">Solutions</h3>

            <p className="page-text">The most practical solution is a single Unicode text field, or if collecting surnames is necessary, two fields for surnames and given names. However, because some may not want others to address them by their given name, it is best to ask directly:</p>

            {/* single Unicode full name, plus a "What should we call you?" */}

            <p className="page-text">This is not the solution to all name-related issues, however. It is important to remember that a person doesn't necessarily only have one full name, or even one full name at a time! Whether someone changes their name or uses multiple names, it is important to remain flexible and ensure that names are not immutable.</p>

            <p className="page-text">Where legal names are required, this fact should be detailed; some may use a different name in a legal context, and not knowing which to use can make completing a form much more difficult.</p>

            <p className="page-text">Finally, the best solution is to not collect names in the first place! If names are not required, do not collect them. More often than not, a username will suffice.</p>

            <FormCard title="Title" subheader="Subheader">
                <MinimumLengthNameForm />
            </FormCard>
        </>
    );
}