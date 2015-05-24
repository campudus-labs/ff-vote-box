import config from '../server/config';
import Database from '../server/topicsDb';
import fs from 'fs';

describe('topics database', () => {
  let db = null;

  beforeEach(() => {
    try {
      fs.unlinkSync('db-topics-test.json');
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }
    config.topicsDb = 'db-topics-test.json';
    db = new Database(config.topicsDb, {autosave : true, async : false});
  });

  it('should have an empty list of topics at the beginning', () => {
    expect(db.getTopics().length).toBe(0);
  });

  it('should have a list of the created topics', () => {
    expect(db.getTopics().length).toBe(0);

    db.createTopic('hello', 'world');
    db.createTopic('hello2', 'world2');

    expect(db.getTopics().length).toBe(2);
  });

  it('should be possible to add a new topic', () => {
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

  it('should be possible to update a topic', () => {
    let topic = db.createTopic('hello', 'world');
    let title = 'hello2';
    let description = 'world2';

    expect(() => {
      db.updateTopic(topic.id, title, description);
    }).not.toThrow();

    expect(db.getTopic(topic.id)).toEqual({
      id : topic.id,
      title : title,
      description : description
    });
  });

  it('should be possible to delete a topic', () => {
    let topic = db.createTopic('hello', 'world');

    expect(db.getTopics().length).toBe(1);

    expect(() => {
      db.deleteTopic(topic.id);
    }).not.toThrow();

    expect(db.getTopics().length).toBe(0);
  });

  it('should be possible to add a new idea to a topic', () => {
    let topic = db.createTopic('hello', 'world');
    let title = 'Some idea';
    let description = 'With a great description';
    let idea = null;

    expect(() => {
      idea = db.createIdea(topic.id, title, description);
    }).not.toThrow();

    expect(db.getIdea(idea.id)).toEqual({
      id : idea.id,
      topicId : topic.id,
      title : title,
      description : description,
      votes : 0
    });
  });

  it('should be possible to list all ideas for a topic', () => {
    let topic = db.createTopic('hello', 'world');
    let idea1 = db.createIdea(topic.id, 'hello1', 'world');
    let idea2 = db.createIdea(topic.id, 'hello2', 'world');
    let idea3 = db.createIdea(topic.id, 'hello3', 'world');

    expect(db.getIdeas(topic.id).length).toBe(3);
    expect(db.getIdeas(topic.id)).toEqual([idea1, idea2, idea3]);
  });

  it('should be possible to update an idea', () => {
    let topic = db.createTopic('hello', 'world');
    let title = 'hello';
    let description = 'description';
    let idea = db.createIdea(topic.id, title, 'world');

    expect(db.updateIdea(idea.id, title, description)).toEqual({
      id : idea.id,
      topicId : topic.id,
      title : title,
      description : description,
      votes : 0
    });
  });

  it('should be possible to delete an idea', () => {
    let topic = db.createTopic('hello', 'world');
    let idea1 = db.createIdea(topic.id, 'hello', 'idea');
    let idea2 = db.createIdea(topic.id, 'hello', 'idea2');

    expect(db.getIdeas(topic.id).length).toBe(2);

    expect(() => {
      db.deleteIdea(idea1.id)
    }).not.toThrow();

    expect(db.getIdeas(topic.id).length).toBe(1);
  });

  it('should be possible to vote for an idea', () => {
    let topic = db.createTopic('hello', 'world');
    let idea = db.createIdea(topic.id, 'my', 'vote');

    expect(db.getIdea(idea.id).votes).toBe(0);
    expect(() => {
      db.voteIdea(idea.id);
    }).not.toThrow();
    expect(db.getIdea(idea.id).votes).toBe(1);
  });
});
