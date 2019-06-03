import { AngularFirestoreCollection, AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export abstract class Firestore<T extends { id: string }> {
  protected collection: AngularFirestoreCollection<T>;

  constructor(protected db: AngularFirestore) { }

  protected setColletion(path: string, queryFn?: QueryFn): void {
    this.collection = path ? this.db.collection(path, queryFn) : null;
  }

  private setItem(item: T, operator: string): Promise<T> {

    return this.collection
      .doc<T>(item.id)
    [operator](item)
      .then(() => item);
  }

  /** Buscar lista de registros no firestore */
  getAll(): Observable<T[]> {
    return this.collection.valueChanges();
  }

  /** Buscar um registro especifico no firestore */
  get(id: string): Observable<T> {
    return this.collection.doc<T>(id).valueChanges();
  }

  create(item: T): Promise<T> {
    item.id = this.db.createId();
    return this.setItem(item, 'set');
  }

  update(item: T): Promise<T> {
    return this.setItem(item, 'update');
  }

  delete(item: T): Promise<void> {
    return this.collection.doc<T>(item.id).delete();
  }
}
