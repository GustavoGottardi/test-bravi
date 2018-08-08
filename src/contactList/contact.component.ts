import { Component } from '@angular/core';
import { ContactService } from './contact.service';
import { FormGroup, FormControl, FormBuilder, NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'contact-list',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    providers: [
        ContactService
    ]
})
export class ContactListComponent{
    title: String = null;
    contact: {};
    contactsList: Array<String>;
    setEditToggle: Boolean;
    setSaved: Boolean;
    setEdited: Boolean;
    setDeleted: Boolean;

    contactForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        whatsapp: new FormControl('')
    });

    constructor(private _service: ContactService) { 
        this.contact = {};
        this.contactsList = [];
        this.title = 'Lista de Contato';
        this.setEditToggle = false;
        this.setSaved = false;
        this.setEdited = false;
        this.setDeleted = false;
        this.getContacts();
    }

    getContacts(){
		this._service.getContacts()
      		.subscribe((response) => {
                this.contactsList = response;
            });
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
        this.contact = form;
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
