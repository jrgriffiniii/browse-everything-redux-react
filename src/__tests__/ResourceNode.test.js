import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
import ResourceNode from '../containers/ResourceNode';

it('renders the component on the DOM', () => {
  const resourceNode = mount(<ResourceNode classes={{root: 'bar'}} label="Foo" selected={false} />);
  expect(resourceNode).toBeTruthy;

  const container = resourceNode.find('.ResourceNode-root-1');
  expect(container).toHaveClassName('.ResourceNode-root-1');
});
