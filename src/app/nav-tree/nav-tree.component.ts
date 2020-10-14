import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, Injectable,OnInit,ChangeDetectionStrategy } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import { HttpClient,HttpResponse } from '@angular/common/http';
import{EmailService} from '../services/email.service'
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { Subject, of, pipe, from } from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import { switchMap, debounceTime } from 'rxjs/operators';
import { DataStateChangeEventArgs } from '@syncfusion/ej2-angular-grids';
import { ChangeDetectorRef } from '@angular/core';

export class FileNode {
  children: FileNode[];
  name:string;
  notif:number;
  id:string;
}

export class FileFlatNode {
  constructor(
    public expandable: boolean,
    public name: string,
    public level: number,
    public id: string
  ) {}
}


const TREE_DATA = JSON.stringify({
 
    id: '1',
  name: "Product",
  notif: 0,
  children: [
    {
      
      name: "Bank account or service",
      children: null,
      notif: 0
    }]
}

);

@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor() {
    this.initialize();
  }

  initialize() {
    const dataObject = JSON.parse(TREE_DATA);

    
    const data = this.buildFileTree(dataObject, 0);

    this.dataChange.next(data);
  
  
  }

  buildFileTree(obj: {[key: string]: any}, level: number, parentId: string = '0'): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      const node = new FileNode();
      node.name = key;
      
      node.id = `${parentId}/${idx}`;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1, node.id);
        } else {
          node.name = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

@Component({
  selector: 'app-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.css'],

})

@Injectable()

export class NavTreeComponent  implements OnInit{

  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;
  expandedNodeSet = new Set<string>();
  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;
  public refreshLabels=new Subject<void>();


  private readonly refreshToken$ = new BehaviorSubject(undefined);
  private readonly task$ = this.refreshToken$.pipe(
    
    switchMap(() => this.http.get("http://localhost:3000/Classification"))
);
  getData():Observable<FileNode[]>
{
    const url ='http://localhost:3000/Classification';
    return this.http.get<FileNode[]>(url)
}
  constructor(private http: HttpClient,
  private emailservice:EmailService,
  private ToastService:ToastService,
  private FileDatabase:FileDatabase,
  ) {
      this.treeFlattener=new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren, )

