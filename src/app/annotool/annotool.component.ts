import { Component, OnInit } from '@angular/core';
import { CrawlersService } from '../services/crawlers.service';
import { ActivatedRoute } from '@angular/router';
import { AnnotationService } from '../services/annotation.service';
import { ScaleEntry } from '../models/ScaleEntry';
import { Annotation } from '../models/annotation';
import { AnnotationEntry } from '../models/AnnotationEntry';
import { AnnotationResult } from '../models/AnnotationResult';
import { Annotator } from '../models/Annotator';

declare var UIkit:any;
export const uikit = UIkit;

@Component({
  selector: 'app-annotool',
  templateUrl: './annotool.component.html',
  styleUrls: ['./annotool.component.scss']
})
export class AnnotoolComponent implements OnInit {

  anno_id: string;
  task_id: number;
  annotator: Annotator;
  scale_entries : ScaleEntry[];
  entries: AnnotationEntry[] = [];
  task: Annotation;
  current_entry_id: number = 0;
  already_done: number = 0;
  isFinished: boolean = false;
  isChecked: boolean = false;
  result_scale_entries: Map<number, ScaleEntry> = new Map<number, ScaleEntry>();

  constructor(private route: ActivatedRoute, private annotationService: AnnotationService) {}

  ngOnInit() {
    this.anno_id = this.route.snapshot.paramMap.get('id');

    this.annotationService.getTaskByAnnotator(this.anno_id).subscribe(resp => {
      this.task_id = resp.task_id;

      this.annotationService.get(this.task_id).subscribe(resp => {
        this.task = resp;
      });

      this.annotationService.getEntries(this.task_id).subscribe(resp => {
        let entriesTmp = resp;

        this.annotationService.getAnnotatorByToken(this.anno_id).subscribe(resp => {
          this.annotator = resp;
    
          this.annotationService.getResultsByAnnotator(this.annotator.id).subscribe(resp => {
            let resultArray = [];
            for(let result of resp){
              resultArray.push(result.entry_id);
            }

            this.already_done = resultArray.length;

            for(let entry of entriesTmp){
              console.log(entry.id);
              if(!resultArray.includes(entry.id)){
                this.entries.push(entry);
              }
            }

            if(this.entries.length == 0){
              this.isFinished = true;
            }
          });
        });
        
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
      // var json = JSON.parse(entry.json.replace(/'/g, "\"").replace(/None/g, "null"));
      var json = JSON.parse(entry.json);
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

  public getType(): string{
    if(this.task.anno_type == 0){
      return "checkbox";
    }
    return "radio";
  }

  public save(){
  
    console.log(this.scale_entries);

    this.scale_entries.forEach((value: ScaleEntry, key: number) => {
      if(value.checked){
        let tmp = new AnnotationResult();
        tmp.annotator_id = this.annotator.id;
        tmp.entry_id = this.getEntry().id;
        tmp.scale_entry_id = value.id;
        this.annotationService.saveResult(tmp).subscribe(resp => {});
      }
      value.checked = false;
    });
    
    if(this.current_entry_id < this.entries.length - 1){
      this.current_entry_id++;
    }else{
      this.isFinished = true;
    }
  
  }

  public setResult(scaleEntry: ScaleEntry){
    let val = this.result_scale_entries.get(scaleEntry.id);
  
    if(this.task.anno_type == 1){
      this.result_scale_entries = new Map<number, ScaleEntry>();
    }

    if(val == undefined){
      this.result_scale_entries.set(scaleEntry.id, scaleEntry);
    }else{
      this.result_scale_entries.set(scaleEntry.id, undefined);
    }
  }

}
