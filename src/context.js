import React from 'react';


export const config = {
    // 主题色——默认浅色
    theme: 'light',
    // 画布分辨率
    size: {
        width: 1920,
        height: 1080,
    },
    // 用来控制各种图案的比例（目前没起作用
    content: {
        rect: 0.3,
        triangle: 0.7
    },
    // 控制图案粒度
    column: 42,
    // 是否重绘画布
    count: 0
};

export const ConfigContext = React.createContext(
    config
);