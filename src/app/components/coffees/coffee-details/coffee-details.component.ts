import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Coffee } from '@models/coffee';

@Component({
  selector: 'app-coffee-details',
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss']
})
export class CoffeeDetailsComponent implements OnInit {
  coffeeForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CoffeeDetailsComponent>,
    private formBuilder: FormBuilder
  ) { 
    const coffee: Coffee = data.item;

    // populate form values; set to disabled for now
    this.coffeeForm = this.formBuilder.group({
      blendNameCtrl: [{value: coffee.blend_name, disabled: true}],
      originCtrl: [{value: coffee.origin, disabled: true}],
      varietyCtrl: [{value: coffee.variety, disabled: true}],
      notesCtrl: [{value: coffee.notes, disabled: true}],
      intensifierCtrl: [{value: coffee.intensifier, disabled: true}],
    });
  }

  ngOnInit(): void {

  }
}
