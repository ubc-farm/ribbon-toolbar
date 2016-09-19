import { createElement, PropTypes, Children, cloneElement } from 'react';
/** @jsx createElement */

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
