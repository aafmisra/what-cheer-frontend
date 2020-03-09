import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Home from './components/Home'
import Signup from './components/Signup';
import AuthForm from './components/AuthForm';


import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('home component', () => {
  // const user = {username: 'newuser', email: 'amisra218@gmail.com', password: 'hello123'}
  // it('should render as expected', () => {
  //   const component = shallow(<Home />)
  //   expect(component.contains('Welcome')).toBe(true);
  // })
  it('renders children when passed in', () => {
    const wrapper = render(
      <Signup />
    );
    expect(wrapper.contains(<AuthForm />)).to.equal(true);
  });

})

