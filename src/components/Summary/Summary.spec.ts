import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Summary from './Summary.vue';

const localVue = createLocalVue();
const mockedClickEvent = jest.fn();

localVue.use(Vuex);

describe('Summary', () => {
  let wrapper: any;
  let store: any;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        entries: [
          {
            firstName: 'Cat',
            lastName: 'Damon',
            email: 'catD@mon.com',
            customerQuery: '',
          },
          {
            firstName: 'Catrick',
            lastName: 'Swayze',
            email: 'catrick@swayze.com',
            customerQuery: '',
          },
        ],
      },
    });

    wrapper = shallowMount(Summary, {
      propsData: {},
      store,
      localVue,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test('Component matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Summary contains child elements', () => {
    expect(wrapper.find('.summary').exists()).toBe(true);
    expect(wrapper.find('.title').exists()).toBe(true);
    expect(wrapper.find('.list').exists()).toBe(true);
  });

  test('Summary element with the same index as activeEntry has .entry--is-active class', () => {
    wrapper.setData({ activeEntry: 1 });
    expect(wrapper.findAll('.entry').at(1).find('.entry--is-active').exists()).toBe(true);
    expect(wrapper.findAll('.entry').at(0).find('.entry--is-active').exists()).not.toBe(true);

    wrapper.setData({ activeEntry: 0 });
    expect(wrapper.findAll('.entry').at(0).find('.entry--is-active').exists()).toBe(true);
    expect(wrapper.findAll('.entry').at(1).find('.entry--is-active').exists()).not.toBe(true);
  });

  test('Summary has only one active element', () => {
    expect(wrapper.findAll('.entry--is-active').length).toBe(1);
  });

  test('Summary handleClick changes class to inactive when button is active', () => {
    wrapper.setData({ activeEntry: 1 });
    wrapper.findAll('.entry').at(1).find('.button').trigger('click');

    expect(wrapper.vm.activeEntry).toBe(-1);
  });

  test('Summary handleClick changes class to active when button is inactive', () => {
    wrapper.setData({ activeEntry: 0 });
    wrapper.findAll('.entry').at(1).find('.button').trigger('click');

    expect(wrapper.vm.activeEntry).toBe(1);
  });

  test('Summary handleClick method is called on click', () => {
    wrapper.setMethods({ handleClick: mockedClickEvent });
    wrapper.find('.entry > .button').trigger('click');

    expect(mockedClickEvent).toBeCalled();
  });
});
