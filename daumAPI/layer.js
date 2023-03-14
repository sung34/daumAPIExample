// 우편번호 찾기 찾기 화면을 넣을 element
const frame = document.getElementById("search-layer__frame");

const themeObj = {
    bgColor: "#162525", //바탕 배경색
    searchBgColor: "#162525", //검색창 배경색
    contentBgColor: "#3D3D3D", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
    pageBgColor: "#6B6C6C", //페이지 배경색
    textColor: "#FFFFFF", //기본 글자색
    queryTextColor: "#FFFFFF", //검색창 글자색
    postcodeTextColor: "#FF7C8A", //우편번호 글자색
    emphTextColor: "#75CFFF", //강조 글자색
    outlineColor: "#444444" //테두리
 };


export default function daumPostcodeLayer(obj) {

  
  new daum.Postcode({
    oncomplete: function (data) {
        
      // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
      const myObj = obj;
      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      let addr = ""; // 주소 변수
      let extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        obj.extraAddrEl.textContent = extraAddr;
      } else {
        obj.extraAddrEl.textContent = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      obj.zonecodeEl.textContent = data.zonecode;
      obj.addrEl.textContent = addr;
      // 커서를 상세주소 필드로 이동한다.
      console.log(obj.addrEl.textContent)
    //   obj.detailAddrEl.focus();

    },
    // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
    onresize: function (size) {
      frame.style.height = size.height + "px";
    },
    width: "100%",
    height: "100%",
    theme: themeObj,
    
  }).embed(frame, {
    autoClose: false
  });

  // iframe을 넣은 element를 보이게 한다.
  frame.style.display = "block";
}
