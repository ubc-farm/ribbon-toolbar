import { createElement, PureComponent, cloneElement, Children, PropTypes } from 'react';

/** @jsx createElement */

/**
 * The actual clickable tab element, not exposed to the consumer.
 * @param {function} props.onClick
 */
function InternalTab({
	onClick, children,
	checked = false, className = 'ribbon-tab',
	altKey, disabled
}) {
	const handleClick = onClick.bind(undefined, altKey);
	return createElement(
		'button',
		{
			type: 'button',
			className: className, onClick: handleClick,
			'aria-pressed': checked, disabled: disabled
		},
		children
	);
}

InternalTab.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired,
	checked: PropTypes.bool,
	className: PropTypes.string,
	altKey: PropTypes.string.isRequired,
	disabled: PropTypes.bool
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
function buildInternalTabs(tabs, selected, onTabClick) {
	return Children.map(tabs, section => {
		const { altKey, title } = section.props;
		return createElement(
			InternalTab,
			{
				onClick: onTabClick,
				checked: selected === altKey,
				altKey: altKey,
				key: altKey
			},
			title
		);
	});
}

/** @jsx createElement */
function InternalTabGroup({ children, title, disabled }) {
	return createElement(
		'fieldset',
		{
			className: 'ribbon-tab-group',
			disabled: disabled, hidden: disabled
		},
		createElement(
			'legend',
			{ className: 'ribbon-tab-group-header' },
			title
		),
		children
	);
}

InternalTabGroup.propTypes = {
	children: PropTypes.node,
	title: PropTypes.node,
	disabled: PropTypes.bool
};

function buildContextualTabs(contextualTabsElement, onTabClick) {
	if (!contextualTabsElement) return null;
	const { children, selected } = contextualTabsElement.props;

	return Children.map(children, ({ props }) => createElement(
		InternalTabGroup,
		{ title: props.title, disabled: props.disabled },
		buildInternalTabs(props.children, selected, onTabClick)
	));
}

/** @jsx createElement */
function Ribbon({
	selected, menuOpen,
	children, id = 'ribbon',
	onTabClick, onMenuClick
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
		} else if (!contextualTabSection && type === ContextualTabs) {
			contextualTabSection = cloneElement(child, { selected });
		} else if (!headerSection && type === Header) {
			headerSection = child;
		}
	});

	return createElement(
		'form',
		{ id: id, className: 'ribbon' },
		headerSection,
		createElement(
			'nav',
			{ className: 'ribbon-tabs' },
			createElement(
				InternalTab,
				{
					onClick: onMenuClick,
					checked: menuOpen,
					altKey: appMenu.props.altKey
				},
				appMenu.props.title
			),
			buildInternalTabs(coreTabSection.props.children, selected, onTabClick),
			buildContextualTabs(contextualTabSection, onTabClick)
		),
		createElement(
			'section',
			{ className: 'ribbon-content' },
			appMenu,
			coreTabSection,
			contextualTabSection
		)
	);
}

