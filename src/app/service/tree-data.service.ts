import { TreeData } from './tree-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeDataService {

  _dataChange = new BehaviorSubject<TreeData[]>(
    [{
      Id: 1,
      nodeName: 'Node 0',
      Children: [
        {
          Id: 2,
          nodeName: 'Node 1',
          Children: [
            {
              Id: 5,
              nodeName: 'Node 11',
              Children: [
                {
                  Id: 14,
                  nodeName: 'Node 111',
                  Children: [
                    {
                      Id: 20,
                      nodeName: 'Node 1111',
                      Children: [
                        {
                          Id: 22,
                          nodeName: 'Node 1111',
                          Children: []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              Id: 6,
              nodeName: 'Node 12',
              Children: []
            },
            {
              Id: 7,
              nodeName: 'Node 13',
              Children: [
                {
                  Id: 15,
                  nodeName: 'Node 131',
                  Children: [
                    {
                      Id: 21,
                      nodeName: 'Node 1311',
                      Children: []
                    }
                  ]
                },
                {
                  Id: 16,
                  nodeName: 'Node 132',
                  Children: []
                }
              ]
            },
            {
              Id: 8,
              nodeName: 'Node 14',
              Children: [
                {
                  Id: 17,
                  nodeName: 'Node 141',
                  Children: []
                },
                {
                  Id: 18,
                  nodeName: 'Node 142',
                  Children: []
                }
              ]
            },
            {
              Id: 9,
              nodeName: 'Node 15',
              Children: []
            },
            {
              Id: 10,
              nodeName: 'Node 16',
              Children: []
            }
          ]
        },
        {
          Id: 3,
          nodeName: 'Node 2',
          Children: []
        },
        {
          Id: 4,
          nodeName: 'Node 3',
          Children: [
            {
              Id: 11,
              nodeName: 'Node 31',
              Children: []
            },
            {
              Id: 12,
              nodeName: 'Node 32',
              Children: [
                {
                  Id: 19,
                  nodeName: 'Node 321',
                  Children: []
                }
              ]
            },
            {
              Id: 13,
              nodeName: 'Node 33',
              Children: []
            }
          ]
        }
      ]
    }
  ]
  );


}
