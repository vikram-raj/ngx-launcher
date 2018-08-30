import { Component, Host, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { Progress } from '../../model/progress.model';
import { ProjectProgressService } from '../../service/project-progress.service';
import { LauncherComponent } from '../../launcher.component';
import { Broadcaster } from 'ngx-base';
import { WorkSpacesService } from '../../service/workSpaces.service';
import { CheService } from '../../service/che.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-projectprogress-importapp-nextstep',
  templateUrl: './project-progress-importapp-nextstep.component.html',
  styleUrls: ['./project-progress-importapp-nextstep.component.less']
})
export class ProjectProgressImportappNextstepComponent implements OnChanges, OnDestroy {
  @Input() statusLink: string;
  isError = false;
  errorMessage = '';
  codeBaseCreated: boolean = false;
  codebaseId: string;
  private _progress: Progress[];
  private socket: WebSocket;

  constructor(@Host() public launcherComponent: LauncherComponent,
              private broadcaster: Broadcaster,
              private projectProgressService: ProjectProgressService,
              private workSpaceService: WorkSpacesService,
              private cheService: CheService) {
    this.broadcaster.on('progressEvents').subscribe((events: Progress[]) => this._progress = events);
  }

  ngOnChanges(changes: SimpleChanges) {
    const statusLink = changes['statusLink']['currentValue'];
    if (statusLink) {
      this.socket = this.projectProgressService.getProgress(statusLink);
      this.socket.onmessage = (event: MessageEvent) => {
        let message = JSON.parse(event.data);
        let data = message.data || {};
        if (data.codeBaseId !== undefined) {
          this.codeBaseCreated = true;
          this.codebaseId = data.codeBaseId;
        }
        if (data && data.error) {
          this.isError = true;
          this.errorMessage = data.error;
        } else {
          for (let status of this._progress) {
            if (status.name === message.statusMessage) {
              status.completed = true;
              if (data.location) {
                status.hyperText = data.location;
              }
              break;
            }
          }
        }
      };
      this.socket.onerror = (error: ErrorEvent) => {
        console.log('error in fetching messages in progress Component: Import', error);
      };
      this.socket.onclose = () => {
        console.log('socket call closed in progress component in Import');
      };
    }
  }

  ngOnDestroy() {
    this.closeConnections();
  }

  createWorkSpace() {
    this.cheService.getState().subscribe(che => {
      if (!che.clusterFull) {
        return this.workSpaceService.createWorkSpace(this.codebaseId)
          .map(workSpaceLinks => {
            console.log(workSpaceLinks, '####-99');
          });
      }
    });
  }

  // Accessors

  get allCompleted(): boolean {
    if (this._progress === undefined) {
      return false;
    }
    let result = true;
    for (let i = 0; i < this._progress.length; i++) {
      if (this._progress[i].completed !== true) {
        result = false;
        break;
      }
    }
    return result;
  }

  get progress(): Progress[] {
    return this._progress;
  }

  private closeConnections() {
    if (this.socket) {
      this.socket.close();
    }
  }

  private reset() {
    this.isError = false;
    this.errorMessage = '';
  }
}
