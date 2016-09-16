import { createElement } from 'react'; /** @jsx createElement */
import Tab from './Tab.js';

export default function ApplicationMenu(props) {
	return <Tab className="ribbon-app-menu" {...props} />;
}

ApplicationMenu.defaultProps = {
	title: 'File',
	altKey: 'f',
};
