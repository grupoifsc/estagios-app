import { AsyncPipe, CommonModule, Location, TitleCasePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DividerModule } from 'primeng/divider';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { Area, Job, JobEntryData } from '../job';
import { Observable, Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { ApiResponse } from '../api-response';
import { Address, Contact, Org } from '../organizacao';
import { Page } from '../page';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';


@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, AsyncPipe, TitleCasePipe,    
    InputTextareaModule, MultiSelectModule, DropdownModule, InputNumberModule, 
    InputTextModule, ChipsModule, FieldsetModule, ButtonModule, InputSwitchModule,
    DialogModule, InputMaskModule, DividerModule, EditorModule, 
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private apiService: DataService,
    private location: Location,
    private messageService: MessageService,
  ) {}

  
  @Input() id? : string;
  jobToEdit? : Job

  subscriptions : Subscription[] = []

  job! : JobEntryData

  addresses$ : Observable<ApiResponse<Address[]> | undefined> = this.apiService.getAuthOrgAddresses();
  contacts$ : Observable<ApiResponse<Contact[]> | undefined> =  this.apiService.getAuthOrgContacts();
  ies$ : Observable<ApiResponse<Page<Org> | undefined>> = this.apiService.getAllSchools();
  areas$ : Observable<ApiResponse<Area[]> | undefined> =  this.apiService.getAreas();

  form: FormGroup = this.formBuilder.group({})
  contactForm? : FormGroup
  addressForm? : FormGroup

  levels : {label: string, value: string}[] = [
    {label: 'Fundamental', value: 'fundamental'}, {label: 'Médio', value: 'medio'}, 
    {label: 'Técnico', value: 'tecnico'}, {label: 'Graduação', value: 'graduacao'}, 
    {label: 'Pós-Graduação', value: 'pos'}
  ]
  
  periods : {label: string, value: string}[] = [
    {label: 'Matutino', value: 'matutino'}, {label: 'Vespertino', value: 'vespertino'}, 
    {label: 'Noturno', value:'noturno'}]
  
  formats : {label: string, value: string}[] = [
    {label: 'Presencial', value: 'presencial'}, {label: 'Híbrido', value: 'hibrido'}, 
    {label: 'Remoto', value: 'remoto'}]

  cargaHoraria : {label: string, value: number}[] = [
    {label: '10 hrs', value: 10}, 
    {label: '20 hrs', value: 20}, 
    {label: '30 hrs', value: 30}, 
    {label: '40 hrs', value: 40}
  ]

  isFormContactVisible: boolean = false;
  isFormAddressVisible: boolean = false;

  ngOnInit(): void {    
    this.initjob();
    if(this.id) {
      this.apiService.getJobInfo(this.id).subscribe({
        next: res => {
          this.jobToEdit = res.data;
          this.assignJobtoEdit();
          this.buildForm();
        }
      })
    }
    else {
      this.buildForm();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public cancel() : void {
    this.location.back();
  }


  private initjob() : void {
    this.job = {
      titulo: '',
      descricao: '',
      requisitos: [],
      areas_ids: [],
      carga_horaria_semanal: 0,
      remuneracao: 0,
      periodo: '',
      nivel: '',
      formato: '',
      duracao_meses: 0,
      imagem_url: '',
      endereco_id: '',
      contato_id: '',
      destinatarios_ids: []
    }
  }

  
  private assignJobtoEdit() : void {
    if (this.jobToEdit) {
      this.job.areas_ids = this.jobToEdit.areas?.map(a => a.id) ?? [];
      this.job.carga_horaria_semanal = this.jobToEdit.carga_horaria_semanal ?? 0;
      this.job.contato_id = this.jobToEdit.contato?.id ?? '';
      this.job.descricao = this.jobToEdit.descricao ?? '';
      this.job.destinatarios_ids = this.jobToEdit.destinatarios?.map(org => org.id) ?? [];
      this.job.duracao_meses = this.jobToEdit.duracao_meses ?? 0;
      this.job.endereco_id = this.jobToEdit.endereco?.id ?? '';
      this.job.formato = this.jobToEdit.formato ?? '';
      this.job.imagem_url = this.jobToEdit.imagem_url ?? '';
      this.job.nivel = this.jobToEdit.nivel ?? '';
      this.job.periodo = this.jobToEdit.periodo ?? '';
      this.job.remuneracao = this.jobToEdit.remuneracao ?? 0;
      this.job.requisitos = this.jobToEdit.requisitos ?? [];
      this.job.titulo = this.jobToEdit.titulo ?? '';
    }
}


  private buildForm() : void {
    let todasIesState : boolean = this.job.destinatarios_ids.length == 0 ? true : false;
    this.form = this.formBuilder.group({
      titulo: [this.job.titulo, [Validators.required]],
      descricao: [this.job.descricao, [Validators.required]],
      requisitos: [this.job.requisitos],
      nivel: [this.job.nivel, [Validators.required]],
      periodo: [this.job.periodo, [Validators.required]],
      formato: [this.job.formato, [Validators.required]],
      cargaHoraria: [this.job.carga_horaria_semanal, [Validators.required, Validators.min(10)]],
      remuneracao: [this.job.remuneracao, [Validators.required, Validators.min(100)]],
      areas: [ this.job.areas_ids, [Validators.required]],
      todasIes: [ todasIesState ],
      ies: [ {value: this.job.destinatarios_ids, disabled: todasIesState} ],
      duracao : [this.job.duracao_meses],
      imagemUrl: [this.job.imagem_url],
      contato : [this.job.contato_id, [Validators.required]],
      endereco: [this.job.endereco_id, [Validators.required]],
    })

    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      telefone: ['', [Validators.minLength(10)]],
    })
  
    this.addressForm = this.formBuilder.group({
      rua : [''],
      bairro: [''],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      pais : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }


  private updateJobFromInput() : void {
    const raw = this.form!.getRawValue();

    this.job.titulo = raw.titulo;
    this.job.descricao = raw.descricao;
    this.job.requisitos = raw.requisitos;
    this.job.nivel = raw.nivel;
    this.job.periodo = raw.periodo;
    this.job.formato = raw.formato;
    this.job.carga_horaria_semanal = raw.cargaHoraria;
    this.job.remuneracao = raw.remuneracao;
    this.job.areas_ids = raw.areas;
    this.job.destinatarios_ids = raw.todasIes ? [] : raw.ies;
    this.job.duracao_meses = raw.duracao;
    this.job.imagem_url = raw.imagemUrl;
    this.job.contato_id = raw.contato;
    this.job.endereco_id = raw.endereco;
  }


  submit() : void {
    
    this.updateJobFromInput();
   // console.log(this.job.descricao);

    let subs;
    if(this.jobToEdit) {
      subs = this.apiService.updateJob(this.jobToEdit.id!, this.job).subscribe({
        next: res => {
          if(res.data) {
            this.messageService.add({severity: 'success', detail: 'Vaga atualizada com sucesso!', key: 'demo-main'})
            this.location.back();
          }
        }, 
        error: err => {
          this.messageService.add({severity: 'error', summary: 'Oops', detail: err.error?.message ?? 'Não foi possível salvar sua vaga. Tente novamente!', key: 'demo-main'})
        }
      })
    }
    else {
      subs = this.apiService.createJob(this.job).subscribe({
        next: res => {
          if(res.data) {
            this.messageService.add({severity: 'success', detail: 'Vaga adicionada com sucesso!', key: 'demo-main'})
            this.location.back();
          }
        }, 
        error: err => {
          this.messageService.add({severity: 'error', summary: 'Oops', detail: err.error?.message ?? 'Não foi possível salvar sua vaga. Tente novamente!', key: 'demo-main'})
        }
      });
    }
    this.subscriptions.push(subs);
  }

  toogleDisableIes() : void {
    if (this.form!.get('ies')?.disabled)
      this.form!.get('ies')?.enable()
    else 
      this.form!.get('ies')?.disable()
  }

  // TODO: Implementar formulários de novo contato e novo endereço (só que não tem endpoint pra isso)
  toogleContactForm() : void {
    this.isFormContactVisible = !this.isFormContactVisible    
  }

  toogleAddressForm() : void {
    this.isFormAddressVisible = !this.isFormAddressVisible
  }


}