Ribbon.propTypes = {
	children(props, propName, componentName) {
		const children = Children.toArray(props[propName]);

		if (children.length < 2) {
			return new Error(`${ componentName } must have at least 2 children`);
		} else if (!children.find(({ type }) => type === ApplicationMenu)) {
			return new Error(`Could not find ApplicationMenu in ${ componentName }`);
		} else if (!children.find(({ type }) => type === Tabs)) {
			return new Error(`Could not find Tabs section in ${ componentName }`);
		}

		return null;
	},
	onTabClick: PropTypes.func.isRequired,
	onMenuClick: PropTypes.func.isRequired,
	selected: PropTypes.string,
	menuOpen: PropTypes.bool,
	id: PropTypes.string
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/** @jsx createElement */
class RibbonState extends PureComponent {
	constructor(props) {
		super(props);

		this.handleTabClick = this.handleTabClick.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.state = { selected: 'h', menuOpen: false };
	}

	handleTabClick(altKey) {
		this.setState({ selected: altKey });
	}
	handleMenuClick() {
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	render() {
		return createElement(Ribbon, _extends({
			onTabClick: this.handleTabClick,
			onMenuClick: this.handleMenuClick
		}, this.state, this.props));
	}
}

/** @jsx createElement */

/** Header container for the ribbon */
function Header(props) {
	return createElement("header", _extends({ className: "ribbon-header" }, props));
}

// eslint-disable-next-line jsx-a11y/heading-has-content
const Title = props => createElement("h1", _extends({ className: "ribbon-title" }, props));
Title.propTypes = { children: PropTypes.node.isRequired };

/**
 * Displays a help button for the ribbon
 */
function HelpSection({ children }) {
	return createElement(
		"div",
		{ className: "header-help-section" },
		children,
		createElement(
			"a",
			{
				"aria-label": "Help", title: "Help",
				className: "material-icons icon-button",
				href: "https://github.com/ubc-farm/issues/issues"
			},
			"help"
		)
	);
}
HelpSection.propTypes = { children: PropTypes.node };

/** @jsx createElement */

/**
 * Used by the consumer to define tab sections,
 * and internally represents the contents of a ribbon section shown
 * when the given tab is active.
 */
const Tab = ({ children, hidden = true, className = 'ribbon-section' }) => createElement(
	'fieldset',
	{ className: className, hidden: hidden },
	children
);

Tab.propTypes = {
	altKey: PropTypes.string.isRequired,
	title: PropTypes.node.isRequired,
	children: PropTypes.node,
	hidden: PropTypes.bool,
	className: PropTypes.string
};

/** @jsx createElement */
function ApplicationMenu(props) {
	return createElement(Tab, _extends({ className: 'ribbon-app-menu' }, props));
}

ApplicationMenu.defaultProps = {
	title: 'File',
	altKey: 'f'
};

/** @jsx createElement */

/**
 * Container for tab sections. The children data is used by the parent ribbon's
 * logic to display the tabs to click and select.
 * @param {ReactNode} props.children, should only contain Tab elements
 * @param {string} props.selected tab key
 */
function Tabs({ children, selected }) {
	return createElement(
		"div",
		{ className: "ribbon-section-container ribbon-core-sections" },
		Children.map(children, section => {
			if (section.props.altKey === selected) {
				return cloneElement(section, { hidden: false });
			}

			return section;
		})
	);
}

Tabs.propTypes = {
	selected: PropTypes.string,
	children: PropTypes.node
};

function TabGroup() {
	return null;
}

TabGroup.propTypes = {
	selected: PropTypes.string,
	children: PropTypes.node,
	disabled: PropTypes.bool,
	title: PropTypes.node
};

/** @jsx createElement */
function ContextualTabs({ children, selected }) {
	const flattened = [];
	Children.forEach(children, tabgroup => {
		const group = Children.map(tabgroup.props.children, section => {
			if (section.props.altKey === selected) {
				return cloneElement(section, { hidden: false });
			}

			return section;
		});
		flattened.push(...group);
	});

	return createElement(
		'div',
		{ className: 'ribbon-section-container ribbon-tab-group-section' },
		flattened
	);
}

ContextualTabs.propTypes = {
	selected: PropTypes.string,
	children(props, propName, componentName) {
		const children = Children.toArray(props[propName]);

		for (const { type } of children) {
			if (type !== TabGroup) {
				return new Error(`${ componentName } can only contain TabGroups`);
			}
		}

		return null;
	}
};

/** @jsx createElement */

function MenuGroup({ children, title }) {
	return createElement(
		"div",
		{ className: "ribbon-menu-group", "data-label": title },
		children
	);
}

MenuGroup.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node
};

export { Header, Title, HelpSection, ApplicationMenu, Tabs, ContextualTabs, Tab, TabGroup, MenuGroup };export default RibbonState;
//# sourceMappingURL=ribbon.es.js.map
