import { createElement, PropTypes } from 'react';
/** @jsx createElement */

/**
 * @param {ReactNode} props.children
 * @param {string} props.id
 */
export default function Panel({ children, id, selected, className }) {
	const disabled = id !== selected;
	return (
		<fieldset
			className={className}
			disabled={disabled} hidden={disabled}
			role="tabpanel"
		>
			{children}
		</fieldset>
	);
}

Panel.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string.isRequired,
	selected: PropTypes.string,
	className: PropTypes.string,
};

Panel.defaultProps = { className: 'ribbon-section' };
