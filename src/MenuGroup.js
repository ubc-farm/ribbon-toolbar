import { createElement, PropTypes } from 'react'; /** @jsx createElement */

export default function MenuGroup({ children, title }) {
	return (
		<div className="ribbon-menu-group" data-label={title}>
			{children}
		</div>
	);
}

MenuGroup.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};
