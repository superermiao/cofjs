import {Dimensions} from 'react-native';
export const {height, width} = Dimensions.get('window');
export const newSize = (width/375).toFixed(2);