import { createElement, PropTypes } from 'react'; /** @jsx createElement */

/**
 * Defines a tab in the ribbon
 * @param {ReactNode} props.children
 * @param {any} props.id
 */
export default function Tab({ children, id, onClick, selected }) {
	const handleClick = onClick.bind(undefined, id);
	return (
		<button
			role="tab" aria-selected={selected === id}
			className="ribbon-tab" onClick={handleClick}
		>
			{children}
		</button>
	);
}

Tab.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	selected: PropTypes.string,
};
