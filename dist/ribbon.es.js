import { cloneElement, Children, createElement, PropTypes, PureComponent } from 'react';

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
class Ribbon extends PureComponent {
	static get propTypes() {
		return {
			children: PropTypes.arrayOf(PropTypes.node).isRequired,
			defaultSelected: PropTypes.string
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

		return createElement(
			'form',
			_extends({ className: 'ribbon' }, props),
			Children.map(props.children, child => cloneElement(child, childProps))
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
	return createElement(
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
	children: PropTypes.node,
	id: PropTypes.string.isRequired,
	selected: PropTypes.string,
	className: PropTypes.string
};

Panel.defaultProps = { className: 'ribbon-section' };

/** @jsx createElement */

/**
 * Container for the ribbon tab elements
 * @param {ReactNode} props.children
 */
const TabList = ({ children, onClick, selected, menuOpen }) => createElement(
	"nav",
	{ className: "ribbon-tabs", role: "tablist" },
	Children.map(children, tab => cloneElement(tab, { onClick, selected, menuOpen }))
);

TabList.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	selected: PropTypes.string,
	menuOpen: PropTypes.bool
};

/** @jsx createElement */

/**
 * Defines a tab in the ribbon
 * @param {ReactNode} props.children
 * @param {any} props.id
 */
function Tab({ children, id, onClick, selected }) {
	const handleClick = onClick.bind(undefined, id);
	return createElement(
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
	children: PropTypes.node,
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	selected: PropTypes.string
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
}) => createElement(
	"fieldset",
	{ className: "ribbon-tab-group", disabled: hidden, hidden: hidden },
	createElement(
		"legend",
		{ className: "ribbon-tab-group-header" },
		title
	),
	Children.map(children, tab => cloneElement(tab, { onClick, selected }))
);

ContextualTabs.propTypes = {
	title: PropTypes.node,
	children: PropTypes.node,
	onClick: PropTypes.func,
	hidden: PropTypes.bool,
	selected: PropTypes.string
};

/** @jsx createElement */
/**
 * @param {ReactNode} props.children
 */
const MenuTab = ({ children, menuOpen, onClick }) => createElement(
	Tab,
	{ selected: menuOpen ? menuId : null, id: menuId, onClick: onClick },
	children
);

MenuTab.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func.isRequired,
	menuOpen: PropTypes.bool
};

/** @jsx createElement */
/**
 * @param {ReactNode} props.children
 */
const ApplicationMenu = ({ children, menuOpen }) => createElement(
	Panel,
	{ selected: menuOpen ? menuId : null, id: menuId, className: 'ribbon-app-menu' },
	children
);

ApplicationMenu.propTypes = {
	children: PropTypes.node,
	menuOpen: PropTypes.bool
};

/** @jsx createElement */

/**
 * Helper for use inside Panels.
 */
const MenuGroup = ({ children, title }) => createElement(
	"div",
	{ className: "ribbon-menu-group", "data-label": title },
	children
);

MenuGroup.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string
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

	return cloneElement(passedProps.children, props);
};

Barrier.propTypes = { children: PropTypes.element.isRequired };

export { Panel, TabList, Tab, ContextualTabs, MenuTab, ApplicationMenu, MenuGroup, Barrier };export default Ribbon;
//# sourceMappingURL=ribbon.es.js.map
