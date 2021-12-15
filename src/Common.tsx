import React from 'react';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';

export function FormCard(props: React.PropsWithChildren<{
    title: string,
    subheader?: string,
}>) {
    return (
        <>
            <Card>
                <CardHeader className="form-card-header" title={props.title} subheader={props.subheader} />
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </>
    );
}

export function SubmitButton(props: {
    disabled: boolean,
    onClick: () => void,
}) {
    return (
        <Button
            className="submit-button"
            color="primary"
            variant="contained"
            disabled={props.disabled}
            onClick={(_event) => props.onClick()}
        >
            Submit
        </Button>
    );
}

export function ResetButton(props: {
    onClick: () => void,
}) {
    return (
        <Button
            className="submit-button"
            color="secondary"
            variant="outlined"
            onClick={(_event) => props.onClick()}
        >
            Reset
        </Button>
    );
}