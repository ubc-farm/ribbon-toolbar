import { createElement, PropTypes, PureComponent, cloneElement, Children } from 'react';
/** @jsx createElement */
import menuId from './menu/symbol.js';

export default class Ribbon extends PureComponent {
	static get propTypes() {
		return {
			children: PropTypes.arrayOf(PropTypes.node).isRequired,
			defaultSelected: PropTypes.string,
		};
	}

	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);

		this.state = {
			menuOpen: false,
			selected: props.defaultSelected || null,
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

		return (
			<form className="ribbon" {...props}>
				{Children.map(props.children, child => cloneElement(child, childProps))}
			</form>
		);
	}
}
