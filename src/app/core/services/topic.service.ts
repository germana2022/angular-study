import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Topic, TopicCategory } from '../models/topic.model';
import { TOPICS_DATA } from '../data/topics.data';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private categories$ = new BehaviorSubject<TopicCategory[]>(TOPICS_DATA);
  private activeTopicId$ = new BehaviorSubject<string>('');

  getCategories(): Observable<TopicCategory[]> {
    return this.categories$.asObservable();
  }

  getTopicsByCategory(categoryName: string): Observable<Topic[]> {
    return this.categories$.pipe(
      map(categories => {
        const category = categories.find(c => c.name === categoryName);
        return category ? category.topics : [];
      })
    );
  }

  getTopicBySlug(slug: string): Observable<Topic | undefined> {
    return this.categories$.pipe(
      map(categories => {
        for (const category of categories) {
          const topic = category.topics.find(t => t.slug === slug);
          if (topic) return topic;
        }
        return undefined;
      })
    );
  }

  getTopicById(id: string): Observable<Topic | undefined> {
    return this.categories$.pipe(
      map(categories => {
        for (const category of categories) {
          const topic = category.topics.find(t => t.id === id);
          if (topic) return topic;
        }
        return undefined;
      })
    );
  }

  setActiveTopic(topicId: string): void {
    this.activeTopicId$.next(topicId);
  }

  getActiveTopicId(): Observable<string> {
    return this.activeTopicId$.asObservable();
  }

  getAllTopics(): Observable<Topic[]> {
    return this.categories$.pipe(
      map(categories => categories.flatMap(c => c.topics))
    );
  }

  getTotalTopicsCount(): number {
    return TOPICS_DATA.reduce((acc, cat) => acc + cat.topics.length, 0);
  }

  getCategoriesCount(): number {
    return TOPICS_DATA.length;
  }
}
