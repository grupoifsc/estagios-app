import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepperModule } from 'primeng/stepper';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';
import { Org } from '../organizacao';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ConfirmTermoComponent } from './termo/confirm-termo.component';
import { DialogModule } from 'primeng/dialog';
import { TermoComponent } from '../../main-app/sobre/termo/termo.component';
import { PrivacidadeComponent } from '../../main-app/sobre/privacidade/privacidade.component';

class BlankOrg implements Org {
  id?: string | undefined;
  nome = '';
  credenciais = { email: '', senha: '' };
  cnpj = '';
  instituicao_de_ensino = false;
  info = '';
  contato_principal  = { email: '', telefone: '' };
  contato_candidaturas = { email: '', telefone: '' };
  endereco = { rua: '', bairro: '', cidade: '', estado: '', pais: '' };
  website = '';
  redes_sociais = [];
  criado_em?: Date | undefined;
  atualizado_em?: Date | undefined;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, 
    ButtonModule, InputGroupAddonModule, InputGroupModule, InputTextModule,
    PasswordModule, ProgressSpinnerModule, FloatLabelModule, StepperModule,
    RadioButtonModule, InputTextareaModule, InputMaskModule, DropdownModule,
    ChipModule, ChipsModule, ConfirmTermoComponent, DialogModule, 
    TermoComponent, PrivacidadeComponent, 
   ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private orgService: DataService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  active: any;

  org! : Org

  profileForm! : FormGroup
  mainContactForm! : FormGroup
  applianceContactForm! : FormGroup
  addressForm! : FormGroup
  credentialsForm! : FormGroup

  subscriptions : Subscription[] = []

  confirmTermo: boolean = false;

  states : {value: string, label: string}[] = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' },
    { value: '_0', label: 'Outro' }
  ];

  countries : { value: string, label: string }[] = [
    { value: 'BRA', label: "Brasil" },
    { value: '__0', label: "Outro" }
  ]

  showTermo: boolean = false;


  ngOnInit(): void {
    if(this.authService.isAuthenticated()) 
      this.retrieveAuthOrgData()
    else 
      this.org = new BlankOrg()
    this.buildForms();

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  retrieveAuthOrgData() : void {
    let subscr = this.orgService.getAuthOrg().subscribe(authOrg => {
      if(authOrg.data) this.org = authOrg.data
    });
    this.subscriptions.push(subscr);
  }

  buildForms() : void {
    this.profileForm = this.formBuilder.group({
      nome : [this.org.nome, [Validators.required]],
      cnpj : [this.org.cnpj, [Validators.required]],
      ie : [this.org.instituicao_de_ensino, [Validators.required]],
      info : [this.org.info, [Validators.required]],
    })
  
    this.mainContactForm = this.formBuilder.group({
      email: [this.org.contato_principal.email, [Validators.email, Validators.required]],
      telefone: [this.org.contato_principal.telefone],
      website : [this.org.website, []],
      redesSociaisA: [this.org.redes_sociais?.[0] ?? '', []],
      redesSociaisB: [this.org.redes_sociais?.[1] ?? '', []],
    })
  
    this.applianceContactForm = this.formBuilder.group({
      email: [this.org.contato_candidaturas?.email ?? '', [Validators.email]],
      telefone: [this.org.contato_candidaturas?.telefone ?? '']
    })
  
    this.addressForm = this.formBuilder.group({
      rua : [this.org.endereco.rua ?? ''],
      bairro: [this.org.endereco.bairro ?? ''],
      cidade: [this.org.endereco.cidade, [Validators.required]],
      estado: [this.org.endereco.estado, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      pais : [this.org.endereco.pais, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  
    // Solução para Confirmar Senha:
    // https://blog.bitsrc.io/implementing-confirm-password-validation-in-angular-with-custom-validators-6acd01cb0288
    this.credentialsForm = this.formBuilder.group({
      email: [this.org.credenciais.email, [Validators.required, Validators.email]],
      senha: [this.org.credenciais.senha ?? '', [Validators.required, Validators.minLength(5)]],
      confirmaSenha: ['', [Validators.required]]
    }, 
  {validators: this.passwordMatchValidator})

  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('senha')?.value;
    const confirmPassword = formGroup.get('confirmaSenha')?.value;
    return password && confirmPassword && password !== confirmPassword
      ? { 'mismatch': true }
      : null;
  }

 
  /**
   * Updates model with form data
   */
  updateModel() : void {
    const profile = this.profileForm.getRawValue();
    const mainContact = this.mainContactForm.getRawValue();
    const applianceContact = this.applianceContactForm.getRawValue();
    const address = this.addressForm.getRawValue();
    const credentials = this.credentialsForm.getRawValue();

    this.org.nome = profile.nome;
    this.org.cnpj = profile.cnpj;
    this.org.instituicao_de_ensino = profile.ie;
    this.org.info = profile.info;

    this.org.contato_principal.email = mainContact.email;
    this.org.contato_principal.telefone = mainContact.telefone;
    this.org.website = mainContact.website;

    if(mainContact.redesSociaisA)
      this.org.redes_sociais?.push(mainContact.redesSociaisA)

    if(mainContact.redesSociaisB)
      this.org.redes_sociais?.push(mainContact.redesSociaisB)

    if(applianceContact.email) {
      this.org.contato_candidaturas = { email: applianceContact.email, telefone : '' }
    }

    if(applianceContact.telefone) {
      if(this.org.contato_candidaturas) {
        this.org.contato_candidaturas.telefone = applianceContact.telefone
      } else {
        this.org.contato_candidaturas = { email: '', telefone: applianceContact.telefone }
      }
    }

    this.org.endereco.rua = address.rua ?? null;
    this.org.endereco.bairro = address.bairro ?? null;
    this.org.endereco.cidade = address.cidade;
    this.org.endereco.estado = address.estado;
    this.org.endereco.pais = address.pais;

    this.org.credenciais.email = credentials.email;
    this.org.credenciais.senha = credentials.senha;
    
  } 


  /**
   * Attempts to save data
   */
  save() : void {    
    let subscr = this.orgService.createOrg(this.org)?.subscribe({
      next: org => { 
        if(org.data) {
          this.messageService.add({severity: 'success', detail: 'Cadastro realizado!', key: 'demo-main'});
          this.redirectHome();
        }
       },
      error: err => {
        this.messageService.add({severity: 'error', detail: 'Não foi possível salvar seu cadastro. ' + err, key: 'demo-main'})
      }
    })
    this.subscriptions.push(subscr);
  }


  submit() : void {
    this.updateModel();
    this.save();
  }


  public redirectHome() : void {
    this.router.navigate(['demo/login']);
  }  


}
