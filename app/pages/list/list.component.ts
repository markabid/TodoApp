import { Component, ElementRef, OnInit, ViewChild, NgModule } from "@angular/core";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { TextField } from "ui/text-field";
import { Todo } from "../../shared/todo/todo";
import * as ApplicationSettings from "application-settings";
import * as SocialShare from "nativescript-social-share";
import * as dialogs from "ui/dialogs";

@NgModule({
    imports: [TNSCheckBoxModule],
    // etc.
})

@Component({
  selector: "list",
  moduleId: module.id,
  templateUrl: "./list.html",
  styleUrls: ["./list-common.css", "./list.css"]
})

export class ListComponent implements OnInit {
    todoList: Array<any>;
    mostRecent: Array<any>;
    todo = "";
    id; 
    @ViewChild("todoTextField") todoTextField: ElementRef;
    @ViewChild("CB1") FirstCheckBox: ElementRef;

    ngOnInit() {
        this.todoList = JSON.parse(ApplicationSettings.getString("todo", "[]"));
        this.mostRecent = JSON.parse(ApplicationSettings.getString("mostRecent", "[]"));
        this.id = ApplicationSettings.getNumber("id",0);
    }

    delete(id, text){
        dialogs.confirm({
            title: "Delete",
            message: "Are you sure you would like to delete " + "'" + text + "'" + " from your todo list?",
            okButtonText: "Confirm",
            cancelButtonText: "Cancel"
        }).then(result => {
            if(result){
                this.todoList.splice(this.todoList.findIndex(x => x.id == id), 1);
                ApplicationSettings.setString("todo", JSON.stringify(this.todoList));
                this.mostRecent.splice(this.mostRecent.findIndex(x => x.todoText == text), 1);
                ApplicationSettings.setString("mostRecent", JSON.stringify(this.mostRecent));
            }
        });
    }

    add(){
        if(this.todo.trim() === ""){
            alert("Enter a todo");
            return;
        }
    
        // Dismiss the keyboard
        let textField = <TextField>this.todoTextField.nativeElement;
        textField.dismissSoftInput();
        textField.text = "";

        const todoItem = {
            todoText: this.todo,
            isDone: false,
            dateCreated: new Date().toISOString().substring(0, 10),
            id: this.id + 1
        }

        this.todoList.unshift(todoItem);
        ApplicationSettings.setString("todo", JSON.stringify(this.todoList));
        this.id++;
        ApplicationSettings.setNumber("id", this.id);
    }

    check(text, date, id, curBool){
        var temp = false;
        if(!curBool){
            temp = true; 
        }

        const item = {
            todoText: text,
            isDone: temp,
            dateCreated: date,
            id: id
        }

        this.todoList.splice(this.todoList.findIndex(x => x.id == item.id), 1, item);
        //this.todoList[this.todoList.findIndex(x => x.id == item.id)] = item;
        if(temp){
            if(this.mostRecent.length >= 3){
                this.mostRecent.splice(2, 1);
            }
            this.mostRecent.unshift(text);
            ApplicationSettings.setString("mostRecent", JSON.stringify(this.mostRecent));
        }
        ApplicationSettings.setString("todo", JSON.stringify(this.todoList));
    }

    setDate(date){
        const diff =  Math.floor(( Date.parse(date) - Date.parse(new Date().toISOString().substring(0, 10)) ) / 86400000); 
        switch (true) {
            case (diff < 1):
                return "added today";
            case (diff == 1):
                return "added yesterday";
            case (diff < 30):
                return "added " + diff + " days ago";
            case (diff < 60):
                return "added a month ago"
            case (diff < 365):
                return "added " + Math.floor(diff/30) + " months ago"; 
            case(diff >= 365):
                return "added over a year ago";
        }
    }

    public shareText() {
        if(this.mostRecent.length < 3){
            alert("You need at least 3 completed items before you can share!");
        }
        else{
            const firstItem = "- " + this.mostRecent[0] + "\n";
            const secondItem = "- " +  this.mostRecent[1] + "\n";
            const thirdItem = "- " + this.mostRecent[2] + "\n";
            const stringToShare = "Check out my 3 most recently completed items from Todo.me! \n" + firstItem + secondItem + thirdItem;
            SocialShare.shareText(stringToShare, "How would you like to share your 3 most recently completed items?");
        }
    }
}