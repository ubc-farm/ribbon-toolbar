import test from 'tape';
import { createElement } from 'react'; /** @jsx createElement */
import { shallow } from 'enzyme';
import { Panel } from '../src/index.js';

test('<Panel />', t => {
	const panel = shallow(<Panel id="foo" selected="foo" />);
	t.equal(panel.prop('disabled'), false);
	t.equal(panel.prop('hidden'), false);

	panel.setProps({ selected: 'bar' });
	t.equal(panel.prop('disabled'), true);
	t.equal(panel.prop('hidden'), true);

	t.end();
});
