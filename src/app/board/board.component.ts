import { Component, Input, OnInit } from '@angular/core';
import { CellState } from '../enums/cell-state';
import ICell from '../models/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input('width') public width!: number;
  @Input('height') public height!: number;
  @Input('mines') public mines!: number;

  public cells: ICell[][] = [];
  public CellState = CellState;

  constructor() {
  }

  public ngOnInit(): void {
    this.generateCells();
    this.placeRandomMines();
    this.fillCellValue();
  }

  public openCell(x: number, y: number): void {
    if (this.cells[x][y].state === CellState.Opened) {
      console.log('This cell has already been opened');
      return;
    }
    if (this.cells[x][y].hasMine) {
      this.revealAll();
      console.log('game over');
      return;
    }

    if (this.cells[x][y].value !== 0) {
      this.cells[x][y].state = CellState.Opened;
      return;
    }

    let queue: [number, number][] = [];
    queue.push([x, y]);

    while (queue.length > 0) {
      let current: [number, number] = queue.shift() as [number, number];

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {

          let next: [number, number] = [current[0] + i, current[1] + j];

          if (
            next[0] < 0 ||
            next[0] > this.width - 1 ||
            next[1] < 0 ||
            next[1] > this.height - 1 ||
            this.cells[next[0]][next[1]].state !== CellState.Closed) {
            continue;
          }

          this.cells[next[0]][next[1]].state = CellState.Opened;

          if (!(i === 0 && j === 0) && this.cells[next[0]][next[1]].value === 0) {
            queue.push(next);
          }
        }
      }
    }
  }

  private generateCells(): void {
    for (let i = 0; i < this.width; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.height; j++) {
        this.cells[i][j] = {
          state: CellState.Closed,
          isFlagged: false,
          hasMine: false,
          value: 0
        }
      }
    }
  }

  private placeRandomMines(): void {
    if (this.mines > this.width * this.height) {
      throw new Error('Too much mines');
    }
    let minesToPlace = this.mines;

    while (minesToPlace > 0) {
      let randX = Math.floor(Math.random() * this.width);
      let randY = Math.floor(Math.random() * this.height);

      if (this.cells[randX][randY].hasMine) {
        continue;
      }

      this.cells[randX][randY].hasMine = true;
      minesToPlace--;
    }
  }

  private fillCellValue(): void {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (this.cells[i][j].hasMine) {
          continue;
        }

        for (let offsetI = -1; offsetI <= 1; offsetI++) {
          for (let offsetJ = -1; offsetJ <= 1; offsetJ++) {
            let nextI = i + offsetI;
            let nextJ = j + offsetJ;

            if ((offsetI === 0 && offsetJ === 0) || nextI < 0 || nextI > this.width - 1 || nextJ < 0 || nextJ > this.height - 1 ||
              !this.cells[nextI][nextJ].hasMine) {
              continue;
            }

            this.cells[i][j].value++;
          }
        }
      }
    }
  }

  private revealAll() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.cells[i][j].state = CellState.Opened;
      }
    }
  }
}
