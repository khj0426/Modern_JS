/*논리 연산자 단축 평가*/

console.log('Cat' && 'Dog') //"Dog" -> 좌변에서 우변으로, 'Cat'은 truthy값 이므로 true, 두번쨰 피연산자 'Dog'반환
console.log('Cat'|| 'Dog') //'Cat'이 truthy이므로 바로 'Cat' 반환

var done = true;
var message = '';
if(done) message = '완료';
message = done && '완료';
console.log(message); // 완료 done이 truthy이고 두번쨰 피연산자 '완료'도 truthy -> '완료' 반환


var done_ = false;
var message_ = '';
if(!done_) message_ = '미완료';
message_ = done_ || '미완료';
console.log(message_); //미완료 done이 false, '미완료'는 truthy -> '미완료' 반환


/*객체를 가르키기를 기대하는 변수가 null이나 undefined인 경우*/
var elem = null;
var value = elem.value; //Typeerror : Cannot read property 'value' of null


//->단축평가로 개선 가능

//elem이 null이나 undefined 등의 falsy값이면 elem으로 평가.
value = elem && elem.value; // 

/*옵셔널 체이닝 연산자 -> 좌항의 피연산자가 null이거나 undefined인 경우 undefined 반환, 그렇지 않으면 우항 참조 이어감*/

var element = null;
var chain = element?.value; // var chain = element && element.value 
console.log(chain); //undefined -> element(좌항이 null) -> undefined

//논리연산자 &&는 좌항 피연산자가 falsy값이면 피연산자 그대로 반환 -> 그러나 ' ' 는 객체로 평가될 수 있음(원시 값과 리퍼 객체)

var str = '';
var length = str && str.length; //좌항 피연산자 ' ' 그대로 반환
console.log(length); // '' -> 문자열의 길이를 참조하지 못한다 (옵셔널 체이닝 연산자로 개선 가능)

str = '';
var length = str?.length;
console.log(length); // 0


//''는 null도 아니고 undefined도 아니라서 우항 프로퍼티 참조 이어감









