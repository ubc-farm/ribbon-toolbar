import { createElement, PropTypes, Children, cloneElement } from 'react';
/** @jsx createElement */

/**
 * Defines a tab group in the ribbon, which can be hidden
 * @param {ReactNode} props.children
 * @param {ReactNode} props.title shown above the child tabs
 * @param {boolean} props.hidden - if true, the tab group is hidden
 * from user view and the contained tabs are disabled.
 */
const ContextualTabs = ({
	title, children, hidden, onClick, selected,
}) => (
	<fieldset	className="ribbon-tab-group" disabled={hidden} hidden={hidden}>
		<legend className="ribbon-tab-group-header">{title}</legend>
		{Children.map(children, tab => cloneElement(tab, { onClick, selected }))}
	</fieldset>
);

ContextualTabs.propTypes = {
	title: PropTypes.node,
	children: PropTypes.node,
	onClick: PropTypes.func.isRequired,
	hidden: PropTypes.bool,
	selected: PropTypes.string,
};

export default ContextualTabs;
