import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, RequiredValidator, Validators } from '@angular/forms';
import { AuthService, LoginRequestBody } from '../auth.service';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepperModule } from 'primeng/stepper';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LoadingService } from '../../../services/loading.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DividerModule } from 'primeng/divider';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { Job } from '../job';

@Component({
  selector: 'app-create-job',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule,  
    InputTextareaModule, MultiSelectModule, DropdownModule, InputNumberModule, 
    InputTextModule, ChipsModule, FieldsetModule, ButtonModule, InputSwitchModule,
    DialogModule, InputMaskModule, DividerModule, 
  ],
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  @Input() jobToEdit : Job | undefined
  job! : Job

  form!: FormGroup
  contactForm! : FormGroup
  addressForm! : FormGroup


  levels : string[] = ['fundamental', 'medio', 'tecnico', 'superior', 'pos']
  periods : string[] = ['matutino', 'vespertino', 'noturno']
  formats : string[] = ['presencial', 'hibrido', 'remoto']
  cargaHoraria : number[] = [10, 20, 30, 40]

  isFormContactVisible: boolean = false;
  isFormAddressVisible: boolean = false;

  areas: {id: string, name: string}[] = [
    {id: '1', name: 'educacao'},
    {id: '2', name: 'engenharia'},
    {id: '3', name: 'outra'}
  ] 


  ies: {id: string, name: string}[] = [
    {id: '1', name: 'ufsc'},
    {id: '2', name: 'ifsc'}
  ]


  ngOnInit(): void {
    this.retrieveOrCreateJob();
    this.buildForm();
  }


  private retrieveOrCreateJob() : void {
    this.job = this.jobToEdit ?? {
      id: undefined,
      criado_por : undefined,
      titulo: '',
      descricao: '',
      requisitos: [],
      areas: [],
      carga_horaria_semanal: 0,
      remuneracao: 0,
      periodo: '',
      nivel: '',
      formato: '',
      duracao_meses: 0,
      imagem_url: '',
      endereco: {
        id: '',
        tipo: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        pais: ''
      },
      contato: {
        id: '',
        tipo: '',
        email: '',
        telefone: ''
      },
      destinatarios: []
    } 
  }


  private buildForm() : void {
    this.form = this.formBuilder.group({
      titulo: [this.job.titulo, [Validators.required]],
      descricao: [this.job.descricao, [Validators.required]],
      requisitos: [this.job.requisitos],
      nivel: [this.job.nivel, [Validators.required]],
      periodo: [this.job.periodo, [Validators.required]],
      formato: [this.job.formato, [Validators.required]],
      cargaHoraria: [this.job.carga_horaria_semanal, [Validators.required, Validators.min(10)]],
      remuneracao: [this.job.remuneracao, [Validators.required, Validators.min(100)]],
      areas: [this.job.areas],
      todasIes: [true],
      ies: [ {value: this.job.destinatarios, disabled: true} ],
      duracao : [this.job.duracao_meses],
      imagemUrl: [this.job.imagem_url]
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
    const raw = this.form.getRawValue();

    this.job.titulo = raw.titulo;
    this.job.descricao = raw.descricao;
    this.job.requisitos = raw.requisitos;
    this.job.nivel = raw.nivel;
    this.job.periodo = raw.periodo;
    this.job.formato = raw.formato;
    this.job.carga_horaria_semanal = raw.cargaHoraria;
    this.job.remuneracao = raw.remuneracao;
    this.job.areas = raw.areas;
    this.job.destinatarios = raw.ies;
    this.job.duracao_meses = raw.duracao;
    this.job.imagem_url = raw.imagemUrl;
  }


  submit() : void {
    console.log(this.form.getRawValue());
    
  }


  toogleDisableIes() : void {
    if(this.form.get('ies')?.disabled)
      this.form.get('ies')?.enable()
    else 
      this.form.get('ies')?.disable()
  }


  toogleContactForm() : void {
    this.isFormContactVisible = !this.isFormContactVisible    
  }

  toogleAddressForm() : void {
    this.isFormAddressVisible = !this.isFormAddressVisible
  }


}
