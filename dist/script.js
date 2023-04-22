"use strict";
// 값 입력창
// + 버튼 클릭 => 할일 추가
// delete 누르면 할일 삭제
// check 누르면 할일 끝, 줄 쳐짐
//1.check 누르면 true false 전환
//2.true일 때 밑줄, false일때는 그대로
// 언더바 이동
// 탭별로 분류
// 전체 탭 누르면=> 전체 아이템으로 돌아옴
/*-----------------------------------------------*/
// + 버튼
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let selectMenu = "all";
let filterList = [];
let underLine = document.getElementById("underline");
/*------------------------*/
/*------------------------*/
// tabs.forEach(menu => menu.addEventListener("click", ))
//offsetLeft는 HTMLElement에 속하고, eventTarget에는 없는 속성이라서
//자꾸 에러가 떴었다.
// as HTMLElement 붙이는 것으로 해결
for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event);
        let lineDraw = (style) => {
            style.left = event.currentTarget.offsetLeft + "px";
            style.width = event.currentTarget.offsetWidth + "px";
            style.top =
                event.currentTarget.offsetTop + event.currentTarget.offsetHeight - 5 + "px";
        };
        //  'undefined' 형식은 'CSSStyleDeclaration' 형식에 할당할 수 없습니다.ts(2345)
        // 라는 에러가 뜨기 때문에, if문으로 undefined을 확인시켜준 뒤에 아닌 경우에만
        // lineDraw를 호출함
        if (underLine?.style) {
            lineDraw(underLine.style);
        }
    });
}
//필터링 해주는 함수
let filter = (event) => {
    selectMenu = event.target.id;
    filterList = [];
    if (selectMenu == "all") {
        render();
    }
    else if (selectMenu == "progress") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    else if (selectMenu == "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
    console.log(filterList);
};
// 리스트 값을 추가해줌
let addTask = () => {
    let taskInput = document.getElementById("task-input");
    let task = {
        id: randomId(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
};
addButton?.addEventListener("click", addTask);
// 화면에 그려주는 함수 (UI 업데이트)
let render = () => {
    //selectMenu 값에 따라 list를 동적으로 할당
    let list = [];
    if (selectMenu === "all") {
        list = taskList;
    }
    else {
        list = filterList;
    }
    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete == true) {
            resultHTML += `<div class="task">
        <div class="highlight"></div>
        <div class="done">${list[i].taskContent}</div>
        <div class="check-button">
          <img onclick="toggle('${list[i].id}')" src="./images//check_button.svg" alt="check">
          <img onclick="deleteTask('${list[i].id}')" src="./images//delete_button.svg" alt="delete">
        </div>
      </div>`;
        }
        else {
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div class="check-button">
        <img onclick="toggle('${list[i].id}')" src="./images//check_button.svg" alt="check">
        <img onclick="deleteTask('${list[i].id}')" src="./images//delete_button.svg" alt="delete">
        </div>
      </div>`;
        }
    }
    let taskBoard = document.getElementById("task-board");
    if (taskBoard !== null) {
        //null값인지 체크
        taskBoard.innerHTML = resultHTML;
        console.log(taskBoard);
    }
};
// 체크 버튼 토글
let toggle = (id) => {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete; //반대값을 넣기 위해 ! 사용
            break;
        }
    }
    render();
};
// 삭제 버튼
let deleteTask = (id) => {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
};
// 데이터에 고유 ID값 부여
let randomId = () => "_" + Math.random().toString(36).substr(2, 9);
