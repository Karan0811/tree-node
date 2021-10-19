import { TreeDataService } from './service/tree-data.service';
import { TreeData } from './service/tree-data.model';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import {of as observableOf} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  nestedTreeControl: NestedTreeControl<TreeData>;
  nestedDataSource: MatTreeNestedDataSource<TreeData>;

  constructor(
    private dataService: TreeDataService,
  ) {}

  ngOnInit() {
    this.nestedTreeControl = new NestedTreeControl<TreeData>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataService._dataChange.subscribe(
      data => (this.nestedDataSource.data = data)
    );
  }

  private _getChildren = (node: TreeData) => observableOf(node.Children);
  hasNestedChild = (_: number, nodeData: TreeData) => nodeData.Children.length > 0;

  flatJsonArray(flattenedAray: Array<TreeData>, node: TreeData[]) {
    const array: Array<TreeData> = flattenedAray;
    node.forEach(element => {
      if (element.Children) {
        array.push(element);
        this.flatJsonArray(array, element.Children);
      }
    });
    return array;
  }

  findNodeMaxId(node: TreeData[]) {
    const flatArray = this.flatJsonArray([], node);
    const flatArrayWithoutChildren = [];
    flatArray.forEach(element => {
      flatArrayWithoutChildren.push(element.Id);
    });
    return Math.max(...flatArrayWithoutChildren);
  }

  findPosition(id: number, data: TreeData[]) {
    for (let i = 0; i < data.length; i += 1) {
      if (id === data[i].Id) {
        return i;
      }
    }
  }

  findFatherNode(id: number, data: TreeData[]) {
    for (let i = 0; i < data.length; i += 1) {
      const currentFather = data[i];
      for (let z = 0; z < currentFather.Children.length; z += 1) {
        if (id === currentFather.Children[z]['Id']) {
          return [currentFather, z];
        }
      }
      for (let z = 0; z < currentFather.Children.length; z += 1) {
        if (id !== currentFather.Children[z]['Id']) {
          const result = this.findFatherNode(id, currentFather.Children);
          if (result !== false) {
            return result;
          }
        }
      }
    }
    return false;
  }


  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = null;
    this.nestedDataSource.data = data;
  }

  addNode(node: TreeData) {
    node.Id = this.findNodeMaxId(this.nestedDataSource.data) + 1;
    this.nestedDataSource.data.push(node);
    this.refreshTreeData();
  }

  addChildNode(childrenNodeData) {
    childrenNodeData.node.Id = this.findNodeMaxId(this.nestedDataSource.data) + 1;
    childrenNodeData.currentNode.Children.push(childrenNodeData.node);
    this.refreshTreeData();
  }



  editNode(nodeToBeEdited) {
    const fatherElement: TreeData = this.findFatherNode(nodeToBeEdited.currentNode.Id, this.nestedDataSource.data);
    let elementPosition: number;
    nodeToBeEdited.node.Id = this.findNodeMaxId(this.nestedDataSource.data) + 1;
    if (fatherElement[0]) {
       fatherElement[0].Children[fatherElement[1]] = nodeToBeEdited.node;
   } else {
       elementPosition = this.findPosition(nodeToBeEdited.currentNode.Id, this.nestedDataSource.data);
       this.nestedDataSource.data[elementPosition] = nodeToBeEdited.node;
   }
    this.refreshTreeData();
  }



  deleteNode(nodeToBeDeleted: TreeData) {
    const deletedElement: TreeData = this.findFatherNode(nodeToBeDeleted.Id, this.nestedDataSource.data);
    let elementPosition: number;
    if (window.confirm('Are you sure you want to delete ' + nodeToBeDeleted.nodeName + '?' )) {
        if (deletedElement[0]) {
          deletedElement[0].Children.splice(deletedElement[1], 1);
        } else {
          elementPosition = this.findPosition(nodeToBeDeleted.Id, this.nestedDataSource.data);
          this.nestedDataSource.data.splice(elementPosition, 1);
      }
      this.refreshTreeData();
    }
  }


}
