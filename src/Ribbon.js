import { createElement, PropTypes, Children, cloneElement } from 'react';
/** @jsx createElement */
import InternalTab, { buildInternalTabs } from './InternalTab.js';
import { buildContextualTabs } from './InternalTabGroup.js';

import { ApplicationMenu, Tabs, ContextualTabs, Header } from './index.js';

export default function Ribbon({
	selected, menuOpen,
	children, id = 'ribbon',
	onTabClick, onMenuClick,
}) {
	let appMenu = null;
	let coreTabSection = null;
	let contextualTabSection = null;
	let headerSection = null;
	Children.forEach(children, child => {
		const { type } = child;
		if (!appMenu && type === ApplicationMenu) {
			appMenu = cloneElement(child, { hidden: !menuOpen });
		} else if (!coreTabSection && type === Tabs) {
			coreTabSection = cloneElement(child, { selected });
		}	else if (!contextualTabSection && type === ContextualTabs) {
			contextualTabSection = cloneElement(child, { selected });
		}	else if (!headerSection && type === Header) {
			headerSection = child;
		}
	});

	return (
		<form id={id} className="ribbon">
			{headerSection}
			<nav className="ribbon-tabs">
				<InternalTab
					onClick={onMenuClick}
					checked={menuOpen}
					altKey={appMenu.props.altKey}
				>
					{appMenu.props.title}
				</InternalTab>
				{buildInternalTabs(coreTabSection.props.children, selected, onTabClick)}
				{buildContextualTabs(contextualTabSection, onTabClick)}
			</nav>
			<section className="ribbon-content">
				{appMenu}
				{coreTabSection}
				{contextualTabSection}
			</section>
		</form>
	);
}

Ribbon.propTypes = {
	children(props, propName, componentName) {
		const children = Children.toArray(props[propName]);

		if (children.length < 2) {
			return new Error(`${componentName} must have at least 2 children`);
		} else if (!children.find(({ type }) => type === ApplicationMenu)) {
			return new Error(`Could not find ApplicationMenu in ${componentName}`);
		} else if (!children.find(({ type }) => type === Tabs)) {
			return new Error(`Could not find Tabs section in ${componentName}`);
		}

		return null;
	},
	onTabClick: PropTypes.func.isRequired,
	onMenuClick: PropTypes.func.isRequired,
	selected: PropTypes.string,
	menuOpen: PropTypes.bool,
	id: PropTypes.string,
};
