import db from '../server/topicsDb';

describe('topics database', function () {

  it('should result be possible to add a new topic to the database', function () {
    expect(function () {
      db.createTopic('hello', 'world');
    }).not.toThrow();
  });

});