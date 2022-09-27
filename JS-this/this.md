# this

객체는 상태의 프로퍼티와 동작의 메서드를 가진다고 했다.

동작을 나타내는 메서드는 객체의 상태(프로퍼티)를 참조하고 변경할 수 있어야 한다.

메서드가 **자신이 속한 객체의 프로퍼티를 참조**하려면 먼저 **객체를 가리키는 식별자를**

**참조해**야 한다.

객체리터럴 방식에서 메서드 내부에서 자신이 속한 객체를 가리키는 식별자 참조 가능

```jsx
const circle = {
    radius:5,
    getDia(){
        return 2 * circle.radius;
    }
}
```

getDia 메서드 내에서 메서드는 자신이 속한 객체를 가리키는 식별자 circle을 참조한다.

이 참조 표현식이 평가되는 시점은 getDia**메서드가 호출되어 함수 몸체가 실행되는 시점**이다.

getDia가 호출되는 시점에는 이미 circle객체가 생성되었고, 객체가 할당된 이후이다.

생성자 함수 방식으로 인스턴스(객체)를 생성한다고 생각해보자.

```jsx
function Circle(radius){
	????.radius = radius;
}
//이 시점에는 생성자 함수 자신이 만든 객체를 가리키는 식별자를 알 수 없다.

Circle.prototype.getDia = function(){
	return 2*???.radius;
}

const Circle = new Circle(5);
```

생성자 함수 내부에서는 프로퍼티나 메서드를 추가하기 위해 자신이 생성할 인스턴스를

참조할 수 있어야 한다.

**생성자 함수로 인스턴스를 생성하려면, 먼저 생성자 함수가 존재햐아 한다.**

생성자 함수를 정의하는 시점에는 아직 **생성자 함수로 객체를 만들기 이전의 상태**이다.

**생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없다.**

생성자 함수 인스턴스 → 생성자 함수 필요 → 생성자 함수 정의 시점에는 생성자 함수가 생성할,

객체를 가리키는 식별자를 모르는 상태

### 🔍 따라서, 자신이 속한 객체, 자신이 생성할 인스턴스를 가리키는 것이 this다.

this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다.

this를 통해 자신이 속한 객체나 자신이 생성할 인스턴스의 프로퍼티,메서드를 참조할 수 있다.

함수 호출 시 **argument객체**와 **this**가 함수 내부에 암묵적으로 전달된다.

this가 가리키는 값은 함수 호출에 따라 동적으로 결정됨

(this와 this가 가리킬 객체 연결)

```jsx
const circle = {
    radius:5,
    getDia(){
        return 2*this.radius;
    }
};
```

**객체 리터럴 메서드 내부**에서의 **this**는 **메서드를 호출한 객체(circle)을 의미**한다.

```jsx
function circle(radius){
    this.radius = radius;
}
circle.prototype.Dia = function(){
    return 2*this.radius;
}
```

**생성자 함수 내부에서의 this**는 생성자 함수가 **생성할 인스턴스**를 가리킨다

**자바스크립트에서 this는 코드 어디서든 참조 가능하고,**

**함수가 호출되는 방식에 따라 this에 바인딩 될 값이 동적으로 정해진다**

```jsx
console.log(this); //window
function square(number){
    console.log(this);
    return number * number;
}

const person = {
    name:'LEE',
    getName(){
        return this.name;
    }
};
function Person(name){
    this.name = name;
}
```

---

### 함수 호출 방식과 this 바인딩

**this 바인딩(this에 바인딩 될 값)은 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다.**

1. 일반 함수 호출
2. 메서드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메서드에 의한 호출

```jsx
const foo = function(){
    console.dir(this);
}

//1 일반 함수 호출
//일반 함수 호출시 함수 내부의 this는 전역 객체 window를 의미

foo();

const obj = {foo};
obj.foo();
//2 메서드 호출
//메서드 호출시 this는 메서드를 호출한 객체를 가르킴(obj)

//3 생성자 함수 호출
//이 경우 this는 생성자 함수가 생성할 인스턴스를 의미
new foo();
```

### 🔍 일반 함수 호출

기본적으로 **this에는 전역 객체가 바인딩**된다.

```jsx
function foo(){
    console.log(this); //window
    function bar(){
        console.log(this); //window
    }
    bar();
}
foo();
```

전역 함수 + 중첩 함수를 **일반 함수로 호출하면 함수 내부의 this는 전역 객체가 바인딩**된다.

strictMode→undefined가 바인딩 된다.

메서드 안에서 정의한 중첩함수도 일반 함수로 호출하면, this는 전역 객체가 바인딩된다.

```jsx
var value = 1;

const obj = {
    value:100,
    foo(){
        console.log(this); //메서드 -> 메서드를 호출한 객체 obj
        console.log(this.value);//100

        function bar(){
            console.log(this); //window
            console.log(this.value); //1
        }
        bar();
    }

};
obj.foo();
```

 

콜백 함수도 일반 함수로 호출되면 this는 전역 객체가 바인딩된다.

### 어떤 함수라도 일반 함수로 호출 시 this는 전역 객체가 바인딩된다.

---

**이처럼 일반 함수로 호출된 모든 함수 내부의 this는 전역 객체가 바인딩된다.**

만약 메서드 내의 중첩함수나, 콜백함수가 일반함수로 호출되면 문제가 생길 수 있다.

메서드 내부의 중첩함수나 콜백 함수의 this바인딩을 메서드와 바인딩 시켜보자.

