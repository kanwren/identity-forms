import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';

export function FormCard(props: {
    title: string,
    subheader: string,
    children?: React.ReactElement,
}) {
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