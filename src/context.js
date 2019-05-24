import React from 'react';


export const config = {
    theme: 'light',
    size: {
        width: 1920,
        height: 1080,
    },
    content: {
        rect: 0.3,
        triangle: 0.7
    },
    column: 20,
    count: 0
};

export const ConfigContext = React.createContext(
    config
);