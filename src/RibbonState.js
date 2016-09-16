import { createElement, PureComponent } from 'react'; /** @jsx createElement */
import Ribbon from './Ribbon.js';

export default class RibbonState extends PureComponent {
	constructor(props) {
		super(props);

		this.handleTabClick = this.handleTabClick.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
		this.state = { selected: null, menuOpen: false };
	}

	handleTabClick(altKey) {
		this.setState({ selected: altKey });
	}
	handleMenuClick() {
		this.setState({ menuOpen: !this.state.menuOpen });
	}

	render() {
		return (
			<Ribbon
				onTabClick={this.handleTabClick}
				onMenuClick={this.handleMenuClick}
				{...this.state} {...this.props}
			/>
		);
	}
}
