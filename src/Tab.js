import { createElement, PropTypes } from 'react'; /** @jsx createElement */

/**
 * Used by the consumer to define tab sections,
 * and internally represents the contents of a ribbon section shown
 * when the given tab is active.
 */
const Tab = ({ children, hidden = true, className = 'ribbon-section' }) => (
	<fieldset className={className} hidden={hidden}>
		{children}
	</fieldset>
);

Tab.propTypes = {
	altKey: PropTypes.string.isRequired,
	title: PropTypes.node.isRequired,
	children: PropTypes.node,
	hidden: PropTypes.bool,
	className: PropTypes.string,
};

export default Tab;
