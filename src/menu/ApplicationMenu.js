import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import Panel from '../Panel.js';
import menuId from './symbol.js';

/**
 * Defines a tab in the ribbon
 * @param {ReactNode} props.children
 * @param {string} props.id
 */
const ApplicationMenu = ({ children, menuOpen }) => (
	<Panel selected={menuOpen ? menuId : null} id={menuId} className="ribbon-app-menu">
		{children}
	</Panel>
);

ApplicationMenu.propTypes = {
	children: PropTypes.node,
	menuOpen: PropTypes.bool,
};

export default ApplicationMenu;
