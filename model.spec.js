import Model from './model';

function createModel(data = [], options = {}) {
  return new Model({ 
    data, 
    ...options
  });
}

test('model is a class', () => {
  expect(createModel()).toBeInstanceOf(Model);
});

test('model structure', () => {
  expect(new Model).toEqual(expect.objectContaining({
    $collection: expect.any(Array),
    $options: expect.objectContaining({
      primaryKey: 'id'
    }),
    record: expect.any(Function),
    all: expect.any(Function),
    find: expect.any(Function),
    update: expect.any(Function),
    remove: expect.any(Function)
  })
  );
})

describe('record', () => {

  const newRecords = [{ id: 123, name: 'Amy' }, { name: 'Bob' }]

  test('record can add new record to collection', () => {
    const newModel = createModel();

    newModel.record(newRecords);

    expect(newModel.$collection).toEqual([
      newRecords[0],
      {
        id: expect.any(Number),
        name: newRecords[1].name
      }
    ]);
  })

  test('if passing value to Model, newModel gets value', () => {
    const spy = jest.spyOn(Model.prototype, 'record');
    const newModel = createModel(newRecords);
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  })
})

describe('all', () => {
  test('return empty model', () => {
    const newModel = createModel();
    expect(newModel.all()).toEqual([]);

  })

  test('return model data', () => {
    const newRecords = [{ id: 123, name: 'Amy' }, { id: 456, name: 'Bob' }];
    const newModel = createModel(newRecords);

    expect(newModel.all()).toEqual(newRecords);
    expect(newModel.all().length).toBe(2);
  })

  test('original data stays intact', () => {
    const newRecords = [{ id: 123, contact: { phone: 1234} }, { id: 456, contact: { phone: 5678}}];
    const newModel = createModel(newRecords);

    const data = newModel.all();
    data[0].contact.phone = 1111;
    data[0].id = '222';

    expect(newModel.$collection[0].contact.phone).toBe(1111);
    expect(newModel.$collection[0].id).toBe(123);
  })
})

describe('find', () => {
  const newRecords = [{ id: 123, contact: { phone: 1234} }, { id: 456, contact: { phone: 5678}}];

  test('return undefined if no record found', () => {
    const newModel = createModel();
    expect(newModel.find(123)).toEqual(null);
  })

  test('return record if found', () => {
    const newModel = createModel(newRecords);
    expect(newModel.find(123)).toEqual(newRecords[0]);
  })
})

describe('update', () => {
  const newRecords = [{ id: 123, name: 'Amy' }];
  let newModel = createModel()

  beforeEach(() => {
    const dataset = JSON.parse(JSON.stringify(newRecords));
    newModel = createModel(dataset);
  })

  test('update an existing record by id', () => {
    newModel.update(123, { name: 'Alice' }); 
    expect(newModel.find(123).name).toBe('Alice');
  })
 
  test('extend an existing record by id', () => {
    newModel.update(123, { isMan: false }); 

    expect(newModel.find(123)).toEqual(
      expect.objectContaining({
        name: 'Amy',
        isMan: false
      })
    );
  })

  test('return false if no record found', () => {
    expect(newModel.update(456, { name: 'Alice' })).toBe(false);
  })

})

describe('remove', () => {
  const newRecords = [{ id: 123, name: 'Amy' }, { id: 456, name: 'Bob' }];
  let newModel = createModel()

  beforeEach(() => {
    const dataset = JSON.parse(JSON.stringify(newRecords));
    newModel = createModel(dataset);
  })

  test('will remove object with given primaryKey', () => {
    newModel.remove(123);
    expect(newModel.all()).toEqual([{ id: 456, name: 'Bob' }]);
  })
})

describe('customization', () => {
  test('custom primary key', () => {
    const newModel = createModel([],{ 
      primaryKey: 'name'
    });
    expect(newModel.$options.primaryKey).toBe('name');
  })
})
