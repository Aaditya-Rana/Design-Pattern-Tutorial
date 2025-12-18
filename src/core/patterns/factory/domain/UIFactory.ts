// Factory Method Pattern Domain Logic

export interface Button {
  render(): string;
  onClick(): void;
}

export interface Dialog {
  render(): string;
}

export class WebButton implements Button {
  render(): string {
    return '<button class="web-button">Click Me</button>';
  }
  onClick(): void {
    console.log('Web button clicked');
  }
}

export class MobileButton implements Button {
  render(): string {
    return '<button class="mobile-button">Tap Me</button>';
  }
  onClick(): void {
    console.log('Mobile button clicked');
  }
}

export class WebDialog implements Dialog {
  render(): string {
    return '<div class="web-dialog">Web Dialog</div>';
  }
}

export class MobileDialog implements Dialog {
  render(): string {
    return '<div class="mobile-dialog">Mobile Dialog</div>';
  }
}

export abstract class UIFactory {
  abstract createButton(): Button;
  abstract createDialog(): Dialog;
  
  renderUI(): { button: string; dialog: string } {
    const button = this.createButton();
    const dialog = this.createDialog();
    return {
      button: button.render(),
      dialog: dialog.render(),
    };
  }
}

export class WebUIFactory extends UIFactory {
  createButton(): Button {
    return new WebButton();
  }
  createDialog(): Dialog {
    return new WebDialog();
  }
}

export class MobileUIFactory extends UIFactory {
  createButton(): Button {
    return new MobileButton();
  }
  createDialog(): Dialog {
    return new MobileDialog();
  }
}
