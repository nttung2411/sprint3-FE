import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FoodService} from '../../services/food.service';
import {Food} from '../../models/Food';
import {FoodDTO} from '../../models/FoodDTO';
import {Rate} from '../../models/Rate';
import {RateService} from '../../services/rate.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {FormBuilder, Validators} from '@angular/forms';
import {Comment} from '../../models/Comment';
import {CommentService} from '../../services/comment.service';

declare const $: any;

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  private foodDTO: FoodDTO;
  message: string;
  imageComment: any;
  imageToUpFireBase = new Array<any>();
  contentComment: string;
  formComment;
  imageToSave;

  constructor(private activatedRoute: ActivatedRoute,
              private foodService: FoodService,
              private rateService: RateService,
              private storage: AngularFireStorage,
              private formBuilder: FormBuilder,
              private commentService: CommentService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.foodService.getFoodById(paramMap.get('id')).subscribe(data => this.foodDTO = data);
    });
    this.formComment = this.formBuilder.group({
      contentComment: ['', [Validators.required]]
    });
  }


  onRate($event: { newValue: number }) {
    const pointVote = $event.newValue;
    const rate: Rate = {
      point: pointVote,
      food: this.foodDTO.food
    };
    this.rateService.savePoint(rate).subscribe();
    window.location.reload();
  }

  importImage(event) {
    const file = event.target.files;
    const name = file[0].type;
    const size = file[0].size;
    if (name.match(/(png|jpeg|jpg|PNG|JPEG|JPG)$/)) {
      if (size <= 1000000) {
        this.message = null;
        this.imageToUpFireBase.push(file);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event: any) => {
          this.imageComment = event.target.result;
        };
      } else {
        this.message = 'Capacity of file is to big';
        return;
      }
    } else {
      this.message = 'Please choose the image';
      return;
    }
    this.message = null;
  }

  clearFormComment() {
    this.imageComment = null;
    $('#myTextarea').data('emojioneArea').setText('');
  }

  deleteImage() {
    this.imageComment = null;
  }

  addImageToFireBase() {
    return new Promise(resolve => {
      Promise.all(this.imageToUpFireBase.map(file =>
        new Promise(resolve => {
          const name = file.name;
          const fileRef = this.storage.ref('images/' + name);
          const task = fileRef.put(file);
          task.snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL()
                .subscribe((url) => {
                  this.imageToSave = url;
                  resolve(1);
                });
            })).subscribe();
        }))).then(() => {
        resolve(1);
      });
    });
  }

  async submitComment() {
    if (this.imageToUpFireBase) {
      await this.addImageToFireBase();
    }
    const comment: Comment = {
      commentContent: $('#myTextarea').data('emojioneArea').getText().trim(),
      commentImage: this.imageToSave,
      food: this.foodDTO.food
    };
    this.commentService.saveComment(comment).subscribe(data => this.ngOnInit());
  }
}
