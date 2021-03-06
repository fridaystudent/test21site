"use strict";

const version = "4.0";

const gameSizeInBlocks = { x:10, y:20 };

const key = {
	start: 13,	// Enter (start/pause/continue)
	cancel: 27,	// Esc
	left: 37,
	rotate: 38,	// Up
	right: 39,
	down: 40,
	dropDown: 32,	// Space
	help: 112	// F1
}; //key

const delays = { // before piece drops by 1 row (seconds)
	start: 0.7,
	decrement: 0.003,
	min: 0.1
}; //delays

const scoreRules = {
	addOnDrop: function(totalRemovedLineCount, currentScore) { return 10; },
	addOnRemovedLines: function(lineCount, totalRemovedLineCount, currentScore) { return 100 * Math.pow(2, lineCount - 1); }
}; //scoreRules

const tetrominoColor = {
/* ── 	*/	I: "orange",
/* ─┐	*/	J: "orchid",
/*┌─ 	*/	L: "blue",
/* ☐	*/	O: "red",
/* _┌	*/	S: "lightskyblue",
/* ┬ 	*/	T: "yellow",   
/* ┐_	*/	Z: "lawngreen"
}; //tetrominoColor

function TetrominoShape(size, blocks, color) { this.size = size; this.blocks = blocks; this.color = color; }
const tetrominoSet = [	new TetrominoShape(4, [0x0F00, 0x2222, 0x00F0, 0x4444], tetrominoColor.I),
			new TetrominoShape(3, [0x0E20, 0x44C0, 0x8E00, 0x6440], tetrominoColor.J),
			new TetrominoShape(3, [0x0E80, 0xC440, 0x2E00, 0x4460], tetrominoColor.L),
			new TetrominoShape(2, [0xCC00, 0xCC00, 0xCC00, 0xCC00], tetrominoColor.O),
			new TetrominoShape(3, [0x06C0, 0x8C40, 0x6C00, 0x4620], tetrominoColor.S),
			new TetrominoShape(3, [0x0E40, 0x4C40, 0x4E00, 0x4640], tetrominoColor.T),
			new TetrominoShape(3, [0x0C60, 0x4C80, 0xC600, 0x2640], tetrominoColor.Z)];

//-------------------------------------------------------------------------
// tetramino:
//
// blocks: each element represents a rotation of the piece (0, 90, 180, 270)
//         each element is a 16 bit integer where the 16 bits represent
//         a 4x4 set of blocks, e.g. "J"-shaped tetrominoSet[1].blocks[1] = 0x44C0
//
//             0100 = 0x4 << 3 = 0x4000 
//             0100 = 0x4 << 2 = 0x0400
//             1100 = 0xC << 1 = 0x00C0
//             0000 = 0x0 << 0 = 0x0000
//                               ------
//                               0x44C0
//
//-------------------------------------------------------------------------
