import { User } from '../list/user';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  genres = ['', 'Male', 'Female'];
  status = ['', 'Active', 'Inactive'];
  user: User[] = [];
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: ListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user = this.route.snapshot.data['User'];

    this.form = this.formBuilder.group({
      id: [user.id],
      name: [
        user.name,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      email: [user.email, [Validators.required, Validators.email]],
      gender: [user.gender, Validators.required],
      status: [user.status, Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      if (this.form.value.id) {
        this.service.update(this.form.value).subscribe(
          (success) => {
            alert('Usuário atualizado com sucesso!');
            this.router.navigate(['list']);
          },
          (error) => alert('Erro ao atualizar usuário, tente novamente!')
        );
      } else {
        this.service.signIn(this.form.value).subscribe(
          (success) => {
            alert('Usuário cadastrado com sucesso!');
            this.router.navigate(['list']);
          },
          (error) => alert('Erro ao cadastrar usuário, tente novamente!')
        );
      }
    }
  }

  onCancel() {
    this.router.navigate(['list']);
  }

  verifyValidTouched(field: string) {
    return !this.form.get(field)?.valid && !!this.form.get(field)?.touched;
  }

  applyCssError(field: string) {
    return {
      'has-error': this.verifyValidTouched(field),
      'has-feedback': this.verifyValidTouched(field),
    };
  }
}
