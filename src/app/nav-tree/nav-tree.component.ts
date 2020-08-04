import { Component, OnInit,Injectable } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Observable, of as observableOf} from 'rxjs';
import { HttpClient,HttpResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import {  of, pipe, from } from 'rxjs';
import { switchMap, debounceTime, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http'; 

import {Email} from '../models/Email.models'

/** File node data with possible child nodes. */
@Injectable(
  {
      providedIn:'root'
  })
export class FileNode {
  children: FileNode[];
  name:string
}
/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */

export interface FlatTreeNode {
  name: string;
  level: number;
  expandable: boolean;
}
@Component({
  selector: 'app-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.css']
})

@Injectable(
  {
      providedIn:'root'
  })
export class NavTreeComponent  {
  s:FileNode
  a:FileNode[]

  treeControl: FlatTreeControl<FlatTreeNode>;
    /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */

  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  nestedDataSource: MatTreeNestedDataSource<FileNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  constructor(private http: HttpClient) {

  
    this.treeFlattener=new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    )
  

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.getData().subscribe(
      data=>
      {
        this.dataSource.data = data
      /*  console.log("this.dataSource")
      console.log(this.dataSource)*/

      }

     

      )
/*let r:FileNode
   this.getNodeProduct("Product").subscribe(data=>{
     r=data
     console.log(data)
   })*/


  // this.check("he","s",1)
 // this.check("meri","Product",1)

    }




transformer(node: FileNode, level: number) {
  return {
    name: node.name,
    level: level,
    expandable: !!node.children,
  };
}
 getLevel(node: FlatTreeNode) {
  return node.level;
}

isExpandable(node: FlatTreeNode) {
  return node.expandable;
}

hasChild(index: number, node: FlatTreeNode) {
  return node.expandable;
}


getParentNode(node: FlatTreeNode): FlatTreeNode | null {
  const currentLevel = this.getLevel(node);

  if (currentLevel < 1) {
    return null;
  }

  const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

  for (let i = startIndex; i >= 0; i--) {
    const currentNode = this.treeControl.dataNodes[i];

    if (this.getLevel(currentNode) < currentLevel) {
      return currentNode;
    }
  }
  return null;
}


/** Get the children for the node. */
getChildren(node: FileNode): FileNode[] | null | undefined {
  return node.children;
}



getData():Observable<FileNode[]>
{
    const url ='http://localhost:3000/Classification';
    return this.http.get<FileNode[]>(url)
}
getNode(id):Observable<FileNode>
{
    return this.http.get<FileNode>('http://localhost:3000/Classification/'+id)
}
getNodeProduct(name:string):Observable<FileNode>
      { let httpParams = new HttpParams()
        .set('name', name);
    
          return this.http.get<FileNode>('http://localhost:3000/Classification',{params:httpParams})
      
      }
//post


postChild(s1:string,n:number,s2:string)
{
  this.getNodeProduct(s2).subscribe((data:FileNode)=>
    {

    let n :FileNode
     n =data
   let m = this.createItem(s1)
   for(let item in n)
   {
        if(n[item].id==n)
        {
          n[item].children.push(m)
          console.log(n[item].children)
          return this.http.put<FileNode>('http://localhost:3000/Classification/'+n[item].id,n[item])
          .subscribe(data =>

            {
                console.log("updaaate")
                console.log(data)
            })
        }
  }
  })
}

createItem(s:string):FileNode
{
 let  m:FileNode=new FileNode()
 m.name=s
 m.children=null
 return m
}


Searchchild(s1:string,s2:string,cb :(obj11 :boolean)=>any)

{let obj11:boolean
  let test=false;
  this.getNodeProduct(s2).subscribe(data=>
    {
      this.a=data[0].children
      console.log("a")
      console.log(data[0].name)
  //    console.log(this.a.find(FileNode => FileNode.name==s1))
      //return  data.children.find(FileNode => FileNode.name==s1)
    /*  for(let item in this.a)
      {
        console.log(this.a[item].name)
        if(this.a[item].name==s1)
        {
          test=true;
           obj11=test
          cb(obj11);

          return 
        }

      }*/
      if(  data[0].children.find(FileNode => FileNode.name==s1))
      {
        test=true
      }
      obj11=test
      cb(obj11);
    })
}
check(s:string,s1:string,n:number)
{/*s="hi"
s1="Product"
n=1*/
console.log("i m in check")

  this.Searchchild(s,s1,(obj11:boolean)=>
   {
      let res:boolean
      res=obj11
      if(!res)
      {
        console.log(res)


      this.postChild(s,n,s1)
      }
    
      
   }
   )
}



  
hasNestedChild = (_: number, nodeData: FileNode) => {return (nodeData.children); };
}
