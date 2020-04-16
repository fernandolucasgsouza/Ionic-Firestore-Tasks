import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-toogle',
  template: `
  <ion-buttons>
    <ion-menu-toggle [menu]="menuId">
      <ion-button >
        <ion-icon slot="icon-only" name="menu" ></ion-icon>
      </ion-button >
    </ion-menu-toggle>
  </ion-buttons>`

})
export class MenuToogleComponent {

  @Input() menuId : string;
}