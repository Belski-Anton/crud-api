import { User, userModel } from '../../models/userModel';

describe('userModel', () => {
  afterEach(() => {
    const users = userModel.getAll() as User[];
    users.length = 0;
  });

  test('create() adds new user', () => {
    const user = userModel.create({
      username: 'Test',
      age: 22,
      hobbies: ['coding'],
    });

    expect(user).toHaveProperty('id');
    expect(user.username).toBe('Test');
    expect(userModel.getAll().length).toBe(1);
  });

  test('getById() returns user by ID', () => {
    const user = userModel.create({
      username: 'FindMe',
      age: 20,
      hobbies: [],
    });

    const found = userModel.getById(user.id);
    expect(found).toEqual(user);
  });

  test('update() modifies existing user', () => {
    const user = userModel.create({
      username: 'Old',
      age: 21,
      hobbies: [],
    });

    const updated = userModel.update(user.id, {
      username: 'New',
      age: 22,
      hobbies: ['testing'],
    });

    expect(updated?.username).toBe('New');
    expect(updated?.age).toBe(22);
  });

  test('delete() removes user', () => {
    const user = userModel.create({
      username: 'DeleteMe',
      age: 30,
      hobbies: [],
    });

    const result = userModel.delete(user.id);
    expect(result).toBe(true);
    expect(userModel.getById(user.id)).toBeUndefined();
  });
});
