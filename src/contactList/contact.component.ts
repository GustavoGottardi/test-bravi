import { Component, ViewChild, OnInit, Pipe } from '@angular/core';
import { ContactService } from './contact.service';
import { FormGroup, FormControl, FormBuilder, NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn, NgForm } from '@angular/forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
    selector: 'contact-list',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [
        ContactService
    ]
})
export class ContactListComponent implements OnInit{
    title: String = null;
    contact: {};
    contactsList: Array<String>;
    setEditToggle: Boolean;
    setSaved: Boolean;
    setEdited: Boolean;
    setDeleted: Boolean;
    idEdit: String

    contactForm: FormGroup;
    name: FormControl;
    email: FormControl;
    phone: FormControl;
    whatsapp: FormControl;

    // @ViewChild('contactForm')
    // private contactForm: NgForm;

    // this.contactForm = new FormGroup({
    //     name: new FormControl(),
    //     email: new FormControl(),
    //     phone: new FormControl(),
    //     whatsapp: new FormControl()
    // });

    constructor(private _service: ContactService) { 
        this.contact = {};
        this.contactsList = [];
        this.title = 'Lista de Contato';
        this.setEditToggle = false;
        this.setSaved = false;
        this.setEdited = false;
        this.setDeleted = false;
        this.idEdit = null;
        this.getContacts();
    }

    ngOnInit() {
        this.createFormControls({name: '', email: '', phone: '', whatsapp: ''});
        this.createForm();
    }

    createFormControls(form) {
        this.name = new FormControl(form.name, [
            Validators.required,
            Validators.pattern("[a-zA-Z][a-zA-Z ]+")
        ]);
        this.email = new FormControl(form.email, [
          Validators.required,
          Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.phone = new FormControl(form.phone, [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern("[0-9]*")
        ]);
        this.whatsapp = new FormControl(form.whatsapp, [
            Validators.required,
            Validators.minLength(9),
            Validators.pattern("[0-9]*")
        ]);
    }

    createForm() {
        this.contactForm = new FormGroup({
            name: this.name,
            email: this.email,
            phone: this.phone,
            whatsapp: this.whatsapp
        });
    }

    getContacts(){
		this._service.getContacts()
      		.subscribe((response) => {
                this.contactsList = response;
            });
    }
    
    onSubmit(form) {
        if (this.contactForm.valid) {
            if(!this.setEditToggle) {
                this.saveContact(form);
            } else {
                this.editContact(form);
            }
        }
    }

    saveContact(form) {
        this._service.save(form)
            .subscribe(res => {
                this.showMessage('saved');
                this.contactForm.reset();
                this.setEditToggle = false;
                this.getContacts();
            }, (err) => {
                console.log(err);
            });
    }

    deleteContact(id) {
        this._service.delete(id)
            .subscribe(res => {
                this.showMessage('deleted');
                this.getContacts();
            }, (err) => {
                console.log(err);
            });
    }

    editContact(form) {
        form._id = this.idEdit;
        this.idEdit = null;
        this._service.update(form)
            .subscribe(res => {
                this.showMessage('edited');
                this.contactForm.reset();
                this.setEditToggle = false;
                this.getContacts();
            }, (err) => {
                console.log(err);
            });
    }

    setEdit(form) {
        this.setEditToggle = true;
        this.idEdit = form._id;
        this.createFormControls(form);
        this.createForm();
    }

    showMessage(message) {
        switch(message) {
            case 'saved':
                this.setSaved = true;
                this.setEdited = false;
                this.setDeleted = false;
            break;
            case 'edited':
                this.setSaved = false;
                this.setEdited = true;
                this.setDeleted = false;
            break;
            case 'deleted':
                this.setSaved = false;
                this.setEdited = false;
                this.setDeleted = true;
            break;
        }
    }

}
