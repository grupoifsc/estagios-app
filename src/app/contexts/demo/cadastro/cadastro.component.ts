import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginRequestBody } from '../auth.service';
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
import { LoadingService } from '../../../services/loading.service';
import { Contato, Credenciais, Endereco, Organizacao } from '../organizacao';
import { OrgService } from '../org.service';
import { Subscription } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';


class BlankOrg implements Organizacao {
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
  redes_sociais = '';
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
    ChipModule, ChipsModule, 
   ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private orgService: OrgService,
    private authService: AuthService,
  ) {}

  active: any;

  org! : Organizacao

  profileForm! : FormGroup
  mainContactForm! : FormGroup
  applianceContactForm! : FormGroup
  addressForm! : FormGroup
  credentialsForm! : FormGroup

  subscriptions : Subscription[] = []


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
      if(authOrg) this.org = authOrg
    });
    this.subscriptions.push(subscr);
  }

  buildForms() : void {
    this.profileForm = this.formBuilder.group({
      nome : [this.org.nome, [Validators.required]],
      cnpj : [this.org.cnpj, [Validators.required]],
      ie : [this.org.instituicao_de_ensino, [Validators.required]],
      info : [this.org.info, [Validators.required]],
      website : [this.org.website, []],
      redesSociais: [this.org.redes_sociais, []],
    })
  
    this.mainContactForm = this.formBuilder.group({
      email: [this.org.contato_principal.email, [Validators.email, Validators.required]],
      telefone: [this.org.contato_principal.telefone]
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
  
    this.credentialsForm = this.formBuilder.group({
      email: [this.org.credenciais.email, [Validators.required, Validators.email]],
      senha: [this.org.credenciais.senha ?? '', [Validators.required, Validators.minLength(5)]]
    })

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
    this.org.website = profile.website;
    this.org.redes_sociais = profile.redesSociais

    this.org.contato_principal.email = mainContact.email;
    this.org.contato_principal.telefone = mainContact.telefone;

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
    let subscr = this.orgService.saveOrg(this.org)?.subscribe({
      next: org => this.org = org,
  //    error: err => ,
//      complete: () => // redirecionar para home...
    })
    this.subscriptions.push(subscr);
  }



}
