import { TreeData, DialogData } from '../service/tree-data.model';
import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent {
  @Input() isTop: boolean;
  @Input() currentNode: TreeData;
  @Output() addedNode = new EventEmitter;
  nodeName: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewNodeDialog, {
      width: '400px',
      data: {nodeName: this.nodeName, Component: 'Add'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const node: TreeData = {
          Id: null,
          nodeName: result.nodeName,
          Children: []
        };
        if (this.isTop) {
          this.addedNode.emit(node);
        } else {
          this.addedNode.emit({currentNode: this.currentNode, node: node});
        }
      }
    });
  }
}

@Component({
  selector: 'app-new-node',
  templateUrl: '../node-dialog/node-dialog.html',
})
export class NewNodeDialog {

  constructor(
    public dialogRef: MatDialogRef<NewNodeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}



}
