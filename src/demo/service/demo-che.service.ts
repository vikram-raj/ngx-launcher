import { Observable } from 'rxjs';
import { Che } from './../../app/launcher/model/che.model';

/**
 * Abstract Che service to get state of Che server
 */
export class DemoCheService {

  /**
   * Get state of Che server
   *
   * @returns {Observable<Che>}
   */
  getState(): Observable<Che> {
      return Observable.of({
        clusterFull: false,
        running: true,
        multiTenant: true
      });
  }
}
