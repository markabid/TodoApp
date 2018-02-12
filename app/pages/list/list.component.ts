import { Component, ElementRef, OnInit, ViewChild, NgModule } from "@angular/core";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { TextField } from "ui/text-field";

@NgModule({
    imports: [TNSCheckBoxModule],
    // etc.
})
export class YourModule {}
 
// component:
export class SomeComponent  {
    @ViewChild("CB1") FirstCheckBox: ElementRef;
    constructor() {}
    public toggleCheck() {
        this.FirstCheckBox.nativeElement.toggle();
    }
 
    public getCheckProp() {
        console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
    }
}

@Component({
  selector: "list",
  moduleId: module.id,
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"]
})
export class ListComponent implements OnInit {
  todoList: Array<Object> = [];
  todo = "";
  @ViewChild("todoTextField") todoTextField: ElementRef;

  ngOnInit() {
    this.todoList.push({ name: "Apples" });
    this.todoList.push({ name: "Bananas" });
    this.todoList.push({ name: "Oranges" });
    this.todoList.push({ name: "Apples" });
    this.todoList.push({ name: "Bananas" });
    this.todoList.push({ name: "Oranges" });
    this.todoList.push({ name: "Apples" });
    this.todoList.push({ name: "Bananas" });
    this.todoList.push({ name: "Oranges" });
  }

  delete(){
      
  }

  add(){
    if(this.todo.trim() === ""){
        alert("Enter a todo");
        return;
    }
    
    // Dismiss the keyboard
    let textField = <TextField>this.todoTextField.nativeElement;
    textField.dismissSoftInput();
  }
}