import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProjectProgressNextstepModalComponent } from './project-progress-nextstep-modal.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [
    ProjectProgressNextstepModalComponent
  ],
  exports: [
    ProjectProgressNextstepModalComponent
  ]
})
export class ProjectProgressNextstepModalModule {}
