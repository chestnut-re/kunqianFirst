import CustomContextPad from './CustomContextPad';
import  CustomPalette from './CustomPalette';
import CustomRenderer from './CustomRenderer';

export default {
    __init__: [ 'CustomContextPad', 'CustomPalette', 'CustomRenderer' ],
    CustomContextPad : [ 'type', CustomContextPad ],
    CustomPalette: [ 'type', CustomPalette],
    CustomRenderer: [ 'type', CustomRenderer ]
};