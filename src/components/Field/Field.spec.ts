import { shallowMount } from '@vue/test-utils';
import Field from 'components/Field/Field.vue';

describe('Field', () => {
  let wrapper: any;

  const mockedInputEvent = jest.fn();

  beforeEach(() => {
    wrapper = shallowMount(Field, {
      propsData: {
        name: 'name',
        id: 'id',
        label: 'label',
        value: 'value',
        placeholder: 'placeholder',
        isValid: true,
        isRequired: true,
        type: 'text',
      },
      attachToDocument: true,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('Component matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Field contains child elements', () => {
    expect(wrapper.find('.field').exists()).toBe(true);
    expect(wrapper.find('.label').exists()).toBe(true);
    expect(wrapper.find('.input').exists()).toBe(true);
  });

  test('Field label has correct attributes', () => {
    expect(wrapper.find('.label').attributes('for')).toBe('id');
    expect(wrapper.find('.label').classes()).toContain('label');
  });

  test('Field label only has "label--is-required" if required prop is set', () => {
    wrapper.setProps({ isRequired: true });
    expect(wrapper.find('.label').classes()).toContain('label--is-required');

    wrapper.setProps({ isRequired: false });
    expect(wrapper.find('.label').classes()).not.toContain('label--is-required');
  });

  test('Field input has correct attributes', () => {
    expect(wrapper.find('.input').attributes('name')).toBe('name');
    expect(wrapper.find('.input').attributes('id')).toBe('id');
    expect(wrapper.find('.input').attributes('type')).toBe('text');
    expect(wrapper.find('.input').attributes('placeholder')).toBe('placeholder');
    expect(wrapper.find('.input').attributes('required')).toBe('required');
    expect(wrapper.find('.input').classes()).toContain('input');
  });

  test('Field label only has required-attribute if required prop is set', () => {
    wrapper.setProps({ isRequired: true });
    expect(wrapper.find('.input').attributes('required')).toBe('required');

    wrapper.setProps({ isRequired: false });
    expect(wrapper.find('.label').attributes('required')).not.toBe('required');
  });

  test('Field error element is only shown if field is invalid and user has made a previous input', () => {
    wrapper.setData({ userHasInteractedWithForm: true });

    wrapper.setProps({ isValid: true });
    expect(wrapper.find('.error').exists()).toBe(false);

    wrapper.setProps({ isValid: false });
    expect(wrapper.find('.error').exists()).toBe(true);
  });

  test('Field error element is not shown if field is invalid and user has not interacted with field', () => {
    wrapper.setData({ userHasInteractedWithForm: false });

    wrapper.setProps({ isValid: true });
    expect(wrapper.find('.error').exists()).toBe(false);

    wrapper.setProps({ isValid: false });
    expect(wrapper.find('.error').exists()).toBe(false);
  });

  test('Field handleInput method is called on input', () => {
    wrapper.setMethods({ handleInput: mockedInputEvent });
    wrapper.find('.input').trigger('input');

    expect(mockedInputEvent).toBeCalled();
  });

  test('Field handleInput method emits an event to parent', () => {
    wrapper.find('.input').trigger('input');

    expect(wrapper.emitted('input')).toBeTruthy();
  });

  test.skip('Field isValidTextField returns correct value', () => {
    wrapper.vm.isValidTextField('test').toBe(true);
    wrapper.vm.isValidTextField('test test test').toBe(true);
    wrapper.isValidTextField('12345').toBe(true);
    wrapper.isValidTextField('').toBe(false);
  });

  test.skip('Field isValidEmailField returns correct value', () => {
    wrapper.vm.isValidEmailField('test').toBe(false);
    wrapper.vm.isValidEmailField('test test test').toBe(false);
    wrapper.vm.isValidEmailField('12345').toBe(false);
    wrapper.vm.isValidEmailField('').toBe(false);
    wrapper.vm.isValidEmailField('aaa@wefewf.com').toBe(true);
    wrapper.vm.isValidEmailField('aaa.wefwef@wefewf.com').toBe(true);
  });
});
