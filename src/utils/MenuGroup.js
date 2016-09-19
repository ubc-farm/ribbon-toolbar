import { createElement, PropTypes } from 'react';
/** @jsx createElement */

/**
 * Helper for use inside Panels.
 */
const MenuGroup = ({ children, title }) => (
	<div className="ribbon-menu-group" data-label={title}>
		{children}
	</div>
);

MenuGroup.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
};

export default MenuGroup;
