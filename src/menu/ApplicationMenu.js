import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import Panel from '../Panel.js';
import menuId from './symbol.js';

/**
 * @param {ReactNode} props.children
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
