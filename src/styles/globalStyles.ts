import { createGlobalStyle } from 'styled-components'
import { palette } from './palette'

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
html,
body,
#root {
  height: 100%;
  background-color: ${palette.backgroundColor};
  overflow-x: hidden;
}
* {
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
html{
  -webkit-tap-highlight-color: transparent; // @Note 모바일에서 클릭했을 때 파란 배경 없애 주는 코드
}
input:focus{
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
input,
textarea,
button,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  font-family: 'IBMPlexSansKR-Regular';
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
  margin: 0;
  font-family: 'IBMPlexSansKR-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* 폰트 사이즈 정의 */
  font-size: 14px;
  font-weight:400;
}
ol,
ul {
  list-style: none;
}
li {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
/** 버튼회색배경, 보더 없애기, 커서 포인터 주기**/
button {
  border: 0 none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
}

.sr-only{
	position: absolute;
    clip: rect(0 0 0 0);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
}
`

export default GlobalStyles
