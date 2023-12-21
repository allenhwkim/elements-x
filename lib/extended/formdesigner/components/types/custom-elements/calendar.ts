export const calendarType = {
  isComponent: (el) => el.classList?.contains('x') && el.classList?.contains('calendar'),

  model: {
    defaults: {
      copyable: false,
      traits: [
        'id',
        'name',
        'title',
        { name: 'month-format', type: 'select', options: [ { value: 'long' }, { value: 'short' }, { value: 'narrow' } ] },
        { name: 'week-format', type: 'select',  options: [ { value: 'long' }, { value: 'short' }, { value: 'narrow' } ] },
        { name: 'week-format', type: 'select', options: [ { value: 'long' }, { value: 'short' }, { value: 'narrow' } ] },
        { name: 'date', type: 'text' },
        { name: 'locale', type: 'text' },
        { name: 'first-day-of-week', type: 'select', options: 
          [ 
            { text: 'Sunday', value: '0' }, 
            { text: 'Monday', value: '1' }, 
            { text: 'Saturday', value: '7' }
          ]
        },
        {name: 'required', type: 'checkbox'},
      ],
    },
  }
};