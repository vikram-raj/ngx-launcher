import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Broadcaster } from 'ngx-base';
import { ModalDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { Progress } from '../../model/progress.model';
import { Projectile } from './../../model/projectile.model';
import { ProjectProgressService } from './../../service/project-progress.service';
import { ProjectSummaryService } from './../../service/project-summary.service';

@Component({
  selector: 'f8launcher-project-progress-modal',
  templateUrl: './project-progress-nextstep-modal.component.html',
  styleUrls: ['./project-progress-nextstep-modal.component.less']
})

export class ProjectProgressNextstepModalComponent implements OnInit, OnDestroy, OnChanges {
  subscriptions: Subscription[] = [];
  progress: Progress[];
  errorMessage: string;
  private _progress: Progress[];
  private socket: WebSocket;

  @ViewChild('projectProgressModal') projectProgressModal: ModalDirective;

  constructor(
    private broadcaster: Broadcaster,
    private projectProgressService: ProjectProgressService,
    private projectSummaryService: ProjectSummaryService,
    private projectile: Projectile<any>
    ) {
      broadcaster.on<Progress[]>('progressEvents').subscribe(events => {
        console.log('got the event list', events);
        this._progress = events;
      });
    }

  ngOnInit() {
    this.subscriptions.push(
      this.broadcaster.on<Progress[]>('showProjectProgressModal').subscribe(events => {
        this.progress = events;
        this.projectProgressModal.show();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const statusLink = changes['statusLink']['currentValue'];
    if (statusLink) {
      this.socket = this.projectProgressService.getProgress(statusLink['uuid_link']);
      this.socket.onmessage = this.handleMessage;
      this.socket.onerror = (error: ErrorEvent) => {
        console.log('error in fetching messages in progress Component: Create', error);
      };
      this.socket.onclose = () => {
        console.log('closed the socket call in progress component in Create');
      };
    }
  }

  private handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      console.log('data from ws', message);
      const data = message.data || {};
      if (data.codeBaseId !== undefined) {
        this.projectile.sharedState.state.codebaseId = data.codeBaseId;
      }
      if (data && data.error) {
        console.log(message.data.error);
        this.errorMessage = data.error;
        for (const step of this._progress.filter((s) => !s.completed)) {
          step.error = true;
        }
        this.socket.close();
        return;
      }
      const status = this._progress.find((p) => p.name === message.statusMessage);
      if (status) {
        status.completed = true;
        status.hyperText = data.location;
        status.routes = data.routes;
      }
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.close();
    }
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
