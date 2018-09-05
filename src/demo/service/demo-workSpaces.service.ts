import { Observable } from 'rxjs';
import { WorkspaceLinks } from './../../app/launcher/model/workspace.model';

/**
 * Abstract work space services
 */
export class DemoWorkSpacesService {

  /**
   * Create a workspace for given codebase ID
   *
   * @param codeBaseId The ID associated with the given workspace
   * @returns {Observable<WorkspaceLinks>}
   */
  createWorkSpace(codeBaseId: string): Observable<WorkspaceLinks> {
    return Observable.of({
      links: {
        open: 'che.openshift.io'
      }
    });
  }
}
