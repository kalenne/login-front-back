import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from 'primeng/card';
import {PasswordModule} from 'primeng/password';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {DividerModule} from 'primeng/divider';
import {TabMenuModule} from 'primeng/tabmenu';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {DialogService, DynamicDialogConfig, DynamicDialogModule} from 'primeng/dynamicdialog';
import {MenubarModule} from 'primeng/menubar';
import {FileUploadModule} from 'primeng/fileupload';
import {SkeletonModule} from 'primeng/skeleton';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CardModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    ToggleButtonModule,
    DividerModule,
    TabMenuModule,
    ToastModule,
    TableModule,
    DialogModule,
    DynamicDialogModule,
    MenubarModule,
    FileUploadModule,
    SkeletonModule
  ],
  providers: [
    MessageService,
    DialogService,
    DynamicDialogConfig
  ]
})
export class PrimengModule { }
