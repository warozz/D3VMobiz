import { Directive, ElementRef, Injector, forwardRef, Renderer2, Input } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * Generated class for the CharacterOnlyDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CharacterOnlyDirective),
  multi: true
};

@Directive({
  selector: '[CharacterOnly]', // Attribute selector
  host: {
    '(input)': 'handleInput($event.target.value)',
    '(blur)': 'onTouched()',
  },
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CharacterOnlyDirective implements ControlValueAccessor {
  
  private regex = new RegExp(/^[\u0E01-\u0E4Ca-zA-Z@&*!+_: ]+$/);

  private _value: string = '';
  
  onChange = (_: any) => {};
  onTouched = () => {};

  @Input('maxlength') private maxlength: number;

  constructor(
    private _renderer: Renderer2, 
    private _elementRef: ElementRef, 
    private _inj: Injector) {
  }

  public writeValue(value: any): void {
    const normalizedValue = value == null ? '' : value;
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', normalizedValue);
    this._value = normalizedValue;
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  public handleInput(value: any): void {
    
    if (value != '') {
      if (this.regex.test(value)) {
        if (typeof this.maxlength != 'undefined' && value.length > this.maxlength) {
          this._value = value.substring(0, this.maxlength);

          let model: NgControl = this._inj.get(NgControl);
          model.control.setValue(this._value);
        }
        else {
          this._value = value;
          this.onChange(value);
        }
      }
      else {
        let model: NgControl = this._inj.get(NgControl);
        model.control.setValue(this._value);
      }
    }
    else {
      this._value = '';
      this.onChange('');
    }
  }
}
