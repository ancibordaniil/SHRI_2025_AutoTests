import { FC } from 'react';

import { IconBaseProps } from '@app-types/common';
import { SvgBase } from '@ui/SvgBase';

export const Upload: FC<IconBaseProps> = ({ size, ...rest }) => (
    <SvgBase size={size} {...rest}>
        <path
            d="M17.4999 5.31085V22.8488"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
        />
        <path
            d="M24.2446 11.5L18.4623 5.71629C18.2065 5.46319 17.8612 5.32123 17.5013 5.32123C17.1414 5.32123 16.7961 5.46319 16.5403 5.71629L10.755 11.5M4.01026 20.8246V27.5694C4.00968 28.0125 4.09654 28.4514 4.26585 28.8609C4.43516 29.2704 4.6836 29.6425 4.99694 29.9559C5.31028 30.2692 5.68236 30.5176 6.09186 30.687C6.50137 30.8563 6.94026 30.9431 7.38338 30.9425H27.6178C28.0608 30.9429 28.4995 30.8559 28.9088 30.6865C29.3182 30.5171 29.6901 30.2687 30.0033 29.9553C30.3164 29.642 30.5648 29.27 30.734 28.8606C30.9032 28.4512 30.99 28.0124 30.9894 27.5694V20.8246"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </SvgBase>
);
