import { shallowMount } from '@vue/test-utils';
import Indecision from '@/components/Indecision';

describe('Indecision Component', () => {
  let wrapper;
  let clgSpy;
  let getAnswerSpy;

  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          answer: 'yes',
          forced: false,
          image: 'https://yesno.wtf/assets/yes/2.gif',
        }),
    })
  );

  beforeEach(() => {
    wrapper = shallowMount(Indecision);
    clgSpy = jest.spyOn(console, 'log');
    getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
  });

  test('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should not fetch the api when writing any letter (console.log)', async () => {
    const input = wrapper.find('[data-testid="question"]');
    await input.setValue('Hola Mundo');
    expect(clgSpy).toHaveBeenCalled();
    expect(getAnswerSpy).not.toHaveBeenCalled();
  });

  test('should fetch the api when writing "?"', async () => {
    const input = wrapper.find('[data-testid="question"]');
    await input.setValue('Hola Mundo?');
    expect(getAnswerSpy).toHaveBeenCalled();
  });

  test('getAnswer testing', async () => {
    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');
    expect(img.exists()).toBeTruthy();
    expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif');
    expect(wrapper.vm.answer).toBe('Si');
  });

  test('getAnswer testing - API error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API is down'));
    await wrapper.vm.getAnswer();

    const img = wrapper.find('img');
    expect(img.exists()).toBeFalsy();
    expect(wrapper.vm.answer).toBe('No se pudo cargar del API');
  });
});
