import addrPopup from "./daumAPI/popup";
import addrLayer, {element_wrap} from "./daumAPI/layer"

//[팝업 예제 섹션]
//---
const 팝업버튼 = document.querySelector('#search-btn')
const 팝업우편번호 = document.querySelector('#popup-zonecode')
const 팝업주소 = document.querySelector('#popup-address')
const 팝업상세주소 = document.querySelector('#popup-detail')
const 팝업참고항목 = document.querySelector('#popup-extra')


function onClickPopup() {
  obj = {
    addrEl: 팝업주소,
    extraAddrEl: 팝업참고항목,
    zonecodeEl: 팝업우편번호,
    detailAddrEl: 팝업상세주소
  }
  addrPopup(obj)
}
//---

//[iframe 예제 섹션]
const 우편번호 = document.querySelector('#layer-zonecode')
const 주소 = document.querySelector('#layer-address')
const 상세주소 = document.querySelector('#layer-detail')
const 참고항목 = document.querySelector('#layer-extra')

//---
export const myScript = document.createElement('script')
const url = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
myScript.src = url;
document.head.appendChild(myScript)
//---
myScript.onload = () => {
  팝업버튼.addEventListener('click', onClickPopup) // 이벤트 핸들러로 할 때는 이렇게
  obj = { //직접 호출해야 할 때는 이렇게
    addrEl: 주소,
    extraAddrEl: 참고항목,
    zonecodeEl: 우편번호,
    detailAddrEl: 상세주소
  }
 addrLayer(obj)
}