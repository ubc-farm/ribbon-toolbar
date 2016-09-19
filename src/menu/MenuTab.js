import { createElement, PropTypes } from 'react'; /** @jsx createElement */
import Tab from '../tablist/Tab.js';
import menuId from './symbol.js';

/**
 * @param {ReactNode} props.children
 */
const MenuTab = ({ children, menuOpen, onClick }) => (
	<Tab selected={menuOpen ? menuId : null} id={menuId} onClick={onClick}>
		{children}
	</Tab>
);

MenuTab.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func.isRequired,
	menuOpen: PropTypes.bool,
};

export default MenuTab;
