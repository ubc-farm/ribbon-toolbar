import { createElement, PropTypes, Children, cloneElement } from 'react';
/** @jsx createElement */

/**
 * Container for tab sections. The children data is used by the parent ribbon's
 * logic to display the tabs to click and select.
 * @param {ReactNode} props.children, should only contain Tab elements
 * @param {string} props.selected tab key
 */
export default function Tabs({ children, selected }) {
	return (
		<div className="ribbon-section-container ribbon-core-sections">
			{Children.map(children, section => {
				if (section.props.altKey === selected) {
					return cloneElement(section, { hidden: false });
				}

				return section;
			})}
		</div>
	);
}

Tabs.propTypes = {
	selected: PropTypes.string,
	children: PropTypes.node,
};
