Create a **Board** class with the following

### Properties
| Property Name | Type     | Description                |
| ------------- | -------- | -------------------------- |
| width         | number   | N count of cells in width  |
| height        | number   | N count of cells in height |
| bombsCount         | number   | N amount of bombs to be places on board  |
| cells         | ICell [ ] [ ] | The list of cells  |
| cells         | CellState | Cell states that can be used in View |


### Methods
| Method Name   | Description                |
| ------------- | -------------------------- |
| generateCells | iterate throughout the size of the board NxN and generate empty cells  |
| placeRandomBombs | place random bombs on the generated cells  |
| fillCellValue |  Update each cell value with the number of adjacent bombs |
| openCell |  update the cell state and if cell has adjacent bombs it automatically make them visible |
