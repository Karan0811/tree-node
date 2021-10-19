export interface TreeData {
  Id: number;
  nodeName: string;
  Children: TreeData[];
}

export interface DialogData {
  nodeName: string;
  Component: string;
}
