import { createElement, PropTypes } from 'react'; /** @jsx createElement */

/** Header container for the ribbon */
export default function Header(props) {
	return <header className="ribbon-header" {...props} />;
}

// eslint-disable-next-line jsx-a11y/heading-has-content
export const Title = props => <h1 className="ribbon-title" {...props} />;
Title.propTypes = { children: PropTypes.node.isRequired };

/**
 * Displays a help button for the ribbon
 */
export function HelpSection({ children }) {
	return (
		<div className="header-help-section">
			{children}
			<a
				aria-label="Help" title="Help"
				className="material-icons icon-button"
				href="https://github.com/ubc-farm/issues/issues"
			>
				help
			</a>
		</div>
	);
}
HelpSection.propTypes = { children: PropTypes.node };
