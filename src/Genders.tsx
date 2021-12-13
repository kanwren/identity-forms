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

            <p className="page-text">
                Suspendisse id gravida nunc. Pellentesque eu pellentesque quam, vel vehicula ipsum. Etiam eleifend orci sit amet vehicula condimentum. Vivamus sed pulvinar nulla. Pellentesque sit amet arcu aliquam, rhoncus elit vitae, rhoncus risus. Suspendisse rutrum commodo condimentum. Sed ornare leo nec augue tempor venenatis sit amet id erat.
            </p>

            <p className="page-text">
                Aliquam maximus nunc eget lorem maximus mattis. In mollis lorem erat. Cras ut est sed arcu lacinia venenatis ac in augue. Quisque convallis massa eu ullamcorper scelerisque. Duis egestas, quam at dapibus vestibulum, sapien ex interdum risus, vel ultricies est sem sed erat. Sed erat nisi, maximus at porta vel, blandit nec ipsum. Aenean id ipsum mollis, lobortis nunc mollis, pharetra sapien. Nunc ac congue augue. Sed tristique mi ac quam finibus pharetra. Donec non hendrerit mi. Sed fermentum nisl dapibus, euismod orci sed, blandit nibh.
            </p>

            <FormCard title="Title" subheader="Subheader">
                <BinaryDropdownForm />
            </FormCard>
        </>
    );
}