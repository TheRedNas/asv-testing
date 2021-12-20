import { Observable } from "rxjs";

export interface CsudInterface {
    create(data: any): Observable<any>;
    show(): Observable<any>;
    update(data: any): Observable<any>;
    delete(id: string): void;
}
