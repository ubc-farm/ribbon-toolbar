import { PropTypes, Children } from 'react';
import Tab from './Tab.js';

export default function TabGroup() { return null; }

TabGroup.propTypes = {
	selected: PropTypes.string,
	disabled: PropTypes.bool,
	title: PropTypes.node,
	children(props, propName, componentName) {
		for (const { type } of Children.toArray(props[propName])) {
			if (type !== Tab) {
				return new Error(`${componentName} should only have Tab children`);
			}
		}

		return null;
	},
};
