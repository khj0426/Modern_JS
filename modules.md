> ### 먼저 모듈이란?
모듈은 전체 어플리케이션의 일부를 독립된 코드로 분리해서 나눈 것이다
모듈은 보통 클래스 하나, 특정 목적을 지닌 복수의 함수로 구성되어 있다.



![](https://velog.velcdn.com/images/khj0426/post/c582888c-8f68-4fdb-9896-f498b8c0ce43/image.png)

> ### 모듈화를 했을 떄 생기는 장점?
자주 사용하는 코드를 파일로 만들어 필요할 떄마다 활용할 수 있다.
필요한 로직만을 로드해 메모리의 낭비를 막을 수 있다.
>**결과적으로 코드의 재사용성을 높여준다**


> ####  모듈의 등장 배경
자바스크립트의 코드 크기가 점차 커지고 기능이 복잡해 지면서, 
한 파일 내에서 관리하기 보다는, 코드를 나누어 관리하고자 하게 된다.
이에 따라 다양한 모듈 시스템 (AMD,CommonJS,UMD..)이 등장한다.

ES6부터는 자바스크립트의 표준 공식 기능으로 (import,export)를 사용하는 모듈화를 표준으로 등록하였다.
ES6에서의 모듈 시스템은 다음과 같은 규칙을 지닌다.
> 모듈은 파일단위로 구성되는 것을 기본 원칙으로 한다
모듈의 변수,함수,클래스 등은 **export**로 내보내고, **import**로 가져와 사용한다.
모듈의 이름은 중복이 불가능하다

모듈 사용법을 익히기 위해서,다음과 같은 파일 구조가 존재한다.
![](https://velog.velcdn.com/images/khj0426/post/959dfdeb-800c-4a1f-8a9a-ffec7e288880/image.png)
가장 먼저 canvas.js의 코드이다.
canvas모듈은 크게 create,createReportList 두 가지 기능이 있다.

>create 기능은 div요소를 새로 만들고, canvas요소도 새로 만든다. 
부모 요소에 새로 만든 div요소를 자식으로 추가하고, 새로 만든 canvas요소를 새로 만든 div의 자식에 추가한다. 
그 후,새로 만든 div에 id를 주고, 캔버스의 높이와 너비를 지정하고, 캔버스의 2D컨텍스트, 새로 만든 div의 id를 반환한다.

> 다음으로 createReportLust는 ul요소를 새로 만들고, 새로 만든 ul의 id를 넣어준다. 그리고 리스트의 id를 반환한다.
![](https://velog.velcdn.com/images/khj0426/post/faba5ac1-41ad-401e-bf36-719d098e66d9/image.png)







square.js의 코드이다.
주석처리를 했지만, 다시 한번 살펴보자면
크게 **draw,reportArea,reportPerimeter** 3가지로 나뉜다.
![](https://velog.velcdn.com/images/khj0426/post/9fb45bdf-b9ef-4214-9504-0eb6a65fd862/image.png)

draw는 지정된 크기, 위치, 색상으로 지정된 캔버스에 사각형을 그린다. 
사각형의 크기, 위치, 색상을 나타내는 객체를 반환한다.

reportArea는 사각형의 넓이를 반환하고, reportPerimeter은 둘레를 반환한다.

밑의 코드를 통해서 여러 기능을 내보낼 수 있다.
> export { name, draw, reportArea, reportPerimeter };

모듈의 일부 기능을 사용하기 위해서, 이를 사용할 수 있도록 **import**구문을 넣어야 한다.

main.js에서 모듈을 불러오는 코드는 다음과 같다(상대 경로 적용)
![](https://velog.velcdn.com/images/khj0426/post/615b5c3d-0290-4b6b-aa6e-63f075806dc4/image.png)

main.js를 작성해보자.
![](https://velog.velcdn.com/images/khj0426/post/51fbf83c-f03a-41e2-8240-d398c652b5ac/image.png)

index.html에서 main.js를 가져오고 index.html을 실행하면, 결과 화면은 다음과 같이 나온다.(type = "module"를 넣어주자)
![](https://velog.velcdn.com/images/khj0426/post/38af2398-16a3-4ddb-86fb-817959c2fcfc/image.png)

![](https://velog.velcdn.com/images/khj0426/post/dfb00902-943f-4fa2-b76c-826f70452ebb/image.png)

모듈의 핵심적인 기능들도 알아보자-! 
> 먼저, **import**문과 **export**문은 모듈 내부에서만 사용할 수 있다.

> 모듈은 엄격모드에서 실행된다(strict mode) 

> 모듈은 자신만의 스코프가 존재해서, 모듈 내부에서 정의한 함수나 변수는, 다른 스크립트에서 접근이 불가능하다. 밑의 코드는 이에 대한 예시를 보여준다.

위의 작성된 코드에서 canvas.js에서 square.js의 변수 listItem을 가져오면 에러가 발생하는 것을 확인할 수 있었다.
![](https://velog.velcdn.com/images/khj0426/post/ca03dad9-7f61-4b44-af45-a8a46cc85dfa/image.png)
> 동일한 모듈을 여러 곳에서 사용하더라도, 모듈은 최초 호출 시 단 한번만 실행된다.

만약 사각형 뿐만 아니라 원, 삼각형 등 다른 도형들도 모듈화를 한다고 가정해보자. 사각형에서 우리가 사용했던 draw(),reportArea()등의 함수와도 연관이 있을 것이다. 
**동일한 이름의 여러 함수들을 최상위 모듈로 가져오려 하면, 에러가 발생한다.**

이것을 어떻게 해결 할 수 있을까??
> _import_와 _export_의 중괄호안에** as키워드**를 사용하기


circle.js,square.js 각각 내부에 동일한 이름의 기능이 있다고 가정하자.
draw함수와, reportArea함수, reportPerimeter함수 모두 기존 square.js에 존재하는 함수이다.

이제 circle.js와 square.js의 draw,reportArea,reportPerimeter를 main.js에 가져오면 오류가 발생하는 것을 볼 수 있다.
![](https://velog.velcdn.com/images/khj0426/post/0396514f-d88a-4928-8733-8030ca7687d8/image.png)

다음과 같은 상황을 **as**키워드로 해결할 수 있다.
![](https://velog.velcdn.com/images/khj0426/post/79ef83c3-67dc-46cd-8db9-563049ecc12a/image.png)
import할 때, as키워드로 이름을 바꿔줌으로써, 해결가능하다.

###  지연 실행
> 모듈 스크립트는 항상 지연실행된다.                      
외부 스크립트, 인라인 스크립트와 관계없이 마치 defer 속성을 붙인 것처럼 실행된다.

defer속성이 뭔지 몰라서 더 찾아보았다..!

일반적으로 브라우저는 랜더링도중 ```<script>```태그를 만난다면 해당 스크립트를 모두 해석하기 전까지 ```HTML랜더링```을 일시정지한다.

~~멈춰!~~
![](https://velog.velcdn.com/images/khj0426/post/b73ccfc7-8fed-4a8b-94c0-794f0088d474/image.png)

그림으로 나타내면 다음과 같다.
![](https://velog.velcdn.com/images/khj0426/post/c5385d86-9aed-4a34-b65d-10e69adeec9b/image.png)

이로 인해서 몇가지 문제점이 발생할 수 있다.

 페이지 위에 ```굉장히 용량이 큰 스크립트```가 존재한다면, 페이지를 막아버린다.
 밑에 예시 코드를 보면 사용자가 스크립트 뒤의 콘텐츠를 보기위해
 ```위의 스크립트 파일```을 다운받아야 하고, 이는 굉장히 큰 불편함을 불러올 수 있다.
 ![](https://velog.velcdn.com/images/khj0426/post/5e6240d0-4ec5-41f0-9cc2-eb87d59c8248/image.png)
 
 그래서 ```<script></script>```태그를 페이지 맨 아래에 놓는 해결 방법이 등장한다.
 그러나 이것은 완벽한 해결책이 아니다. ```HTML문서 자체```가 굉장히 큰 경우가 있다.
 이 경우에 브라우저가 HTML->Script를 모두 끝내면 시간 소요가 굉장할 것이다.
 
 이제 ```defer```와 ```async```스크립트로 이 문제를 해결해보자.
 
>  async 스크립트의 로드 순서 ![](https://velog.velcdn.com/images/khj0426/post/d6d92ef8-ef6b-4202-9590-8fe63c89600b/image.png)

 
```async```스크립트는** DOM랜더과정을 방해하지 않도록** 
```HTML파싱```과 ```JS파일```의 로드가 병렬로 로드된다.

단, 자바스크립트 파일의 실행은 자바스크립트 파일의 로드가 완료된 후, 바로 직후 진행되며, 이떄는 HTML 파싱이 중단된다.

> 여러 개의 스크립트에 ```async```를 부여하면 로드가 완료된 자바스크립트 파일부터 실행하므로, 실행 순서가 순차적으로 보장되지 않는다.

다음으로 ```defer속성```이다.
![](https://velog.velcdn.com/images/khj0426/post/bc1e29c4-4d95-478c-a8fd-2a8c9f51827d/image.png)

```async```와 마찬가지로, ```HTML파싱```과 ```JS파일```로드가 병렬적이다.
> 단, 자바스크립트의 파싱과 실행은 HTML파싱이 완료된 직후, DOMContentLoaded 이벤트가 발생되어 진헹된다. 
```결과적으로 DOM 생성이 완료된 직후, 실행되어야 할 자바스크립트에 유리하다.```

참고자료 
https://ko.javascript.info/onload-ondomcontentloaded
https://velog.io/@yongjin9660/js-defer-async-%EC%B0%A8%EC%9D%B4
https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules
 







