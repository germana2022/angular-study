import { TOPICS_DATA } from './topics.data';
import { TopicCategory } from '../models/topic.model';

const categories: TopicCategory[] = TOPICS_DATA;

describe('Topics Data - Interview Questions', () => {
  it('should have categories defined', () => {
    expect(categories).toBeDefined();
    expect(categories.length).toBeGreaterThan(0);
  });

  describe('All topics should have interview questions', () => {
    categories.forEach((category) => {
      describe(category.name, () => {
        category.topics.forEach((topic) => {
          it(`should have interviewQuestion for topic: ${topic.title}`, () => {
            expect(topic.interviewQuestion).toBeDefined();
            expect(topic.interviewAnswerShort).toBeDefined();
            expect(topic.interviewAnswerStructured).toBeDefined();
          });

          it(`should have non-empty interviewAnswerShort for topic: ${topic.title}`, () => {
            expect(topic.interviewAnswerShort?.length).toBeGreaterThan(0);
          });

          it(`should have non-empty interviewAnswerStructured for topic: ${topic.title}`, () => {
            expect(topic.interviewAnswerStructured?.length).toBeGreaterThan(0);
          });

          it(`should have short answer within reasonable length for: ${topic.title}`, () => {
            const maxLength = 500;
            expect(topic.interviewAnswerShort?.length || 0).toBeLessThan(maxLength);
          });

          it(`should have structured answer longer than short answer for: ${topic.title}`, () => {
            const shortLen = topic.interviewAnswerShort?.length || 0;
            const structuredLen = topic.interviewAnswerStructured?.length || 0;
            expect(structuredLen).toBeGreaterThan(shortLen);
          });
        });
      });
    });
  });

  describe('Total topics count', () => {
    it('should have 33 topics total', () => {
      const totalTopics = categories.reduce((acc, cat) => acc + cat.topics.length, 0);
      expect(totalTopics).toBe(33);
    });

    it('should have 7 categories', () => {
      expect(categories.length).toBe(7);
    });
  });

  describe('Category structure', () => {
    const expectedCategories = [
      'Angular Core',
      'RxJS & Observables',
      'Routing & Navigation',
      'Components & Directives',
      'Modules & Architecture',
      'Forms',
      'Tools & CLI',
    ];

    expectedCategories.forEach((categoryName) => {
      it(`should have category: ${categoryName}`, () => {
        const exists = categories.some((c) => c.name === categoryName);
        expect(exists).toBe(true);
      });
    });
  });

  describe('Topic structure validation', () => {
    categories.forEach((category) => {
      category.topics.forEach((topic) => {
        it(`${topic.title} should have required fields`, () => {
          expect(topic.id).toBeDefined();
          expect(topic.title).toBeDefined();
          expect(topic.slug).toBeDefined();
          expect(topic.category).toBeDefined();
          expect(topic.summary).toBeDefined();
          expect(topic.description).toBeDefined();
          expect(topic.keyPoints).toBeDefined();
          expect(Array.isArray(topic.keyPoints)).toBe(true);
        });

        it(`${topic.title} should have valid interview question format`, () => {
          const question = topic.interviewQuestion;
          expect(question).toBeDefined();
          expect(question?.startsWith('¿')).toBe(true);
          expect(question?.endsWith('?')).toBe(true);
        });
      });
    });
  });
});
