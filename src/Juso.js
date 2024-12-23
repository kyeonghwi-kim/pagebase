import React from 'react';


let OB = {
  barm: ['시도', '시군구', '읍면동', '리'],
  select: ['건물선택'],
  land: ['대장종류', '일반산블록', '번', '지'],
  P_path: [
    'ready',
    'sido',
    'sgg',
    'umd',
    'ri',
    'BDsearch_new',
    'BDsearch_two',
    'solution',
  ],
};

let POST_B = {
  // body를 추가해서 전송하라고 일부러 뺌(POST_B.body=".....")
  method: 'POST', // *GET, POST, PUT, DELETE 등
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //body: JSON.stringify(param) 재정의대상임 //  "Content-Type" 헤더 유형과 일치해야 함
};

async function fetpost(cturl, ctbody) {
  try {
    let res = await fetch(cturl, ctbody);
    let data1 = await res.json();
    return JSON.parse(data1); //오브젝트로 리턴, 만약 json으로 리턴시 return JSON.stringify(obj)
  } catch (err) {
    //try문 종료
    console.log('에러(서버확인/재요청 해주세요_client): ', err);
  } //catch문 종료
} //async function fetpost 종료

let paramcity = []; //전역 scope
let parambun = [];
let Allscope;

function addlistener() {
  for (let i = 0; i < OB.barm.length; i++) {
    document.getElementById(OB.barm[i]).addEventListener('change', changecity);
  } //for 종료
} //addlistener종료

async function changecity(e) {
  let mi = OB.barm.findIndex((F) => F === this.id); //bottom work start 인자들 초기화
  for (let i = mi + 1; i < OB.barm.length; i++) {
    document.getElementById(OB.barm[i]).innerHTML = null;
  } //for 종료 OB.barm 이후의 bar초기화
  paramcity.splice(mi, 6, this.value); // mi 뒤를 6개나 splice
  document.getElementById('대장종류').selectedIndex = 0; // OB.land init
  document.getElementById('일반산블록').selectedIndex = 0;
  document.getElementById('번').value = '';
  document.getElementById('지').value = ''; // OB.land init finish

  paramcity[mi] = e.currentTarget.value; //bottom work start
  //console.log(paramcity);
  let myurl = `http://localhost:4000/city/${OB.P_path[mi + 1]}`;
  POST_B.body = JSON.stringify(paramcity); //bottom work finish//"Content-Type"헤더와 데이터유형이 일치

  await fetpost(myurl, POST_B).then((citys) => {
    if (citys.length == 0) {
      return; //from server 리턴배열이 empty이면 조기종료
    } else {
      let copy_citys = [];
      for (let i = 0; i < citys.length; i++) {
        copy_citys[i] = '<option>' + citys[i] + '</option>';
      }
      document.getElementById(OB.barm[mi + 1]).innerHTML =
        `<option>${OB.barm[mi + 1]}</option>` + copy_citys.join('');
    } //if
  }); // then
} // changecity

async function intro() {
  for (let i = 0; i < OB.barm.length; i++) {
    document.getElementById(
      OB.barm[i]
    ).innerHTML = `<option>${OB.barm[i]}</option>`;
  } //for end OB.barm 이후의 bar init
  paramcity = [];
  document.getElementById('대장종류').selectedIndex = 0; // OB.land 인자들 init
  document.getElementById('일반산블록').selectedIndex = 0;
  document.getElementById('번').value = '';
  document.getElementById('지').value = ''; // OB.land 인자들 init finish

  let myurl = `http://localhost:4000/city/${OB.P_path[0]}`;
  POST_B.body = JSON.stringify(paramcity); //bottom work finish//"Content-Type"헤더와 데이터유형이 일치해야 함
  await fetpost(myurl, POST_B).then((citys) => {
    if (citys.length == 0) {
      return; // from server 리턴배열이 empty이면 조기종료
    } else {
      let copy_citys = [];
      for (let i = 0; i < citys.length; i++) {
        copy_citys[i] = '<option>' + citys[i] + '</option>';
      }
      document.getElementById(OB.barm[0]).innerHTML =
        `<option>${OB.barm[0]}</option>` + copy_citys.join('');
      addlistener();
    } //if
  }); // then
} // intro

