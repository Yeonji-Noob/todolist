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

let taskInput = document.getElementById("task-input");

// + 버튼
let addButton = document.getElementById("add-button");

// 빈 배열에다가 task-input의 값을 push 해 줄 것임
// TS2339 오류때문에 type alias(타입변수) 사용해줌

type Task = {
  id: string | number;
  taskContent: string;
  isComplete: boolean;
};

let taskList: Task[] = [];

let addTask = () => {
  let taskInput = document.getElementById("task-input") as HTMLInputElement;

  let task: Task = {
    id: randomId(),
    taskContent: taskInput.value,
    isComplete: false,
  };

  taskList.push(task);
  console.log(taskList);
  render();
};

addButton?.addEventListener("click", addTask);

let render = () => {
  let resultHTML: string = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class="done">${taskList[i].taskContent}</div>
      <div class="check-button">
        <button onclick="toggle('${taskList[i].id}')">Check</button>
        <button onclick="deleteTask()">Delete</button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
      <div>${taskList[i].taskContent}</div>
      <div class="check-button">
        <button onclick="toggle('${taskList[i].id}')">Check</button>
        <button onclick="deleteTask()">Delete</button>
      </div>
    </div>`;
    }
  }

  let taskBoard: HTMLElement | null = document.getElementById("task-board");
  if (taskBoard !== null) {
    //null값인지 체크
    taskBoard.innerHTML = resultHTML;
    console.log(taskBoard);
  }
};

let toggle = (id: string | number) => {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; //반대값을 넣기 위해 ! 사용
      break;
    }
  }

  render();
};

// 데이터에 고유 ID값 부여
let randomId = () => "_" + Math.random().toString(36).substr(2, 9);

let deleteTask = () => {

  

}