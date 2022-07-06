import { CellState } from '../enums/cell-state';

export default interface ICell {
  state: CellState;
  isFlagged: boolean;
  hasMine: boolean;
  value: number
}
