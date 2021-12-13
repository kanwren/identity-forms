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

            <p className="page-text">Duis vel ante sed sem condimentum sagittis. Sed bibendum, risus in accumsan commodo, urna tellus fringilla ligula, vel pretium eros ante ac purus. Donec malesuada orci et interdum interdum. Sed ullamcorper tincidunt neque, ut viverra sapien pretium non. Ut pharetra, lacus vitae hendrerit varius, mi sem pretium eros, non fringilla justo leo vitae est. Suspendisse potenti. Aenean commodo sagittis aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras quis mi id felis varius consectetur. In congue quis ligula in placerat. Pellentesque maximus lorem nec velit lacinia hendrerit.</p>

            <FormCard title="Title" subheader="Subheader">
                <MinimumLengthNameForm />
            </FormCard>
        </>
    );
}