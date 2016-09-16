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

	if (appMenu === null) {
		throw new TypeError('Could not find ApplicationMenu section in Ribbon');
	}
	if (coreTabSection === null) {
		throw new TypeError('Could not find Tabs section in Ribbon');
	}

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
	selected: PropTypes.string,
	id: PropTypes.string,
	children: PropTypes.node,
	onTabClick: PropTypes.func.isRequired,
	onMenuClick: PropTypes.func.isRequired,
	menuOpen: PropTypes.bool,
};
