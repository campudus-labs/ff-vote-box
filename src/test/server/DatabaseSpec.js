import config from '../server/config';
import fs from 'fs';

describe('topics database', () => {
  let db = null;

  beforeEach(() => {
    fs.unlinkSync('db-topics-test.json');
    config.topicsDb = 'db-topics-test.json';
    db = require('../server/topicsDb');
  });

  it('should result be possible to add a new topic to the database', () => {
    let obj = null;
    expect(() => {
      obj = db.createTopic('hello', 'world');
    }).not.toThrow();

    expect(db.getTopic(obj.id)).toEqual({
      id : obj.id,
      title : 'hello',
      description : 'world'
    });
  });

});