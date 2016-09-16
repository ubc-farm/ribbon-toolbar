import { createElement, PropTypes, Children } from 'react';
/** @jsx createElement */

/**
 * The actual clickable tab element, not exposed to the consumer.
 * @param {function} props.onClick
 */
export default function InternalTab({
	onClick, children,
	checked = false, className = 'ribbon-tab',
	altKey, disabled,
}) {
	const handleClick = onClick.bind(undefined, altKey);
	return (
		<button
			type="button"
			className={className} onClick={handleClick}
			aria-pressed={checked} disabled={disabled}
		>
			{children}
		</button>
	);
}

InternalTab.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired,
	checked: PropTypes.bool,
	className: PropTypes.string,
	altKey: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
};

/**
 * Calculates the internal tab elements to represent
 * the tab sections inside the given Tabs element
 * @param {ReactElement} tabs - children of a Tabs element
 * @param {string} selected altKey
 * @param {function} onClick handler for the tabs.
 * Passed the tab altKey as argument.
 * @returns {ReactElement[]} internal tabs array.
 */
export function buildInternalTabs(tabs, selected, onTabClick) {
	return Children.map(tabs, section => {
		const { altKey, title } = section.props;
		return (
			<InternalTab
				onClick={onTabClick}
				checked={selected === altKey}
				altKey={altKey}
				key={altKey}
			>
				{title}
			</InternalTab>
		);
	});
}
