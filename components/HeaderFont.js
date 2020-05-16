import { createGlobalStyle } from 'styled-components';

import Ballpark from '.,/static/BALLW.TTF';

export default createGlobalStyle`
    @font-face {
        font-family: 'Ballpark';
        src: local('Ballpark'),
        url(${Ballpark}) format('truetype'),
        font-weight: 300;
        font-style: normal;
    }
`;
