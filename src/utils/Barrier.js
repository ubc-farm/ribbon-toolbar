import { cloneElement, PropTypes } from 'react';

const IGNORE = ['selected', 'menuOpen', 'onClick', 'children'];

/**
 * Removes props added by the Ribbon. Used to wrap another component
 * to remove the Ribbon props. All other props are passed to the child.
 * @param {ReactNode} props.children
 */
const Barrier = passedProps => {
	const props = {};
	for (const key in passedProps) {
		if (!IGNORE.includes(key)
		&& Object.prototype.hasOwnProperty.call(passedProps, key)) {
			props[key] = passedProps[key];
		}
	}

	return cloneElement(passedProps.children, props);
};

Barrier.propTypes = { children: PropTypes.element.isRequired };

export default Barrier;
