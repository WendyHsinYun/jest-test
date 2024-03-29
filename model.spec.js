import Model from './model';

test('model is a class', () => {
  expect(new Model).toBeInstanceOf(Model);
});

test('model structure', () => {
  expect(new Model).toEqual(expect.objectContaining({
    $collection: expect.any(Array),
    record: expect.any(Function),
    all: expect.any(Function),
    find: expect.any(Function),
    update: expect.any(Function),
  })
  );
})

describe('record', () => {
  const newRecords = [{ id: '123', name: 'Amy' }, { id: '456', name: 'Bob' }];
  
  test('record can add new record to collection', () => {
    const newModel = new Model();
    newModel.record(newRecords)
    expect(newModel.$collection).toEqual(newRecords);
  })

  test('if passing value to Model, newModel gets value', () => {
    const spy = jest.spyOn(Model.prototype, 'record');
    const newModel = new Model(newRecords);

    expect(spy).toHaveBeenCalled();

    expect(newModel.$collection).toEqual(newRecords);

    spy.mockRestore();
  }

  )}
  )

