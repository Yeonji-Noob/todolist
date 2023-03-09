"use strict";
// 값 입력창
// + 버튼 클릭 => 할일 추가
// delete 누르면 할일 삭제
// check 누르면 할일 끝, 줄 쳐짐
// 언더바 이동
// 탭별로 분류
// 전체 탭 누르면=> 전체 아이템으로 돌아옴
/*-----------------------------------------------*/
let taskInput = document.getElementById("task-input");
// + 버튼
let addButton = document.getElementById("add-button");
let taskList = [];
let addTask = () => {
    let taskInput = document.getElementById("task-input");
    let task = {
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    console.log(taskList);
    render();
};
addButton?.addEventListener("click", addTask);
let render = () => {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="task">
    ${taskList[i].taskContent}
    <div class="check-button">
      <button>Check</button>
      <button>Delete</button>
    </div>
  </div>`;
    }
    let taskBoard = document.getElementById("task-board");
    if (taskBoard !== null) { //null값인지 체크
        taskBoard.innerHTML = resultHTML;
        console.log(taskBoard);
    }
};
