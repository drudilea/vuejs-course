import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter';

describe('Counter Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter);
  });

  //   test('should match the snapshot', () => {
  //     const wrapper = shallowMount(Counter);
  //     expect(wrapper.html()).toMatchSnapshot();
  //   });

  test('should render an h2 element with default value', () => {
    const h2 = wrapper.find('h2');
    expect(h2.text()).toBe('Counter');
  });

  test('p value should be 100 by default', () => {
    const value = wrapper.find('[data-testid="counter"]');

    expect(value.text()).toBe('5');
  });

  test('should increase and decrease the counter', async () => {
    const value = wrapper.find('[data-testid="counter"]');
    const [decreaseBtn, increaseBtn] = wrapper.findAll('button');

    await increaseBtn.trigger('click');
    expect(value.text()).toBe('6');

    await decreaseBtn.trigger('click');
    await decreaseBtn.trigger('click');
    expect(value.text()).toBe('4');
  });

  test('should set the default value', () => {
    const { start } = wrapper.props();

    const value = wrapper.find('[data-testid="counter"]');
    expect(Number(value.text())).toBe(start);
  });

  test('should render the title prop', () => {
    const title = 'Hola Mundo';
    const wrapper = shallowMount(Counter, {
      props: {
        title,
      },
    });

    expect(wrapper.find('h2').text()).toBe(title);
  });
});
