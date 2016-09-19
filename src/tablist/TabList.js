import { createElement, PropTypes, Children, cloneElement } from 'react';
/** @jsx createElement */

/**
 * Container for the ribbon tab elements
 * @param {ReactNode} props.children
 */
const TabList = ({ children, onClick, selected, menuOpen }) => (
	<nav className="ribbon-tabs" role="tablist">
		{Children.map(children, tab =>
			cloneElement(tab, { onClick, selected, menuOpen }))}
	</nav>
);

TabList.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	selected: PropTypes.string,
	menuOpen: PropTypes.bool,
};

export default TabList;
