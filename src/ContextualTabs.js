import { createElement, PropTypes, Children, cloneElement } from 'react';
/** @jsx createElement */
import TabGroup from './TabGroup.js';

export default function ContextualTabs({ children, selected }) {
	const flattened = [];
	Children.forEach(children, tabgroup => {
		const group = Children.map(tabgroup.props.children, section => {
			if (section.props.altKey === selected) {
				return cloneElement(section, { hidden: false });
			}

			return section;
		});
		flattened.push(...group);
	});

	return (
		<div className="ribbon-section-container ribbon-tab-group-section">
			{flattened}
		</div>
	);
}

ContextualTabs.propTypes = {
	selected: PropTypes.string,
	children(props, propName, componentName) {
		const children = Children.toArray(props[propName]);

		for (const { type } of children) {
			if (type !== TabGroup) {
				return new Error(`${componentName} can only contain TabGroups`);
			}
		}

		return null;
	},
};
