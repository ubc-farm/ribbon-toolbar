'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

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
	return react.createElement(
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
	onClick: react.PropTypes.func,
	children: react.PropTypes.node.isRequired,
	checked: react.PropTypes.bool,
	className: react.PropTypes.string,
	altKey: react.PropTypes.string.isRequired,
	disabled: react.PropTypes.bool
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
	return react.Children.map(tabs, section => {
		const { altKey, title } = section.props;
		return react.createElement(
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
	return react.createElement(
		'fieldset',
		{
			className: 'ribbon-tab-group',
			disabled: disabled, hidden: disabled
		},
		react.createElement(
			'legend',
			{ className: 'ribbon-tab-group-header' },
			title
		),
		children
	);
}

InternalTabGroup.propTypes = {
	children: react.PropTypes.node,
	title: react.PropTypes.node,
	disabled: react.PropTypes.bool
};

function buildContextualTabs(contextualTabsElement, onTabClick) {
	if (!contextualTabsElement) return null;
	const { children, selected } = contextualTabsElement.props;

	return react.Children.map(children, ({ props }) => react.createElement(
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
	react.Children.forEach(children, child => {
		const { type } = child;
		if (!appMenu && type === ApplicationMenu) {
			appMenu = react.cloneElement(child, { hidden: !menuOpen });
		} else if (!coreTabSection && type === Tabs) {
			coreTabSection = react.cloneElement(child, { selected });
		} else if (!contextualTabSection && type === ContextualTabs) {
			contextualTabSection = react.cloneElement(child, { selected });
		} else if (!headerSection && type === Header) {
			headerSection = child;
		}
	});

	return react.createElement(
		'form',
		{ id: id, className: 'ribbon' },
		headerSection,
		react.createElement(
			'nav',
			{ className: 'ribbon-tabs' },
			react.createElement(
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
		react.createElement(
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
		const children = react.Children.toArray(props[propName]);

		if (children.length < 2) {
			return new Error(`${ componentName } must have at least 2 children`);
		} else if (!children.find(({ type }) => type === ApplicationMenu)) {
			return new Error(`Could not find ApplicationMenu in ${ componentName }`);
		} else if (!children.find(({ type }) => type === Tabs)) {
			return new Error(`Could not find Tabs section in ${ componentName }`);
		}

		return null;
	},
	onTabClick: react.PropTypes.func.isRequired,
	onMenuClick: react.PropTypes.func.isRequired,
	selected: react.PropTypes.string,
	menuOpen: react.PropTypes.bool,
	id: react.PropTypes.string
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
class RibbonState extends react.PureComponent {
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
		return react.createElement(Ribbon, _extends({
			onTabClick: this.handleTabClick,
			onMenuClick: this.handleMenuClick
		}, this.state, this.props));
	}
}

/** @jsx createElement */

/** Header container for the ribbon */
function Header(props) {
	return react.createElement("header", _extends({ className: "ribbon-header" }, props));
}

// eslint-disable-next-line jsx-a11y/heading-has-content
const Title = props => react.createElement("h1", _extends({ className: "ribbon-title" }, props));
Title.propTypes = { children: react.PropTypes.node.isRequired };

/**
 * Displays a help button for the ribbon
 */
function HelpSection({ children }) {
	return react.createElement(
		"div",
		{ className: "header-help-section" },
		children,
		react.createElement(
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
HelpSection.propTypes = { children: react.PropTypes.node };

/** @jsx createElement */

/**
 * Used by the consumer to define tab sections,
 * and internally represents the contents of a ribbon section shown
 * when the given tab is active.
 */
const Tab = ({ children, hidden = true, className = 'ribbon-section' }) => react.createElement(
	'fieldset',
	{ className: className, hidden: hidden },
	children
);

Tab.propTypes = {
	altKey: react.PropTypes.string.isRequired,
	title: react.PropTypes.node.isRequired,
	children: react.PropTypes.node,
	hidden: react.PropTypes.bool,
	className: react.PropTypes.string
};

/** @jsx createElement */
function ApplicationMenu(props) {
	return react.createElement(Tab, _extends({ className: 'ribbon-app-menu' }, props));
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
	return react.createElement(
		"div",
		{ className: "ribbon-section-container ribbon-core-sections" },
		react.Children.map(children, section => {
			if (section.props.altKey === selected) {
				return react.cloneElement(section, { hidden: false });
			}

			return section;
		})
	);
}

Tabs.propTypes = {
	selected: react.PropTypes.string,
	children: react.PropTypes.node
};

function TabGroup() {
	return null;
}

TabGroup.propTypes = {
	selected: react.PropTypes.string,
	children: react.PropTypes.node,
	disabled: react.PropTypes.bool,
	title: react.PropTypes.node
};

/** @jsx createElement */
function ContextualTabs({ children, selected }) {
	const flattened = [];
	react.Children.forEach(children, tabgroup => {
		const group = react.Children.map(tabgroup.props.children, section => {
			if (section.props.altKey === selected) {
				return react.cloneElement(section, { hidden: false });
			}

			return section;
		});
		flattened.push(...group);
	});

	return react.createElement(
		'div',
		{ className: 'ribbon-section-container ribbon-tab-group-section' },
		flattened
	);
}

ContextualTabs.propTypes = {
	selected: react.PropTypes.string,
	children(props, propName, componentName) {
		const children = react.Children.toArray(props[propName]);

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
	return react.createElement(
		"div",
		{ className: "ribbon-menu-group", "data-label": title },
		children
	);
}

MenuGroup.propTypes = {
	title: react.PropTypes.string,
	children: react.PropTypes.node
};

exports['default'] = RibbonState;
exports.Header = Header;
exports.Title = Title;
exports.HelpSection = HelpSection;
exports.ApplicationMenu = ApplicationMenu;
exports.Tabs = Tabs;
exports.ContextualTabs = ContextualTabs;
exports.Tab = Tab;
exports.TabGroup = TabGroup;
exports.MenuGroup = MenuGroup;
//# sourceMappingURL=ribbon.cjs.js.map
