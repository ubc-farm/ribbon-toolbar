import { createElement, PropTypes, Children } from 'react';
/** @jsx createElement */
import { buildInternalTabs } from './InternalTab.js';

export default function InternalTabGroup({ children, title, disabled }) {
	return (
		<fieldset
			className="ribbon-tab-group"
			disabled={disabled} hidden={disabled}
		>
			<legend className="ribbon-tab-group-header">{title}</legend>
			{children}
		</fieldset>
	);
}

InternalTabGroup.propTypes = {
	children: PropTypes.node,
	title: PropTypes.node,
	disabled: PropTypes.bool,
};

export function buildContextualTabs(contextualTabsElement, onTabClick) {
	if (!contextualTabsElement) return null;
	const { children, selected } = contextualTabsElement.props;

	return Children.map(children, ({ props }) => (
		<InternalTabGroup title={props.title} disabled={props.disabled}>
			{buildInternalTabs(props.children, selected, onTabClick)}
		</InternalTabGroup>
	));
}