      this.treeControl = new FlatTreeControl(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

}

ngOnInit(): void {
   this.get()
}

get()
{
  this.getData().subscribe(
    data=>
    {
      this.dataSource.data = data as FileNode[]
    })
}

transformer(node: FileNode, level: number) {
  return {
    name: node.name,
    notif:node.notif,
    level: level,
    id:node.id,
    expandable: node.children.length>0
  };
}
  private _getLevel = (node: FileFlatNode) => node.level;
  private _getId = (node: FileFlatNode) => node.id;
  private _isExpandable = (node: FileFlatNode) => node.expandable;
  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);
  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;


  visibleNodes(): FileNode[] {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    const result = [];

    function addExpandedChildren(node: FileNode, expanded: Set<string>) {
      result.push(node);
      if (expanded.has(node.id)) {
        node.children.map(child => addExpandedChildren(child, expanded));
      }
    }
    this.dataSource.data.forEach(node => {
      addExpandedChildren(node, this.expandedNodeSet);
    });
    return result;
  }

             /** drag and drop  */
  drop(event: CdkDragDrop<string[]>) {
    
    if (!event.isPointerOverContainer) return;

    const visibleNodes = this.visibleNodes();

    const changedData = JSON.parse(JSON.stringify(this.dataSource.data));
    function findNodeSiblings(arr: Array<any>, id: string): Array<any> {
      let result, subResult;
      arr.forEach(item => {
        if (item.id === id 
         ) {

          result = arr;
        } else if (item.children) {
          subResult = findNodeSiblings(item.children, id);
          if (subResult) result = subResult;
        }
      });
      return result;
      
    }

    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: FileNode = siblings.splice(siblingIndex, 1)[0];

    const nodeAtDest = visibleNodes[event.currentIndex];
    if (nodeAtDest.id === nodeToInsert.id) return;
    let relativeIndex = event.currentIndex; // default if no parent
    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(n => nodeAtDest.id === n.id);
    const parent = this.getParentNode(nodeAtDestFlatNode);
    if (parent) {
      const parentIndex = visibleNodes.findIndex(n => n.id === parent.id) + 1;
      relativeIndex = event.currentIndex - parentIndex;

    }
    // insert node 
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    if (!newSiblings) return;
    newSiblings.splice(relativeIndex, 0, nodeToInsert);
    
    // rebuild tree 
    this.rebuildTreeForData(changedData);
  }

  /**
   opening tree nodes as you drag over them
   */
  dragStart() {
    this.dragging = true;
  }
  dragEnd() {
    this.dragging = false;
  }
  dragHover(node: FileFlatNode) {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => {
        this.treeControl.expand(node);
      }, this.expandDelay);
    }
  }
  dragHoverEnd() {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }

  /**
   * after being rebuilt
   */

  rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(this.treeControl.dataNodes, Array.from(this.expandedNodeSet));
  }

  private rememberExpandedTreeNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach((node) => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          expandedNodeSet.add(node.id);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(
    treeControl: FlatTreeControl<FileFlatNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach((nodeId) => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find((n) => n.id === nodeId)) {
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: FileFlatNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) return;
    const idSet = new Set(ids);
    return flatNodes.forEach((node) => {
      if (idSet.has(node.id)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  private getParentNode(node: FileFlatNode): FileFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

               /** handeling data  */


  postChild(childName:string,id:number,s2:string)
{
  this.getNodeParent(s2).subscribe((data:FileNode)=>
    {
   let node :FileNode=data
 
   let newNode = this.createItem(childName)
   for(let item in node)
   {
        if(node[item].id==id)
        {
          node[item].children.push(newNode)
        
          return this.http.put<FileNode>('http://localhost:3000/Classification/'+node[item].id,node[item])
          .subscribe(data =>
           {
            console.log(data)
            });
        }
  }
  })
  this.getData();
}


updatParentNotif(id:number,notif:number)
{
  this.getNode(id).subscribe((data:FileNode)=>
    {
      data.notif+=notif;
      this.http.put<FileNode>('http://localhost:3000/Classification/'+id,data)
     .subscribe(data =>
     {
        console.log(data)
      })
    })


}

updateNotif(id:number,notif:number,child:string)
{      
  this.getNode(id).subscribe((data:FileNode)=>
    { data.notif+=notif;
      for(let item in data.children)
      {
           if(data.children[item].name==child)
           {
            data.children[item].notif+=notif;
             return this.http.put<FileNode>('http://localhost:3000/Classification/'+id,data)
             .subscribe(data =>
              {
                   console.log(data)
               })
           }
     }
    })

}
getNode(id):Observable<FileNode>
{
    return this.http.get<FileNode>('http://localhost:3000/Classification/'+id)
}

updateNotif1(id:number,notif:number,child:string)
{      
  this.getNode(id).subscribe((data:FileNode)=>
    { data.notif-=notif;
      for(let item in data.children)
      {
           if(data.children[item].name==child)
           {
            data.children[item].notif-=notif
             return this.http.put<FileNode>('http://localhost:3000/Classification/'+id,data)
             .subscribe(data =>
   
               {
                this.dataSource.data[id-1]=data


                   console.log(data)
               })
           }
     }
    })
    this.getData();

}

createItem(s:string):FileNode
{
 let  newChild:FileNode=new FileNode()
 newChild.name=s
 newChild.children=[]
 newChild.notif=0
 return newChild;
}


getNodeParent(name:string):Observable<FileNode>
      { let httpParams = new HttpParams()
        .set('name', name);
return this.http.get<FileNode>('http://localhost:3000/Classification',{params:httpParams})
      
      }
Searchchild(child:string,node:string,cb :(obj11 :boolean)=>any)//look for sublabel

{
  let obj11:boolean
  let test=false;
  this.getNodeParent(node).subscribe(data=>
    {
     if(data[0].children.find(FileNode => FileNode.name==child))
      {
        test=true
      }
      obj11=test
      cb(obj11);
    })
}
check(childeName:string,s1:string,id:number)//check if child nide exist === check if sublabel exist
{
  let res=null

  this.Searchchild(childeName,s1,(obj11:boolean)=>
   {
      let res:boolean
      res=obj11
      if(!res)
      {

        this.postChild(childeName,id,s1)

        this.ToastService.openSnackBar(` A new label Has been added`,"close")

      }
   });
   res=1;

}
}