'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var menuId = Symbol('ApplicationMenu');

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
class Ribbon extends react.PureComponent {
	static get propTypes() {
		return {
			children: react.PropTypes.arrayOf(react.PropTypes.node).isRequired,
			defaultSelected: react.PropTypes.string
		};
	}

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			menuOpen: false,
			selected: props.defaultSelected || null
		};
	}

	handleClick(id) {
		if (id === menuId) {
			this.setState({ menuOpen: !this.state.menuOpen });
		} else {
			if (id === this.state.selected) {
				this.setState({ selected: this.props.defaultSelected });
			}
			this.setState({ selected: id });
		}
	}

	render() {
		const props = Object.assign({}, this.props);
		Reflect.deleteProperty(props, 'defaultSelected');

		const { selected, menuOpen } = this.state;
		const childProps = { selected, menuOpen, onClick: this.handleClick };

		return react.createElement(
			'form',
			_extends({ className: 'ribbon' }, props),
			react.Children.map(props.children, child => react.cloneElement(child, childProps))
		);
	}
}

/** @jsx createElement */

/**
 * @param {ReactNode} props.children
 * @param {string} props.id
 */
function Panel({ children, id, selected, className }) {
	const disabled = id !== selected;
	return react.createElement(
		'fieldset',
		{
			className: className,
			disabled: disabled, hidden: disabled,
			role: 'tabpanel'
		},
		children
	);
}

Panel.propTypes = {
	children: react.PropTypes.node,
	id: react.PropTypes.string.isRequired,
	selected: react.PropTypes.string,
	className: react.PropTypes.string
};

Panel.defaultProps = { className: 'ribbon-section' };

/** @jsx createElement */

/**
 * Container for the ribbon tab elements
 * @param {ReactNode} props.children
 */
const TabList = ({ children, onClick, selected, menuOpen }) => react.createElement(
	"nav",
	{ className: "ribbon-tabs", role: "tablist" },
	react.Children.map(children, tab => react.cloneElement(tab, { onClick, selected, menuOpen }))
);

TabList.propTypes = {
	children: react.PropTypes.node,
	onClick: react.PropTypes.func,
	selected: react.PropTypes.string,
	menuOpen: react.PropTypes.bool
};

/** @jsx createElement */

/**
 * Defines a tab in the ribbon
 * @param {ReactNode} props.children
 * @param {any} props.id
 */
function Tab({ children, id, onClick, selected }) {
	const handleClick = onClick.bind(undefined, id);
	return react.createElement(
		"button",
		{
			type: "button",
			role: "tab", "aria-selected": selected === id,
			className: "ribbon-tab", onClick: handleClick
		},
		children
	);
}

Tab.propTypes = {
	children: react.PropTypes.node,
	id: react.PropTypes.string.isRequired,
	onClick: react.PropTypes.func,
	selected: react.PropTypes.string
};

/** @jsx createElement */

/**
 * Defines a tab group in the ribbon, which can be hidden
 * @param {ReactNode} props.children
 * @param {ReactNode} props.title shown above the child tabs
 * @param {boolean} props.hidden - if true, the tab group is hidden
 * from user view and the contained tabs are disabled.
 */
const ContextualTabs = ({
	title, children, hidden, onClick, selected
}) => react.createElement(
	"fieldset",
	{ className: "ribbon-tab-group", disabled: hidden, hidden: hidden },
	react.createElement(
		"legend",
		{ className: "ribbon-tab-group-header" },
		title
	),
	react.Children.map(children, tab => react.cloneElement(tab, { onClick, selected }))
);

ContextualTabs.propTypes = {
	title: react.PropTypes.node,
	children: react.PropTypes.node,
	onClick: react.PropTypes.func,
	hidden: react.PropTypes.bool,
	selected: react.PropTypes.string
};

/** @jsx createElement */
/**
 * @param {ReactNode} props.children
 */
const MenuTab = ({ children, menuOpen, onClick }) => react.createElement(
	Tab,
	{ selected: menuOpen ? menuId : null, id: menuId, onClick: onClick },
	children
);

MenuTab.propTypes = {
	children: react.PropTypes.node,
	onClick: react.PropTypes.func.isRequired,
	menuOpen: react.PropTypes.bool
};

/** @jsx createElement */
/**
 * @param {ReactNode} props.children
 */
const ApplicationMenu = ({ children, menuOpen }) => react.createElement(
	Panel,
	{ selected: menuOpen ? menuId : null, id: menuId, className: 'ribbon-app-menu' },
	children
);

ApplicationMenu.propTypes = {
	children: react.PropTypes.node,
	menuOpen: react.PropTypes.bool
};

/** @jsx createElement */

/**
 * Helper for use inside Panels.
 */
const MenuGroup = ({ children, title }) => react.createElement(
	"div",
	{ className: "ribbon-menu-group", "data-label": title },
	children
);

MenuGroup.propTypes = {
	children: react.PropTypes.node,
	title: react.PropTypes.string
};

const IGNORE = ['selected', 'menuOpen', 'onClick', 'children'];

/**
 * Removes props added by the Ribbon. Used to wrap another component
 * to remove the Ribbon props. All other props are passed to the child.
 * @param {ReactNode} props.children
 */
const Barrier = passedProps => {
	const props = {};
	for (const key in passedProps) {
		if (!IGNORE.includes(key) && Object.prototype.hasOwnProperty.call(passedProps, key)) {
			props[key] = passedProps[key];
		}
	}

	return react.cloneElement(passedProps.children, props);
};

Barrier.propTypes = { children: react.PropTypes.element.isRequired };

exports['default'] = Ribbon;
exports.Panel = Panel;
exports.TabList = TabList;
exports.Tab = Tab;
exports.ContextualTabs = ContextualTabs;
exports.MenuTab = MenuTab;
exports.ApplicationMenu = ApplicationMenu;
exports.MenuGroup = MenuGroup;
exports.Barrier = Barrier;
//# sourceMappingURL=ribbon.cjs.js.map
