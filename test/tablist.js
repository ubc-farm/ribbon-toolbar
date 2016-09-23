import test from 'tape';
import { createElement } from 'react'; /** @jsx createElement */
import { shallow } from 'enzyme';
import { TabList, Tab, ContextualTabs } from '../src/index.js';

test('<Tab />', t => {
	let clicked = false;
	function handleClick() { clicked = true; }

	const tab = shallow(<Tab id="_" onClick={handleClick} />);

	t.equal(tab.name(), 'button', 'Tab is a button element');
	t.equal(tab.prop('role'), 'tab', 'Tab has "tab" aria role');
	t.equal(tab.prop('aria-selected'), false, 'Tab has false selected value');

	tab.setProps({ selected: '_' });
	t.equal(tab.prop('aria-selected'), true,
		'Tab is marked as selected when the selected prop is equal to the ID prop'
	);
	tab.setProps({ selected: 'foo' });
	t.equal(tab.prop('aria-selected'), false,
		'Tab is not marked as selected when the selected prop is not the ID prop'
	);

	const child = <div />;
	tab.setProps({ children: child });
	t.ok(tab.contains(child), 'Tab renders child nodes');

	tab.simulate('click');
	t.ok(clicked, 'Tab onClick function called on click');

	t.end();
});

test('<TabList />', t => {
	function handleClick() {}

	const tablist = shallow(
		<TabList selected="bar" onClick={handleClick}>
			<Tab id="a" />
			<Tab id="b" />
		</TabList>
	);
	const tabs = tablist.children();

	t.ok(tablist.is('nav[role="tablist"]'));
	t.equal(tabs.length, 2);

	for (let i = 0; i < tabs.length; i++) {
		const tab = tabs.at(i);
		t.equal(tab.prop('selected'), 'bar');
		t.equal(tab.prop('onClick'), handleClick);
	}

	t.end();
});

test('<TabList /> symbol selected', t => {
	const sym = Symbol();
	const tablist = shallow(
		<TabList selected={sym}>
			<Tab id="a" />
			<Tab id="b" />
		</TabList>
	);

	const tabs = tablist.children();

	for (let i = 0; i < tabs.length; i++) {
		const tab = tabs.at(i);
		t.equal(tab.prop('selected'), sym);
	}

	t.end();
});

test('<ContextualTabs />', t => {
	// TODO
	t.end();
});
