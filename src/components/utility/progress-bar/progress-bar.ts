import { Component, Input } from '@angular/core';

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent {

  /**
   * ความคืบหน้า
   */
  private progress: number = 0;
  @Input('progress') set progressInput(progress: number) {
    if (progress < 0)
      this.progress = 0;
    else if (progress > 100)
      this.progress = 100;
    else
      this.progress = progress;
  }

  constructor() {
    
  }

}
