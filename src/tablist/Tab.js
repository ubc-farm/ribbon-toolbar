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
			type="button"
			role="tab" aria-selected={selected === id}
			className="ribbon-tab" onClick={handleClick}
		>
			{children}
		</button>
	);
}

Tab.propTypes = {
	children: PropTypes.node,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.symbol]).isRequired,
	onClick: PropTypes.func,
	selected: PropTypes.oneOfType([PropTypes.string, PropTypes.symbol]),
};