async function BDsearch_new() {
  // 순결성검사
  for (let i = 0; i < OB.barm.length; i++) {
    if (OB.barm[i] == document.getElementById(OB.barm[i]).value) {
      alert(`[${OB.barm[i]}] 선택해 주세요!`);
      return;
    } //if 1번end
  } //for
  if (document.getElementById('번').value == '') {
    alert('[번] 을 입력하세요!');
    return;
  } //if 2번 end
  //순결성검사 end, parambun 에 담기시작
  parambun = [];
  parambun[0] = document.getElementById('대장종류').selectedIndex;
  parambun[1] = document.getElementById('일반산블록').selectedIndex;
  parambun[2] = String(document.getElementById('번').value).padStart(4, '0');
  parambun[3] = String(document.getElementById('지').value).padStart(4, '0');
  if (isNaN(parambun[2]) + isNaN(parambun[3]) != 0) {
    alert('[번, 지]는 숫자만 입력 가능!.');
    return;
  }
  //console.log(parambun);
  let strnm = ['층', '동'];

  strnm[parambun[0]];
  let myurl = `http://localhost:4000/city/${OB.P_path[5]}`;

  POST_B.body = JSON.stringify(parambun); //bottom work finish//"Content-Type"헤더와 데이터유형이 일치
  await fetpost(myurl, POST_B).then((data) => {
    console.log(data);
    if (data.pagecnt === 0) {
      alert('해당장소에 건축물 등록사항 없음(부존재)');
      return;
    } else if (data.pagecnt === '') {
      alert('조회실패(재조회)');
      return;
    }

    if (data.failpage.length == 0) {
      alert(
        `${data.newPlatPlc}  ${data.bldNm} \n\n전체: ${data.pagecnt} page \n수신성공: ${data.suspage.length} [${data.suspage}] \n\n모든페이지 수신성공/ 총 ${data.bldNmdongs.length} 개동`
      );

      let dongNm = [];
      for (let i = 0; i < data.bldNmdongs.length; i++) {
        dongNm[i] = '<option>' + data.bldNmdongs[i] + '</option>';
      }
      document.getElementById('건물선택').innerHTML =
        `<option>건물선택</option>` + dongNm.join('');

      document
        .getElementById('건물선택')
        .addEventListener('change', changeselect);
      let parame = [];
      async function changeselect(e) {
        parame.length = 0;
        parame[0] = e.currentTarget.value; //bottom work start
        console.log(parame[0]);

        let myurl = `http://localhost:4000/city/${OB.P_path[7]}`;
        POST_B.body = JSON.stringify(parame[0]); //bottom work finish//"Content-Type"헤더와 데이터유형이 일치
        fetpost(myurl, POST_B).then((data) => {
          //
          //
          //
        });
      } // changeselect 문 종료
    } else if (data.failpage.length > 0) {
      Allscope = { ...data }; // data를 전역스코프로 올리고 twoalert 실행
      twoalert();
    } //else if
  }); //else if
} //BDsearch

async function twoalert() {
  for (let i = 3; i > 0; i--) {
    alert(
      `${Allscope.newPlatPlc} ${Allscope.bldNm} \n\n전체: ${Allscope.pagecnt} page \n수신성공: ${Allscope.suspage.length} [${Allscope.suspage}] \n수신실패: ${Allscope.failpage.length} [${Allscope.failpage}]\n\n수신에 실패한 page를 다시조회 합니다. \n\n재조회 남은횟수 ${i}회`
    );

    let myurl = `http://localhost:4000/city/${OB.P_path[6]}`;
    POST_B.body = JSON.stringify(Allscope.failpage); //"Content-Type"헤더와 데이터유형이 일치
    await fetpost(myurl, POST_B).then((data) => {
      console.log(data);
      if (data.failpage.length == 0) {
        alert(
          `${data.newPlatPlc}  ${data.bldNm} \n\n전체: ${data.pagecnt} page \n수신성공: ${data.suspage.length} [${data.suspage}] \n\n모든페이지 수신성공/ 총 ${data.bldNmdongs.length} 개동`
        );

        let dongNm = [];
        for (let i = 0; i < data.bldNmdongs.length; i++) {
          dongNm[i] = '<option>' + data.bldNmdongs[i] + '</option>';
        }
        document.getElementById('건물선택').innerHTML =
          `<option>총 ${data.bldNmdongs.length} 개동 조회</option>` +
          dongNm.join('');

        berak; //for문 탈출
      } else if (data.failpage.length > 0) {
        Allscope = { ...data }; //Allscope로 올림
        if (i == 1) {
          //마지막루프 이면 alert가 아닌 선택창(confirm)을 실행시켜줌
          let YN = confirm(
            `지금까지의 데이터로만 loading 하시겠습니까?            
            \n\n수신성공: ${Allscope.suspage.length} [${Allscope.suspage}] \n수신실패: ${Allscope.failpage.length} [${Allscope.failpage}]`
          );
          if (YN == true) {
            alert(`지금까지의 데이터로만 loading 합니다.`);

            let dongNm = [];
            for (let i = 0; i < data.bldNmdongs.length; i++) {
              dongNm[i] = '<option>' + data.bldNmdongs[i] + '</option>';
            }
            document.getElementById('건물선택').innerHTML =
              `<option>지금까지 ${data.bldNmdongs.length} 개동 조회</option>` +
              dongNm.join('');
          } else {
            alert(`진행을 취소합니다.`);
            return;
          }
        }
      } //else if end(바로종료 아님//조건여부에 따라 for문 루프.)
    }); //fetpost end
  } //for end
} //function twoalert end


  
  function Juso() {
    return (
      <div>
        <select id="시도">
          {' '}
          <option>시도</option>{' '}
        </select>
  
        <select id="시군구">
          {' '}
          <option>시군구</option>{' '}
        </select>
  
        <select id="읍면동">
          {' '}
          <option>읍면동</option>{' '}
        </select>
        <select id="리">
          {' '}
          <option>리</option>{' '}
        </select>
  
        <p>
          <select id="일반산블록">
            {' '}
            <option>일반</option>
            <option>산</option>
            <option>블록</option>
          </select>
  
          <input type="value" id="번" placeholder="번"></input>
          <input type="value" id="지" placeholder="지"></input>
        </p>
        <p>
          <select id="대장종류">
            <option>층별개요</option>
            <option>표제부</option>{' '}
          </select>
        </p>
  
        <button
          id="조회"
          onClick={BDsearch_new} /* 연결함수 부분*/
          className={styles.btn_type1} /* juso.module.css 파일에서 정의*/
        >
          조회
        </button>
  
        <p></p>
        <button
          id="준비"
          onClick={intro} /* 연결함수 부분*/
          className={styles.btn_type1} /* juso.module.css 파일에서 정의*/
        >
          준비
        </button>
        <select id="건물선택">
          <option>건물선택</option>
        </select>
      </div>
    );
  }
  
  export default Juso;