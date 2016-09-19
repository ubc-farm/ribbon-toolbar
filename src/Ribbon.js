import { createElement, PropTypes, PureComponent, cloneElement } from 'react';
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
			this.setState({ selected: id });
		}
	}

	render() {
		const props = Object.assign({}, this.props);
		Reflect.deleteProperty(props, 'defaultSelected');

		const childProps = Object.assign({}, this.state, { onClick: this.handleClick });

		const [tablist, ...children] = props.children;

		return (
			<form className="ribbon" {...props}>
				{cloneElement(tablist, childProps)}
				<section className="ribbon-section-container">
					{children.map(child => cloneElement(child, childProps))}
				</section>
			</form>
		);
	}
}
