import { Broadcaster } from 'ngx-base';
import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-modal';
import { FeatureFlagModule } from 'ngx-feature-flag';

import {
  DependencyEditorModule,
  DependencyEditorTokenProvider,
  URLProvider
} from 'fabric8-analytics-dependency-editor';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { SortArrayPipeModule, TruncatePipeModule } from 'patternfly-ng/pipe';
import { ToolbarModule } from 'patternfly-ng/toolbar';
// Note: This has to be imported first
import { StepIndicatorComponent } from './step-indicator/step-indicator.component';
import { CancelOverlayComponent } from './cancel-overlay/cancel-overlay.component';

import { ActivateBoosterCreateappNextstepComponent }
  from './create-app/activate-booster-createapp-nextstep/activate-booster-createapp-nextstep.component';
import { DependencyEditorCreateappStepComponent }
  from './create-app/dependency-editor-step/dependency-editor-step.component';
import { GitproviderCreateappStepComponent }
  from './create-app/gitprovider-createapp-step/gitprovider-createapp-step.component';
import { GitProviderRepositoryValidatorDirective }
  from './create-app/gitprovider-createapp-step/gitprovider-repository.validator';
import { ExistingRepositoryValidatorDirective } from './import-app/gitprovider-importapp-step/repository.validator';
import { LowerCaseDirective } from './shared/lowercase.directive';
import { ProjectNameValidatorDirective } from './shared/project-name.validator';
import { MissionRuntimeCreateappStepComponent }
  from './create-app/mission-runtime-createapp-step/mission-runtime-createapp-step.component';
import { ProjectProgressCreateappNextstepComponent }
  from './create-app/project-progress-createapp-nextstep/project-progress-createapp-nextstep.component';
import { ProjectSummaryCreateappStepComponent }
  from './create-app/project-summary-createapp-step/project-summary-createapp-step.component';
import { ReleaseStrategyCreateappStepComponent }
  from './create-app/release-strategy-createapp-step/release-strategy-createapp-step.component';
import { TargetEnvironmentCreateappStepComponent }
  from './create-app/targetenvironment-createapp-step/target-environment-createapp-step.component';
import { LinkAccountsCreateappStepComponent }
  from './create-app/link-accounts-createapp-step/link-accounts-createapp-step.component';

import { GitproviderImportappStepComponent }
  from './import-app/gitprovider-importapp-step/gitprovider-importapp-step.component';
import { ProjectProgressImportappNextstepComponent }
  from './import-app/project-progress-importapp-nextstep/project-progress-importapp-nextstep.component';
import { ProjectSummaryImportappStepComponent }
  from './import-app/project-summary-importapp-step/project-summary-importapp-step.component';
import { ReleaseStrategyImportappStepComponent }
  from './import-app/release-strategy-importapp-step/release-strategy-importapp-step.component';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';

import { InViewportModule, WindowRef } from '@thisissoon/angular-inviewport';
import { MissionRuntimeService } from './service/mission-runtime.service';
import { ProjectProgressService } from './service/project-progress.service';
import { WorkSpacesService } from './service/workSpaces.service';
import { CheService } from './service/che.service';

import { LauncherComponent } from './launcher.component';

// Provide window object so as to not break SSR if using universal
export const providers: Provider[] = [
  { provide: WindowRef, useValue: window }
];

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DependencyEditorModule,
    FeatureFlagModule,
    FormsModule,
    ModalModule,
    InViewportModule.forRoot(providers),
    PopoverModule.forRoot(),
    RouterModule,
    SortArrayPipeModule,
    ToolbarModule,
    TruncatePipeModule,
    TypeaheadModule.forRoot()
  ],
  exports: [
    LauncherComponent
  ],
  declarations: [
    ActivateBoosterCreateappNextstepComponent,
    CancelOverlayComponent,
    DependencyEditorCreateappStepComponent,
    GitproviderCreateappStepComponent,
    LowerCaseDirective,
    ProjectNameValidatorDirective,
    GitProviderRepositoryValidatorDirective,
    ExistingRepositoryValidatorDirective,
    GitproviderImportappStepComponent,
    MissionRuntimeCreateappStepComponent,
    ProjectProgressCreateappNextstepComponent,
    ProjectProgressImportappNextstepComponent,
    ProjectSummaryCreateappStepComponent,
    ProjectSummaryImportappStepComponent,
    ReleaseStrategyCreateappStepComponent,
    ReleaseStrategyImportappStepComponent,
    TargetEnvironmentCreateappStepComponent,
    LinkAccountsCreateappStepComponent,
    StepIndicatorComponent,
    ToastNotificationComponent,
    LauncherComponent
  ],
  providers: [
    BsDropdownConfig,
    Broadcaster
  ]
})
export class LauncherModule {

}

// Models
export { Cluster } from './model/cluster.model';
export { DependencyCheck } from './model/dependency-check.model';
export { GitHubDetails } from './model/github-details.model';
export { Mission } from './model/mission.model';
export { Pipeline } from './model/pipeline.model';
export { Progress } from './model/progress.model';
export { Runtime } from './model/runtime.model';
export { Summary } from './model/summary.model';
export { TargetEnvironment } from './model/target-environment.model';

// Services
export { ClusterService } from './service/cluster.service';
export { DependencyCheckService } from './service/dependency-check.service';
export { DependencyEditorService } from './service/dependency-editor.service';
export { GitProviderService } from './service/git-provider.service';
export { MissionRuntimeService } from './service/mission-runtime.service';
export { PipelineService } from './service/pipeline.service';
export { ProjectProgressService } from './service/project-progress.service';
export { ProjectSummaryService } from './service/project-summary.service';
export { TargetEnvironmentService } from './service/target-environment.service';
export { TokenService } from './service/token.service';
export { WorkSpacesService } from './service/workSpaces.service';
export { CheService } from './service/che.service';

// Utility Service
export { HelperService } from './service/helper.service';

export { DependencyEditorModule,  URLProvider, DependencyEditorTokenProvider };
