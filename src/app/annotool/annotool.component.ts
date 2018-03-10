import { Component, OnInit } from '@angular/core';
import { CrawlersService } from '../services/crawlers.service';
import { ActivatedRoute } from '@angular/router';
import { AnnotationService } from '../services/annotation.service';
import { ScaleEntry } from '../models/ScaleEntry';
import { Annotation } from '../models/annotation';
import { AnnotationEntry } from '../models/AnnotationEntry';

@Component({
  selector: 'app-annotool',
  templateUrl: './annotool.component.html',
  styleUrls: ['./annotool.component.scss']
})
export class AnnotoolComponent implements OnInit {

  anno_id: string;
  task_id: number;
  scale_entries : ScaleEntry[];
  entries: AnnotationEntry[] = [];
  task: Annotation;
  current_entry_id: number = 0;

  constructor(private route: ActivatedRoute, private annotationService: AnnotationService) {}

  ngOnInit() {
    this.anno_id = this.route.snapshot.paramMap.get('id');
    this.annotationService.getTaskByAnnotator(this.anno_id).subscribe(resp => {
      this.task_id = resp.task_id;

      this.annotationService.get(this.task_id).subscribe(resp => {
        this.task = resp;
      });

      this.annotationService.getEntries(this.task_id).subscribe(resp => {
        this.entries = resp;
      });

      this.annotationService.getScaleEntries(this.task_id).subscribe(resp => {
        this.scale_entries = resp;
        for(var e of this.scale_entries){
          e.checked = false;
        }
      });
    });
    
  }

  public getEntry() : AnnotationEntry{
    if(this.entries.length == 0){
      return undefined;
    }

    var entry = this.entries[this.current_entry_id];
    if(entry.json == undefined){
      entry.json = "[]"
    }

    return entry;
  }

  public getEntryJson(): any{
    var entry = this.getEntry();
    if(entry != undefined){
      var json = JSON.parse(entry.json.replace(/'/g, "\"").replace(/None/g, "null"));
      var ret = [];
      for(var j of json){
        var key = Object.keys(j)[0];
        var value = j[key];
        if(value == null){
          value = "n/a";
        }
        ret.push({"key": key, "value": value});
      }
      return ret;
    }
    return [];
  }

  public getType(id: number): string{
    if(id == 0){
      return "checkbox";
    }
    return "radio";
  }

  public save(){
    console.log(this.scale_entries);
    if(this.current_entry_id < this.entries.length - 1){
      this.current_entry_id++;
    }else{
      // UIkit.modal.alert('Annotation finished! Thank you for your work.')
    }
  }

}
