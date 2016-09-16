import { PropTypes } from 'react';

export default function TabGroup() { return null; }

TabGroup.propTypes = {
	selected: PropTypes.string,
	children: PropTypes.node,
	disabled: PropTypes.bool,
	title: PropTypes.node,
};
