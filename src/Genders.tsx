import { useState } from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { FormCard, SubmitButton, ResetButton } from './Common';

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
                <SubmitButton disabled={gender === ''} onClick={() => {
                    setSubmitted(true);
                    setGender('');
                }} />
            </>
        );
    } else {
        return (
            <>
                <p>
                    the explanation
                </p>
                <ResetButton onClick={() => { setSubmitted(false); }} />
            </>
        );
    }
}

export default function Genders(props: {}) {
    return (
        <>
            <h2 className="page-header">Genders</h2>

            <FormCard title="Title" subheader="Subheader">
                <BinaryDropdownForm />
            </FormCard>
        </>
    );
}