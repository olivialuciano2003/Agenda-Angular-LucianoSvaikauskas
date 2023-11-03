import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../constants/backends';
import {
  Contact,
  ContactJsonPlaceholder,
} from '../interfaces/contact.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private auth: AuthService) {}

  async getContactDetails(id: number): Promise<ContactJsonPlaceholder> {
    const data = await fetch(BACKEND_URL + '/api/Contact/' + id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.auth.getSession().token!}`,
      },
    });
    return await data.json();
  }

  async getContacts(): Promise<ContactJsonPlaceholder[]> {
    const data = await fetch(BACKEND_URL + '/api/Contact', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.auth.getSession().token!}`,
      },
    });
    return await data.json();
  }

  // async editContact(id: number, contact: ContactJsonPlaceholder) {
  //   console.log('Enviando edit de usuario a la api');
  //   const res = await fetch(BACKEND_URL + '/api/Contact/' + id, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer ${this.auth.getSession().token!}`,
  //     },
  //     body: JSON.stringify(contact),
  //   });
  //   return await res.json();
  // }
  async editContact(id: number, contact: ContactJsonPlaceholder) {
    try {
      console.log('Enviando edit de usuario a la api');
      const res = await fetch(BACKEND_URL + '/api/Contact/' + id, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${this.auth.getSession().token!}`,
        },
        body: JSON.stringify(contact),
      });

      if (res.ok) {
        return await res.json();
      } else {
        console.error(
          'La solicitud PUT no fue exitosa:',
          res.status,
          res.statusText
        );
        // Manejo de errores específico, si es necesario.
      }
    } catch (error) {
      console.error('Error en la solicitud PUT:', error);
      // Manejo de errores específico, si es necesario.
    }
  }

  // async editContact(id: number, contact: ContactJsonPlaceholder) {
  //   if (id === undefined || isNaN(id)) {
  //     throw new Error('ID de contacto no válido');
  //   }

  //   console.log('Enviando edit de usuario a la API');
  //   const res = await fetch(BACKEND_URL + '/api/Contact/' + id, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer ${this.auth.getSession().token!}`,
  //     },
  //     body: JSON.stringify(contact),
  //   });
  //   return await res.json();
  // }

  async addContact(
    contact: ContactJsonPlaceholder
  ): Promise<ContactJsonPlaceholder> {
    console.log(contact);
    const res = await fetch(BACKEND_URL + '/api/Contact', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.auth.getSession().token!}`,
      },
      body: JSON.stringify(contact),
    });
    return await res.json();
  }

  async deleteContact(id: number): Promise<boolean> {
    const res = await fetch(BACKEND_URL + '/api/Contact/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.auth.getSession().token!}`,
      },
    });
    return res.ok;
  }

  //idContactoForEdit: number = 0;
  //abrirContactEdit: number = 0;
}
