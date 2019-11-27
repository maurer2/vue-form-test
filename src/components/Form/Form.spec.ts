import { shallowMount } from '@vue/test-utils';
import Form from './Form.vue';

describe('Form', () => {
  let wrapper: any;

  const mockedSubmitEvent = jest.fn();

  beforeEach(() => {
    wrapper = shallowMount(Form, {
      propsData: {},
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('Component matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Form contains child elements', () => {
    expect(wrapper.find('.wrapper').exists()).toBe(true);
    expect(wrapper.find('.title').exists()).toBe(true);
    expect(wrapper.find('.form').exists()).toBe(true);
    expect(wrapper.find('.hint').exists()).toBe(true);
    expect(wrapper.find('.button').exists()).toBe(true);
  });

  test('Form isSubmittable is only true for if all fields are true', () => {
    wrapper.setData({
      fieldsValidity: {
        firstName: false,
        lastName: false,
        email: false,
        customerQuery: false,
      },
    });

    expect(wrapper.vm.isSubmittable).toBe(false);

    wrapper.setData({
      fieldsValidity: {
        firstName: true,
        lastName: true,
        email: true,
        customerQuery: true,
      },
    });

    expect(wrapper.vm.isSubmittable).toBe(true);
  });

  test('Form does not emit "addNewEntry"-event if form is not submittable', () => {
    wrapper.setData({
      fieldsValidity: {
        firstName: false,
        lastName: false,
        email: false,
        customerQuery: false,
      },
    });

    wrapper.vm.handleSubmit();

    expect(wrapper.emitted('addNewEntry')).toBeFalsy();
  });

  test('Form does emit "addNewEntry"-event if form is submittable', () => {
    wrapper.setData({
      fieldsValidity: {
        firstName: true,
        lastName: true,
        email: true,
        customerQuery: true,
      },
    });

    wrapper.vm.handleSubmit();

    expect(wrapper.emitted('addNewEntry')).toBeTruthy();
  });

  test('Form handleSubmit event is fired on submit', () => {
    wrapper.setMethods({ handleSubmit: mockedSubmitEvent });
    wrapper.find('.form').trigger('submit');

    expect(mockedSubmitEvent).toBeCalled();
  });
});