```jsx
var value = 1;

const obj = {
    value:100,
    foo(){
        console.log(this); //메서드 -> 메서드를 호출한 객체 obj
        console.log(this.value);//100
        const that = this; // this는 obj를 가리킴
        function bar(){
            console.log(that); //window
            console.log(that.value); //1
        }
        bar();
    }

};
obj.foo();
```

![Untitled](this%2027505be889064996af106f5340ab6fb0/Untitled.png)

this와 that모두 obj를 가리키는 것을 알 수 있다.

이 외에도 this를 명시적으로 바인딩하는 함수들(Function.prototype.apply,Function.prototype.bind)를 제공한다.

```jsx
var value = 1;

const obj = {
    value:100,
    foo(){
        setTimeout(function(){
            console.log(this.value);
        }.bind(this),100);
    }

};
obj.foo();
```

화살표 함수를 사용해서 this를 바인딩 할 수 있다.

**화살표 함수 내부의 this는 상위 스코프의 this를 가르킨다.**

foo()메서드의 상위 스코프는 obj이므로 this는 obj를 가리킴

```jsx
var value = 1;

const obj = {
    value:100,
    foo(){
        setTimeout(()=>console.log(this.value),100);
    }

};
obj.foo();
```

---

### 🔍메서드 호출

메서드 내부의 this는 **메서드를 호출한 객체, 앞의 , 연산자 앞에 기술된 객체와 바인딩**된다.

```jsx
const person = {
    name:'LEE',
    getName(){
        return this.name;
    }
};
```

메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩된다.

```jsx
const person = {
    name:'LEE',
    getName(){
        return this.name;
    }
};

console.log(person.getName());
```

위의 getName메서드는 person객체의 메서드로 정의되어있다.

메서드는 프로퍼티에 바인딩 된 함수이다. 

즉 person객체의 getName프로퍼티가 가리키는 함수 객체는 person 객체 안에 포함된 것이 아니라,

독립적으로 별개로 존재한다.

![Untitled](this%2027505be889064996af106f5340ab6fb0/Untitled%201.png)

따라서 getName 프로퍼티가 가리키는 함수 객체, getName 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수 있고, 일반 변수에 할당도 가능하다.

```jsx
const anotherperson = {
    name:'KIM'
};

//getName메서드를 anotherperson 객체의 메서드로 전달
anotherperson.getName = person.getNamel

console.log(anotherperson.getName());
//getName메서드를 호출한 객체는 anotherperson이다.

const getName = anotherperson.getName;
console.log(getName()); //일반 함수로 호출
```

따라서 **메서드 내부의 this**는 **메서드를 호출한 객체에 바인딩**된다.

![Untitled](this%2027505be889064996af106f5340ab6fb0/Untitled%202.png)

프로토타입 메서드 내부에서 사용된 this도 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다.

```jsx
function person(name){
    this.name = name;
}

person.prototype.getname = function(){
    return this.name;
};

const Me = new person('KIM');
console.log(Me.getname());
//getname 메서드를 호출한 객체는 Me다

person.prototype.name = 'KIM';
console.log(person.prototype.name);
```

위 코드를 그림으로 표현하면 다음과 같다.

![Untitled](this%2027505be889064996af106f5340ab6fb0/Untitled%203.png)

---

### 🔍 생성자 함수 호출

생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스가 바인딩된다

```jsx
function Circle(radius){
    this.radius = radius;
    //생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스
    this.getDia() = function(){
        return 2*this.radius;
    };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);
console.log(circle1.getDia()); //10
console.log(circle2.getDia()); //20
```

new 연산자와 함께 호출하지 않으면 생성자 함수로 동작하지 않고 일반 함수로 동작한다.

---

### Function.prototype.apply/call/bind 메서드에 의한 호출

apply,call,bind 메서드는 Function.prototype의 메서드다.

이들 메서드는 모든 함수가 상속받아서 사용할 수 있다.

Function.prototype.apply, [Function.prototype.call](http://Function.prototype.call) 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받는다.

```jsx
function getThisBinding(){
    return this;
}

//this로 사용할 객체
const thisarg = { a:0 };
//getThisBinding 함수를 호출하면서 인수로 전달한 객체를 getThisBinding 함수와 바인딩

console.log(getThisBinding.apply(thisarg));
console.log(getThisBinding.call(thisarg));
```

apply와 call 메서드의 기능은 **함수를 호출하면서 첫번쨰 인수로 전달한 객체를 호출한 함수의** 

**this와 바인딩**한다.

apply와 call의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 대해 

배열 메서드를 제공하는 것이다.

arguments객체는 배열이 아니라, Array.prototype.slice 같은 배열 메서드를 사용할 수 없다.

이때 apply나 call을 사용한다

```jsx
function convertArgtoArray(){
    console.log(arguments);
    const arr = Array.prototype.slice.call(arguments);
    console.log(arr);
    return arr;
}

convertArgtoArray(1,2,3);

//arguments객체를 배열로 반환
//Array.prototype.slice를 인수 없이 호출하면 복사본 생성
```

Function.prototype.bind메서드는 첫번쨰 인수로 전달한 값으로 this 바인딩이 교체된 함수를 반환

```jsx
function getThisbind(){
    return this;
}

const thisArg = {a:1};
console.log(getThisbind.bind(thisArg));
console.log(getThisbind.bind(thisArg)());
```